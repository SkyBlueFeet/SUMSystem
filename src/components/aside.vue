<template>
 <el-row class="self-aside">
   <el-col :span="24" class="self-aside-m">
    <el-menu
      :default-active="this.$route.name"
      class="el-menu-vertical-demo self-aside-m"
      :unique-opened="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="dynamic" @click="log">
        <i class="el-icon-setting"></i>
        <span slot="title">实时动态</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Page</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="Table">Table</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="1111">
        <i class="el-icon-setting"></i>
        <span slot="title">头条创作者</span>
      </el-menu-item>
      <el-menu-item index="aCreater">
        <i class="el-icon-setting"></i>
        <span slot="title">文章创作者</span>
      </el-menu-item>
      <el-menu-item index="hlAudit">
        <i class="el-icon-setting"></i>
        <span slot="title">头条审核</span>
      </el-menu-item>
      <el-menu-item index="aAudit">
        <i class="el-icon-setting"></i>
        <span slot="title">文章审核</span>
      </el-menu-item>
    </el-menu>
  </el-col>
 </el-row>
</template>

<script>
 export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      log() {
        console.log(this.$route.name);
      },
    }
 }
</script>

<style scoped>
.self-aside{
  height:100%;
  width: 15%;
}
.self-aside-m{
  height:100%;
}
</style>

