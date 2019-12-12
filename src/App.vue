<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view></router-view>
    <router-view class="nav-menu" name="navMenu"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
