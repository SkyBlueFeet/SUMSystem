<template>
  <div class="admin">
    <el-container class="layout-container">
      <el-header class="layout-header">
        <custom-header></custom-header>
      </el-header>
      <el-container>
        <el-aside class="layout-aside">
          <nav-menu></nav-menu>
        </el-aside>
        <el-container class="layout-main">
          <el-main>
            <pack-crumd></pack-crumd>
            <div class="main-container">
              <slot></slot>
            </div>
            <el-footer class="layout-footer">
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
import PackCrumd from "@/components/PackCrumd";

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
    PackCrumd,
    CustomFooter
  }
})
export default class layout extends Vue {
  headerHeight = "72px";
  asideWidth = "300px";
  layoutIndex = 200;
  headerStyle = {
    width: "100%",
    height: this.headerHeight,
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: this.layoutIndex
  };
  asideStyle = {
    width: this.asideWidth,
    height: "100%",
    position: "fixed",
    top: this.headerHeight,
    left: "0",
    zIndex: this.layoutIndex
  };
  mainStyle = {
    position: "absolute",
    left: this.asideStyle.width,
    top: this.headerStyle.height,
    width: "calc(100% - " + this.asideStyle.width + ")",
    height: "100%"
  };
  footerStyle = {
    position: "absolute",
    bottom: 0,
    left: this.asideStyle.width,
    width: "calc(100% - " + this.asideStyle.width + ")"
  };
  goBack() {
    console.log("go back");
  }
}
</script>

<style lang="scss">
$headerHeight: 72px;
$asideWidth: 300px;
$layoutIndex: 200;
.admin {
  .main-container {
    margin: 15px;
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
    height: 100%;
    position: fixed;
    top: $headerHeight;
    left: 0;
    z-index: $layoutIndex;
  }
  .layout-main {
    position: absolute;
    left: $asideWidth;
    top: $headerHeight;
    width: calc(100% - #{$asideWidth});
    // height: 100%;
  }
  .layout-footer {
    width: 100%;
    // position: absolute;
    // top: calc(100vh - #{$headerHeight});
    // left: $asideWidth;
    // width: calc(100% - #{$asideWidth});
  }
}
</style>