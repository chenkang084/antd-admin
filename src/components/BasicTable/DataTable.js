import React from 'react'
import PropTypes from 'prop-types'
import {Table, notification} from 'antd'
import './DataTable.less'
import lodash from 'lodash'
import {fetch} from '../../services/restfulService'
import {stateDelay, getSessionStorage, setSessionStorage, sortJsonArr} from '../../utils/dataUtils'
import Filter from './Filter'

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      current: getSessionStorage('pagination')[window.location.pathname],
      dataSourceBack: [],
      pageSize: 5,
      keyword: null
    }
  }

  componentDidMount() {
    // this.getTableData()
  }

  componentWillMount() {
    this.getTableData()
  }

  componentDidUpdate() {
    const {fetchData} = this.props;

    if (!!this.state.keyword) {
      return;
    }

    if (fetchData.url && this.state.loading) {
      this.getTableData();
      // if (this.state.dataSourceBack.length === 0) {
      //   this.getTableData();
      // } else {
      //
      //   if (!!this.state.keyword){
      //     return;
      //   }
      //   this.getTableData();
      // }
    }


  }

  getTableData = () => {

    const {fetchData} = this.props
    if (fetchData.url && this.state.loading) {
      fetch(fetchData)
        .then((result) => {
          this.setState({
            dataSource: result.data.items,
            dataSourceBack: lodash.cloneDeep(result.data.items),
            loading: false,
          })
        })
        .catch((error) => {
          this.setState({loading: false})
          notification.open({
            message: this.props.errorMsg,
            duration: 0,
            type: 'error',
          })
        })
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    stateDelay.call(this).then(() => {
      if (sorter.order) {
        let orderType = sorter.order === 'descend' ? 'desc' : 'asc'
        sortJsonArr(this.state.dataSource, sorter.field, orderType)
      }
      this.setState({current: pagination.current, pageSize: pagination.pageSize})
      setSessionStorage('pagination', {[window.location.pathname]: pagination.current})
    })
  };


  checkRefresh = () => {
    let refresh = this.state.refresh
    if (!refresh) {
      // save basic model refresh count
      this.setState({refresh: this.props.refresh})
    } else {
      if (this.props.refresh !== refresh) {
        // update state refresh count so that rerender component
        this.setState({refresh: this.props.refresh})
        this.getTableData()
      }
    }
  };

  init = () => {
    this.tableProps = {
      columns: this.props.columns,
      ...this.state,
    }
    this.pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      total: null,
      pageSize: this.state.pageSize,
      defaultPageSize: 5,
      pageSizeOptions: ['5', '20', '30', '40'],
      current: this.state.current,
    }

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        this.setState({selectedRowKeys, selectedRows})
        this.props.handleSelectItems(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    this.filterProps = {
      onFilterChange: ({name: keyword}) => {
        stateDelay.call(this, {keyword}).then(() => {
          let result = []
          let list = lodash.cloneDeep(this.state.dataSourceBack)
          if (keyword) {
            if (list && list.length > 0) {
              result = list.filter((row) => {
                return Object.values(row).filter(item => {
                    return item && String(JSON.stringify(item)).toLowerCase().indexOf(keyword.toLowerCase()) > -1
                  }).length > 0
              })
            }
          } else {
            result = this.state.dataSourceBack
          }
          this.setState({dataSource: result})
        })
      },
      refresh: this.props.refresh
    };
  };

  render() {
    this.checkRefresh()

    this.init()

    return (
      <div>
        <Filter {...this.filterProps} />
        <Table
          ref="DataTable"
          rowSelection={this.rowSelection}
          bordered
          onChange={this.handleTableChange}
          {...this.tableProps}
          pagination={this.pagination}
        />
      </div>
    )
  }
}


DataTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  fetchData: PropTypes.object,
  errorMsg: PropTypes.string,
  refresh: PropTypes.function,
  handleSelectItems: PropTypes.function,
}

export default DataTable
