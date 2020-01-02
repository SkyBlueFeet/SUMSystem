<template>
  <div class="custom-footer">
    Copyright@2016唐山师范学院学生会.All rights reserved. 冀ICP备05002888号-1
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Footer } from "element-ui";
Vue.use(Footer);
@Component
export default class CustomFooter extends Vue {}
</script>
<style lang="scss" scoped>
.custom-footer {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>