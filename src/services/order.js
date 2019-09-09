import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
const status = ['all', 'notSend', 'send', 'complete']
// 订单列表
export async function orderList(param) {
  return request(`/order/list/${status[param.status]}?${stringify(param)}`, {
    method: 'GET',
  });
}

// 发货
export async function orderSend(param) {
  return request(`/order/express/send`, {
    method: 'POST',
    data: param,
  });
}

// 订单详情
export async function orderDetail(param) {
  return request(`/order/detail?${stringify(param)}`, {
    method: 'GET',
  });
}

// 物流公司枚举
export async function companyList(param) {
  return request(`/order/express/info?${stringify(param)}`, {
    method: 'GET',
  });
}
