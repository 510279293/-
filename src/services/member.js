import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 会员列表
export async function memberList(param) {
  return request(`/member/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 会员详情
export async function memberDetail(param) {
  return request(`/member/detail?${stringify(param)}`, {
    method: 'GET',
  });
}

// 兑换记录
export async function exchangeLogList(param) {
  return request(`/member/exchangeLog?${stringify(param)}`, {
    method: 'GET',
  });
}

// 积分流水
export async function integralLogList(param) {
  return request(`/member/integralLog?${stringify(param)}`, {
    method: 'GET',
  })
}
