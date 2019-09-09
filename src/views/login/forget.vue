<template>
  <loginBg class="first-login">
    <div class="warps">
      <div
        class="login-set-box white-box"
      >
        <div class="desc">
          忘记密码
        </div>
        <v-form
          ref="form"
          class="forget-form"
          :model="formData"
          :rules="rules"
        >
          <div class="forget-tip">
            不清楚登录信息？可联系管理员直接修改密码
          </div>
          <v-form-item
            label=""
            prop="telOrMail"
          >
            <v-input
              v-model="formData.telOrMail"
              placeholder="请输入账号所关联的手机号或邮箱"
              auto-complete="off"
              size="large"
            />
          </v-form-item>
          <v-form-item
            label=""
            prop="verifyCode"
          >
            <v-input
              v-model="formData.verifyCode"
              class="wid286"
              placeholder="验证码"
              size="large"
              auto-complete="off"
            />
            <v-button
              class="wid102"
              type=""
              size="large"
              :disabled="btnDisabled"
              @click="getCheckCode"
            >
              {{ checkCodeTxt }}
            </v-button>
          </v-form-item>
          <v-form-item
            label=""
            prop="newPwd"
          >
            <v-input
              v-model="formData.newPwd"
              placeholder="请输入新密码（英文、数字或组合）"
              :type="'password'"
              auto-complete="off"
              size="large"
            />
          </v-form-item>
          <v-form-item
            label=""
            prop="conPwd"
            class="form-item"
          >
            <v-input
              v-model="formData.conPwd"
              placeholder="请再次输入新密码"
              type="password"
              auto-complete="off"
              size="large"
            />
          </v-form-item>
          <v-form-item
            class="form-item item-right"
          >
            <v-button
              type="primary"
              size="large"
              @click="submit"
            >
              确定
            </v-button>
          </v-form-item>
        </v-form>
      </div>
      <div class="back-login">
        <router-link
          to="/login"
        >
          返回登录>>
        </router-link>
      </div>
    </div>
  </loginBg>
</template>
<script>
import { regTest } from '@/utils/index';
import loginBg from './cpnts/loginBg';
import { userForgetPwd, getVerifyCode } from '@/services/permission';

export default {
  components: {
    loginBg,
  },
  data() {
    // 验证用户名
    const checkTelOrMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号或邮箱'));
      } else {
        const { phoneReg, emailReg } = regTest;
        if (!(phoneReg.test(value) || emailReg.test(value))) {
          callback(new Error('请输入正确的手机号或邮箱格式'));
        } else {
          callback();
        }
      }
    };
    // 验证密码
    const checkPwd = (rule, value, callback) => {
      const field = rule.field;
      let msg = '';
      if (value === '') {
        field === 'newPwd' ? msg = '请输入新密码' : msg = '请输入确认密码';
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
      timer: null,
      counter: 60,
      btnDisabled: false,
      checkCodeTxt: '获取验证码',
      formData: {
        telOrMail: '',
        newPwd: '',
        conPwd: '',
        verifyCode: '',
      },
      rules: {
        telOrMail: [
          { required: true, validator: checkTelOrMail, trigger: ['blur', 'change'] },
        ],
        verifyCode: [
          { required: true, trigger: ['blur', 'change'], message: '请输入验证码' },
        ],
        newPwd: [
          { required: true, validator: checkPwd, trigger: ['blur', 'change'] },
        ],
        conPwd: [
          {
            required: true,
            validator: checkPwd,
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    async userForgetPwdApi(param={}) {
      const res = await userForgetPwd(param);
      if (res.success) {
        this.$router.push('/login');
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async getVerifyCodeApi(param={}, callback) {
      this.btnDisabled = true;
      const res = await getVerifyCode(param);
      if (res.success) {
        this.$message.success(res.value.data);
        callback && callback();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    getCheckCode() {
      this.$refs.form['validateField']('telOrMail', (valid) => {
        if (!valid) {
          const { telOrMail } = this.formData;
          this.btnDisabled = true;
          this.btnDisabled ?
            this.getVerifyCodeApi({ telOrMail }, this.countdown) : null;
        }
      });
    },
    countdown(count = this.counter) {
      window.clearInterval(this.timer);
      this.timer = setInterval((_) => {
        count --;
        count < 1 ?
          (window.clearInterval(this.timer),
          count = this.counter, this.checkCodeTxt = '获取验证码',
          this.btnDisabled = false)
          : this.checkCodeTxt = `(${count}S)`;
      }, 1000);
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.userForgetPwdApi(this.formData);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.first-login {
  .wid286{
    width:286px;
  }
  .wid102{
    width:102px;
    margin-left:12px;
    padding: 12px;
  }
  .warps {
    width: 80vw;
    margin: 0 auto;
    margin-top: 8vh;
    .warps-tit {
      font-size: 24px;
      font-weight: 500;
      line-height: 33px;
      letter-spacing: 4px;
      margin-bottom: 12px;
      text-align: center;
    }
    .warps-tit-desc {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      text-align: center;
      margin-bottom: 24px;
    }
    .white-box {
      background: #fff;
      .desc {
        color: #333;
        padding-top: 20px;
        padding-bottom: 12px;
        font-size: 24px;
        border-bottom: 1px solid #CCCCCC
      }
    }
  }
  .forget-form {
    width: 400px;
    margin: 0px auto;
    padding-bottom: 20px;
    .forget-tip{
      color:#666;
      font-size:14px;
      padding-top:20px;
      padding-bottom: 12px;
    }
    .form-item {
      position: relative;
      .iconfont {
        color: #333;
        position: absolute;
        right: -26px;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .item-right {
      text-align: right;
      margin-top: 20px;
      button{
        width:100%;
      }
    }
    .item-mar {
      margin-top: 20px;
      margin-bottom: 50px;
    }
    .pwd-item {
      .hint {
        width: 400px;
        margin-top: 8px;
        line-height: 15px;
        font-size: 12px;
        text-align: left;
        color: #999999;
      }
    }
  }
  .login-set-box {
    box-sizing: border-box;
    padding:0px 40px;
  }
  .back-login{
    text-align: center;
    color:#4A90E2;
    font-size: 14px;
    margin-top:20px;
    cursor: pointer;
  }
}
</style>
