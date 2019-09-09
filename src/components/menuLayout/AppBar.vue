<template>
  <div class="appbar u-clearfix">
    <div class="appbar-left">
      <a
        href="/"
        class="appbar-logo"
      />
      <a
        href="/"
        class="appbar-control"
      >鲜风小程序后台管理系统</a>
    </div>
    <div class="appbar-right">
      <v-dropdown
        class="appbar-user"
        trigger="hover"
      >
        <div class="appbar-user__wrap">
          <!-- <span class="user-logo">
            <img
              :src="'//startdtadmin.oss-cn-hangzhou.aliyuncs.com/img/1508394711614.jpg'"
              alt
            >
          </span> -->
          <span class="user-email">
            {{ userName }}
            <i class="v-icon-caret-bottom" />
          </span>
        </div>
        <v-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <v-dropdown-item>
            <span
              style="display:block;"
              @click="showEditPwd"
            >修改密码</span>
          </v-dropdown-item>
          <v-dropdown-item>
            <span
              style="display:block;"
              @click="onLogout"
            >退出登录</span>
          </v-dropdown-item>
        </v-dropdown-menu>
      </v-dropdown>
    </div>
    <editPwd :config="editPwdConfig" />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import editPwd from './editPwd';

export default {
  components: {
    editPwd,
  },
  data() {
    return {
      userName: JSON.parse(localStorage.getItem('userInfo') || '{}').userName,
      editPwdConfig: {
        visible: false,
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // 退出登录
    onLogout() {
      this.$router.push({ path: '/login' });
    },
    showEditPwd() {
      Object.assign(this.editPwdConfig, {
        visible: true,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.appbar {
  position: fixed;
  z-index: 1002;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 60px;
  color: #ffffff;
  background-color: #03181a;
  overflow: hidden;
  height: 60px;
  background: rgba(60, 61, 60, 1);
  &-left {
    float: left;
    font-size: 0;
    a {
      display: inline-block;
      vertical-align: middle;
    }
    .appbar-logo {
      width: 60px;
      height: 60px;
      line-height: 60px;
      // background: url("../../assets/logo.png") no-repeat;
      background: url("https://yhdsj.oss-cn-shanghai.aliyuncs.com/logo.png")
        no-repeat;
      background-size: 36px 36px;
      background-position: center center;
      // &:hover {
      //   background-color: #020e0f;
      // }
    }
    .appbar-control {
      font-size: 16px;
      // padding: 0 20px;
      // border-left: 1px solid #08393d;
      // border-right: 1px solid #08393d;
      // &:hover {
      //   background-color: #020e0f;
      // }
    }
  }
  &-right {
    float: right;
    cursor: pointer;
    padding-left: 10px;
    border-left: 1px solid #4F4D4D;
    &:hover {
      background-color: #020e0f;
    }
    .appbar-user {
      color: #dddddd;
      &__wrap {
        overflow: hidden;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .user-logo {
          width: 32px;
          height: 32px;
          margin: 0 4px 0 20px;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }
        .user-email {
          font-size: 14px;
          color: #ffffff;
          margin-right: 20px;
          i {
            margin-left: 4px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
