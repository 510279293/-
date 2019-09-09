<template>
  <v-dialog
    title="物流信息"
    custom-class="logistics-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="send-tit">
      <span>配送方式：快递配送</span>
      <span>配送方式：快递配送</span>
      <span>配送方式：快递配送</span>
    </div>
    <div class="time-line">
      <div
        v-for="(item,idx) in 6"
        :key="idx"
        :class="['line-item',idx === 0 ? 'active' : '']"
      >
        <div class="item-status">
          已签收
        </div>
        <div class="item-desc">
          客户签收：【蜂巢3号柜】收入，凭取货码签收
        </div>
        <div class="item-time">
          2019-01-10 12:00:00
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
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
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    close() {

    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/var.less';
.logistics-dia{
  .send-tit{
    font-size: 14px;
    color:#333;
    span{
      margin-right: 40px;
    }
  }
  .time-line{
    margin-top: 36px;
    margin-left:127px;
    border-left:1px solid #CCCCCC;
    .line-item{
      color:#666;
      padding-left:25px;
      position: relative;
      margin-bottom: 26px;
      .item-status{
        font-size: 14px;
        margin-bottom: 12px;
      }
      .item-desc{
        font-size: 12px;
      }
      &:before{
        position: absolute;
        content: '';
        width: 12px;
        height:12px;
        border-radius: 50%;
        border:1px solid #ccc;
        background: #fff;
        left:-6px;
      }
      &:after{
        position: absolute;
        left:-3px;
        top:3px;
        content: '';
        background: #ccc;
        width:6px;
        height:6px;
        border-radius: 50%;
      }
      .item-time{
        font-size: 12px;
        position: absolute;
        left: -128px;
        top: 0px;
      }
    }
    .active{
      &:after{
        background: @color-primary;
      }
    }
  }
}
</style>
<style lang="less">
.logistics-dia{
  .v-dialog__body{
    padding:20px;
  }
}
</style>
