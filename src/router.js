import React from "react";
import PropTypes from "prop-types";
import { Router } from "dva/router";
import App from "./routes/app";

const registerModel = (app, model) => {
  if (
    !(app._models.filter(m => m.namespace === model.namespace).length === 1)
  ) {
    app.model(model.default);
  }
};

const Routers = function({ history, app }) {
  const routes = [
    {
      path: "/",
      component: App,
      indexRoute: {
        getComponent(nextState, cb) {
          Promise.all([
            System.import("./models/user.mgmt.model"),
            System.import("./routes/userMgmt/index")
            // .then(loadRoute(cb))
            // .catch(errorLoading)
          ]).then(([modal, route]) => {
            registerModel(app, modal);
            cb(null, route.default || route);
          });
        }
      },
      childRoutes: [
        // {
        //   path: "dashboard",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         registerModel(app, require("./models/dashboard"));
        //         cb(null, require("./routes/dashboard/"));
        //       },
        //       "dashboard"
        //     );
        //   }
        // },
        // {
        //   path: "user",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         registerModel(app, require("./models/user"));
        //         cb(null, require("./routes/user/"));
        //       },
        //       "user"
        //     );
        //   }
        // },
        // {
        //   path: "user/:id",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         registerModel(app, require("./models/user/detail"));
        //         cb(null, require("./routes/user/detail/"));
        //       },
        //       "user-detail"
        //     );
        //   }
        // },

        {
          path: "login",
          getComponent(nextState, cb) {
            // require.ensure(
            //   [],
            //   require => {
            //     registerModel(app, require("./models/login"));
            //     cb(null, require("./routes/login/"));
            //   },
            //   "login"
            // );
            Promise.all([
              System.import("./models/login"),
              System.import("./routes/login/")
              // .then(loadRoute(cb))
              // .catch(errorLoading)
            ]).then(([modal, route]) => {
              registerModel(app, modal);
              cb(null, route.default || route);
            });
          }
        },

        // {
        //   path: "request",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/request/"));
        //       },
        //       "request"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/iconfont",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/iconfont/"));
        //       },
        //       "UIElement-iconfont"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/search",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/search/"));
        //       },
        //       "UIElement-search"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/dropOption",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/dropOption/"));
        //       },
        //       "UIElement-dropOption"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/layer",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/layer/"));
        //       },
        //       "UIElement-layer"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/dataTable",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/dataTable/"));
        //       },
        //       "UIElement-dataTable"
        //     );
        //   }
        // },
        // {
        //   path: "UIElement/editor",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/UIElement/editor/"));
        //       },
        //       "UIElement-editor"
        //     );
        //   }
        // },
        // {
        //   path: "chart/lineChart",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/chart/lineChart/"));
        //       },
        //       "chart-lineChart"
        //     );
        //   }
        // },
        // {
        //   path: "chart/barChart",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/chart/barChart/"));
        //       },
        //       "chart-barChart"
        //     );
        //   }
        // },
        // {
        //   path: "chart/areaChart",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         cb(null, require("./routes/chart/areaChart/"));
        //       },
        //       "chart-areaChart"
        //     );
        //   }
        // },
        // {
        //   path: "post",
        //   getComponent(nextState, cb) {
        //     require.ensure(
        //       [],
        //       require => {
        //         registerModel(app, require("./models/post"));
        //         cb(null, require("./routes/post/"));
        //       },
        //       "post"
        //     );
        //   }
        // },

        {
          path: "host",
          getComponent(nextState, cb) {
            // require.ensure(
            //   [],
            //   require => {
            //     registerModel(app, require("./models/host.model"));
            //     cb(null, require("./routes/host/"));
            //   },
            //   "host"
            // );
            Promise.all([
              System.import("./models/host.model"),
              System.import("./routes/host/")
              // .then(loadRoute(cb))
              // .catch(errorLoading)
            ]).then(([modal, route]) => {
              registerModel(app, modal);
              cb(null, route.default || route);
            });
          }
        },
        {
          path: "host/detail",
          getComponent(nextState, cb) {
            // require.ensure(
            //   [],
            //   require => {
            //     registerModel(app, require("./models/host.model"));
            //     cb(null, require("./routes/host/detail.js"));
            //   },
            //   "host-detail"
            // );
            Promise.all([
              System.import("./models/host.model"),
              System.import("./routes/host/detail.js")
              // .then(loadRoute(cb))
              // .catch(errorLoading)
            ]).then(([modal, route]) => {
              registerModel(app, modal);
              cb(null, route.default || route);
            });
          }
        },
        {
          path: "userMgmt",
          getComponent(nextState, cb) {
            // require.ensure(
            //   [],
            //   require => {
            //     registerModel(app, require("./models/user.mgmt.model"));
            //     cb(null, require("./routes/userMgmt/index"));
            //   },
            //   "userMgmt"
            // );
            Promise.all([
              System.import("./models/user.mgmt.model"),
              System.import("./routes/userMgmt/index")
              // .then(loadRoute(cb))
              // .catch(errorLoading)
            ]).then(([modal, route]) => {
              registerModel(app, modal);
              cb(null, route.default || route);
            });
          }
        },
        {
          path: "*",
          getComponent(nextState, cb) {
            // require.ensure(
            //   [],
            //   require => {
            //     cb(null, require("./routes/error/"));
            //   },
            //   "error"
            // );
            Promise.all([
              System.import("./routes/error/")
              // .then(loadRoute(cb))
              // .catch(errorLoading)
            ]).then(([route]) => {
              cb(null, route.default || route);
            });
          }
        }
      ]
    }
  ];

  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
