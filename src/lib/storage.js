import { validatenull} from '@/lib/utils'

const keyName = 'STORAGE-'
const storage = {}

/**
 * 设置Storage缓存
 * name：key名字
 * content：内容
 * type： 有值则是：sessionStorage，否则：localStorage
 * @param params
 */
storage.set = (params = {}) => {
  let {
    name
  } = params

  const {
    content,
    type
  } = params

  name = keyName + name

  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }

  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取Storage缓存
 * name：key名字
 * @param params
 */
storage.get = (params = {}) => {
  let {
    name
  } = params

  const {
    debug
  } = params

  name = keyName + name

  let obj, content
  obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) obj = window.localStorage.getItem(name)
  if (validatenull(obj)) return

  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }

  return content
}

/**
 * 删除Storage缓存
 * name：key名字
 * @param params
 */
storage.remove = (params = {}) => {
  let {
    name
  } = params

  const {
    type
  } = params

  name = keyName + name

  if (type) window.sessionStorage.removeItem(name)
  else window.localStorage.removeItem(name)
}

/**
 * 获取全部Storage缓存
 * name：key名字
 * type： 有值则是：sessionStorage，否则：localStorage
 * @param params
 */
storage.getAll = (params = {}) => {
  const list = []

  const {
    type
  } = params

  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: storage.get({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: storage.get({
          name: window.localStorage.key(i)
        })
      })
    }
  }

  return list
}

/**
 * 清除全部Storage缓存
 * type： 有值则是：sessionStorage，否则：localStorage
 * @param params
 */
storage.clear = (params = {}) => {
  const {type} = params

  if (type) window.sessionStorage.clear()
  else window.localStorage.clear()
}

export default storage