<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="smallInvoice"
    >
      <div class="filter-box">
        <p class="filter-item mar-r30">
          <span class="item-name">小票编号</span>
          <v-input
            v-model="paramData.receiptNo"
            class="wid225"
            placeholder="请输入"
          />
        </p>
        <p class="filter-item mar-r20">
          <span class="item-name">开具发票时间</span>
          <v-date-picker
            v-model="receiptDate"
            class="wid300"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="receiptDateChange"
          />
        </p>
        <p>
          <v-button
            type="primary"
            @click="handleSearch"
          >
            搜索
          </v-button>
          <v-button
            type=""
            @click="resetParam"
          >
            重置
          </v-button>
        </p>
      </div>
      <div
        v-if="hasAuthor('receipt:input')"
        class="add-btn"
      >
        <v-button
          type="primary"
          @click="showEntryTicketDia"
        >
          录入小票
        </v-button>
        <v-tooltip
          class="item"
          effect="dark"
          content="录入已开发票的小票"
          placement="top"
        >
          <i class="v-icon-question color999" />
        </v-tooltip>
      </div>
      <div class="tab-div">
        <v-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            prop="receiptNo"
            label="小票编号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.receiptNo || '-' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="amount"
            label="金额"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.amount | numberToPrice }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="status"
            label="开具发票情况"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.status ? '已开发票' : '未开发票' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="way"
            label="开具发票方式"
          >
            <template slot-scope="scope">
              <div>{{ wayMap[scope.row.way] }} </div>
            </template>
          </v-table-column>
          <v-table-column
            prop="createTime"
            label="开具发票时间"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.createTime | dateTime }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="name"
            label="操作"
          >
            <template slot-scope="scope">
              <span
                class="color-blue"
                @click="showTicketDia(scope.row)"
              >小票详情</span>
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
      <ticketDia :config="ticketDiaConfig" />
      <entryTicket :config="entryTicketConfig" />
    </div>
  </div>
</template>
<script>
import ticketDia from './cpnts/ticketDia';
import entryTicket from './cpnts/entryTicket';
import { receiptList } from '@/services/invoice';

export default {
  components: {
    ticketDia,
    entryTicket,
  },
  data() {
    return {
      loading: false,
      wayMap: ['-', '线上', '线下'],
      ticketDiaConfig: {
        visible: false,
      },
      entryTicketConfig: {
        visible: false,
      },
      tableData: [],
      receiptDate: '',
      paramData: {
        billNo: '',
        startTime: '',
        endTime: '',
      },
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.backParamData = JSON.parse(JSON.stringify(this.paramData));
    this.handleSearch();
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getReceiptList(param) {
      this.loading = true;
      const res = await receiptList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    showEntryTicketDia() {
      this.entryTicketConfig.visible = true;
    },
    showTicketDia(row) {
      this.ticketDiaConfig.visible = true;
      this.ticketDiaConfig.receiptNo = row.receiptNo;
    },
    handleSearch() {
      this.getReceiptList(Object.assign(this.paramData, this.pages));
    },
    resetParam() {
      this.receiptDate = '';
      this.paramData = JSON.parse(JSON.stringify(this.backParamData));
    },
    receiptDateChange(val) {
      Object.assign(this.paramData, {
        startTime: val ? val[0] : '',
        endTime: val ? val[1] : '',
      });
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
.smallInvoice{
   box-sizing: border-box;
   padding:20px;
  .wid225{
     width:225px;
   }
   .wid300{
     width:300px;
   }
   .color999{
     color:#999;
     margin-left:12px;
   }
  .filter-box{
     display: flex;
     .mar-r30{
        margin-right:30px;
        }
        .mar-r20{
          margin-right:20px;
        }
     .filter-item{
       .item-name{
         color:#333;
         font-size: 14px;
         margin-right:10px;
       }
     }
   }
   .add-btn{
     margin-top:20px;
    //  margin-bottom: 12px;
   }
   .tab-div{
     margin-top:12px;
   }
}

</style>
