<template>
  <div class="news">
    <div class="news-head">
      <div class="news-head-logo">
        <img :src="logo.Img" :width="logo.width" :height="logo.height" />
      </div>
    </div>
    <el-carousel :interval="3000">
      <el-carousel-item v-for="(item, index) in banner" :key="index" arrow="never">
        <router-link :to="bannerNews(item)">
          <el-image :src="item.name" @error="test(item.name)"></el-image>
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <div class="news-container">
      <el-row :gutter="20" class="news-row" :style="rowStyle">
        <template v-for="(item, index) of news.newsFeild">
          <el-col :span="18" :style="colStyle" :key="index">
            <el-card>
              <div slot="header" class="clearfix">
                <span>{{ item.name }}</span>
                <el-button class="news-more" type="text">
                  More
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </div>
              <div class="news-item">
                <template v-for="(news, index) in item.newsItem">
                  <div :key="index" class="news-row">
                    <div class="news-row-title" :title="news.title">
                      <el-link
                        @click="viewNews(news.title)"
                        :underline="false"
                        :title="news.title"
                      >{{ news.title }}</el-link>
                    </div>
                    <div class="news-row-date">{{ news.date }}</div>
                  </div>
                </template>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import reqConf from "@/utils/reqConfig";
import {
  Carousel,
  CarouselItem,
  Row,
  Col,
  Card,
  Button,
  Container,
  Link,
  Image,
  Tooltip
} from "element-ui";

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Container);
Vue.use(Link);
Vue.use(Tooltip);
Vue.use(Image);

@Component
export default class HelloWorld extends Vue {
  news = {};
  banner = [];
  logo = {};

  // get banner() {
  //   return this.news.banner.map((item, index) => {
  //     if (!item.name.startsWith("/"))
  //       item.name = require(`@/assets/${item.name}`);
  //     return item;
  //   });
  // }
  bannerNews(item) {
    return {
      name: "article",
      query: {
        type: "news",
        name: item.title
      }
    };
  }

  rowStyle = {
    margin: "25px 0px"
  };
  colStyle = {
    margin: "12px 0"
  };
  // lifecycle hook
  mounted() {}

  viewNews(newName) {
    this.$router.push({
      name: "article",
      query: {
        type: "news",
        name: newName
      }
    });
  }

  async created() {
    this.$store.state.isLoading = true;
    this.news = await reqConf("news.json");
    this.banner = this.news.banner.map((item, index) => {
      if (!item.name.startsWith("/"))
        item.name = require(`@/assets/${item.name}`);
      return item;
    });
    this.logo = {
      Img: require(`@/assets/${this.news.logo.name}`),
      width: this.news.logo.width,
      height: this.news.logo.height
    };
    this.$store.state.isLoading = false;
  }

  test(item) {
    this.$message.error(`无法加载${item}`);
  }

  // computed
  get computedMsg() {
    return "computed " + this.msg;
  }

  // method
  greet() {
    alert("greeting: " + this.msg);
  }
}
</script>
<style lang="scss">
.news {
  &-container {
    // padding: 15px;
    overflow: hidden;
  }

  &-row {
    margin-left: 25px;
  }
  &-more {
    float: right;
    padding: 3px 0;
  }
  &-head {
    margin: 0 0 6px 0;
    background-color: #245483;
    &-logo {
      height: 90px;
      width: auto;
      text-align: left;
      overflow: hidden;
    }
  }
  &-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }
  &-row {
    &-title,
    &-date {
      font-size: 12px;
      margin-bottom: 6px;
    }
    &-title {
      float: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80%;
    }
    &-date {
      color: #b4b4b4;
      float: right;
    }
  }

  .el-card__header {
    padding: 6px;
    text-align: left;
  }
  .el-card__body {
    padding: 9px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
