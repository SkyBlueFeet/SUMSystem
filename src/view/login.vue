<template>
  <div class="login">
    <div class="login-bg" :style="{ backgroundImage: `url(${bgName})` }"></div>
    <div class="login-title" :style="headPosition">
      <h1>欢迎使用学生会信息系统</h1>
    </div>
    <el-form
      v-loading="loading"
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="20px"
      class="demo-ruleForm login-form"
      :style="formPosition"
    >
      <h2>登录</h2>
      <el-form-item prop="account">
        <el-input prefix-icon="el-icon-user" v-model="loginForm.account" placeholder="学号" autofocus></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-bangzhu"
          v-model="loginForm.password"
          placeholder="密码"
          show-password
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="loginForm.loginType">
          <el-radio label="学生">学生</el-radio>
          <el-radio label="教师">教师</el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="isSave">
          <el-checkbox>记住密码</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button type="primary" style="width:100%;" @click="handleSubmit('loginForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-link @click="firstLoginDoc">首次登录须知</el-link>
      </el-form-item>
    </el-form>
    <el-footer height="4rem" class="layout-footer">
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
import { member } from "@/apis/feild";
import record_user from "@/utils/record_login";
import reqConfig from '@/utils/reqConfig';
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
  isSave = true;
  loading = false;
  loginConfig = require("@/copywriting/login.jsonc");
  loginForm = {
    account: "161400002102",
    password: "mayakun123",
    loginType: this.loginConfig.defaultLoginType
  };

  firstLoginDoc() {
    this.$router.push({
      name: "article",
      query: {
        type: "others",
        name: "首次登录须知"
      }
    });
  }

  open() {}

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
    this.$refs[formName].validate(async valid => {
      if (valid) {
        //
        this.loading = true;

        let lUser = new member();
        lUser.account = this.loginForm.account;
        lUser.password = this.loginForm.password;
        lUser.type = this.loginForm.loginType;
        lUser.name = "skyblue";
        lUser.number = "123456789";
        lUser.position = "学生会主席";
        lUser.alevel = 9;

        member.list();

        let res = await this.$axios({
          url: "/app/login",
          method: "post",
          data: lUser
        });
        if (res.key === 201) {
          this.$message({ message: res.message, type: "success" });
          this.$store.state.isLogin = true;
          this.$store.state.user = res.user;
          this.$router.push({ name: this.redirect });
          record_user.save(res.user);
        } else {
          const h=this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", null, "登录失败, "),
              h("i", { style: "color: teal" }, "请检查账号或者密码!")
            ]),
            type: "warning"
          });
        }
        this.loading = false;
      } else {
        this.$message.warning("请检查表单");
        return false;
      }
    });
  }
  async created() {
    this.redirect || this.redirect === "article"
      ? (this.redirect = this.$route.query.redirect)
      : (this.redirect = "index");
  }
  preventDefault() {
    document.body.style.overflow = "auto";
  }
}
</script>
<style lang="scss" scoped>
h1 {
  color: #fff;
}
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