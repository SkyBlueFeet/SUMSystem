<template>
  <el-row>
    <el-col :span="24" id="self-header">
      <a><el-col :span="1" class="self-header-menu" @click.native="log"><i class="iconfont icon-menu"></i></el-col></a>
      <el-col :span="2" class="self-header-h self-header-h-active">账号设置</el-col>
      <el-col :span="2" class="self-header-h" @click.native="log">个人信息</el-col>
    </el-col>
  </el-row>
</template>

<script>
 export default {
     data() {
      return {
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      log(){
        alert(1)
      }
    }
  }
</script>

<style scoped>
.self-header-menu{
  color: #ccc;

}
.self-header-h{
  color: #fff;
  opacity: 0.5;
  float: right;
  height:100%;
  display: block;
  background-color:rgb(84, 92, 100);
  transition:background-color 0.5s;
  -moz-transition:background-color 0.5s; /* Firefox 4 */
  -webkit-transition:background-color 0.5s; /* Safari and Chrome */
  -o-transition:background-color 0.5s; /* Opera */
  -webkit-user-select:none !important;/* 禁选 */
  -moz-user-select:none !important;
  -ms-user-select:none !important;
  user-select:none !important;
  cursor:pointer;/*鼠标变为手形*/
}
.self-header-h:hover{
  background-color: black;
}
.self-header-h.self-header-h-active{
  opacity: 1;
}
#self-header{
  height: 50px;
  width: 100%;
  background-color: rgb(84, 92, 100);
  line-height: 50px;
  text-align: center;
}
</style>
