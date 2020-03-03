<template>
  <el-row>
    <!-- <el-col :span="4" :offset="2">
      <el-link :underline="false">当前时间:{{ newDate }}</el-link>
    </el-col>-->
    <el-col :span="2" :offset="2">
      <el-link :disabled="$route.name === 'index'" @click="toRouter('index')">学校动态</el-link>
    </el-col>
    <el-col :span="3" v-if="$store.state.isLogin">
      <el-link :disabled="$route.name === 'department'" @click="toRouter('department')">部门职能与规章制度</el-link>
    </el-col>
    <template>
      <template v-if="$store.state.isLogin">
        <el-col :span="3" :offset="11">
          <div class="custom-header-dropdown">
            <el-dropdown trigger="click" szie="medium" @command="selectDep">
              <span class="el-dropdown-link">
                <el-link :underline="false">
                  事务管理
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(nav, index) in adminDep" v-if="nav">
                  <el-dropdown-item :command="nav.index" :key="index">{{ nav.name }}</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="custom-header-dropdown">
            <el-dropdown trigger="click" szie="medium" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-link :underline="false">
                  {{ userName }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userPage">个人主页</el-dropdown-item>
                <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="4" v-if="!$store.state.isLogin" :offset="13">
          <el-link
            @click="
              toRouter('login', {
                query: {
                  redirect: $route.name
                }
              })
            "
            :underline="false"
          >未登录</el-link>
        </el-col>
      </template>
    </template>
  </el-row>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import dateFormat from "@/utils/dateFormat";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  PageHeader,
  Link,
  Row,
  Col,
  Dialog
} from "element-ui";
import record_login from "@/utils/record_login";
import dep from "@/utils/dep";

Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(PageHeader);
Vue.use(Link);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);

@Component
export default class CustomHeader extends Vue {
  dialogVisible = false;
  name = "CustomHeader";

  msg = "Welcome to Your Vue.js App";

  async created() {
    this.adminDep = await dep();
    // this.user = JSON.parse(this.$store.state.user);
  }

  get user() {
    return this.$store.state.user;
  }
  adminDep = [];

  // adminDep = dep(this.user);

  selectDep(command) {
    if (command !== this.$route.params.department) {
      this.$router.push({
        name: "transaction",
        params: {
          department: command
        }
      });
    }
  }

  toRouter(routeName, options) {
    let rootPath = this.$router.options.mode === "hash" ? "/#/" : "/";
    if (routeName === "login") {
      let a = document.createElement("a");
      a.setAttribute("href", `${rootPath}login`);
      a.setAttribute("target", "_blank");
      a.click();
    } else {
      this.$router.push({
        name: routeName,
        ...options
      });
    }
  }

  handleCommand(command) {
    if (command === "logout") {
      this.$store.state.isLogin = false;
      this.$axios({
        url: "/app/logout",
        method: "post"
      });
      record_login.remove();
    } else if (command === "userPage") {
      this.$router.push({
        name: "user",
        params: {
          name: this.user.name,
          userId: this.user.id
        }
      });
    } else if (command === "modifyPwd") {
      this.$store.state.dialogVisible = true;
    }
  }

  date = new Date();

  mounted() {
    const _this = this;
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
    }, 1000);
  }

  get newDate() {
    return dateFormat(this.date, "yyyy-MM-dd HH:mm:ss");
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在Vue实例销毁前，清除定时器
    }
  }

  get userName() {
    return this.user.name || "ERROR";
  }

  goBack() {
    this.$router.go(-1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-icon-s-operation {
  font-size: 20px;
}
.el-link.is-disabled {
  cursor: default;
}
.el-row,
.el-col,
.el-link {
  height: 100%;
  text-align: center;
}
.el-dropdown {
  height: 100%;
  &-link {
    color: #fff;
  }
  &-menu {
    width: 180px;
    &__item {
      text-align: center;
    }
  }
}

.custom-header-dropdown {
  height: 100%;
  margin-left: 15px;
  line-height: 58px;
}
</style>
