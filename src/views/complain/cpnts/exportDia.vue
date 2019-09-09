<template>
  <v-dialog
    custom-class="export-dia"
    :title="'导出投诉记录'"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="true"
    @close="close"
  >
    <div class="dis-flex">
      <p class="wid180">
        <span>投诉编号：</span><b>{{ showObj1.number || '全部' }}</b>
      </p>
      <!-- <p class="wid180">
        <span>投诉人手机号：</span><b>全部</b>
      </p> -->
      <p class="wid180">
        <span>投诉类型：</span><b>{{ showObj1.category || '全部' }}</b>
      </p>
      <p class="wid180">
        <span>所投诉门店：</span><b>{{ showObj1.store || '全部' }}</b>
      </p>
      <p><span>投诉时间: </span><b>{{ showObj1.time || '全部' }}</b></p>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        type="primary"
        @click="confirm"
      >确认导出</v-button>
      <v-button @click="close">取 消</v-button>
    </span>
  </v-dialog>
</template>
<script>
import { stringify } from '@fe/common-utils';
// import { compExport } from '@/services/complain';

export default {
  name: 'Dialog',
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
      showObj1: {
        number: '全部',
        category: '全部',
        store: '全部',
        time: '全部',
      },
    };
  },
  watch: {
    'config.visible'(val) {
      if (val) {
        Object.assign(this.showObj1, this.config.showObj);
      }
    },
  },
  methods: {
    close() {
      this.config.visible = false;
      this.$emit('close');
    },
    confirm() {
      const param = JSON.parse(JSON.stringify(this.config.paramData));
      param.categoryName = this.showObj1.category;
      param.storeName = this.showObj1.store;
      console.log(param);
      delete param.pageNum;
      delete param.pageSize;
      delete param.totalCount;
      delete param.type;
      const url = process.env.VUE_APP_URL + `/api/v1/back/proposal/export?${stringify(param)}`;
      window.open(url);
      // compExport(param).then(res => {
      //   if(res.success){
      //     console.log(res)
      //   }
      // })
    },
  },
};
</script>

<style lang="less" scoped>
.export-dia{
  .dis-flex{
    display: flex;
    flex-wrap: wrap;
    p{
      font-size: 14px;
      margin-bottom: 16px;
    }
    .wid180{
      width:180px;
    }
  }
}
</style>
<style lang="less">
.export-dia{
  .v-dialog__body{
    padding:20px;
  }
}

</style>

