<template>
  <v-dialog
    :title="config.title"
    custom-class="editCompanyInfo-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    @close="close(false)"
  >
    <div>
      <div
        v-if="config.ismain"
        class="main-name"
      >
        {{ config.row ? config.row.name : '' }}
      </div>
      <v-form
        ref="form"
        label-width="86px"
        :model="formData"
        :rules="rules"
      >
        <v-form-item
          v-if="!config.ismain && config.visible"
          label="店铺名称"
          prop="name"
        >
          <v-input
            v-model="formData.name"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="地址"
          prop="address"
        >
          <v-input
            v-model="formData.address"
            class="wid300"
            type="textarea"
            :rows="2"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="总机"
        >
          <v-input
            v-model="formData.phone"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="邮箱"
        >
          <v-input
            v-model="formData.email"
            class="wid300"
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
        {{ config.row ? '保存' : '添加' }}
      </v-button>
      <v-button
        @click="close(false)"
      >
        取消
      </v-button>
    </div>
  </v-dialog>
</template>
<script>
import { contactEdit, contactSubmit } from '@/services/contact';

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
      let msg = '';
      if (field === 'name') {
        msg = '请输入店铺名称';
      }
      if (field === 'address') {
        msg = `请输入${this.config.ismain ? '公司' : '店铺'}地址`;
      }
      if (value.length === 0) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      formData: {
        name: '',
        address: '',
        phone: '',
        email: '',
        postCode: '',
        type: 2,
      },
      rules: {
        name: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'] },
        ],
        address: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
    'config.visible'(val) {
      if (val) {
        Object.assign(this.formData, this.config.row);
      } else {
        this.formData = {
          name: '',
          address: '',
          phone: '',
          email: '',
          postCode: '',
          type: 2,
        };
      }
    },
  },
  mounted() {
  },
  methods: {
    async updateContact(param) {
      const newParam = JSON.parse(JSON.stringify(param));
      delete newParam.type;
      const res = await contactEdit(newParam);
      if (res.success) {
        this.$message.success('编辑成功!');
        this.close(true);
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async addContact(param) {
      const res = await contactSubmit(param);
      if (res.success) {
        this.$message.success('添加成功!');
        // this.config.visible = false;
        this.close(true);
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.config.row ? this.updateContact(this.formData) :
          this.addContact(this.formData);
        }
      });
    },
    close(str) {
      this.config.visible = false;
      this.$emit('close');
      if (str) {
        this.config.ismain ? (this.$parent.getCompanyInfo && this.$parent.getCompanyInfo()) :
        this.$parent.getContactList && this.$parent.getContactList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.editCompanyInfo-dia{
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
