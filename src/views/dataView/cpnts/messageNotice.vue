<template>
  <div class="message-notice">
    <div class="tit">
      消息通知
    </div>
    <div v-loading="loading">
      <tableEmpty
        v-if="dataList.length === 0"
        class="no-padbot"
        :is-table="false"
        txt="暂无消息通知喔~"
      />
      <div
        v-else
        class="list-warps"
      >
        <p
          v-for="(item,idx) in dataList"
          :key="idx"
          class="list"
        >
          {{ item.message }}<a @click="routeTo(item)">前往处理</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { setInterval } from 'timers';
import { dataMessage } from '@/services/dataView';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      timer: null,
      dataList: [],
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.dataMessageApi();
  },
  methods: {
    async dataMessageApi(param={}) {
      this.loading = true;
      const res = await dataMessage(param);
      this.dataList = res.value.data || [];
      this.loading = false;
    },
    routeTo(item) {
      if (item.model === 'product') {
        this.$router.push({ path: '/goods/index', query: { goodsId: item.id } });
      }
      if (item.model === 'proposal') {
        this.$router.push({ path: '/complain/detail', query: { proposalId: item.id } });
      }
      if (item.model === 'order') {
        this.$router.push({ path: '/order/detail', query: { orderNo: item.id } });
      }
    },
    autoScroll() {
      this.timer = setInterval((_) => {

      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/var.less';
.message-notice{
  height:184px;
  border-radius:4px;
  border:1px solid #ccc;
  box-sizing: border-box;
  padding:12px;
  padding-right: 0px;
  .tit{
    font-size: 14px;
    color:#333;
    font-weight: 600;
  }
  .no-padbot{
    padding-bottom: 0px;
  }
  .list-warps{
    // min-height:100px;
    height:130px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
      // background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #D8D8D8;
    }
    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      // background-color: #F5F5F5;
     }
    .list{
      position: relative;
      color:#666666;
      font-size: 12px;
      padding: 9px;
      padding-left:18px;
      &:before{
        position: absolute;
        content: '';
        width:7px;
        height:7px;
        background: @color-primary;
        border-radius: 50%;
        left:0px;
        top:13px;
      }
      a{
        color:#4A90E2;
        font-size: 12px;
        margin-left:5px;
        cursor: pointer;
      }
    }
  }
}
</style>
