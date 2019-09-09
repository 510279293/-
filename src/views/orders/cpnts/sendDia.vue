<template>
  <v-dialog
    title="发货"
    custom-class="send-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    @close="close"
  >
    <div>
      <v-form
        ref="form"
        label-width="86px"
        :model="formData"
        :rules="rules"
      >
        <v-form-item
          label="配送方式"
          prop="sendWay"
        >
          <v-radio-group v-model="formData.sendWay">
            <v-radio :label="0">
              自主配送
            </v-radio>
            <v-radio :label="1">
              快递配送
            </v-radio>
          </v-radio-group>
        </v-form-item>
        <v-form-item
          v-if="formData.sendWay * 1 === 1"
          label="快递单号"
          prop="expressNum"
        >
          <v-input
            ref="focusInput"
            v-model="formData.expressNum"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="formData.sendWay * 1 === 1"
          label="快递公司"
          prop="expressCompanyId"
        >
          <v-select
            v-model="formData.expressCompanyId"
            class="wid300"
            placeholder="请选择"
          >
            <v-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </v-select>
        </v-form-item>
      </v-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        type="primary"
        @click="submit('sure')"
      >
        确定
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
import { orderSend, companyList } from '@/services/order';

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
    const notEmpty = (rule, value, callback) => {
      const field = rule.field;
      const msg = field === 'expressNum' ? '请输入快递单号' : '请选择快递公司';
      if (value.length === 0) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      companyOptions: [],
      formData: {
        sendWay: 0,
        expressNum: '',
        expressCompanyId: '',
      },
      rules: {
        sendWay: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '' },
        ],
        expressNum: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '' },
        ],
        expressCompanyId: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '' },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
    'formData.sendWay'(val) {
      if (val === 1) {
        this.$nextTick((_) => {
          this.$refs.focusInput.focus();
        });
      }
    },
  },
  mounted() {
    this.companyListApi();
  },
  methods: {
    async companyListApi(param={}) {
      const res = await companyList(param);
      if (res.success) {
        this.companyOptions = res.value.data;
      }
    },
    async orderSend(param) {
      const res = await orderSend(param);
      if (res.success) {
        console.log(res);
        this.$message.success('发货成功!');
        this.close();
        this.$emit('submit', true);
        this.$parent.handleSearch && this.$parent.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
        this.$emit('submit', false);
      }
    },
    submit(str) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid);
          this.orderSend(Object.assign(this.formData, {
            orderNo: this.config.orderNo,
          }));
        }
      });
    },
    close() {
      this.config.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.send-dia{
  .wid300{
    width:300px;
  }
  .main-name{
    font-size: 16px;
    color:#333;
    margin-bottom: 20px;
    font-weight: 500;
  }
}
</style>
<style lang="less">
.send-dia{
  .v-dialog__body{
    padding:20px;
    padding-bottom: 0px;
  }
}
</style>
