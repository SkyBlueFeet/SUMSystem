<template>
  <div id="app">
    <template v-if="$route.meta.type === 'admin'">
      <admin-layout>
        <router-view />
      </admin-layout>
    </template>
    <template v-else-if="$route.meta.type === 'index'">
      <index-layout>
        <router-view />
      </index-layout>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Header, Container, Main, Aside, Footer } from "element-ui";
import AdminLayout from "@/layout/admin";
import IndexLayout from "@/layout/index";
Vue.use(Container);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);

@Component({
  components: {
    AdminLayout,
    IndexLayout
  }
})
export default class layout extends Vue {
  mounted() {
    console.log(this.$route.meta);
    document.body.style.overflow = "auto";
  }
  headerStyle = {
    height: "72px"
  };
  asideStyle = {
    width: "300px"
  };
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100%;
}
.el-header {
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
}
.el-table__row{
  td:not(.is-hidden):last-child{
  right:-1px;}
  }
</style>