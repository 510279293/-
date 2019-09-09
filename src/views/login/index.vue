<template>
  <loginBg class="login">
    <div class="desc">
      小程序后台管理系统
    </div>
    <v-form
      ref="form"
      class="login-form"
      :model="userInfo"
      :rules="rules"
      labv-position="top"
    >
      <p class="title">
        登录
      </p>
      <v-form-item prop="userName">
        <v-input
          v-model="userInfo.userName"
          placeholder="账号"
          @keyup.enter.native="onSubmit"
        />
      </v-form-item>
      <v-form-item prop="password">
        <v-input
          v-model="userInfo.password"
          type="password"
          placeholder="密码"
          @keyup.13.native="onSubmit"
        />
      </v-form-item>
      <v-form-item style="margin-bottom: 0;">
        <v-button
          class="login-form__btn"
          type="primary"
          @click="onSubmit"
        >
          登 录
        </v-button>
      </v-form-item>
      <p class="handle u-clearfix">
        <router-link
          to="/forget"
          class="forget-btn"
        >
          忘记密码?
        </router-link>
      </p>
    </v-form>
  </loginBg>
</template>

<script>
import loginBg from './cpnts/loginBg';
import { userLogin } from '@/services/permission';

export default {
  components: {
    loginBg,
  },
  data() {
    return {
      userInfo: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async userLoginApi(param={}) {
      // this.$router.push('/data/view');
      const res = await userLogin(param);
      if (res.success) {
        localStorage.setItem('token', res.value.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.value.data.userInfo));
        // this.getCurAuthorApi();
        this.$router.push('/data/view');
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.userLoginApi(this.userInfo);
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  &-slogon {
    position: absolute;
    top: 300px;
    left: 180px;
    font-size: 24px;
    letter-spacing: 20px;
  }
  &-form {
    box-sizing: border-box;
    position: absolute;
    right: 15vw;
    top: 28vh;
    width: 320px;
    padding: 20px 32px 50px;
    background: #fff;
    border-radius: 4px;
    &__btn {
      width: 100%;
    }
    .title {
      margin-bottom: 37px;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      color: #333333;
      text-align: center;
    }
    .handle {
      margin-top: 12px;
    }
    .forget-btn {
      font-size: 14px;
      color: #4a90e2;
    }
  }
  .desc {
    position: absolute;
    width:320px;
    text-align: center;
    top: 20vh;
    right: 15vw;
    color:#333;
    font-size: 24px;
    // &-title {
    //   font-size: 36px;
    //   letter-spacing: 20px;
    //   margin-bottom: 10px;
    // }
    // &-line {
    //   width: 100%;
    //   height: 4px;
    //   background: -webkit-linear-gradient(
    //     left right,
    //     rgba(28, 202, 218, 0),
    //     rgba(28, 202, 218, 1),
    //     rgba(28, 202, 218, 0)
    //   ); /* Safari 5.1 - 6.0 */
    //   background: -o-linear-gradient(
    //     left right,
    //     rgba(28, 202, 218, 0),
    //     rgba(28, 202, 218, 1),
    //     rgba(28, 202, 218, 0)
    //   ); /* Opera 11.1 - 12.0 */
    //   background: -moz-linear-gradient(
    //     left right,
    //     rgba(28, 202, 218, 0),
    //     rgba(28, 202, 218, 1),
    //     rgba(28, 202, 218, 0)
    //   ); /* Firefox 3.6 - 15 */
    //   background: linear-gradient(
    //     to right,
    //     rgba(28, 202, 218, 0),
    //     rgba(28, 202, 218, 1),
    //     rgba(28, 202, 218, 0)
    //   ); /* 标准的语法 */
    // }
  }
}
</style>
