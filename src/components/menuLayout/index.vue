<template>
  <div class="app-wrap">
    <app-bar />
    <div class="app-container u-clearfix">
      <app-menu />
      <div :class="['main-container', curRoute ? 'back-fff' : '']">
        <div
          v-loading="loading"
          class="back-fff"
        >
          <router-view v-if="isPermission" />
          <div v-else>
            <noPermission />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex';
import appBar from "./AppBar.vue"; // eslint-disable-line
import appMenu from "./AppMenu.vue"; // eslint-disable-line
import { getCurAuthor } from '@/services/permission'; // eslint-disable-line
import { getAllAuthorCodeArr } from '@/utils/index';

export default {
  name: "appLatout", // eslint-disable-line
  components: { appBar, appMenu },  // eslint-disable-line
  data() {
    return {
      loading: false,
      curRoute: false,
      isPermission: false,
    };
  },
  computed: {
  },
  watch: {
    $route() {
      this.init();
    },
  },
  mounted() {
    this.getCurAuthorApi();
    // this.init();
  },
  methods: {
    // ...mapActions(['getAllPermissionList', 'getCurUserAuthor']),
    async getCurAuthorApi(param={}) {
      this.loading = true;
      const res = await getCurAuthor(param);
      if (res.success) {
        const arr = getAllAuthorCodeArr(res.value.data || []);
        this.$store.commit('saveCurUserAuthor', { curUserAuthor: res.value.data || [] });
        this.$store.commit('saveCurUserAuthorArr', { curUserAuthorArr: arr });
        this.init();
      } else {
        this.$message.error('获取当前用户权限失败!');
      }
      this.loading = false;
    },
    init() {
      this.curRoute = this.$router.currentRoute.fullPath.includes('data/view');
      const authorCode = this.$router.currentRoute.meta.authorCode;
      this.isPermission = this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
  },
};
</script>

<style lang="less" scoped>
.app-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
.app-container {
  margin-top: 60px;
  width: 100%;
  height: ~"calc(100% - 60px)";
  display: flex;
  .main-container{
    flex: 1;
    padding:20px;
    overflow: auto;
  }
  .back-fff{
    background: #fff;
    min-height: ~"calc(100% - 0px)";
  }
}
</style>
