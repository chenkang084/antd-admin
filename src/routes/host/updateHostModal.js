/**
 * Created by chenkang1 on 2017/9/13.
 */
import { Input, Icon, Select, Switch } from "antd";
import { fetchAndNotification } from "../../services/restfulService";
import { isUndefined } from "../../utils/dataUtils";
export default function updateHostModal() {
  const formItems = {
    hostname: {
      name: "主机",
      key: "hostname",
      rules: [
        {
          required: true,
          message: "Please input hostname!"
        }
      ],
      render: function() {
        return (
          <Input
            prefix={<Icon type="" style={{ fontSize: 13 }} />}
            placeholder="hostname"
          />
        );
      }
    },
    username: {
      name: "用户名",
      key: "username",
      // updateValueFlag: false,
      rules: [{ required: true, message: "Please input username!" }],
      render: function() {
        return (
          <Input
            type="text"
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="username"
          />
        );
      }
    },
    passwd: {
      name: "密码",
      key: "passwd",
      updateValueFlag: false,
      rules: [{ required: true, message: "Please input your password!" }],
      render: function() {
        return (
          <Input
            type="password"
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            placeholder="password"
          />
        );
      }
    },
    group_id: {
      name: "主机组",
      key: "group_id",
      rules: [{ required: true, message: "Please select your gender!" }],
      render: function() {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select Host group"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
          >
            {this.state.hostGroup &&
              this.state.hostGroup.map(group => {
                return <Option value={group.id}>{group.name}</Option>;
              })}
          </Select>
        );
      }
    },
    rack_name: {
      name: "机架",
      key: "rack_name",
      rules: [{ required: true, message: "Please select your gender!" }],
      render: function() {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select Host group"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
          >
            {this.state.hostRacks &&
              this.state.hostRacks.map(rack => {
                return <Option value={rack}>{rack}</Option>;
              })}
          </Select>
        );
      }
    },
    publicip: {
      name: "外网IP",
      key: "publicip",
      rules: [
        { required: true, message: "Please select your gender!" },
        {
          validator: function(rule, value, callback) {
            const reg = new RegExp(
              /^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/
            );
            const check = reg.exec(value);
            if (check) {
              callback();
            } else {
              callback("请输入正确的IP!");
            }
          }
        }
      ],
      render: () => {
        return <Input type="text" placeholder="外网IP" />;
      }
    },
    clusterip: {
      name: "集群IP",
      key: "clusterip",
      rules: [
        { required: true, message: "Please select your gender!" },
        {
          validator: function(rule, value, callback) {
            const reg = new RegExp(
              /^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/
            );
            const check = reg.exec(value);
            if (check) {
              callback();
            } else {
              callback("请输入正确的IP!");
            }
          }
        }
      ],
      render: () => {
        return <Input type="text" placeholder="外网IP" />;
      }
    },
    backup_node: {
      name: "设为备份节点",
      key: "backup_node",
      initialValue: true,
      rules: [{ required: true, message: "Please select your gender!" }],
      render: () => {
        return (
          <Switch
            defaultChecked={true}
            onChange={e => {
              console.log(e);
            }}
          />
        );
      }
    }
  };

  return {
    parentThis: this,
    record: this.state.updateHostModal.record,
    defaultCluster: this.props.model.defaultCluster,
    refresh: this.refresh,
    // btnText: "Add Host",
    modalTitle: "Update User",
    btnShow: false,
    // btnDisabled: this.props.model.defaultCluster ? false : true,
    modalVisible: this.state.updateHostModal.modalVisible,
    formItems: formItems,
    // state: {
    //   hostGroup: [],
    //   hostRacks: []
    // },
    submit: {
      btnText: "Update",
      // should use function instead of es6 =>{} ,make sure get modalForm's current this
      handleSubmit: async function(values) {
        await fetchAndNotification({
          url: `ceph/clusters/${this.props.defaultCluster.id}/servers/`,
          method: "post",
          api: "v2",
          params: {
            ...values,
            servername: values.hostname,
            backup_node: true
          },
          notifications: {
            title: "create Action",
            success: `创建${values.servername} 操作成功！`,
            error: `创建${values.servername} 操作失败！`
          }
        });

        this.props.form.resetFields();
        this.props.refresh();
      }
    },
    handleModalShow: async function() {},
    componentDidMountCb: async function() {
      const result = await Promise.all([
        fetchAndNotification({
          url: `ceph/clusters/${this.props.defaultCluster.id}/groups/`,
          api: "v2"
        }),
        fetchAndNotification({
          url: `ceph/clusters/${this.props.defaultCluster.id}/racks`,
          api: "v2"
        })
      ]);

      this.setState(
        {
          hostGroup: result[0].data.items,
          hostRacks: result[1].data.items,
          spinning: false
        },
        () => {
          Object.keys(this.props.formItems).forEach(key => {
            if (isUndefined(this.props.formItems[key].updateValueFlag)) {
              this.props.form.setFieldsValue({
                [key]: this.props.record[key]
              });
            }
          });
        }
      );
    },
    handleModalHide: () => {
      this.setState({
        updateHostModal: {
          modalVisible: false
        }
      });
    }
  };
}
