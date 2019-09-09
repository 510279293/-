import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 删除联系信息(后台调用)
export async function contactDel(param) {
  return request(`/contact/delete?${stringify(param)}`, {
    method: 'GET',
  });
}

// 编辑联系信息(后台调用)
export async function contactEdit(param) {
  return request(`/contact/edit`, {
    method: 'POST',
    data: param,
  });
}

// 获取公司信息
export async function contactGetCompany(param) {
  return request(`/contact/getCompany?${stringify(param)}`, {
    method: 'GET',
  });
}

// 根据id获取联系信息
export async function getContact(param) {
  return request(`/contact/getContact?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取门店信息
export async function contactList(param) {
  return request(`/contact/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 新增联系信息(后台调用)
export async function contactSubmit(param) {
  return request(`/contact/submit`, {
    method: 'POST',
    data: param,
  });
}
