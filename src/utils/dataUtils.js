/**
 * Created by chenkang1 on 2017/6/29.
 */
import qs from "qs";

/**
  * sort json array by filed
  */
export function sortJsonArr(
  jsonArr,
  sortName,
  sortType,
  addition,
  additionOrder
) {
  if (sortName && sortType && jsonArr != null && jsonArr.length > 0) {
    sortType = sortType.toUpperCase();
    let direction = 1;
    if (sortType.toUpperCase() === "DESC") {
      direction = -1;
    }
    jsonArr.sort((obj1, obj2) => {
      if (obj1[sortName] > obj2[sortName]) {
        return 1 * direction;
      } else if (obj1[sortName] < obj2[sortName]) {
        return -1 * direction;
      }
      // obj1[sortName] == obj2[sortName]

      // if the two score equality, order by name , name order by sortType
      if (
        addition &&
        additionOrder &&
        obj1[addition] &&
        obj2[addition] &&
        obj1[addition].toUpperCase() > obj2[addition].toUpperCase()
      ) {
        return -1 * direction;
      }
      // obj1 addition is null
      if (!obj1[addition]) {
        return 1;
      }
      return 1 * direction;
    });
  }
}

/**
 * delay some time by promise
 * @param {*} options 
 */
export function stateDelay(options) {
  const defaultSecond = 200;
  // set default second
  if (isUndefined(options)) {
    options = { millisecond: defaultSecond };
  }
  // set default second
  if (!isUndefined(options) && isUndefined(options.millisecond)) {
    options.millisecond = defaultSecond;
  }

  let { millisecond, ...params } = options;
  this.setState({ loading: true, ...params });
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
      this.setState({ loading: false });
    }, millisecond);
  });
}

export function delay(millisecond = 100) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  });
}

export const setSessionStorage = (key, item) => {
  if (!key) {
    throw new TypeError("the key can't be  null in saveSessionStorge function");
  }
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionStorage = key => {
  if (!key) {
    throw new TypeError("the key can't be  null in getSessionStorge function");
  }
  return JSON.parse(sessionStorage.getItem(key)) || {};
};

export const removeSessionStorage = key => {
  if (!key) {
    throw new TypeError(
      "the key can't be  null in removeSessionStorage function"
    );
  }
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const setlocalStorage = (key, item = {}) => {
  if (!key) {
    throw new TypeError("the key can't be  null in savelocalStorge function");
  }
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = key => {
  if (!key) {
    throw new TypeError("the key can't be  null in getLocalStorage function");
  }
  return JSON.parse(localStorage.getItem(key)) || {};
};

export const removeLocalStorage = key => {
  if (!key) {
    throw new TypeError(
      "the key can't be  null in removeLocalStorage function"
    );
  }
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const isUndefined = value => {
  return typeof value === "undefined";
};

export const isFunction = value => {
  return typeof value === "function";
};

export const comparator = (obj, text) => {
  if (obj && text && typeof obj === "object" && typeof text === "object") {
    for (var objKey in obj) {
      if (
        objKey.charAt(0) !== "$" &&
        hasOwnProperty.call(obj, objKey) &&
        comparator(obj[objKey], text[objKey])
      ) {
        return true;
      }
    }
    return false;
  }
  text = ("" + text).toLowerCase();
  return ("" + obj).toLowerCase().indexOf(text) > -1;
};

/**
 * recurring search keyword from an object
 * @param {*} obj 
 * @param {*} text 
 */
export const searchKeyword = (obj, text) => {
  if (typeof text == "string" && text.charAt(0) === "!") {
    return !searchKeyword(obj, text.substr(1));
  }
  switch (typeof obj) {
    case "boolean":
    case "number":
    case "string":
      return comparator(obj, text);
    case "object":
      switch (typeof text) {
        case "object":
          return comparator(obj, text);
        default:
          for (var objKey in obj) {
            if (objKey.charAt(0) !== "$" && searchKeyword(obj[objKey], text)) {
              return true;
            }
          }
          break;
      }
      return false;
    case "array":
      for (var i = 0; i < obj.length; i++) {
        if (searchKeyword(obj[i], text)) {
          return true;
        }
      }
      return false;
    default:
      return false;
  }
};

export const parseUrlParams = searchStr => {
  if (!searchStr) {
    throw new Error("searchStr can't be Undefined");
  }
  return qs.parse(searchStr, { ignoreQueryPrefix: true });
};
