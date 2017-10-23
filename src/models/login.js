import { login } from "../services/login";
import { routerRedux } from "dva/router";
import { queryURL } from "../utils";

export default {
  namespace: "login",
  state: {
    loginLoading: false
  },
  subscriptions: {
    setup({ dispatch }) {
      // reset signStatus
      dispatch({ type: "app/setSignStatus" });
    }
  },
  effects: {
    *login({ payload }, { put, call }) {
      yield put({ type: "showLoginLoading" });
      const result = yield call(login, payload);
      yield put({ type: "hideLoginLoading" });
      if (result.data.type === "success") {
        const from = queryURL("from");
        if (from) {
          yield put(routerRedux.push(from));
        } else {
          yield put(routerRedux.push("/host"));
        }
      } else {
        throw "用户名或者密码错误！";
      }
    }
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false
      };
    }
  }
};
