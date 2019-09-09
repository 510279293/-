<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="data-view"
    >
      <h3 class="tit">
        今日数据统计
      </h3>
      <div class="card-warps">
        <div class="card-item">
          <i class="iconfont icon-zhuce" />
          <div class="card-div">
            <p class="div-txt">
              注册人数
            </p>
            <p class="div-num">
              {{ numObj.registerCnt || 0 }}
            </p>
          </div>
        </div>
        <div class="card-item">
          <i class="iconfont icon-ren" />
          <div class="card-div">
            <p class="div-txt">
              访问人数
            </p>
            <p class="div-num">
              {{ numObj.visitCnt || 0 }}
            </p>
          </div>
        </div>
        <div class="card-item">
          <i class="iconfont icon-jifen" />
          <div class="card-div">
            <p class="div-txt">
              兑换积分
            </p>
            <p class="div-num">
              {{ numObj.exIntegral || 0 }}
            </p>
          </div>
        </div>
        <div class="card-item">
          <i class="iconfont icon-dd" />
          <div class="card-div">
            <p class="div-txt">
              订单数量
            </p>
            <p class="div-num">
              {{ numObj.orderCnt || 0 }}
            </p>
          </div>
          <div
            class="card-div curpointer"
            @click="routeTo('/order/index')"
          >
            <p class="div-txt">
              待发货数量
            </p>
            <p class="div-num curpoint">
              {{ numObj.noSendOrder || 0 }}
              <i class="iconfont icon-arrfill_u-copy" />
            </p>
          </div>
        </div>
      </div>
      <div class="dis-flex">
        <functionEntry
          class="w50"
          :config="numObj"
        />
        <messageNotice class="w50" />
      </div>
      <chartSummary />
    </div>
  </div>
</template>

<script>
import functionEntry from './cpnts/functionEntry';
import messageNotice from './cpnts/messageNotice';
import chartSummary from './cpnts/chartSummary';
import { dataOverView } from '@/services/dataView';

export default {
  components: {
    functionEntry,
    messageNotice,
    chartSummary,
  },
  data() {
    return {
      numObj: {},
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.dataOverViewApi();
  },
  methods: {
    async dataOverViewApi(param={}) {
      const res = await dataOverView(param={});
      if (res.success) {
        this.numObj = res.value.data;
      }
    },
    routeTo(path) {
      const routeUrl = this.$router.resolve({
        path,
        query: { status: 1 },
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.data-view{
  .curpointer{
    cursor: pointer;
  }
  .tit{
    font-size: 14px;
    color:#333;
    margin-bottom: 12px;
  }
  .card-warps{
    display: flex;
    justify-content: space-between;
    .iconfont{
      font-size:40px;
    }
    .icon-arrfill_u-copy{
      font-size: 8px;
      color:#FFFFFF;
    }
    .curpoint{
      cursor: pointer;
    }
    .card-item{
      width:250px;
      height:117px;
      margin-left:20px;
      border-radius:4px;
      background:rgba(141,213,109,1);
      color:#fff;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left:24px;
      &:nth-of-type(1){
        margin-left:0px;
      }
      &:nth-of-type(2){
        background: #6A9DD3;
      }
      &:nth-of-type(3){
        background: #D3C66B;
      }
      &:nth-of-type(4){
        background: #6BC2D1;
        .card-div{
          margin-left:20px;
        }
      }
      .card-div{
        margin-left:30px;
        .div-txt{
          font-size: 14px;
          margin-bottom: 16px;
        }
        .div-num{
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
  }
  .dis-flex{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
    .w50{
      width: calc(50% - 10px);
    }
  }
}
</style>
