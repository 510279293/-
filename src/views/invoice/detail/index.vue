<template>
  <div
    v-loading="loading"
    class="invoice-detail"
  >
    <v-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <v-breadcrumb-item :to="{ path: '/invoice/info' }">
        发票信息
      </v-breadcrumb-item>
      <v-breadcrumb-item>开票详情</v-breadcrumb-item>
    </v-breadcrumb>
    <h3 class="tit">
      开票详情
    </h3>
    <div class="">
      <div class="com-ban">
        开票概况
      </div>
      <div class="span-box">
        <p><span>发票编号：</span>{{ billVO.billNo || '-' }}</p>
        <p><span>发票抬头：</span>{{ billVO.billTitle || '-' }}</p>
        <p><span>税号：</span>{{ billVO.taxId || '-' }}</p>
        <p><span>开票时间：</span>{{ billVO.createTime | dateTime }}</p>
        <p><span>开票人：</span>{{ billVO.bookerName || '-' }}</p>
        <p><span>手机号：</span>{{ billVO.bookerTel || '-' }}</p>
        <p><span>开票金额：</span>{{ billVO.billAmount | numberToPrice }}</p>
        <p><span>税额：</span>{{ billVO.taxAmount | numberToPrice }}</p>
      </div>
    </div>
    <div class="com-ban">
      所包含小票
    </div>
    <div>
      <v-table
        :data="tableData"
        style="width: 100%;margin-top:20px;"
      >
        <tableEmpty slot="empty" />
        <v-table-column
          prop="receiptNo"
          label="票号"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.receiptNo || '-' }}</div>
          </template>
        </v-table-column>
        <v-table-column
          prop="createTime"
          label="开票时间"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.createTime | dateTime }}</div>
          </template>
        </v-table-column>
        <v-table-column
          prop="shopName"
          label="门店"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.shopName || '-' }}</div>
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
          prop="name"
          label="操作"
        >
          <template slot-scope="scope">
            <span
              class="color-blue"
              @click="showTicketDia(scope.row)"
            >小票详情 </span>
          </template>
        </v-table-column>
      </v-table>
    </div>
    <ticketDia :config="ticketDiaConfig" />
  </div>
</template>
<script>
import ticketDia from '../cpnts/ticketDia';
import { billDetail } from '@/services/invoice';

export default {
  components: {
    ticketDia,
  },
  data() {
    return {
      loading: false,
      ticketDiaConfig: {
        visible: false,
      },
      billVO: {},
      tableData: [],
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.billNo = this.$route.query.billNo;
    this.getBillDetail({ billNo: this.billNo });
  },
  methods: {
    async getBillDetail(param) {
      this.loading = true;
      const res = await billDetail(param);
      if (res.success) {
        this.billVO = res.value.data.billVO;
        this.tableData = res.value.data.receiptVOS;
      }
      this.loading = false;
    },
    showTicketDia(row) {
      this.ticketDiaConfig.visible = true;
      this.ticketDiaConfig.receiptNo = row.receiptNo;
    },
  },
};
</script>

<style lang="less" scoped>
.invoice-detail{
  position: relative;
  box-sizing: border-box;
  padding:20px;
  margin-top:16px;
  .breadcrumb{
    position: absolute;
    top: -24px;
    left: 0px;
    font-size: 12px;
  }
  .tit{
    font-size: 16px;
    font-weight: 400;
    color:#333;
    margin-bottom: 20px;
  }
  .span-box{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    p{
      width:276px;
      font-size: 14px;
      margin-bottom: 20px;
      span{
        color:#666;
      }
    }
  }
}
</style>
