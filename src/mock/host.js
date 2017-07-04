/**
 * Created by chenkang1 on 2017/7/3.
 */
const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const {apiPrefix} = config

let usersListData = Mock.mock({
  'data|50-100': [
    {
      id: /^\d{9}$/,
      key: /^\d{9}$/,
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})


let database = usersListData.data

module.exports = {

  [`GET ${apiPrefix}/host`] (req, res) {
    const {query} = req
    let {pageSize, page, ...other} = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData,
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/host`](req, res){
    const {ids} = req.body
    // console.log(req.body)
    // console.log(ids)
    if (ids && ids % 2 === 0) {
      res.status(204).end()
    } else {
      res.status(500).end()
    }
  },

  [`POST ${apiPrefix}/create`](req, res){
    const params = req.body;

    console.log(params);

    res.status(204).end();
  }



}
