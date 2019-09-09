<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="complain-summary"
    >
      <chartType />
      <chartShop class="chartShop" />
      <div class="dis-flex">
        <chartTime class="w50" />
        <chartReply class="w50" />
      </div>
    </div>
  </div>
</template>
<script>
import chartType from './cpnts/chartType';
import chartShop from './cpnts/chartShop';
import chartTime from './cpnts/chartTime';
import chartReply from './cpnts/chartReply';

export default {
  components: {
    chartType,
    chartShop,
    chartTime,
    chartReply,
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
  },
};
</script>

<style lang="less" scoped>
.complain-summary{
  background: #eee;
  .chartShop{
    margin-top:20px;
  }
  .dis-flex{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top:20px;
    .w50{
      width:calc(50% - 10px);
      // margin-right: 20px;
      &:nth-of-type(2){
        margin-right: 0px;
      }
    }
  }
}
</style>
