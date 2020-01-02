<template>
  <el-page-header @back="goBack" content="详情页面"></el-page-header>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Breadcrumb, BreadcrumbItem, PageHeader } from "element-ui";
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(PageHeader);
@Component({
  props: {
    items: {
      required: true,
      type: Array
    }
  }
})
export default class crumb extends Vue {
  goBack() {
    this.$router.go(-1);
  }
}
</script>