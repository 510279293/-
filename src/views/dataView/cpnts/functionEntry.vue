<template>
  <div class="function-entry">
    <div class="tit">
      功能入口
    </div>
    <div class="list-warps">
      <dl>
        <dt><span @click="routeTo('/goods/index')"><i class="iconfont icon-shangpin" /></span></dt>
        <dd>商品管理</dd>
        <dd>已上架: {{ config.upProductCnt || 0 }}</dd>
      </dl>
      <dl>
        <dt><span @click="routeTo('/complain/list')"><i class="iconfont icon-tousu" /></span></dt>
        <dd>投诉管理</dd>
        <dd>待回复: {{ config.noReplyCnt || 0 }}</dd>
      </dl>
      <dl>
        <dt><span @click="routeTo('/member/index')"><i class="iconfont icon-huiyuan" /></span></dt>
        <dd>会员管理</dd>
        <dd>会员总数: {{ config.memberCnt || 0 }}</dd>
      </dl>
      <dl>
        <dt><span @click="routeTo('/invoice/info')"><i class="iconfont icon-fapiao" /></span></dt>
        <dd>发票管理</dd>
        <dd />
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {},
  mounted() {
  },
  methods: {
    routeTo(path) {
      const routeUrl = this.$router.resolve({
        path,
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/var.less';
.function-entry{
  height:184px;
  border-radius:4px;
  border:1px solid #ccc;
  box-sizing: border-box;
  padding:12px;
  .tit{
    font-size: 14px;
    color:#333;
    font-weight: 600;
  }
  .list-warps{
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
    dl{
      text-align: center;
      dt{
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        span{
          display: flex;
          align-items: center;
          justify-content: center;
          width:50px;
          height:50px;
          border-radius: 50%;
          border:1px solid @color-primary;
          i{
            font-size: 24px;
            color:@color-primary;
          }
          &:hover{
            background: @color-primary;
            cursor: pointer;
            transition: background .4s;
            -moz-transition: background .4s;
            -webkit-transition: background .4s;
            -o-transition: background .4s;
            i{
              color:#fff;
            }
          }
        }
      }
      dd{
        &:nth-of-type(1){
          font-size: 14px;
          color:#666;
        }
        &:nth-of-type(2){
          font-size: 12px;
          color:@color-primary;
          margin-top:20px;
        }
      }
    }
  }
}
</style>
