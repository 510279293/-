<template>
  <div>
    <noPermission v-if="false" />
    <div class="complain-notice">
      <div class="filter-box">
        <p class="filter-item">
          <v-button
            type="primary"
            @click="showAddNoticeDia"
          >
            添加通知人
          </v-button>
        </p>
        <p class="filter-item">
          <v-input
            v-model="paramData.nickName"
            class="wid225 mar-r12"
            placeholder="可输入通知人昵称搜索"
          />
          <!-- <v-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </v-select> -->
          <v-button
            type="primary"
            icon="v-icon-search"
            class="btn-search"
            size=""
            @click="handleCurrentChange(1)"
          />
        </p>
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
          />
          <v-table-column
            v-for="(item,idx) in tabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row[item.prop] }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            min-width="40"
          >
            <template slot-scope="scope">
              <span
                class="color-blue"
                @click="handleOperate('del',scope.row)"
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
      <addNoticeDia :config="addNoticeDiaConfig" />
      <Dialog
        :config="dialogConfig"
        @close="closeDialog"
      />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import addNoticeDia from './cpnts/addNoticeDia';
import { compNoticeList, compNoticeDel } from '@/services/complain';

export default {
  components: {
    addNoticeDia,
  },
  data() {
    return {
      tabColumn: tab.notice,
      tableData: [{}],
      loading: false,
      paramData: {
        nickName: '',
      },
      options: [],
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      addNoticeDiaConfig: {
        visible: false,
      },
      dialogConfig: {
        visible: false,
        title: '删除通知人',
        content: '确定删除该通知人吗？',
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    async compNoticeListApi(param={}) {
      this.loading = true;
      const res = await compNoticeList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async compNoticeDelApi(param={}) {
      const res = await compNoticeDel(param);
      if (res.success) {
        this.$message.success(`删除成功!`);
        this.closeDialog();
        this.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    handleOperate(str, row) {
      if (str === 'del') {
        const delParam = { noticeId: row.id };
        Object.assign(this.dialogConfig, {
          visible: true,
          callBack: () => {
            return this.compNoticeDelApi(delParam);
          },
        });
      }
    },
    showAddNoticeDia() {
      Object.assign(this.addNoticeDiaConfig, {
        visible: true,
      });
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
    handleSearch() {
      this.compNoticeListApi(Object.assign(this.paramData, this.pages));
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
  },
};
</script>

<style lang="less" scoped>
.complain-notice{
  box-sizing: border-box;
  padding:20px;
  .filter-box{
    display: flex;
    justify-content: space-between;
  }
  .mar-r12{
    margin-right: 12px;
  }
  .wid300{
    width:300px;
  }
  .wid225{
    width:225px;
  }
  .filter-item{
    margin-bottom: 20px;
  }
}
</style>
