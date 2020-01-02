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
    <template v-for="(item, key) in dep">
      <el-menu-item :index="item.index" :key="key">
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Menu, MenuItem, MenuItemGroup, Submenu, Tooltip } from "element-ui";
import getNavTitle from "@/utils/getNavTitle";
import dep from '@/utils/dep';
import reqConfig from '@/utils/reqConfig';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tooltip);

@Component
export default class NavMenu extends Vue {
  activeIndex = "";
  async created() {
    this.dep = await dep();
    this.navData = await reqConfig(nav.json);
  }

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
.el-menu {
  height: 100%;
}
</style>