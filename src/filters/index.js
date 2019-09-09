/* eslint-disable require-jsdoc */
import moment from 'moment';

// 格式化日期
export function dateTime(val, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!val) return '-';
  return moment(parseInt(val, 10)).format(format);
}

export function numberToPercent(val) {
  if (!val) return '-';
  return `${(val * 100).toFixed(2)}%`;
}

export function numberToPrice(val) {
  if (!val) return '-';
  return `¥ ${(val * 1).toFixed(2)}`;
}
