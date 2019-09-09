/* eslint-disable import/prefer-default-export */
/* eslint-disable require-jsdoc */
// 汉字按两个字符计算长度
export function getByteLen(val) {
  if (!val) {
    return 0;
  }
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    const a = val.charAt(i);
    if(a.match(/[^\x00-\xff]/ig) != null){ // eslint-disable-line
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

export function formatTime(time, fmt) {
  const d = new Date(time);
  if (!fmt) return time;
  const obj = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds(),
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(
          RegExp.$1, (RegExp.$1.length === 1)
          ? (obj[key])
          : (('00' + obj[key]).substr(('' + obj[key]).length)));
    }
  }
  return fmt;
}

// 根据参数获取间隔年月日
//  获取间隔天数
export function getIntervalDate(n) {
  const dd = new Date();
  //  获取n天后的日期
  dd.setDate(dd.getDate() + n*1);
  const year = dd.getFullYear();
  //  获取当前月份的日期，不足10补0
  const mon = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
  //  获取当前几号，不足10补0
  const day = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
  const _date = `${year}-${mon}-${day}`;
  return _date;
}

export const regTest = {
  phoneReg: new RegExp(/^1[3456789]\d{9}$/),
  emailReg: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/),
  userNameReg: new RegExp(/(^([\u4e00-\u9fa5a-zA-Z\d+]+)$)/),
  // 密码至少包含英文、数字、符号中的两种
  // pwdReg: new RegExp(/(?!^(\d+|[a-zA-Z]+|[!@#$%^&*]+)$)^[\w!@#$%^&*?]{6,20}$/),
  // 只可输入英文、数字或组合
  pwdReg: new RegExp(/(^([a-zA-Z\d+]+)$)/), // 密码正则校验
  prdCodeReg: new RegExp(/^\d{5}$/), // 产品编码正则校验
  doubleNum: new RegExp(/^[0-9]+(.[0-9]{1,2})?$/), // 非负整数(2位小数)
};

export function getAllAuthorCodeArr(data=[]) {
  const arr = [];
  data.map((v, i) => {
    arr.push(v.value);
    if (v.children) {
      v.children.map((ele, idx) => {
        arr.push(ele.value);
      });
    }
  });
  return arr;
}
