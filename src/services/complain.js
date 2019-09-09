import { stringify } from '@fe/common-utils';
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 新增投诉分类信息
export async function compCategoryAdd(param) {
  return request(`/proposal/category/submit`, {
    method: 'POST',
    data: param,
  });
}

// 删除投诉分类信息
export async function compCategoryDel(param) {
  return request(`/proposal/category/delete?${stringify(param)}`, {
    method: 'GET',
  });
}

// 编辑投诉分类信息
export async function compCategoryUpdate(param) {
  return request(`/proposal/category/edit`, {
    method: 'POST',
    data: param,
  });
}

// 获取投诉分类下拉列表
export async function compCategoryList(param) {
  return request(`/proposal/category/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取投诉分类列表
export async function compCategoryPage(param) {
  return request(`/proposal/category/page?${stringify(param)}`, {
    method: 'GET',
  });
}

// 投诉统计
export async function compCount(param) {
  return request(`/proposal/count?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取详细
export async function compDetail(param) {
  return request(`/proposal/getDetails?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取投诉通知用户列表
export async function compNoticeList(param) {
  return request(`/proposal/getNoticeList?${stringify(param)}`, {
    method: 'GET',
  });
}

// 删除通知人信息
export async function compNoticeDel(param) {
  return request(`/proposal/notice/delete?${stringify(param)}`, {
    method: 'GET',
  });
}

// 新增通知人
export async function compNoticeAdd(param) {
  return request(`/proposal/notice/submit`, {
    method: 'POST',
    data: param,
  });
}

// 查询列表分页
export async function compList(param) {
  return request(`/proposal/page?${stringify(param)}`, {
    method: 'GET',
  });
}

// 回复投诉信息
export async function compReplyAdd(param) {
  return request(`/proposal/reply/submit`, {
    method: 'POST',
    data: param,
  });
}

// 投诉回复统计
export async function compReplyCount(param) {
  return request(`/proposal/replyCount?${stringify(param)}`, {
    method: 'GET',
  });
}

// 更新投诉公示状态
export async function compStatusUpdate(param) {
  return request(`/proposal/updateStatus`, {
    method: 'POST',
    data: param,
  });
}

// 导出投诉信息
export async function compExport(param) {
  return request(`/proposal/export?${stringify(param)}`, {
    method: 'GET',
  });
}