<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in $store.state.thisPage"
      :key="index"
      :to="{ path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
import getNavTitle from "@/utils/getNavTitle";
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
@Component
export default class crumb extends Vue {
  created() {
    this.$store.state.thisPage = getNavTitle(this.$route.path);
  }
  mounted() {}
  index = { path: "/test" };
}
</script>