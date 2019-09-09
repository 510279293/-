<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="premission-user"
    >
      <div>
        <v-button
          v-if="hasAuthor('user:add')"
          type="primary"
          class="add-btn"
          @click="showAddUserDia('add', false)"
        >
          添加用户
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
            v-for="(item,idx) in userTabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'roleName'">
                {{ scope.row[item.prop].join(',') || '-' }}
              </div>
              <div v-else-if="item.prop === 'createTime'">
                {{ scope.row[item.prop] | dateTime }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] || '-' }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            min-width="100"
          >
            <template slot-scope="scope">
              <span
                v-if="hasAuthor('user:edit')"
                class="color-blue"
                @click="showAddUserDia('edit', scope.row)"
              >编辑</span>
              <span
                v-if="hasAuthor('user:delete')"
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
      <addUserDia
        :config="addUserConfig"
        @close="addUserDiaClose"
      />
      <Dialog
        :config="dialogConfig"
        @sure="sureDel"
        @close="closeDialog"
      />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import addUserDia from './cpnts/addUserDia';
import { userList, userDel } from '@/services/permission';

export default {
  components: {
    addUserDia,
  },
  data() {
    return {
      userTabColumn: tab.userTabColumn,
      addUserConfig: {
        visible: false,
        title: '添加用户',
      },
      tableData: [],
      loading: false,
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      dialogConfig: {
        visible: false,
        title: '删除用户',
        content: '确定删除该用户吗？',
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    console.log(this.userTabColumn);
    this.getUserList(this.pages);
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getUserList(param = this.pages) { // 获取用户列表
      this.loading = true;
      const res = await userList(param);
      if (res.success) {
        console.log(res);
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async userDelApi(param) { // 删除用户 Api
      const res = await userDel(param);
      if (res.success) {
        this.$message.success('删除成功');
        this.closeDialog();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    showAddUserDia(str, row) { // 弹出(添加|编辑)用户弹窗
      if (str === 'edit') {
        Object.assign(this.addUserConfig, {
          title: '编辑用户',
          type: 'edit',
          row: row,
        });
      } else {
        Object.assign(this.addUserConfig, {
          title: '添加用户',
          type: 'add',
          row: row,
        });
      }
      this.addUserConfig.visible = true;
    },
    addUserDiaClose() {
      this.addUserConfig.visible = false;
    },
    closeDialog() {
      this.dialogConfig.visible = false;
      this.getUserList(this.pages);
    },
    showDelDia(row) {
      this.delRow = row;
      this.dialogConfig.visible = true;
    },
    sureDel() {
      this.userDelApi({ userId: this.delRow.userId });
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.getUserList(this.pages);
    },
    handleCurrentChange(val) {
      console.log(val);
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.getUserList(this.pages);
    },
  },
};
</script>

<style lang="less" scoped>
.premission-user{
  box-sizing: border-box;
  padding:20px;
  .add-btn{
    margin-bottom: 12px;
  }
}
</style>
