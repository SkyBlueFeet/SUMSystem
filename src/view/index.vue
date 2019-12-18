<template>
  <div class="news">
    <div class="news-head">
      <div class="news-head-logo">
        <img :src="logo.Img" :width="logo.width" :height="logo.height" />
      </div>
    </div>
    <el-carousel :interval="3000">
      <el-carousel-item
        v-for="(item, index) in banner"
        :key="index"
        arrow="never"
      >
        <router-link :to="{ path: item.link }">
          <el-image :src="item.name" @error="test(item.name)"> </el-image>
          <!-- <img :title="item.title" :src="item.name" :alt="item.title" /> -->
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <div class="news-container">
      <el-row :gutter="20" class="news-row" :style="rowStyle">
        <template v-for="(item, index) of news.newsFeild">
          <el-col :span="12" :style="colStyle" :key="index">
            <el-card>
              <div slot="header" class="clearfix">
                <span>{{ item.name }}</span>
                <el-button class="news-more" type="text">
                  More<i class="el-icon-arrow-right"></i>
                </el-button>
              </div>
              <div
                v-for="(news, index) in item.newsItem"
                :key="index"
                class="news-item"
              >
                <div class="news-item-title" :title="news.title">
                  <el-link :underline="false" :title="news.title">
                    {{ news.title }}
                  </el-link>
                </div>
                <div class="news-item-date">
                  {{ news.date }}
                </div>
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
  news = require("@/copywriting/news.jsonc");
  get banner() {
    return this.news.banner.map((item, index) => {
      if (!item.name.startsWith("/"))
        item.name = require(`@/assets/banner/${item.name}`);
      return item;
    });
  }

  logo = {
    Img: require(`@/assets/${this.news.logo.name}`),
    width: this.news.logo.width,
    height: this.news.logo.height
  };

  rowStyle = {
    margin: "25px 0px"
  };
  colStyle = {
    margin: "12px 0"
  };
  // lifecycle hook
  mounted() {}

  created() {}

  test(item) {
    alert(item);
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
    width: 100%;
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
