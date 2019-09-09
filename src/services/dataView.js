import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 通知事件
export async function dataMessage(param) {
  return request(`/homepage/message?${stringify(param)}`, {
    method: 'GET',
  });
}

// 数据维度
export async function dataOverView(param) {
  return request(`/homepage/overview?${stringify(param)}`, {
    method: 'GET',
  });
}

// 近一月商品兑换订单量统计
export async function dataOrderCount(param) {
  return request(`/homepage/orderList?${stringify(param)}`, {
    method: 'GET',
  });
}