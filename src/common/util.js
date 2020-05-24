
//  防抖函数(控制一些函数执行的次数)
//  如获取加载图片是否完成的函数没次请求会被执行30次，消耗性能
export function debounce(func, deley){
    let time = null
    return function refresh(...age) {
           if(time) clearTimeout(time);
           time = setTimeout(() => {        
               func.call(this,age)
           }, deley);
    }
}


//  时间戳日期变成可视化日期  date获取的事件戳数据  fmt传入格式yyy-MM-dd hh:mm:ss 
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  };