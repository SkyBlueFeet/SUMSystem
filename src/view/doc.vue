<template>
  <div class="doc">
    <div
      class="container doc"
      v-html="require(`@/doc/${$route.params.docName}.md`)"
    ></div>
  </div>
</template>

<script>
import Vue from "vue";
import Compontent from "vue-class-component";
@Compontent
export default class doc extends Vue {}
</script>

<style lang="scss">
@import "../style/doc.scss";
.container.doc {
  margin: 0 auto;
  padding: 30px 45px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>