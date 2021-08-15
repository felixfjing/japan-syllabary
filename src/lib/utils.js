import * as lodash from 'lodash'

export const validatenull = (input) => {
  if (input && parseInt(input) === 0) return false

  const list = ['$parent']
  if (typeof input === 'boolean') return false
  if (typeof input === 'number') return false

  if (input instanceof Array) {
    if (input.length === 0) return true
  } else if (input instanceof Object) {
    input = lodash.cloneDeep(input)

    list.forEach(ele => {
      delete input[ele]
    })
    if (JSON.stringify(input) === '{}') return true
  } else {
    if (
      input === 'null' ||
      input == null ||
      input === 'undefined' ||
      input === undefined ||
      input === ''
    ) {
      return true
    }
    return false
  }
  return false
}

export const vaildData = (value, def) => {
  if (typeof value === 'boolean') return value

  return !validatenull(value) ? value : def
}

// 获取URL参数
export const getUrlVariable = (variable) => {
  const query = window.location.search.substring(1)
  const vars = query.split('&')

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }

  return null
}

export const isWxClient = () => {
  return (/MicroMessenger/i).test(window.navigator.userAgent)
}

export const createCaptcha = (canvas, code) => {
  const ctx = canvas.getContext('2d')

  const w = 80
  const h = 35

  ctx.clearRect(0, 0, w, h)

  // 随机数
  function rn(min, max) {
    const n = Math.random() * (max - min) + min
    return Math.floor(n)
  }

  // 随机颜色
  function rc(min, max) {
    const r = rn(min, max)
    const g = rn(min, max)
    const b = rn(min, max)

    return `rgb(${r},${g},${b})`
  }

  // 填充的背景
  ctx.fillStyle = rc(180, 230)
  ctx.fillRect(0, 0, w, h)

  for (let i = 0; i < code.length; i++) {
    ctx.font = '25px SimHei'
    ctx.fillStyle = rc(80, 180)// 文字颜色
    ctx.textBaseline = 'top'
    ctx.fillText(code[i], (20 * i) + rn(1, 10), rn(1, 10)) // 在（20,0）处开始填充文字
  }

  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = rc(0, 255)
    ctx.beginPath()
    ctx.moveTo(rn(0, w), rn(0, h))
    ctx.lineTo(rn(0, w), rn(0, h))
    ctx.stroke()
  }

  // 绘制干扰点
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = rc(0, 255)
    ctx.beginPath()
    ctx.arc(rn(0, w), rn(0, h), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

export const isPhoneNumber = (phone) => {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)
}