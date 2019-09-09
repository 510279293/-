<template>
  <div class="table-empty">
    <div class="table-empty-imgWarp">
      <i
        v-if="isTable"
        class="iconfont icon-kong"
      />
      <img
        v-else
        src="@/assets/img/noData.jpg"
      >
    </div>
    <div class="table-empty-txt">
      {{ txt }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableEmpty',
  components: {
  },
  props: {
    isTable: {
      type: Boolean,
      default: true,
    },
    txt: {
      type: String,
      default: '暂无数据',
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
  },
};
</script>

<style lang="less" scoped>
.table-empty{
  line-height: normal;
  padding-top:30px;
  padding-bottom: 40px;
  text-align: center;
  div{
    padding:0;
  }
  i{
    font-size: 60px;
    color:#ccc;
  }
  .table-empty-imgWarp{
    img{
      width:60px;
    }
  }
  .table-empty-txt{
    font-size: 14px;
    margin-top:12px;
    color:#999;
  }
}
</style>
