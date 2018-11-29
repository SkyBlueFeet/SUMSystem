<template>
  <div id="app">
    <router-view name="header" class="header"></router-view>
    <router-view class="main"></router-view>
    <router-view name="aside" class="aside"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  position: relative;
  height:100%;
}
*{
  padding: 0px;
  margin: 0px;
}
.el-table th{
  height: 30px !important;
}
.aside{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 50px;
  z-index: 1000;
}
.header{
  position: fixed;
  top:0px;
  left: 0px;
  width: 100%;
  height: 50px;
  z-index: 1000;
  }
</style>

