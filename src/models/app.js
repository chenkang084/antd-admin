import {query, logout} from '../services/app'
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
    signStatus: false
  },
  subscriptions: {

    setup ({dispatch,history}) {

      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'})
        }, 300)
      }

      history.listen(location => {
        // console.log(location.query)
        // if(window.location.pathname !== "/login"){
        //   dispatch({type: 'signStatus'})
        // }
        dispatch({type:'signRoute'})
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
    *signStatus({}, {call, put,select}){
      try {

        const setSignStatus = select(state =>state.app.signStatus);
        if(setSignStatus){
          yield put({type:'setSignStatus',payload:true});
        }else{
          const data = yield call(query);
          console.log(data)
          yield put({type:'setSignStatus',payload:true});
        }
      } catch (error) {
        // redirect to login page
        yield put({type:'setSignStatus',payload:false});
        yield put(routerRedux.push("/login"))
      }
    },
    *logout ({
               payload,
             }, {call, put}) {
      const data = yield call(logout, parse(payload));
      if (data.success) {
        yield put({type: 'query'})
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
    *signRoute({},{call,put,select}){

      const signStatus = yield select(state => state.app.signStatus)
      if (window.location.pathname !== "/login" && !signStatus){
        yield put({type:'signStatus'})
      }
      // console.log(signStatus)
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
      localStorage.setItem(`${prefix}siderFold`, !state.app.siderFold)
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

    setSignStatus(state,{payload:signStatus}){
      return {
        ...state,
        signStatus
      }
    }
  },


}
