<template>
  <div class="author">
    <v-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <v-breadcrumb-item :to="{ path: '/permission/role' }">
        角色管理
      </v-breadcrumb-item>
      <v-breadcrumb-item>授权</v-breadcrumb-item>
    </v-breadcrumb>
    <div v-loading="loading">
      <div class="author-tit">
        角色授权
      </div>
      <div class="author-item">
        <span class="item-name">角色名称：</span>
        <span class="item-body">{{ roleName }}</span>
      </div>
      <div class="author-item">
        <span class="item-name">选择权限：</span>
        <div class="item-body body-table">
          <div
            v-for="(item,idx) in newPermissionList"
            :key="idx"
            class="author-list"
          >
            <div class="list-left">
              <v-checkbox
                v-model="item.checkAll"
                :indeterminate="item.isIndeterminate"
                @change="handleCheckAllChange($event,item)"
              >
                {{ item.name }}
              </v-checkbox>
            </div>
            <div class="list-right">
              <v-checkbox-group
                v-model="item.checks"
                @change="handleCheckedChange($event,item)"
              >
                <v-checkbox
                  v-for="(funcItem) in item.children"
                  :key="funcItem.id"
                  class="mar-r30"
                  :label="funcItem.id"
                >
                  {{ funcItem.name }}
                </v-checkbox>
              </v-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <v-button
          type="primary"
          class="add-btn"
          @click="updateGrant"
        >
          保 存
        </v-button>
        <v-button
          type=""
          class="add-btn"
        >
          取消
        </v-button>
      </div>
    </div>
  </div>
</template>
<script>
import { permissionListById, permissionList, roleGrant } from '@/services/permission';
// import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      roleName: '',
      newPermissionList: [],
      curRolePermission: [],
    };
  },
  computed: {
    // permissionList(){
    //   this.newPermissionList = this.initPermissionList(this.$store.getters.permissionList)
    //   // console.log(this.curRolePermission)
    //   return this.newPermissionList
    // }
  },
  watch: {},
  mounted() {
    this.roleId = this.$route.query.roleId;
    this.roleName = this.$route.query.roleName;
    // this.getPermissionListById({ roleId: this.roleId });
    this.initGetRoleAuthor();
  },
  methods: {
    // async getPermissionListById(param) {
    //   const res = await permissionListById(param);
    //   if (res.success) {
    //     this.curRolePermission = this.handleRoleHasPermission(res.value.data)
    //   } else {
    //     this.$message.error(res.codeDesc);
    //   }
    // },
    async roleGrantApi(param={}) {
      const res = await roleGrant(param);
      if (res.success) {
        this.$message.success('角色授权成功!');
        this.$store.dispatch('getCurUserAuthor');
        this.initGetRoleAuthor();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async initGetRoleAuthor() {
      this.loading = true;
      const res1 = await permissionList({});
      const res2 = await permissionListById({ roleId: this.roleId });
      // console.log(res1,res2)
      this.newPermissionList = this.initPermissionList(res1.value.data);
      this.curRolePermission = this.handleRoleHasPermission(res2.value.data);
      this.initCheckUserPermission(this.newPermissionList, this.curRolePermission);
      this.loading = false;
    },
    handleCheckAllChange(val, item) {
      console.log(val, item);
      item.checks = val ? this.getIdsByItem(item) : [];
      item.isIndeterminate = false;
    },
    handleCheckedChange(value, item) {
      console.log(value, item);
      const checkedCount = value.length;
      item.checkAll = checkedCount > 0 ? checkedCount === item.children.length : true;
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.children.length;
    },
    initPermissionList(data=[]) { // 初始化权限列表
      const newData = JSON.parse(JSON.stringify(data));
      newData.map((v, i) => {
        v.checkAll = false;
        v.isIndeterminate = false;
        v.checks = [];
      });
      return newData;
    },
    getIdsByItem(item) {
      const ids = [];
      (item.children || []).map((v, i) => {
        ids.push(v.id);
      });
      return ids;
    },
    handleRoleHasPermission(data=[]) { // 处理当前角色已有的权限
      const arr = [];
      data.map((v, i) => {
        const obj = {
          id: v.id,
          checks: this.getIdsByItem(v),
        };
        arr.push(obj);
      });
      return arr;
    },
    initCheckUserPermission(allPermission=[], userPermission=[]) { // 将当前角色权限与权限列表整合
      userPermission.map((v, i) => {
        const cur = allPermission.filter((ele, idx) => v.id === ele.id)[0];
        // console.log(cur)
        cur.checks = v.checks;
        cur.checkAll = cur.checks.length > 0 ? cur.checks.length === cur.children.length : true;
        cur.isIndeterminate = cur.checks.length > 0 && cur.checks.length < cur.children.length;
      });
    },
    updateGrant() {
      const roleId = this.roleId;
      const permissionIds = this.getSubmitParam();
      console.log(permissionIds);
      this.roleGrantApi({ roleId, permissionIds });
    },
    getSubmitParam() { // 获取提交需要的参数
      const ids = [];
      this.newPermissionList.map((v, i) => {
        if (v.checkAll) {
          ids.push(v.id, ...v.checks);
        } else {
          v.isIndeterminate ? ids.push(v.id, ...v.checks) : null;
        }
      });
      return ids;
    },
  },
};
</script>

<style lang="less" scoped>
.author{
  box-sizing: border-box;
  padding:20px;
  position: relative;
  margin-top:16px;
  .breadcrumb{
    position: absolute;
    top: -24px;
    left: 0px;
    font-size: 12px;
  }
  .author-tit{
    font-size: 16px;
    color:#333;
    margin-bottom: 12px;
  }
  .author-item{
    margin-top:20px;
    display: flex;
    .item-name,.item-body{
      font-size: 14px;
      color:#333;
      margin-right: 8px;
    }
    .body-table{
      border:1px solid #CCCCCC;
      .author-list{
        display: flex;
        &:nth-of-type(2n+1){
          background: #F7F7F7;
        }
        .list-left{
          width:168px;
          min-width: 168px;
          padding: 14px 20px;
          border-right:1px solid #CCCCCC;
        }
        .list-right{
          padding: 14px 20px;
          display: flex;
          flex-wrap: wrap;
          .mar-r30{
            margin-right:50px;
          }
        }
      }
    }
  }
  .foot{
    margin-top:20px;
    box-sizing: border-box;
    padding-left:78px;
  }
}
</style>
