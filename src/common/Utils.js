// 封装一个提高性能优化的防抖函数
export function debounce(func, delay=300){
  let timer = null
  return function (...args) {
    // 如果timer有值，就清除定时器。
    if (timer) clearTimeout(timer)
    // 否则就执行定时器里的代码
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}