<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="premission-role"
    >
      <div>
        <v-button
          v-if="hasAuthor('role:add')"
          type="primary"
          class="add-btn"
          @click="showAddRoleDia('add',null)"
        >
          添加角色
        </v-button>
      </div>
      <div>
        <v-table
          v-loading="loading"
          class="xf-table"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            type="index"
            width="50"
            label="序号"
          />
          <v-table-column
            v-for="(item,idx) in roleTabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'createTime'">
                {{ scope.row[item.prop] | dateTime }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] || '-' }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                v-if="hasAuthor('role:edit')"
                class="color-blue"
                @click="showAddRoleDia('edit',scope.row)"
              >编辑</span>
              <span
                v-if="hasAuthor('role:grant')"
                class="color-blue"
                @click="toAuthor(scope.row)"
              >授权</span>
              <span
                v-if="hasAuthor('role:delete')"
                class="color-blue"
                @click="showDelDia(scope.row)"
              >删除</span>
            </template>
          </v-table-column>
        </v-table>
        <pagination
          :current-page.sync="pages.pageNum"
          :page-size="pages.pageSize"
          :total="pages.totalCount"
          @size-change="handleSizeChange"
          @page-change="handleCurrentChange"
        />
      </div>
      <addRoleDia
        :config="addRoleConfig"
        @close="addRoleDiaClose"
      />
      <Dialog
        :config="dialogConfig"
        @close="closeDialog"
        @sure="sureDelRole"
      />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import addRoleDia from './cpnts/addRoleDia';
import { rolePage, roleDel } from '@/services/permission';

export default {
  components: {
    addRoleDia,
  },
  data() {
    return {
      roleTabColumn: tab.roleTabColumn,
      tableData: [],
      loading: false,
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      addRoleConfig: {
        visible: false,
        title: '添加角色',
      },
      dialogConfig: {
        visible: false,
        title: '删除角色',
        content: '删除后，绑定该角色的用户将不再拥有此角 色的权限。确定删除吗？',
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    console.log(this.userTabColumn);
    this.getRoleList(this.pages);
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getRoleList(param=this.pages) {
      this.loading = true;
      const res = await rolePage(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async roleDelApi(param) {
      const res = await roleDel(param);
      console.log(res);
      if (res.success) {
        this.$message.success('删除成功');
        this.closeDialog();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    showAddRoleDia(str, row) {
      if (str === 'add') {
        Object.assign(this.addRoleConfig, {
          title: '添加角色',
          row: false,
        });
      } else {
        Object.assign(this.addRoleConfig, {
          title: '编辑角色',
          row: row,
        });
      }
      this.addRoleConfig.visible = true;
    },
    addRoleDiaClose() {
      this.addRoleConfig.visible = false;
    },
    showDelDia(row) {
      this.dialogConfig.visible = true;
      this.delRow = row;
    },
    closeDialog() {
      this.dialogConfig.visible = false;
      this.getRoleList();
    },
    toAuthor(row) {
      this.$router.push({ path: '/permission/author', query: { roleId: row.id, roleName: row.roleName } });
    },
    sureDelRole() {
      this.roleDelApi({ roleId: this.delRow.id });
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.getRoleList(this.pages);
    },
    handleCurrentChange(val) {
      console.log(val);
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.getRoleList(this.pages);
    },
  },
};
</script>

<style lang="less" scoped>
.premission-role{
  box-sizing: border-box;
  padding:20px;
  .add-btn{
    margin-bottom: 12px;
  }
}
</style>
