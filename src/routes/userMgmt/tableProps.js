/**
 * Created by chenkang1 on 2017/9/18.
 */
import React from "react";
import ReactDOM from "react-dom";
import DropOption from "../../components/DropOption/DropOption";
import { fetchAndNotification } from "../../services/restfulService";
export default function tableProps() {
  return {
    columns: [
      {
        title: "username",
        dataIndex: "username",
        key: "username",
        fixed: "left",
        width: 100
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
        // fixed: "left",
        width: 100
      },
      {
        title: "time",
        dataIndex: "time",
        key: "time"
        // width: 200,
      },
      {
        title: "Operation",
        key: "operation",
        // fixed: "right",
        width: 100,
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => {
                console.log();
                this.tableDataProps.handleMenuClick(record, e);
              }}
              menuOptions={[
                { key: "1", name: "Update" },
                { key: "2", name: "Delete" }
              ]}
            />
          );
        }
      }
    ],
    xRemainScrollWidth: 150,
    fetchData: {
      url: "/user/users",
      params: null
    },
    errorMsg: "get user table error",
    refresh: this.props.model.refresh, // basic model refresh count
    handleSelectItems: (selectedRowKeys, selectedItems) => {
      this.props.dispatch({
        type: "userMgmt/updateSelectItems",
        payload: {
          selectedRowKeys,
          selectedItems
        }
      });
    },
    handleMenuClick: (record, e) => {
      if (e.key === "1") {
        this.setState({
          updateUserModal: {
            modalVisible: true,
            record
          }
        });
      } else if (e.key === "2") {
        fetchAndNotification({
          url: `user/userId/${record.id}`,
          method: "delete",
          notifications: {
            title: "create Action",
            success: `删除${record.username} 操作成功！`,
            error: `删除${record.username} 操作失败！`
          }
        }).then(() => {
          this.refresh();
        });
      }
    }
  };
}
