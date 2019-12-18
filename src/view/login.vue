<template>
  <div class="login">
    <div class="login-bg" :style="{ backgroundImage: `url(${bgName})` }"></div>
    <div class="login-title" :style="headPosition">
      <h1>欢迎使用学生会信息系统</h1>
    </div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="20px"
      class="demo-ruleForm login-form"
      :style="formPosition"
    >
      <h2>登录</h2>
      <el-form-item prop="account">
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.account"
          placeholder="学号"
          autofocus
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-bangzhu"
          v-model="loginForm.password"
          placeholder="密码"
          show-password
          autofocus
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="loginForm.loginType">
          <el-radio label="student">
            学生
          </el-radio>
          <el-radio label="teacher">
            教师
          </el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="isSave">
          <el-checkbox>记住密码</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button
          type="primary"
          style="width:100%;"
          @click="handleSubmit('loginForm')"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-link href="/doc/首次登录须知" :underline="false">
          首次登录须知
        </el-link>
      </el-form-item>
    </el-form>
    <el-footer class="layout-footer">
      <custom-footer></custom-footer>
    </el-footer>
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";

import {
  Button,
  Form,
  FormItem,
  Radio,
  Checkbox,
  Input,
  CheckboxGroup,
  RadioGroup,
  Footer,
  Link
} from "element-ui";
import CustomFooter from "../components/CustomFooter";
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Footer);
Vue.use(Link);
@Component({
  components: {
    CustomFooter
  }
})
export default class login extends Vue {
  isSave = false;
  loginConfig = require("@/copywriting/login.jsonc");
  loginForm = {
    account: "admin",
    password: "123456789",
    loginType: this.loginConfig.defaultLoginType
  };

  get bgName() {
    return require(`@/assets/${this.loginConfig.bgName}`);
  }

  get rules() {
    return this.loginConfig.rules;
  }

  get formPosition() {
    return this.loginConfig.position.form;
  }
  get headPosition() {
    return this.loginConfig.position.head;
  }

  handleSubmit(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        this.$store.state.isLogin = true;
        this.$router.push({ name: "index" });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  created() {}
  preventDefault() {
    document.body.style.overflow = "auto";
  }

  // get loginbg() {
  //   return require(`@/assets/${this.loginConfig.bgName}`);
  // }
}
</script>
<style lang="scss" scoped>
.login {
  h2 {
    margin: 30px;
  }
  &-title {
    color: #fff;
    position: absolute;
  }
  &-bg {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-size: cover;
    height: 100vh;
    filter: (2px);
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(3px);
    }
  }

  &-form {
    border-radius: 5px;
    // margin: 60px 60px 45px auto;
    width: 350px;
    padding: 35px 45px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    z-index: 200;
  }
  .layout-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    background-color: rgba($color: #000000, $alpha: 0.2);
    color: #fff;
  }
  .el-radio-group {
    float: right;
    line-height: 55px;
  }
  .el-checkbox-group {
    float: left;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    // text-align: left;
  }
  .el-form-item {
    text-align: left;
  }
}
</style>