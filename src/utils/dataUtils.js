/**
 * Created by chenkang1 on 2017/6/29.
 */
export function sortJsonArr(jsonArr, sortName, sortType, addition, additionOrder) {
  if (sortName && sortType && jsonArr != null && jsonArr.length > 0) {
    sortType = sortType.toUpperCase()
    let direction = 1
    if (sortType.toUpperCase() === 'DESC') {
      direction = -1
    }
    jsonArr.sort((obj1, obj2) => {
      if (obj1[sortName] > obj2[sortName]) {
        return 1 * direction
      } else if (obj1[sortName] < obj2[sortName]) {
        return -1 * direction
      }
      // obj1[sortName] == obj2[sortName]

      // if the two score equality, order by name , name order by sortType
      if (addition && additionOrder && obj1[addition] && obj2[addition] && obj1[addition].toUpperCase() > obj2[addition].toUpperCase()) {
        return -1 * direction
      }
      // obj1 addition is null
      if (!obj1[addition]) {
        return 1
      }
      return 1 * direction
    })
  }
}

export function stateDelay(millisecond = 100) {
  this.setState({loading: true})
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      this.setState({loading: false})
    }, millisecond)
  })
}

export function delay(millisecond = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export const setSessionStorage = (key, item) => {
  if (!key) {
    throw new TypeError("the key can't be  null in saveSessionStorge function")
  }
  sessionStorage.setItem(key, JSON.stringify(item))
}

export const getSessionStorage = (key) => {
  if (!key) {
    throw new TypeError("the key can't be  null in getSessionStorge function")
  }
  return JSON.parse(sessionStorage.getItem(key)) || {}
}

export const removeSessionStorage = (key) => {
  if (!key) {
    throw new TypeError("the key can't be  null in removeSessionStorage function")
  }
  sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}

export const setlocalStorage = (key, item = {}) => {
  if (!key) {
    throw new TypeError("the key can't be  null in savelocalStorge function")
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getLocalStorage = (key) => {
  if (!key) {
    throw new TypeError("the key can't be  null in getLocalStorage function")
  }
  return JSON.parse(localStorage.getItem(key)) || {}
}

export const removeLocalStorage = (key) => {
  if (!key) {
    throw new TypeError("the key can't be  null in removeLocalStorage function")
  }
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const isUndefined = value => {
  return typeof value === 'undefined'
}

export const isFunction = value => {
  return typeof value === 'function'
}
