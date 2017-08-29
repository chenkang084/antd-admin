import {auth, logout} from '../services/app'
import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import {config} from '../utils'
const {prefix} = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    signStatus: localStorage.getItem(`loadingStatus`) === "true"
  },
  subscriptions: {

    setup ({dispatch, history}) {

      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'})
        }, 300)
      }

      history.listen(location => {
        // check sign status
        dispatch({type: 'checkSignStatus'})
      })
    },

  },
  effects: {
    // *query ({
    //           payload,
    //         }, {call, put}) {
    //   const data = yield call(query, parse(payload))
    //   if (data.success && data.user) {
    //     yield put({
    //       type: 'querySuccess',
    //       payload: data.user,
    //     })
    //     if (location.pathname === '/login') {
    //       yield put(routerRedux.push('/dashboard'))
    //     }
    //   } else {
    //     if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
    //       let from = location.pathname
    //       window.location = `${location.origin}/login?from=${from}`
    //     }
    //   }
    // },
    *signOut ({
                payload,
              }, {call, put}) {
      const data = yield call(logout, parse(payload));
      console.log(data)
      if (data.status === 200) {
        yield put(routerRedux.push("/login"))
      } else {
        throw (data)
      }
    },
    *changeNavbar ({
                     payload,
                   }, {put, select}) {
      const {app} = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({type: 'handleNavbar', payload: isNavbar})
      }
    },

    *checkSignStatus({}, {call, put, select}){
      try {
        const signStatus = yield select(state => state.app.signStatus)
        // not is login page and signStatus = false
        if (window.location.pathname !== "/login" && !signStatus) {
          const data = yield call(auth);
          console.log(data)
          yield put({type: 'setSignStatus', payload: true});
        }
      } catch (error) {
        // redirect to login page
        yield put({type: 'setSignStatus', payload: false});
        yield put(routerRedux.push("/login"))
      }
    }
  },
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, {payload}) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, {payload: navOpenKeys}) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

    setSignStatus(state, {payload: signStatus}){
      localStorage.setItem(`loadingStatus`,signStatus);
      return {
        ...state,
        signStatus
      }
    }
  },


}
