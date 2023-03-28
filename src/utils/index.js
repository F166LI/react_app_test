import { getToken } from '@/utils/auth'

export function parseTime (time, format) {
  var date = new Date(time);
  var WeekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var o = {
    'M+': date.getMonth() + 1, //month  
    'd+': date.getDate(), //day  
    'h+': date.getHours(), //hour  
    'm+': date.getMinutes(), //minute  
    's+': date.getSeconds(), //second  
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter  
    'S': date.getMilliseconds(), //millisecond  
    'E': WeekArr[date.getDay()],
    'e+': date.getDay()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  };
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    };
  };
  return format;
}

export function setTimestamp (t) {
  if (!t) return '';
  return `${t}?timestamp=${Date.now()}`;
}

export function getFormData (data = {}) {
  let f = new FormData();
  for (let k in data) {
    const v = data[k];
    if (v === undefined) continue;
    f.append(k, v)
  }
  return f;
}