// import './index.html'
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
import { browserHistory } from "dva/router";
import { message } from "antd";
// import "./themes/default.less";
import "./style/index.less";

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  history: browserHistory,
  onError(error) {
    console.log(error.message);
    message.error(error.message);
  }
});

// 2. Model
app.model(require("./models/app").default);

// 3. Router
app.router(require("./router").default);

app.start("#root");
