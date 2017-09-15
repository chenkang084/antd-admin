/**
 * Created by chenkang1 on 2017/9/13.
 */
export default function clusterListProps() {
  return {
    clusterList: this.props.model.clusterList,
    defaultCluster: this.props.model.defaultCluster,
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
