<template>
  <div class="app-menu-wrap">
    <!-- <p class="app-menu-open" @click="toggleSideBar">
      <i
        class="boss iconfont"
        :class=" isCollapse ? 'iconformat-indent-decrea' : 'iconformat-indent-increa'"
      />
    </p>-->
    <v-menu
      background-color="#424342"
      class="app-menu"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      :default-active="calcActive($route)"
      unique-opened
    >
      <menu-item :routes="menuRouters" />
    </v-menu>
    <!-- <div :style="{color: '#fff'}">{{calcActive($route)}}</div> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import menuItem from "./AppMenuItem.vue"; // eslint-disable-line
import menuRouters from "../../plugins/menuRoute"; // eslint-disable-line

export default {
  data() {
    return {
      menuRouters: menuRouters,
      pathname: location.pathname,
      isCollapse:
        typeof Cookies.get('sidebarStatus') == 'undefined'
          ? false
          : !+Cookies.get('sidebarStatus'),
    };
  },
  computed: {},
  mounted() {},
  methods: {
    calcActive(route) {
      if (this.$route.matched.length >= 3) {
        return this.$route.matched[0].path + '/';
      } else {
        if (route.meta && route.meta.parent) return route.meta.parent;
        if (route.meta && route.meta.belongPath) return route.meta.belongPath;
        return route.path;
      }
    },
    // 菜单折叠开关
    toggleSideBar() {
      if (this.isCollapse) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      this.isCollapse = !this.isCollapse;
    },
  },
  components: { menuItem } // eslint-disable-line
};
</script>
<style lang="less">
@import '~@/assets/css/var.less';
.app-menu-wrap {
  height: 100%;
  float: left;
  overflow-y: auto;
  background-color: #424342;
  .app-menu-open {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #123439;
    cursor: pointer;
    .v-menu-item {
      background-color: #424342;
    }
    .boss {
      color: #ffffff;
      font-size: 14px;
    }
    span {
      color: #ffffff;
    }
  }
  .app-menu {
    font-size: 14px;
    border-right: none;
    background-color: #052326;
    .v-menu-item {
      height: 46px !important;
      line-height: 46px !important;
      min-width: unset;
      outline: none;
      .boss {
        color: #ffffff;
        font-size: 14px;
        margin-right: 10px;
      }
      &.is-active {
        color: #ffffff;
        background: @color-primary !important;
      }
      &:focus {
        background-color: transparent;
      }
      &:hover {
        background: @color-primary !important;

        color: #ffffff !important;
        i {
          color: #ffffff !important;
        }
      }
    }
  }
  .app-menu:not(.v-menu--collapse) {
    width: 180px;
  }
  .v-menu{
    .v-submenu__title{
      i{color:#fff;}
    }
    .is-opened{
      .v-submenu__title{
        color: @color-primary !important;
        i{
          color:inherit !important;
        }
      }
      ul{
        li{
          background:rgba(127,177,39,0.15) !important;
          padding-left:46px !important;
        }
      }
    }
  }
}
</style>
