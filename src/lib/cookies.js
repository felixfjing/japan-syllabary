import Cookies from 'js-cookie'

const keyName = 'COOKIES-'
const cookies = {}

/**
 * 设置cookies缓存
 * name：key名字
 * content：内容
 * options： cookies设置
 * @param params
 */
cookies.set = (params = {}) => {
  let {
    name
  } = params

  const {
    content,
    options: cookieSetting
  } = params

  const currentCookieSetting = {
    expires: 1
  }

  Object.assign(currentCookieSetting, cookieSetting)

  name = keyName + name

  Cookies.set(name, content, currentCookieSetting)
}

/**
 * 获取cookies缓存
 * name：key名字
 * @param params
 */
cookies.get = (params = {}) => {
  let {
    name
  } = params

  name = keyName + name

  return Cookies.get(name)
}

/**
 * 获取全部cookies缓存
 */
cookies.getAll = () => {
  return Cookies.get()
}

/**
 * 删除cookies缓存
 * name：key名字
 * @param params
 */
cookies.remove = (params = {}) => {
  let {
    name
  } = params

  name = keyName + name

  return Cookies.remove(name)
}

export default cookies