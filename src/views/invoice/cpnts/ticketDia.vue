<template>
  <v-dialog
    custom-class="ticket-dia"
    :visible.sync="config.visible"
    :width="'400px'"
    :close-on-click-modal="true"
    @close="close"
  >
    <div
      slot="title"
      class="dialog-head"
    >
      <b>收银票详情</b>
    </div>
    <div
      v-loading="loading"
      class="ticket"
    >
      <div class="tick-head">
        <img src="@/assets/img/xfLogo.jpg">
        <div class="t-h-r">
          <h3>Central Plaza</h3>
          <h3>鲜风生活-开封店</h3>
        </div>
      </div>
      <div class="box-1">
        <p class="one-line">
          日期：{{ detailVO.bizTime | dateTime }}
        </p>
        <p>收银单号：{{ detailVO.posId }}</p>
        <p>收银员号：{{ detailVO.receId }}</p>
        <p>会员卡号：{{ detailVO.cardNum }}</p>
      </div>
      <div class="box-2">
        <div class="t-head">
          <p>品名</p>
          <p>数量</p>
          <p>单价</p>
          <p>金额</p>
        </div>
        <div class="t-body">
          <div
            v-for="(item,idx) in voList"
            :key="idx"
            class="tb-list"
          >
            <p>{{ item.productName }}</p>
            <p>{{ item.count }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.amount }}</p>
          </div>
        </div>
      </div>
      <div class="box-3">
        <div class="not-flex">
          <b>品种：{{ detailVO.kindCnt }}</b><b>数量：{{ detailVO.productCnt }}</b>
        </div>
        <p><b>应收：</b><b>{{ detailVO.shouldPay | numberToPrice }}</b></p>
        <!-- <p><b>总计金额：</b><b>¥ {{}}</b></p> -->
        <p><b>实付金额：</b><b>{{ detailVO.realPay | numberToPrice }}</b></p>
        <!-- <p><b>找零：</b><b>¥ 9.20</b></p> -->
        <!-- <p><b>卡内余额：0.00</b></p> -->
        <!-- <div class="not-flex">
          <b>本笔积分：12.50</b><b>可用积分：1234.50</b>
        </div> -->
        <!-- <div class="not-flex">
          <b>注：可用积分不包含当日未入账积分</b>
        </div> -->
        <div class="qr-code">
          <img>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import { receiptDetail } from '@/services/invoice';

export default {
  components: {
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          visible: true,
        };
      },
    },
  },
  data() {
    return {
      loading: false,
      detailVO: {},
      voList: [],
    };
  },
  computed: {
  },
  watch: {
    'config.visible'(val) {
      if (val) {
        this.getReceiptDetail({ receiptNo: this.config.receiptNo });
      }
    },
  },
  mounted() {},
  methods: {
    async getReceiptDetail(param) {
      this.loading = true;
      const res = await receiptDetail(param);
      if (res.success) {
        console.log(res);
        this.detailVO = res.value.data.detailVO || {};
        this.voList = res.value.data.voList || [];
      }
      this.loading = false;
    },
    close() {
      this.config.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.ticket-dia{
  .dialog-head{
    text-align: center;
    b{
      font-size: 16px;
      color:#333333b0;
    }
  }
.ticket{
  .tick-head{
    border-bottom: 1px solid #CCCCCC;
    display: flex;
    align-items: center;
    img{
      width:80px;
      height:80px;
      margin-right: 28px;
    }
    .t-h-r{
      h3{
        font-size: 16px;
        margin-bottom: 8px;
      }
    }
  }
  .box-1{
    p{
      font-size:14px;
      color:#333;
      font-weight:400;
      width: 50%;
      display: inline-block;
      margin-top:16px;
    }
    .one-line{
      width:100%;
    }
  }
  .box-2{
    margin-top:20px;
    .t-head,.tb-list{
      display: flex;
      font-size: 14px;
      p:nth-of-type(1){
        width:162px;
        box-sizing: border-box;
        padding-right:45px;
      }
      p:nth-of-type(2){
        width:70px;
      }
      p:nth-of-type(3){
        width:90px;
      }
    }
    .t-head{
      border-bottom: 1px dashed #CCCCCC;
      p{
        font-weight: 600;
        margin-bottom: 16px;
      }
    }
    .t-body{
      border-bottom: 1px dashed #CCCCCC;
      padding-bottom: 12px;
      p{
        margin-top: 12px;
      }
    }
  }
  .box-3{
    .not-flex{
      margin-top:18px;
      b{
        display: inline-block;
        margin-right:50px;
      }
    }
    p{
      display: flex;
      justify-content: space-between;
      padding-top:12px;
    }
    .qr-code{
      text-align: center;
    }
  }
  .tick-head,.box-1,.box-2,.box-3{
    box-sizing: border-box;
    padding:0px 12px;
  }
}
}
</style>
<style lang="less">
.ticket-dia{
  .v-dialog__header{
    border-bottom: none;
  }
  .v-dialog__body{
    padding:0px;
  }
}
</style>
