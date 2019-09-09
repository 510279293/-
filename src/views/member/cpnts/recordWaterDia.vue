<template>
  <v-dialog
    class="recordWater-dia"
    :title="config.title"
    :close-on-click-modal="false"
    :visible.sync="config.visible"
    @closed="close"
  >
    <div class="card">
      <div class="crad-number">
        <b>会员卡号: {{ config.cardNumber }}</b>
      </div>
      <div>
        <span class="card-nickName">会员昵称：<b>{{ config.nickName }}</b></span>
        <span class="card-phone">手机号：{{ config.phone }}</span>
      </div>
    </div>
    <div class="filter-box">
      <v-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
      />
      <v-button
        type="primary"
        icon="v-icon-search"
        class="btn-search"
        @click="handleSearch"
      />
    </div>
    <div class="table-warp">
      <v-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <tableEmpty slot="empty" />
        <v-table-column
          v-for="(item,idx) in tableColumn"
          :key="idx"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
        >
          <template slot-scope="scope">
            <div v-if="item.prop === 'orderNo'">
              <span
                class="color-blue"
                @click="toOrders(scope.row)"
              >{{ scope.row[item.prop] }}</span>
            </div>
            <div v-else-if="['createTime'].includes(item.prop)">
              {{ scope.row[item.prop] | dateTime }}
            </div>
            <div v-else>
              {{ scope.row[item.prop] || '-' }}
            </div>
          </template>
        </v-table-column>
      </v-table>
      <!--分页组件--S-->
      <pagination
        :current-page.sync="pages.pageNo"
        :page-size="pages.pageSize"
        :total="pages.totalCount"
        @size-change="handleSizeClick"
        @page-change="handlePageClick"
      />
    </div>
    <!-- <div
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        @click="close"
      >
        取消
      </v-button>
      <v-button
        type="primary"
        @click="submit('sure')"
      >
        确定
      </v-button>
    </div> -->
  </v-dialog>
</template>
<script>
import tableColumn from './recordTable';
import { exchangeLogList, integralLogList } from '@/services/member';

export default {
  components: {
  },
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
      tableColumn: tableColumn[0],
      tableData: [],
      dateRange: '',
      paramData: {
        startTime: '',
        endTime: '',
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 20,
      },
    };
  },
  computed: {
  },
  watch: {
    'config.visible'() {
      if (this.config.visible) {
        this.handleSearch();
      }
    },
  },
  mounted() {
    console.log(this.tableColumn);
    this.backPages = JSON.parse(JSON.stringify(this.pages));
    this.backParamData =JSON.parse(JSON.stringify(this.paramData));
  },
  methods: {
    async getExchangeLogList(param) {
      this.loading = true;
      const res = await exchangeLogList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async getIntegralLogList(param) {
      this.loading = true;
      const res = await integralLogList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    submit(str) {
      console.log(str);
    },
    dateChange(val) {
      this.paramData.startTime = val ? val[0] : '';
      this.paramData.endTime = val ? val[1] : '';
    },
    handleSizeClick(val) {
      this.pages.pageSize = val;
      this.handleSearch();
    },
    handlePageClick(val) {
      this.pages.pageNum = val;
      this.handleSearch();
    },
    handleSearch() {
      console.log(this.config.id);
      this.config.title === '兑换记录' ?
        (this.tableColumn = tableColumn[0],
        this.getExchangeLogList(Object.assign({ id: this.config.id }, this.paramData, this.pages))) :
        (this.tableColumn = tableColumn[1],
        this.getIntegralLogList(Object.assign({ id: this.config.id }, this.paramData, this.pages)));
    },
    close() {
      this.$emit('close');
      this.pages = JSON.parse(JSON.stringify(this.backPages));
      this.paramData =JSON.parse(JSON.stringify(this.backParamData));
      this.dateRange = '';
    },
    toOrders(row) {
      const routeUrl = this.$router.resolve({
        path: '/order/detail',
        query: { orderNo: row.orderNo },
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/var.less';
.recordWater-dia{
  .v-dialog__body{
    padding: 0px;
  }
  .card{
    background: #F2F2F2;
    box-sizing: border-box;
    padding:20px 40px;
    margin-top:12px;
    .crad-number{
      font-size:16px;
      font-weight:500;
      color: @color-333;
      margin-bottom: 20px;
    }
    .card-nickName, .card-phone{
      color:@color-666;
      font-size: 14px;
      b{
        color:@color-333;
      }
    }
    .card-phone{
      margin-left:40px;
    }
  }
  .filter-box{
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn-search{
      margin-left:12px;
    }
  }
  .table-warp{
    box-sizing: border-box;
    padding:0px 20px;
    padding-bottom: 40px;
  }
}
</style>
<style lang="less">
.recordWater-dia{
  .v-dialog__body{
    padding: 0px;
  }
}
</style>
