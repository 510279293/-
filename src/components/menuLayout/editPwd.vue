<template>
  <v-dialog
    title="修改个人密码"
    custom-class="edit-pwd-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="close"
  >
    <div>
      <v-form
        ref="form"
        label-width="130px"
        :model="formData"
        :rules="rules"
      >
        <v-form-item
          v-if="config.visible"
          label="请输入原密码"
          prop="oldPwd"
        >
          <v-input
            v-model="formData.oldPwd"
            type="password"
            placeholder="请输入"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="请输入新密码"
          prop="newPwd"
        >
          <v-input
            v-model="formData.newPwd"
            type="password"
            placeholder="请输入（英文、数字或组合）"
            class="wid300"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="再次输入新密码"
          prop="conPwd"
        >
          <v-input
            v-model="formData.conPwd"
            type="password"
            placeholder="请输入"
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
import { regTest } from '@/utils/index';
// eslint-disable-next-line import/no-cycle
import { userUpadtePwd } from '@/services/permission';

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
    const checkPass = (rule, value, callback) => {
      const field = rule.field;
      let msg = '';
      if (value === '') {
        field === 'oldPwd' ? msg = '请输入旧密码' :
        (field === 'newPwd' ? msg = '请输入新密码' : msg = '请输入确认密码');
        callback(new Error(msg));
      } else if (value.length > 30) {
        callback(new Error('长度在30个字以内'));
      } else {
        const reg = regTest.pwdReg;
        if (!reg.test(value)) {
          callback(new Error('只可输入英文、数字或组合'));
        } else if (field === 'conPwd' && this.formData.newPwd !== this.formData.conPwd) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        newPwd: '',
        oldPwd: '',
        conPwd: '',
        userId: JSON.parse(localStorage.getItem('userInfo') || {}).userId || '',
      },
      rules: {
        oldPwd: [
          { required: true, validator: checkPass, trigger: ['blur', 'change'] },
        ],
        newPwd: [
          { required: true, validator: checkPass, trigger: ['blur', 'change'] },
        ],
        conPwd: [
          { required: true, validator: checkPass, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    async userUpadtePwdApi(param={}) {
      const res = await userUpadtePwd(param);
      if (res.success) {
        this.$message.success('密码修改成功!');
        this.close('close');
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.userUpadtePwdApi(this.formData);
        }
      });
    },
    close() {
      this.config.visible = false;
      this.$refs.form.resetFields();
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.edit-pwd-dia{
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
