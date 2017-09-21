import React from "react";
import PropTypes from "prop-types";
import { Table, notification } from "antd";
import "./DataTable.less";
import lodash from "lodash";
import { fetch } from "../../services/restfulService";
import {
  stateDelay,
  getSessionStorage,
  setSessionStorage,
  sortJsonArr
} from "../../utils/dataUtils";
import Filter from "./Filter";
import { searchKeyword } from "../../utils/dataUtils";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: getSessionStorage("pagination")[window.location.pathname],
      dataSourceBack: [],
      dataSource: null,
      pageSize: 5,
      keyword: null
    };

    this.initTable = false;
    this.refresh = this.props.refresh;

    if (!this.props.hasOwnProperty("defaultCluster")) {
      // initTable equals false indicates the first time query data
      if (!this.initTable) {
        this.getTableData();
        this.initTable = true;
      }
    }

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        // this.setState({ selectedRowKeys, selectedRows });
        this.props.handleSelectItems(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User" // Column configuration not to be checked
      })
    };

    this.tableProps = {
      columns: this.props.columns
    };
  }

  componentDidMount() {
    // this.getTableData()
  }

  componentWillMount() {}

  componentDidUpdate() {}

  componentWillReceiveProps(nextProps) {
    if (!this.checkRefresh(nextProps)) {
      if (nextProps.defaultCluster) {
        // initTable equals false indicates the first time query data
        if (!this.initTable) {
          this.getTableData(nextProps);
          this.initTable = true;
        }
      }
    }
    this.props.willReceiveProps &&
      this.props.willReceiveProps.call(this, nextProps);
  }

  getTableData = nextProps => {
    nextProps = nextProps || this.props;
    const { fetchData } = nextProps;
    if (fetchData.url) {
      this.setState({
        loading: true
      });
      fetch(fetchData)
        .then(result => {
          this.setState({
            dataSource: result.data.items,
            dataSourceBack: lodash.cloneDeep(result.data.items),
            loading: false
          });
        })
        .catch(error => {
          this.setState({ loading: false });
          notification.open({
            message: nextProps.errorMsg,
            duration: 0,
            type: "error"
          });
        });
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    stateDelay.call(this).then(() => {
      if (sorter.order) {
        let orderType = sorter.order === "descend" ? "desc" : "asc";
        sortJsonArr(this.state.dataSource, sorter.field, orderType);
      }
      this.setState({
        current: pagination.current,
        pageSize: pagination.pageSize
      });
      setSessionStorage("pagination", {
        [window.location.pathname]: pagination.current
      });
    });
  };

  checkRefresh = nextProps => {
    if (nextProps.refresh !== this.refresh) {
      this.refresh = nextProps.refresh;
      this.getTableData(nextProps);
      return true;
    }
    return false;
  };

  init = () => {
    this.pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      total: null,
      pageSize: this.state.pageSize,
      defaultPageSize: 5,
      pageSizeOptions: ["5", "20", "30", "40"],
      current: this.state.current
    };

    this.filterProps = {
      onFilterChange: async ({ name: keyword }) => {
        let result = [];
        await stateDelay.call(this, { keyword, millisecond: 400 });
        if (!keyword) {
          result = this.state.dataSourceBack;
        } else {
          let list = lodash.cloneDeep(this.state.dataSourceBack);
          if (list && list.length > 0) {
            result = list.filter(row => {
              for (const column of Object.values(row)) {
                if (searchKeyword(column, keyword)) {
                  return true;
                }
              }
            });
          }
        }

        this.setState({ dataSource: result });
      },
      refresh: this.props.refresh
    };
  };

  render() {
    this.init();

    return (
      <div>
        <Filter {...this.filterProps} />
        <Table
          ref="DataTable"
          dataSource={this.state.dataSource}
          loading={this.state.loading}
          rowSelection={this.rowSelection}
          bordered
          onChange={this.handleTableChange}
          {...this.tableProps}
          pagination={this.pagination}
          scroll={{ x: 600 }}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  fetchData: PropTypes.object,
  errorMsg: PropTypes.string,
  refresh: PropTypes.function,
  handleSelectItems: PropTypes.function
};

export default DataTable;
