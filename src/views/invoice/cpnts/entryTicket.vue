<template>
  <v-dialog
    title="录入小票"
    custom-class="entry-ticket-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="filter-box">
      <span class="hasMust">小票编号</span>
      <v-input
        ref="focusInput"
        v-model="paramData.receiptNo"
        type="textarea"
        autosize
        class="wid308"
        placeholder="请输入小票编号或使用扫码枪扫描"
      />
      <v-button
        type="primary"
        :disabled="paramData.receiptNo.length === 0"
        @click="handleSearch"
      >
        查 询
      </v-button>
    </div>
    <p class="mar-b30">
      <i class="v-icon-info" />可一次性录入多张小票编号，不同小票之间请用英文逗号分隔。
    </p>
    <div>
      <v-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <tableEmpty slot="empty" />
        <v-table-column
          prop="receiptNo"
          label="小票编号"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.receiptNo }}</div>
          </template>
        </v-table-column>
        <v-table-column
          prop="amount"
          label="金额"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.amount }}</div>
          </template>
        </v-table-column>
        <v-table-column
          prop="status"
          label="开具发票情况"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.status }}</div>
          </template>
        </v-table-column>
        <v-table-column
          prop="name"
          label="操作"
        >
          <template>
            <span
              class="color-blue"
              @click="toDel"
            >删除</span>
          </template>
        </v-table-column>
      </v-table>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        type="primary"
        :disabled="tableData.length === 0"
        @click="submit('sure')"
      >
        录入
      </v-button>
      <v-button
        @click="close"
      >
        取消
      </v-button>
    </div>
  </v-dialog>
</template>
<script>
import { getReceiptByNum, receiptInput } from '@/services/invoice';

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
      paramData: {
        receiptNo: '',
      },
      tableData: [],
    };
  },
  computed: {
  },
  watch: {
    'config.visible'(val) {
      if (val) {
        this.$nextTick((_) => {
          this.$refs.focusInput.focus();
        });
      }
    },
  },
  mounted() {
  },
  methods: {
    async getReceiptByNum(param) {
      this.loading = true;
      const res = await getReceiptByNum(param);
      if (res.success) {
        console.log(res);
      }
      this.loading = false;
    },
    async receiptInput(param) {
      const res = await receiptInput(param);
      if (res.success) {
        this.$message.success('录入成功');
      } else {
        this.$message.error('录入失败');
      }
    },
    handleSearch() {
      this.getReceiptByNum(this.paramData);
    },
    submit(str) {

    },
    toDel() {

    },
    close() {
      this.config.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.entry-ticket-dia{
  .wid308{
    width:308px;
    margin-left: 20px;
    margin-right: 12px;
  }
  .filter-box{
    align-items: center;
    justify-content: center;
    .hasMust{
      position: relative;
      &:before{
        position: absolute;
        content: '*';
        color:#FF5858;
        left:-8px;
        top:2px;
      }
    }
  }
  .mar-b30{
    margin-bottom: 30px;
    box-sizing: border-box;
    padding-top:12px;
    padding-left:120px;
    font-size: 12px;
    color:#666;
  }
}
</style>
