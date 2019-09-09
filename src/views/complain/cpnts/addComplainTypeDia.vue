<template>
  <v-dialog
    title="添加投诉类型"
    custom-class="add-complain-type-dia"
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
          v-if="config.visible"
          label="类型名称"
          prop="name"
        >
          <v-input
            v-model="formData.name"
            placeholder="20个字以内"
            :maxlength="20"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="描述"
        >
          <v-input
            v-model="formData.remark"
            class="wid300"
            type="textarea"
            :maxlength="40"
            placeholder="请输入投诉类型描述，40个字以内"
            :rows="2"
          />
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
import { compCategoryAdd, compCategoryUpdate } from '@/services/complain';

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
      const msg = `${field === 'name' ? '请输入类型名称' : ''}`;
      if (value.length === 0) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      options: [],
      formData: {
        name: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '请输入类型名称' },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
    'config.visible'(val) {
      if (val) {
        this.config.row ? Object.assign(this.formData, this.config.row) : null;
      } else {
        this.formData ={
          name: '',
          remark: '',
        };
      }
    },
  },
  mounted() {
  },
  methods: {
    async compCategoryAddApi(param={}) {
      const res = await compCategoryAdd(param);
      if (res.success) {
        this.$message.success('添加分类成功');
        this.close();
        this.$parent.handleSearch && this.$parent.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async compCategoryUpdateApi(param={}) {
      const res = await compCategoryUpdate(param);
      if (res.success) {
        this.$message.success('编辑分类成功');
        this.close();
        this.$parent.handleSearch && this.$parent.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.config.row ? this.compCategoryUpdateApi(Object.assign({}, this.formData)) :
          this.compCategoryAddApi(this.formData);
        }
      });
    },
    close() {
      this.config.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.add-complain-type-dia{
  .wid300{
    width:300px;
  }
  .main-name{
    font-size: 16px;
    color:#333;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .tip{
    color:#999;
    font-size: 12px;
  }
}
</style>
