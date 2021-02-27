export function dateSub (target) {
  const scale = {
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 365
  }
  const targetTime = new Date(target).getTime()
  const nowTime = new Date().getTime()
  const leave = nowTime - targetTime

  if (Math.floor(leave / 1000) < 60) {
    return Math.floor(leave / 1000) + '秒前'
  }
  if (Math.floor(leave / scale.minute) < 60) {
    return Math.floor(leave / scale.minute) + '分钟前'
  }
  if (Math.floor(leave / scale.hour) < 24) {
    return Math.floor(leave / scale.hour) + '个小时前'
  }
  if (Math.floor(leave / scale.day) < 30) {
    return Math.floor(leave / scale.day) + '天前'
  }
  if (Math.floor(leave / scale.month) < 12) {
    return Math.floor(leave / scale.month) + '个月前'
  }

  return Math.floor(leave / scale.year) + '年前'
}
