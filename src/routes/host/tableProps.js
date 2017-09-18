/**
 * Created by chenkang1 on 2017/9/13.
 */
import { Button, Modal } from "antd";
import DropOption from "../../components/DropOption/DropOption";
import { fetchAndNotification } from "../../services/restfulService";
export default function tableDataProps() {
  const confirm = Modal.confirm;

  return {
    columns: [
      {
        title: "名称",
        dataIndex: "hostname",
        key: "hostname"
        // width: 64,
        // render: text => <img alt={"avatar"} width={24} src={text}/>
      },
      {
        title: "机架",
        dataIndex: "rack_name",
        key: "rack_name"
        // width: 120,
        // render: (text, record) =>
        //   <Link to={`host/${record.id}`}>
        //     {text}
        //   </Link>
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        sorter: true
        // width: 100,
      },
      {
        title: "外网IP",
        dataIndex: "publicip",
        key: "publicip",
        sorter: true
        // width: 64,
      },
      {
        title: "监视器角色",
        dataIndex: "mons[0].role",
        key: "mons[0].role"
        // render: mons =>
        //   <span>
        //     {mons.role}
        //   </span>
      },
      {
        title: "存储单元数量",
        dataIndex: "osds_num",
        key: "osds_num"
      },
      {
        title: "处理器使用率（%）",
        dataIndex: "cpuUsage",
        key: "cpuUsage"
      },
      {
        title: "内存使用率（%）",
        dataIndex: "ramUsage",
        key: "ramUsage"
      },
      {
        title: "创建时间",
        dataIndex: "created_at",
        key: "created_at"
      },
      {
        title: "操作",
        key: "operation",
        // width: 100,
        render: (text, record) => {
          return (
            <span>
              <Button
                type="danger"
                icon="delete"
                onClick={e => this.tableDataProps.showDeleteConfirm(record, e)}
              >
                delete
              </Button>
              <DropOption
                onMenuClick={e =>
                  this.tableDataProps.handleMenuClick(record, e)}
                menuOptions={[
                  { key: "1", name: "Update" },
                  { key: "2", name: "Delete" }
                ]}
              />
            </span>
          );
        }
      }
    ],
    errorMsg: "get host table error",
    refresh: this.props.model.refresh,
    defaultCluster: this.props.model.defaultCluster,
    fetchData: {
      url: this.props.model.defaultCluster
        ? `ceph/clusters/${this.props.model.defaultCluster.id}/servers/`
        : "",
      params: null,
      api: "v2"
    },
    // dataSource: this.props.model.tableData,
    // loading: this.props.model.tableLoading,
    showDeleteConfirm: (record, e) => {
      // console.log(this)
      confirm({
        title: "Are you sure delete this host?",
        // content: 'Some descriptions',
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          await fetchAndNotification({
            url: `ceph/clusters/${this.props.model.defaultCluster
              .id}/servers/${record.id}`,
            method: "delete",
            api: "v2",
            notifications: {
              title: "Delete Host",
              success: `删除主机 ${record.hostname} 操作成功！`,
              error: `删除主机 ${record.hostname} 操作失败！`
            }
          });

          this.refresh();
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    handleSelectItems: (selectedRowKeys, selectedItems) => {
      this.props.dispatch({
        type: "host/updateSelectItems",
        payload: {
          selectedRowKeys,
          selectedItems
        }
      });
    },
    handleMenuClick: (record, e) => {
      if (e.key === "1") {
        let { dispatch } = this.props;
        dispatch({
          type: "host/showModal",
          payload: {
            key: "modalVisible"
          }
        });
      } else if (e.key === "2") {
        confirm({
          title: "Are you sure delete this record?",
          onOk() {
            console.log(record);
          }
        });
      }
    }
  };
}
