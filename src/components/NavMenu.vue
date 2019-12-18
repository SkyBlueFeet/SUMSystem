<template>
  <el-menu
    @select="handleSelect"
    :default-active="navData.defaultActive"
    class="el-menu-vertical-demo"
    :background-color="navData.backgroundColor"
    :text-color="navData.textColor"
    :active-text-color="navData.activeTextColor"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
    :collapse="$store.state.expandMenu"
  >
    <template v-for="(item, key) in navData.menu">
      <el-menu-item
        v-if="item.subMenu.length === 0"
        :index="item.index"
        :key="key"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.index" :key="key">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subitem, subkey) in item.subMenu"
            :key="subkey"
            :index="subitem.index"
          >
            {{ subitem.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Menu, MenuItem, MenuItemGroup, Submenu, Tooltip } from "element-ui";
import getNavTitle from "@/utils/getNavTitle";
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tooltip);

@Component
export default class NavMenu extends Vue {
  activeIndex = "";
  navData = require("@/copywriting/nav.jsonc");
  mounted() {}
  handleClose(params, event) {}
  handleOpen(params, event) {}
  handleSelect(thisIndex, indexArray) {
    let nextPath = "/" + indexArray.join("/");
    if (nextPath !== this.$route.path) {
      this.$router.push({ path: nextPath });
      this.$store.state.thisPage = getNavTitle(nextPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  background-color: #ff00ff;
}
</style>