import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Icon } from "antd";
import { Link } from "dva/router";
import styles from "./Bread.less";
import pathToRegexp from "path-to-regexp";
import { queryArray } from "../../utils";

const Bread = ({ menu }) => {
  // 匹配当前路由
  let pathArray = [];
  let current;
  for (let index in menu) {
    if (
      menu[index].router &&
      pathToRegexp(menu[index].router).exec(location.pathname)
    ) {
      current = menu[index];
      break;
    }
  }

  const getPathArray = item => {
    pathArray.unshift(item);
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, "id"));
    }
  };

  if (!current) {
    pathArray.push(menu[0]);
    !pathToRegexp("/").exec(location.pathname) &&
      pathArray.push({
        id: 404,
        name: "Not Found"
      });
  } else {
    getPathArray(current);
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>
        {item.icon ? item.externalIcon ? (
          <i
            style={{
              color: "#999",
              "margin-right": "4px"
            }}
            className={item.icon}
            aria-hidden="true"
          />
        ) : (
          <Icon type={item.icon} style={{ marginRight: 4 }} />
        ) : (
          ""
        )}
        {item.name}
      </span>
    );
    //如果有router，并且不是最后一个，则显示link，可以跳转
    if (item.router && pathArray.length - 1 !== key) {
      return (
        <Breadcrumb.Item key={key}>
          <Link to={item.router}>{content}</Link>
        </Breadcrumb.Item>
      );
    } else {
      return <Breadcrumb.Item key={key}>{content}</Breadcrumb.Item>;
    }
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb>{breads}</Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
  menu: PropTypes.array
};

export default Bread;
