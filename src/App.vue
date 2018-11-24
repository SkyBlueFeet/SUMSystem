<template>
  <div id="app">
    <router-view/>
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
  height:98%;
}
.aside{
  height: 96%;
}
</style>

