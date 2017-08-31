/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import DropOption from "../../components/DropOption/DropOption";

class UserMgmt extends React.Component {

  init = () => {
    this.tableDataProps = {
      columns: [
        {
          title: "username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "time",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "Operation",
          key: "operation",
          width: 100,
          render: (text, record) => {
            return (
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  {key: "1", name: "Update"},
                  {key: "2", name: "Delete"}
                ]}
              />
            );
          }
        }
      ],
      fetchData: {
        url: "/user/users",
        params: null
      },
      errorMsg: "get user table error",
      refresh: this.props.modelProps.refresh,
      handleSelectItems: (selectedRowKeys, selectedItems) => {
        this.props.dispatch({
          type: "userMgmt/updateSelectItems",
          payload: {
            selectedRowKeys,
            selectedItems
          }
        });
      }
    };
  };

  render() {
    this.init();

    return (
      <div className="content-inner">
        <DataTable {...this.tableDataProps} />
      </div>
    )
  }
}

UserMgmt.propTypes = {
  loading: PropTypes.object,
  modelProps: PropTypes.object
};

export default connect(({userMgmt, loading}) => ({modelProps: userMgmt, loading}))(UserMgmt)
