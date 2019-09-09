import { stringify } from '@fe/common-utils';
// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';
/* eslint-disable */
/**
 * @param {Object} param
 *
 */
// 添加角色
export async function roleAdd(param) {
  return request(`/role/add`, {
    method: 'POST',
    data: param,
  });
}

// 删除角色
export async function roleDel(param) {
  return request(`/role/delete?${stringify(param)}`, {
    method: 'GET',
  });
}

// 编辑角色
export async function roleEdit(param) {
  return request(`/role/edit`, {
    method: 'POST',
    data: param,
  });
}

// 角色授权
export async function roleGrant(param) {
  return request(`/role/grant`, {
    method: 'POST',
    data: param,
  });
}

// 获取全部角色列表
export async function roleList(param) {
  return request(`/role/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 分页获取角色列表
export async function rolePage(param) {
  return request(`/role/list/page?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取权限列表
export async function permissionList(param) {
  return request(`/role/permission/list?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取某个角色的权限
export async function permissionListById(param) {
  return request(`/role/permission/listByRoleId?${stringify(param)}`, {
    method: 'GET',
  });
}

// 用户删除
export async function userDel(param) {
  return request(`/user/delete?${stringify(param)}`, {
    method: 'GET',
  });
}

// 用户详情
export async function userInfo(param) {
  return request(`/user/get?${stringify(param)}`, {
    method: 'GET',
  });
}

// 用户列表
export async function userList(param) {
  return request(`/user/list/page?${stringify(param)}`, {
    method: 'GET',
  });
}

// 用户登录
export async function userLogin(param) {
  return request(`/user/login`, {
    method: 'POST',
    data: param,
  });
}

// 注册用户
export async function userRegister(param) {
  return request(`/user/register`, {
    method: 'POST',
    data: param,
  });
}

// 编辑用户
export async function userUpdate(param) {
  return request(`/user/update`, {
    method: 'POST',
    data: param,
  });
}

// 修改用户密码
export async function userUpadtePwd(param) {
  return request(`/user/updatePwd`, {
    method: 'POST',
    data: param,
  });
}

// 忘记密码
export async function userForgetPwd(param) {
  return request(`/user/forgetPwd`, {
    method: 'POST',
    data: param,
  });
}

// 获取验证码
export async function getVerifyCode(param) {
  return request(`/user/getVerifyCode?${stringify(param)}`, {
    method: 'GET',
  });
}

// 获取用户权限
export async function getCurAuthor(param) {
  return request(`/user/getPms?${stringify(param)}`, {
    method: 'GET',
  });
}
