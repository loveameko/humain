// 工具类

const worktools = {
  fileUrl: process.env.BASE_API + '/managerFile/api/file4IE/upload?access_token=',
  baseURL: process.env.BASE_API,
  prefix: process.env.BASE_PREFIX,
  // 获取sessionStorage对象
  getSession(name) {
    try {
      return JSON.parse(sessionStorage.getItem(name))
    } catch (error) {
      return null
    }
  },
  getLocalStore(name) {
    try {
      return JSON.parse(localStorage.getItem(name))
    } catch (error) {
      return null
    }
  },
  // 数组对象获取id
  getArrayId(data) {
    const arr = []
    if (this.isArrayFn(data)) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id) {
          arr.push(data[i].id)
        }
      }
      return arr
    } else {
      console.log('错误：不是数组！')
      return arr
    }
  },
  // 数组对象获取特定属性
  getSpecal(data, name) {
    const arr = []
    if (this.isArrayFn(data)) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i][name]) {
          arr.push(data[i][name])
        }
      }
      return arr
    } else {
      console.log('错误：不是数组！')
      return arr
    }
  },
  // 删除数组对象
  deleteArr(arr, name, value) {
    const new_arr = JSON.parse(JSON.stringify(arr))
    if (this.isArrayFn(arr)) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][name] === value) {
          new_arr.splice(i, 1)
        }
      }
    }
    return new_arr
  },
  // 判断是否数组
  isArrayFn(value) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(value)
    } else {
      return Object.prototype.toString.call(value) === '[object Array]'
    }
  },
  // 日期倒计时计算
  getCountdown(time) {
    let date
    if (typeof time === 'string') {
      date = (new Date(time))
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const now = Date.now()
    const diff = (date - now) / 1000
    const timeObj = {
      dd: parseInt(diff / 60 / 60 / 24, 10), // 计算剩余的天数
      hh: parseInt(diff / 60 / 60 % 24, 10) // 计算剩余的小时数
    }
    return timeObj.dd + '天' + timeObj.hh + '小时'
  },
  // 时间日期格式转换
  parseTime(time, cFormat) { // time：需转换的日期；cFormat：日期格式
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else if (typeof time === 'string') {
      date = (new Date(time))
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  // 获取地址栏的参数
  GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  },
  // 计算距今时间 （年）
  countYear(date) {
    let time
    if (!date) {
      time = new Date()
    } else if (typeof date === 'object') {
      time = date
    } else if (typeof date === 'string') {
      time = (new Date(date))
    } else {
      if (('' + date).length === 10) date = parseInt(date) * 1000
      time = new Date(date)
    }
    const startYear = parseInt(time.getFullYear())
    const nowYear = parseInt(new Date().getFullYear())
    return (nowYear - startYear)
  },
  // 获取级联菜单选中项对象
  getCascaderObj(val, opt, name) {
    return val.map(function(value, index, array) {
      for (var itm of opt) {
        if (itm[name] === value) {
          opt = itm.children
          return itm
        }
      }
      return null
    })
  }
}
export default worktools
