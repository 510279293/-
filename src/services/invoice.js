import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 发票列表
export async function billList(param) {
  return request(`/bill/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 发票详情
export async function billDetail(param) {
  return request(`/bill/detail?${stringify(param)}`, {
    method: 'GET',
  });
}

// 小票列表
export async function receiptList(param) {
  return request(`/receipt/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 小票详情
export async function receiptDetail(param) {
  return request(`/receipt/detail?${stringify(param)}`, {
    method: 'GET',
  });
}

// 搜索小票
export async function getReceiptByNum(param) {
  return request(`/receipt/get/byNum?${stringify(param)}`, {
    method: 'GET',
  });
}

// 录入小票
export async function receiptInput(param) {
  return request(`/receipt/input`, {
    method: 'POST',
    data: param,
  });
}
