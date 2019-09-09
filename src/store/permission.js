//  用户权限store
import { permissionList, getCurAuthor } from '@/services/permission';
import { getAllAuthorCodeArr } from '@/utils/index';

const permission = {
  state: {
    permissionList: [],
    curUserAuthor: [],
    curUserAuthorArr: [],
  },
  getters: {
    permissionList: (state) => {
      return state.permissionList;
    },
    curUserAuthor: (state) => {
      return state.curUserAuthor;
    },
    curUserAuthorArr: (state) => {
      return state.curUserAuthorArr;
    },
  },
  actions: {
    // 获取当前权限数据
    async getAllPermissionList({ commit }, data) {
      const response = await permissionList(data);
      if (response.success) {
        commit({
          type: 'saveAllPermissionList',
          permissionList: response.value.data || [],
        });
      }
    },
    // 获取当前用户权限
    async getCurUserAuthor({ commit }, data) {
      const response = await getCurAuthor(data);
      if (response.success) {
        const arr = getAllAuthorCodeArr(response.value.data || []);
        commit({
          type: 'saveCurUserAuthor',
          curUserAuthor: response.value.data || [],
        });
        commit({
          type: 'saveCurUserAuthorArr',
          curUserAuthorArr: arr,
        });
      }
    },
  },
  mutations: {
    saveAllPermissionList(state, { permissionList }) {
      state.permissionList = permissionList;
    },
    saveCurUserAuthor(state, { curUserAuthor }) {
      state.curUserAuthor = curUserAuthor;
    },
    saveCurUserAuthorArr(state, { curUserAuthorArr }) {
      state.curUserAuthorArr = curUserAuthorArr;
    },
  },
};

export default permission;
