export default function (fn, wait, immediate) {
  let t = null
  let result = null

  return function (high) {
    clearTimeout(t)
    if (immediate) {
      const exec = !t
      t = setTimeout(() => {
        t = null
      }, wait)
      if (exec) {
        result = fn.apply(this, arguments)
      } else {
        high()
      }
    } else {
      if (t) {
        high()
      }
      t = setTimeout(() => {
        result = fn.apply(this, arguments)
      }, wait)
    }
    return result
  }
}
