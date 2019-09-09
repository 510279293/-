<template>
  <div>
    <v-dialog
      custom-class="add-notice-dia"
      :title="'添加通知人'"
      :visible.sync="config.visible"
      :width="'600px'"
      :close-on-click-modal="false"
      @close="close"
    >
      <div class="search-box">
        <p class="filter-item">
          <v-input
            v-model="paramData.keyWord"
            class="item-input wid225"
            placeholder="可输入通知人昵称搜索"
          />
          <v-button
            type="primary"
            icon="v-icon-search"
            class="btn-search"
            size=""
            @click="handleCurrentChange(1)"
          />
        </p>
      </div>
      <div class="tab-warp">
        <v-table
          ref="table"
          v-loading="loading"
          class="xf-table"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            type="selection"
            width="55"
          />
          <v-table-column
            type="index"
            width="50"
            label="序号"
          />
          <v-table-column
            prop="nickName"
            label="微信昵称"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.nickName }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            prop="phone"
            label="手机号"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.phone }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            prop="openId"
            label="通知人OpenID"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.openId }}
              </div>
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
      <span
        slot="footer"
        class="dialog-footer"
      >
        <v-button
          type="primary"
          @click="confirm"
        >确定添加</v-button>
        <v-button @click="close">取消</v-button>
      </span>
    </v-dialog>
  </div>
</template>

<script>
import { memberList } from '@/services/member';
import { compNoticeAdd } from '@/services/complain';

export default {
  name: 'Dialog',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          visible: false,
        };
      },
    },
  },
  data() {
    return {
      loading: false,
      selection: [],
      paramData: {
        keyWord: '',
      },
      tableData: [],
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
    };
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    async getMemberList(param) {
      this.loading = true;
      const res = await memberList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async compNoticeAddApi(param={}) {
      const res = await compNoticeAdd(param);
      if (res.success) {
        this.$message.success('添加通知人成功');
        this.$parent.handleSearch && this.$parent.handleSearch();
        this.close();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    close() {
      this.$refs.table.clearSelection();
      this.config.visible = false;
      this.$emit('close');
    },
    confirm() {
      const param = { ids: this.getSelectionIds() };
      this.compNoticeAddApi(param);
    },
    handleSearch() {
      this.getMemberList(Object.assign(this.paramData, this.pages));
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.handleSearch();
    },
    handleCurrentChange(val) {
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.handleSearch();
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selection = val;
    },
    getSelectionIds() {
      const ids = [];
      this.selection.map((value, index) => {
        ids.push(value.id);
      });
      return ids;
    },
  },
};
</script>

<style lang="less" scoped>
.add-notice-dia{
  .search-box{
    display: flex;
    flex-direction: row-reverse;
  }
  .wid225{
    width: 225px;
    margin-right: 12px;
  }
  .tab-warp{
    margin-top:12px;
  }
}
</style>
