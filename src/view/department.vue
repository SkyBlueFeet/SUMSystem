<template>
  <el-table v-loading="isLoading" :data="tableData" border style="width: 100%">
    <el-table-column prop="createTime" label="创建日期" width="180"></el-table-column>
    <el-table-column prop="department" label="部门名称" width="180"></el-table-column>
    <el-table-column prop="minister" label="部长"></el-table-column>
    <el-table-column label width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="getMore(tableData[scope.$index])"
          type="text"
          size="small"
        >查看更多</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
@Component
export default class Department extends Vue {
  async created() {
    const depRes = await this.$axios({
      url: "/app/deportments",
      method: "post",
      data: null
    });
    this.isLoading = false;
    if (depRes.key === 200) {
      this.tableData = depRes.data.deportment;
    }
  }
  isLoading = true;
  tableData = [];
  getMore(arge) {
    console.log(arge);
    this.$router.push({
      name:"article",
      query: {
        type: "introduction",
        name: `${arge.department}介绍`
      }
    });
  }
}
</script>