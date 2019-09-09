<template>
  <div class="sidebarItem-wrap">
    <template v-for="(item, index) in routes">
      <!-- 只有一层菜单 -->
      <router-link
        v-if="!item.hidden && item.noDropdown"
        :key="index"
        :to="calcMenuPath(item)"
      >
        <v-menu-item :index="calcMenuPath(item)">
          <i
            v-if="item.icon"
            class="boss iconfont"
            :class="item.icon"
          />
          <span slot="title">{{ item.name }}</span>
        </v-menu-item>
      </router-link>
      <!-- 多层菜单 -->
      <v-submenu
        v-if="!item.noDropdown && !item.hidden"
        :key="index"
        :index="item.path"
      >
        <template slot="title">
          <i
            v-if="item.icon"
            class="boss iconfont"
            :class="item.icon"
          />
          <span slot="title">{{ item.name }}</span>
        </template>
        <template v-for="(child, cindex) in item.children">
          <router-link
            v-if="!child.hidden"
            :key="cindex"
            :to="calcSubMenuPath(item, child)"
          >
            <v-menu-item :index="calcSubMenuPath(item, child)">
              <span slot="title">{{ child.name }}</span>
            </v-menu-item>
          </router-link>
        </template>
      </v-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'AppMenuItem',
  props: {
    routes: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {},
  methods: {
    calcMenuPath(item) {
      //  有二级菜单
      if (item.children[0].children) {
        return item.path;
      } else {
        //  没有二级菜单
        if (item.mixture) {
          return item.path;
        } else {
          return item.path + '/' + item.children[0].path;
        }
      }
    },
    calcSubMenuPath(item, child) {
      //  二级菜单
      if (child.children) {
        return item.path + '/' + child.path + '/' + child.children[0].path;
      } else {
        return item.path + '/' + child.path;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.boss,
.iconfont {
  margin-right: 10px;
}
</style>
