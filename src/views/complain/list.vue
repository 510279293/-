<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="complain-list"
    >
      <div class="filter-box">
        <p class="filter-item mar-r30">
          <span class="item-name">投诉编号</span>
          <v-input
            v-model="paramData.number"
            class="item-input wid225"
            placeholder="请输入内容"
          />
        </p>
        <!-- <p class="filter-item mar-r30">
          <span class="item-name">投诉人手机号</span>
          <v-input
            v-model="paramData.input2"
            class="item-input wid225"
            placeholder="请输入内容"
          />
        </p> -->
        <p class="filter-item mar-r30">
          <span class="item-name">投诉类型</span>
          <v-select
            v-model="paramData.categoryId"
            class="wid225"
            placeholder="请选择"
          >
            <v-option
              v-for="item in cateGoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </v-select>
        </p>
        <p class="filter-item mar-r30">
          <span class="item-name">所投诉门店</span>
          <v-select
            v-model="paramData.storeId"
            class="wid225"
            placeholder="请选择"
          >
            <v-option
              v-for="item in storeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </v-select>
        </p>
        <p class="filter-item mar-r20 mar-t20">
          <span class="item-name">投诉时间</span>
          <v-date-picker
            v-model="complainDate"
            class="wid300"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="complainDateChange"
          />
        </p>
        <p class="filter-item mar-r20 mar-t20">
          <v-button
            type="primary"
            @click="handleCurrentChange(1)"
          >
            搜索
          </v-button>
          <v-button
            type=""
            @click="resetParam"
          >
            重置
          </v-button>
          <v-button
            type=""
            @click="showExportDia"
          >
            导出报表
          </v-button>
        </p>
      </div>
      <div>
        <v-tabs
          v-model="paramData.type"
          class="mar-t20"
          @tab-click="handleClick"
        >
          <v-tab-pane
            label="未公示的投诉"
            name="0"
          />
          <v-tab-pane
            label="已公示的投诉"
            name="1"
          />
        </v-tabs>
        <v-table
          v-loading="loading"
          class="xf-table"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            v-for="(item,idx) in tabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'isPublic'">
                {{ scope.row.isPublic ? '已公示' : '未公示' }}
              </div>
              <div v-else-if="item.prop === 'isReply'">
                {{ scope.row.isReply ? '已回复' : '未回复' }}
              </div>
              <div v-else-if="['createTime'].includes(item.prop)">
                {{ scope.row[item.prop] | dateTime }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] || '-' }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            fixed="right"
            min-width="140"
          >
            <template slot-scope="scope">
              <span
                v-if="hasAuthor('complain:detail')"
                class="color-blue"
                @click="handleOperate('detail',scope.row)"
              >详情</span>
              <span
                v-if="hasAuthor('complain:publicity')"
                class="color-blue"
                @click="handleOperate('send',scope.row)"
              >{{ scope.row.isPublic ? '取消公示' : '公示' }}</span>
              <span
                v-if="hasAuthor('complain:submit') && !scope.row.isReply"
                class="color-blue"
                @click="handleOperate('logistics',scope.row)"
              >回复</span>
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
      <Dialog
        :config="dialogConfig"
        @close="closeDialog"
      />
      <replyDia :config="replyDiaConfig" />
      <exportDia :config="exportDiaConfig" />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import replyDia from './cpnts/replyDia';
import exportDia from './cpnts/exportDia';
import { compList, compCategoryList, compStatusUpdate } from '@/services/complain';
import { contactList } from '@/services/contact';

export default {
  components: {
    replyDia,
    exportDia,
  },
  data() {
    return {
      loading: false,
      tabColumn: tab.list,
      tableData: [{}],
      paramData: {
        number: '',
        categoryId: '',
        storeId: '',
        startTime: '',
        endTime: '',
        type: '0',
      },
      complainDate: '',
      cateGoryOptions: [{ id: '', name: '全部' }],
      storeOptions: [{ id: '', name: '全部' }],
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      dialogConfig: {
        visible: false,
      },
      replyDiaConfig: {
        visible: false,
        options: [],
      },
      exportDiaConfig: {
        visible: false,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.backParamData = JSON.parse(JSON.stringify(this.paramData));
    this.contactListApi();
    this.compCategoryListApi();
    this.handleSearch();
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async compListApi(param) {
      this.loading = true;
      const res = await compList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async contactListApi(param={}) {
      const res = await contactList(param);
      if (res.success) {
        this.storeOptions = this.storeOptions.concat(...res.value.data);
      }
    },
    async compCategoryListApi(param={}) {
      const res = await compCategoryList(param);
      if (res.success) {
        this.cateGoryOptions = this.cateGoryOptions.concat(...res.value.data);
        this.replyDiaConfig.options = res.value.data;
      }
    },
    async compStatusUpdateApi(param={}) {
      const res = await compStatusUpdate(param);
      if (res.success) {
        this.$message.success(`${param.status ? '' : '取消'}公示成功!`);
        this.closeDialog();
        this.handleSearch();
      } else {
        this.$message.error(`${param.status ? '' : '取消'}公示失败!`);
      }
    },
    handleSearch() {
      this.compListApi(Object.assign(this.paramData, this.pages));
    },
    handleClick(tab, event) {
      this.handleSearch();
    },
    handleOperate(str, row) {
      if (str === 'send') {
        this.isPublicParam = { proposalId: row.id, status: row.isPublic ? 0 : 1 };
        Object.assign(this.dialogConfig, {
          visible: true,
          title: `${row.isPublic ? '取消' : ''}公示`,
          content: `${row.isPublic ? '取消公示后，投诉内容不会对全部顾客可见。确定取消公示吗？' :
            '公示后，投诉内容将对全部顾客可见。确定公示吗？'}`,
          callBack: () => {
            return this.compStatusUpdateApi(this.isPublicParam);
          },
        });
      }
      if (str === 'logistics') {
        Object.assign(this.replyDiaConfig, {
          visible: true,
          proposalId: row.id,
        });
      }
      if (str === 'detail') {
        this.$router.push({ path: '/complain/detail', query: { proposalId: row.id } });
      }
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
    showExportDia() {
      const { number, categoryId, storeId } = this.paramData;
      const category = this.cateGoryOptions.filter((item) => item.id.toString() === categoryId.toString())[0].name;
      const store = this.storeOptions.filter((item) => item.id.toString() === storeId.toString())[0].name;
      const time = this.paramData.startTime ? `${this.paramData.startTime} ~ ${this.paramData.endTime}` : '全部';
      Object.assign(this.exportDiaConfig, {
        visible: true,
        showObj: { number, category, store, time },
        paramData: this.paramData,
      });
    },
    complainDateChange(val) {
      this.paramData.startTime = val ? val[0] : '';
      this.paramData.endTime = val ? val[1] : '';
      // this.handleSearch()
    },
    resetParam() {
      this.paramData = JSON.parse(JSON.stringify(this.backParamData));
      this.complainDate = '';
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
.complain-list{
  box-sizing: border-box;
  padding:20px;
  .wid225{
    width:225px;
  }
  .wid300{
    width:300px;
  }
  .filter-item{
    margin-bottom: 20px;
  }
}
</style>
