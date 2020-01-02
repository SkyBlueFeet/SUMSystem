<template>
  <div class="admin">
    <el-container class="layout-container">
      <el-header height="4rem" class="layout-header">
        <custom-header></custom-header>
      </el-header>
      <el-container :style="mainStyle">
        <el-aside width="20rem" class="layout-aside">
          <nav-menu></nav-menu>
        </el-aside>
        <el-container class="layout-main">
          <el-main>
            <div class="main-container">
              <slot></slot>
            </div>
            <el-footer height="4rem" class="layout-footer">
              <custom-footer></custom-footer>
            </el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Header, Container, Main, Aside, Footer, PageHeader } from "element-ui";
import NavMenu from "@/components/NavMenu";
import CustomHeader from "@/components/CustomHeader";
import CustomFooter from "@/components/CustomFooter";
import CustomCrumd from "@/components/CustomCrumd";

Vue.use(Container);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(PageHeader);

// PageHeader;

@Component({
  components: {
    NavMenu,
    CustomHeader,
    CustomCrumd,
    CustomFooter
  }
})
export default class layout extends Vue {
  goBack() {
    console.log("go back");
  }
  mainStyle = {};
}
</script>

<style lang="scss">
$headerHeight: 4.3rem;
$asideWidth: 20rem;
$layoutIndex: 200;
.admin {
  .main-container {
    padding: 20px;
    min-height: calc(100% - 8rem);
  }
  .el-header {
    background-color: #fff;
    box-shadow: 0px 0px 5px #ccc;
  }
  .layout-header {
    width: 100%;
    height: $headerHeight;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $layoutIndex;
  }
  .layout-aside {
    width: $asideWidth;
    height: calc(100% - #{$headerHeight});
    position: fixed;
    top: $headerHeight;
    left: 0;
    z-index: $layoutIndex;
    background-color: #fff;
  }
  .layout-main {
    position: absolute;
    left: $asideWidth;
    top: $headerHeight;
    width: calc(100% - #{$asideWidth});
    min-height: calc(100% - #{$headerHeight});
  }
  .layout-footer {
    width: 100%;
    position: relative;
    top: 40px;
    line-height: 4rem;
    // position: absolute;
    // top: calc(100vh - #{$headerHeight});
    // left: $asideWidth;
    // width: calc(100% - #{$asideWidth});
  }
}
</style>