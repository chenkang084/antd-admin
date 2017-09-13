/**
 * Created by chenkang1 on 2017/9/13.
 */
export default function clusterListProps() {
  return {
    clusterList: this.props.modalProps.clusterList,
    defaultCluster: this.props.modalProps.defaultCluster,
    changeCluster: cluster => {
      let {dispatch} = this.props;
      dispatch({
        type: "host/updateDefaultCluster",
        cluster: cluster[0]
      });
      this.refresh();
    }
  }
}
