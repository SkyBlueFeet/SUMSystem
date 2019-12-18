<template>
  <el-row>
    <el-col :span="4" :offset="2">
      <el-link :underline="false">当前时间:{{ newDate }}</el-link>
    </el-col>
    <template v-if="$store.state.isLogin">
      <el-col :span="1" :offset="14">
        <el-link :underline="false">学生会</el-link>
      </el-col>
      <el-col :span="3">
        <div class="custom-header-user_name">
          <el-dropdown trigger="click" szie="medium" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-link>
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userPage">
                个人主页
              </el-dropdown-item>
              <el-dropdown-item command="modifyingData">
                消息
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                注销
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </template>
    <template v-else>
      <el-col :span="4" v-if="!$store.state.isLogin" :offset="14">
        <el-link href="/login" :underline="false">未登录</el-link>
      </el-col>
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
  Col
} from "element-ui";
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(PageHeader);
Vue.use(Link);
Vue.use(Row);
Vue.use(Col);

@Component
export default class CustomHeader extends Vue {
  name = "CustomHeader";

  msg = "Welcome to Your Vue.js App";

  handleCommand(...arg) {
    if (arg[0] === "logout") {
      this.$store.state.isLogin = false;
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

  userName = "skyblue";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el {
  &-icon-s-operation {
    font-size: 20px;
  }
  &-avatar {
    margin: auto 0;
    // vertical-align: -0.75em;
  }
  &-dropdown {
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
}

.custom {
  &-header {
    &-user {
      width: auto;
      &_name {
        height: 58px;
        margin-left: 15px;
        line-height: 58px;
      }
    }
  }
}
</style>
