import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import {browserHistory} from 'dva/router'
import {message} from 'antd'
import {query} from "./services/app";
import {delay} from "./utils/dataUtils";
// import {} from "./services/app"

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    console.log(error.message);
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'));

// 3. Router
app.router(require('./router'));

app.start('#root');
// delay(2000),
// Promise.all([ query()])
//   .then((result) => {
//     // 4. Start
//     document.getElementById("loading").style.display = 'none';
//
//   })
//   .catch ((err)=>{
//     app.start('#root');
//     window.location.href = `${window.location.origin}/login`;
//   })





