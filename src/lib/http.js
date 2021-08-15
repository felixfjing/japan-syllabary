import Vue from 'vue'
import axios from 'axios'
import { vaildData } from './utils'
import { Toast } from 'vant'
import _ from 'lodash'

let loadingInstance // loading 实例
let needLoadingRequestCount = 0 // 当前正在请求的数量

const loadingConfig = {
  duration: 0,
  message: '请稍候'
}

const http = {}

axios.defaults = Object.assign(axios.defaults,
  {
    timeout: 20000,
    withCredentials: false,
    validateStatus: (status) => {
      return status >= 200 && status <= 500 // 默认的
    }
  })

// http request
axios.interceptors.request.use(
  config => {
    const {meta = {}} = config

    const isToken = vaildData(meta.isToken, true)
    const responseType = vaildData(meta.responseType, 'json')

    if (responseType) config.responseType = responseType

    if (isToken) {
      config.headers.authentication = 'login_token'
    }

    // 开发环境打印请求结果
    if (process.env.NODE_ENV === 'development') {
      console.group('>>>>>> Request Config >>>>>>')
      console.log(config)
      console.groupEnd()
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })

// http response
axios.interceptors.response.use(
  response => {
    if (axios.isCancel(response)) {
      return new Promise(() => {
      })
    }

    // 开发环境打印响应结果
    if (process.env.NODE_ENV === 'development') {
      console.group('>>>>>> Response onFulfilled >>>>>>')
      console.log(response)
      console.groupEnd()
    }

    const {meta = {}} = response.config
    const catchError = vaildData(meta.catchError, true)
    const filterResponse = vaildData(meta.filterResponse, true)

    const {status = 200, data: retData} = response

    if (status !== 200) { // 如果请求为非200否者默认统一处理
      return Promise.reject(new Error(retData))
    } else {
      if (!filterResponse) return retData
      if (retData.Successed) return retData // 判断接口内部的成功标识

      if (!catchError) return Promise.reject(retData)

      return Promise.reject(retData)
    }
  },
  error => {
    if (axios.isCancel(error)) {
      return new Promise(() => {
      })
    }

    // 开发环境打印响应结果
    if (process.env.NODE_ENV === 'development') {
      console.group('>>>>>> Response onRejected >>>>>>')
      console.log(error)
      console.groupEnd()
    }

    return Promise.reject(new Error(error))
  })

http.axios = axios

const httpHandler = (url, method, options) => {
  const {headers = {}, params = {}, showLoading = false, timeout = 0, meta = {}, isParams = false} = options

  const requestParams = Object.assign({}, params)
  showLoadingInstance(showLoading)

  const config = {
    url,
    headers,
    method,
    meta
  }

  if (isParams) config.params = requestParams
  else config.data = requestParams

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios(config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          closeLoadingInstance()
        })
    }, timeout)
  })
}

// 显示Loading
function showLoadingInstance(flag) {
  if (!flag) return false

  if (needLoadingRequestCount === 0 && !loadingInstance) loadingInstance = Toast.loading(Object.assign({}, loadingConfig))
  needLoadingRequestCount++
}

const hideLoading = _.debounce(
  () => {
    loadingInstance.clear()
    loadingInstance = null
  }, 100)

// 关闭Loading
function closeLoadingInstance(loading) {
  Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    needLoadingRequestCount--
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 保证大于等于0

    if (needLoadingRequestCount === 0 && loadingInstance) hideLoading()
  })
}

/**
 * @Description: GET 请求
 * @Param: URL：请求地址
 * @Param: OPTIONS：参数，参数说明如下：
 * {
 *  headers：headers参数，
 *  params：请求参数，
 *  showLoading：是否显示loading，
 *  timeout：延迟请求的时间，默认立即执行，
 *  isParams：传参方式，比如POST请求，但却要以URL方式传值，
 *  meta：额外配置项
 *  }
 */
http.$GET = (url, options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign({
      isParams: true
    }, options)

    httpHandler(url, 'get', options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

http.$UPLOADER = (url, data) => {
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * @Description:  PATCH 请求
 * @Param:
 */
http.$PATCH = (url, options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign({
      isParams: false
    }, options)

    httpHandler(url, 'patch', options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @Description: POST 请求
 * @Param:
 */
http.$POST = (url, options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign({
      isParams: false
    }, options)

    httpHandler(url, 'post', options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @Description: PUT 请求
 * @Param:
 */
http.$PUT = (url, options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign({
      isParams: false
    }, options)

    httpHandler(url, 'put', options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @Description: DELETE 请求
 * @Param:
 */
http.$DELETE = (url, options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign({
      isParams: false
    }, options)

    httpHandler(url, 'delete', options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default http