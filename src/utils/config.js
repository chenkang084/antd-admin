const APIV1 = 'inner'
const APIV2 = '/api/v2'
const APINEW = '/apinew'

module.exports = {
  pageSize: 4,
  name: 'Performance Tuning',
  prefix: 'antdAdmin',
  footerText: 'Performance Tuning  © 2017 Lenovo',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/inner',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    newUser: `${APINEW}/users`,
  },
}
