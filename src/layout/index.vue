<template>
  <div v-loading.lock="$store.state.isLoading" class="index">
    <el-container class="layout-container">
      <el-header :style="headerStyle">
        <custom-header></custom-header>
      </el-header>
      <div class="main-container">
        <slot></slot>
        <modify-pwd></modify-pwd>
      </div>
    </el-container>
    <el-footer height="4rem" class="layout-footer">
      <custom-footer></custom-footer>
    </el-footer>
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
import modifyPwd from "@/components/modifyPwd.vue";

Vue.use(Container);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(PageHeader);



@Component({
  components: {
    NavMenu,
    CustomHeader,
    CustomCrumd,
    CustomFooter,
    modifyPwd
  }
})
export default class index extends Vue {
  headerHeight = "4rem";
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
  goBack() {
    console.log("go back");
  }

  submitForm(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
  handleClose(done) {
    this.$confirm("确认关闭？")
      .then(_ => {
        done();
      })
      .catch(_ => {});
  }
}
</script>

<style lang="scss">
.index {
  height: 100%;
  min-height: 100vh;
  position: relative;
  .main-container {
    margin: 72px 0 0 0;
  }
  .layout-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .layout-container {
    width: 1100px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
  .el-header {
    background-color: #fff;
    box-shadow: 0px 0px 5px #ccc;
  }
  .el-footer {
    line-height: 60px;
    box-shadow: 0px 0px 5px 0px #ccc;
  }
}
</style>