<template>
<el-row class="home">
  <el-col :offset="4" :span="20" class="tool_menu">
      <el-dropdown trigger="click" class="self_dropdown">
        <span class="el-dropdown-link">
          &nbsp;&nbsp;{{dropdown.defaultItem}}条/页&nbsp;&nbsp;<i class="el-icon-arrow-down el-icon--right self_dropdown_icon"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="self_dropdown_item">
          <el-dropdown-item @click.native="log(text)" v-for="text in dropdown.item" :key="text">{{text}}条/页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    <el-button type="primary">主要按钮</el-button>
  </el-col>
  <el-col :offset="4" :span="20">
  <el-table
    header-row-class-name="tableHeader"
    :header-row-style="header_row"
    height="530"
    v-loading="loading"
    ref="multipleTable"
    :data="tableData.defaultData"
    tooltip-effect="dark"
    :highlight-current-row="true"
    style="width: 100%"
    :border="true">
    <el-table-column
      prop="h_create_id"
      label="ID"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createdate"
      label="注册日期"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="头条号"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="realname"
      label="姓名"
      width="80"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      align="center"
      width="60">
    </el-table-column>
    <el-table-column
      prop="iscertification"
      label="是否实名"
      width="120"
      align="center"
      :formatter="iscertification"
      >
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      align="center"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="compony"
      label="单位"
      align="center"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="focus"
      label="关注"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      width="10">
<template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope" class="editBtn">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 40, 50]"
      :page-size="tableData.pageLength"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination"
      :total="tableData.tableDataLength">
    </el-pagination>
  </div>
  </el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      return {
        search:'',
        multipleSelection: [],
        currentPage4: 4,
        loading:false,
        header_row:{
          'color':'blue'
        },
        dropdown:{
          defaultItem:"20",
          item:[20,40,50]
        },
        tableData:{
          dataAll:[],
          defaultData:[],
          tableDataLength:0,
          pageLength:20,
        }
      }
    },
  mounted: function(){
      this.getTableData()
  },
    methods: {
      log(text){
        this.dropdown.defaultItem=text;
        this.handleSizeChange(text);
      },
      iscertification(row, column){
          return row.iscertification == 1 ? '已实名' : row.sex == 0 ? '未实名' : '未知';
      },
      handleEdit(index, row){
        console.log(index,row)
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      getTableData(){
        this.loading=true;
        this.$post('/list').then(res => {
          let resData=res.data;
          this.tableData.dataAll=resData;
          this.tableData.tableDataLength=resData.length;
          this.tableData.defaultData=resData.slice(0,20);
        });
        this.loading=false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.loading=true;
        this.tableData.pageLength=val;
        this.tableData.defaultData=this.tableData.dataAll.slice(0,val);
        this.loading=false;
      },
      handleCurrentChange(val) {
        let start=(this.tableData.pageLength)*(val-1);
        let end=(this.tableData.pageLength)*val;
        this.tableData.defaultData=this.tableData.dataAll.slice(start,end);
        //alert(`${start},${end}`);
      }
    }
  }
</script>
<style scoped>
.home{
  height: 100%;
  padding-top: 50px;
}
.tool_menu{
  height: 100px;
  padding: 10px;
}
.self_dropdown_block{
  width: 110px;
}
.self_dropdown{
  font-size: 13px;
  width: 100px;
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  border: 1px #ccc solid;
  outline:none !important;
  border-radius: 3px;
  cursor:pointer;
}
.self_dropdown:hover{
  border: 1px #409EFF solid;
}
.self_dropdown_icon{
  color: #ccc;
}
.self_dropdown_item{
  width: 110px;
}
.tableHeader{
  color: #409EFF;
}
.breadcrumb{
  line-height: 50px;
  height: 50px;
  width: 100%;
}
.block{
  position: relative;
  height: 30px;
  width: 100%;
}
.pagination{
  position: absolute;
  top:20px;
  right: 100px;
}
</style>

