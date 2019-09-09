import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 添加商品
export async function productAdd(param) {
  return request(`/product/add`, {
    method: 'POST',
    data: param,
  });
}

// 删除商品
export async function productDel(param) {
  return request(`/product/delete?${stringify(param)}`, {
    method: 'DELETE',
  });
}

// 商品详情
export async function productDetail(param) {
  return request(`/product/detail?${stringify(param)}`, {
    method: 'GET',
  });
}

// 商品下架
export async function productDown(param) {
  return request(`/product/down?${stringify(param)}`, {
    method: 'GET',
  });
}

// 商品上架
export async function productUp(param) {
  return request(`/product/up?${stringify(param)}`, {
    method: 'GET',
  });
}

// 商品编辑
export async function productEdit(param) {
  return request(`/product/edit`, {
    method: 'POST',
    data: param,
  });
}

// 商品列表
export async function productList(param) {
  return request(`/product/list?${stringify(param)}`, {
    method: 'GET',
  });
}
