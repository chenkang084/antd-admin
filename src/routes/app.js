import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Layout} from '../components'
import {classnames, config, menu} from '../utils'
import {Helmet} from 'react-helmet'
import '../themes/index.less'
import './app.less'
import NProgress from 'nprogress'
const {prefix} = config

const {Header, Bread, Footer, Sider, styles} = Layout
let lastHref

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, signStatus} = this.props.app
    const href = window.location.href

    if (lastHref !== href) {
      NProgress.start()
      if (!this.props.loading.global) {
        NProgress.done()
        lastHref = href
      }
    }

    const headerProps = {
      menu,
      user,
      siderFold,
      location,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      switchMenuPopover: () => {
        this.props.dispatch({type: 'app/switchMenuPopver'})
      },
      logout: () => {
        this.props.dispatch({type: 'app/signOut'})
      },
      switchSider: () => {
        this.props.dispatch({type: 'app/switchSider'})
      },
      changeOpenKeys: (openKeys) => {
        this.props.dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
      },
    }

    const siderProps = {
      menu,
      siderFold,
      darkTheme,
      location,
      navOpenKeys,
      changeTheme () {
        this.props.dispatch({type: 'app/switchTheme'})
      },
      changeOpenKeys (openKeys) {
        localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
        this.props.dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
      },
    }

    const breadProps = {
      menu,
    }

    //only show login form
    if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
      return <div>{this.props.children}</div>
    }

    //loading git
    if (!signStatus) {
      return (
        <div id="loading">
          <img src="./lg.progress-bar-preloader.gif"/>
        </div>
      )
    }

    const {iconFontJS, iconFontCSS, logo} = config

    return (
      <div>
        <Helmet>
          <title>ANTD ADMIN</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="icon" href={logo} type="image/x-icon"/>
          {iconFontJS && <script src={iconFontJS}></script>}
          {iconFontCSS && <link rel="stylesheet" href={iconFontCSS}/>}
        </Helmet>

        <div
          className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread {...breadProps} location={location}/>
            <div className={styles.container}>
              <div className={styles.content}>
                {this.props.children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({app, loading}) => ({app, loading}))(App)
