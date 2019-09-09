<template>
  <div
    v-loading="loading"
    class="order-detail"
  >
    <v-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <v-breadcrumb-item :to="{ path: '/order/index' }">
        订单管理
      </v-breadcrumb-item>
      <v-breadcrumb-item>订单详情</v-breadcrumb-item>
    </v-breadcrumb>
    <h3 class="tit">
      订单详情
    </h3>
    <div class="com-ban">
      订单概况
    </div>
    <div class="flex-box">
      <p><span>订单编号：</span>{{ orderInfo.orderNo || '-' }}</p>
      <p><span>订单状态：</span>{{ orderInfo.status || '-' }}</p>
      <p><span>使用积分：</span>{{ orderInfo.useIntegral || '-' }}</p>
      <p><span>下单时间：</span>{{ orderInfo.orderTime | dateTime }}</p>
      <p><span>下单人：</span>{{ orderInfo.ordererName || '-' }}</p>
      <p><span>手机号：</span>{{ orderInfo.phone || '-' }}</p>
    </div>
    <div class="com-ban good-info">
      商品信息
    </div>
    <v-table
      class="xf-table"
      :data="tableData"
      style="width: 100%"
    >
      <tableEmpty slot="empty" />
      <v-table-column
        v-for="(item,idx) in tabDetailColumn"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <div
            v-if="item.prop === 'picUrl'"
            class="table-img"
          >
            <img :src="scope.row.picUrl">
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </v-table-column>
    </v-table>
    <div class="com-ban good-info">
      支付信息
    </div>
    <div class="flex-box">
      <p><span>使用会员积分：</span>{{ orderInfo.useIntegral || 0 }}</p>
    </div>
    <div class="operate">
      <v-button
        v-if="orderInfo.status === '待发货'"
        type="primary"
        @click="handleOperate('send')"
      >
        订单发货
      </v-button>
      <!-- <v-button type="">
        查看物流信息
      </v-button> -->
    </div>
    <sendDia :config="sendDiaConfig" />
  </div>
</template>
<script>
import tab from './tabColumn';
import { orderDetail } from '@/services/order';
import sendDia from './cpnts/sendDia';

export default {
  components: {
    sendDia,
  },
  data() {
    return {
      loading: false,
      orderNo: '',
      tabDetailColumn: tab.tabDetailColumn,
      orderInfo: {},
      tableData: [],
      sendDiaConfig: {
        visible: false,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    console.log(this.orderNo);
    this.getOrderDetail({ orderNum: this.orderNo });
  },
  methods: {
    handleSearch() {
      this.getOrderDetail({ orderNum: this.orderNo });
    },
    async getOrderDetail(param) {
      this.loading = true;
      const res = await orderDetail(param);
      if (res.success) {
        console.log(res);
        this.orderInfo = res.value.data ? res.value.data.orderVO : {};
        this.tableData = res.value.data ? res.value.data.productVOList : [];
      }
      this.loading = false;
    },
    handleOperate(str) {
      Object.assign(this.sendDiaConfig, {
        visible: true,
        orderNo: this.orderNo,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail{
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
    color:#333;
    margin-bottom: 20px;
  }
  .com-ban{
    font-size: 14px;
  }
  .good-info{
    margin:12px 0px;
  }
  .flex-box{
    display: flex;
    flex-wrap: wrap;
    margin-top:20px;
    p{
      width:280px;
      margin-bottom: 20px;
      font-size: 14px;
      color:#333;
      span{
        color:#666;
      }
    }
  }
  .operate{
    margin-top:20px;
  }
  .table-img{
    img{
      width:40px;
      height:40px;
    }
  }
}
</style>
