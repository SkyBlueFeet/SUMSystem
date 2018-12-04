<template>
<el-row class="home">
  <el-col :offset="4" :span="20" class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Page</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'Table'}">Table</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <el-col :offset="4" :span="20" class="tool_menu">
    <el-col :span="4">
      <el-pagination @size-change="handleSizeChange" :current-page.sync="page" @current-change="handleCurrentChange" :page-sizes="tableData.item" :page-size="tableData.pageLength" debounce="100" layout="total,sizes" :background="true" :total="tableData.tableDataLength">
      </el-pagination>
    </el-col>
    <el-col :offset="0" :span="2">
      <el-button type="primary" @click.native="log(page)" size="mini"><i class="iconfont icon-add"></i> 增加用户</el-button>
    </el-col>
    <el-col :offset="12" :span="6">
      <el-autocomplete placeholder="请输入内容" :fetch-suggestions="querySearchAsync" :trigger-on-focus="false" :debounce="200" size="small" select-when-unmatched @input.native="reGetData(search.searchValue)" @select="handleSelect"
          @compositionstart.native="handleInputState(true)" @compositionend.native="handleInputState(false)" v-model="search.searchValue" class="input-with-select">
        <el-select @change="handleOption" slot="prepend" v-model="search.defaultOption.value" placeholder="请选择" style="width:100px;">
          <el-option :label="index.label" :value="index.value" v-for="(index,item) in search.searchOptions" :key="item">{{index.label}}</el-option>
        </el-select>
      </el-autocomplete>
    </el-col>
  </el-col>
  <el-col :offset="4" :span="20">
    <transition name="el-zoom-in-top">
      <el-table height="530" v-loading="loading" element-loading-text="玩命加载中..." @sort-change="SortChange" ref="multipleTable" :data="data" tooltip-effect="dark" @header-click="clickHeader" :highlight-current-row="true" style="width: 100%" :border="true">
        <el-table-column sortable='custom' :sort-orders="['descending', 'ascending', null]" prop="h_create_id" label="ID" align="center" width="120">
        </el-table-column>
        <el-table-column prop="createdate" label="注册日期" align="center" width="120">
        </el-table-column>
        <el-table-column prop="nickname" label="头条号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="80" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gender" filter-placement="bottom" label="性别" align="center" :filters="genderfilters" :filter-method="filterTag" width="80">
        </el-table-column>
        <el-table-column prop="iscertification" filter-placement="bottom" label="是否实名" width="120" align="center" :filters="iscFilters" :filter-method="filterIsc" :formatter="iscertification">
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="compony" label="单位" align="center" width="120" show-overflow-tooltip>
          <span slot="empty">未填写</span>
        </el-table-column>
        <el-table-column prop="focus" label="关注" align="center" width="120">
        </el-table-column>
        <el-table-column width="10">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope" class="editBtn">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>
    <div class="block">
      <el-pagination v-if="tableData.paginationShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="tableData.item" :page-size="tableData.pageLength" debounce="100" layout="sizes, prev, pager, next" class="pagination"
          :background="true" :total="tableData.tableDataLength">
      </el-pagination>
    </div>
  </el-col>
</el-row>
</template>

<script>
import {
  my_desc_sort,
  my_asc_sort
} from '@/utils/table'
export default {
  data() {
    return {
      show: false,
      getInputState: false,
      loading: false,
      page: 1,
      id_order: '',
      genderfilters: [{
        text: '男',
        value: '男'
      }, {
        text: '女',
        value: '女'
      }],
      iscFilters: [{
        text: '已实名',
        value: 1
      }, {
        text: '未实名',
        value: 0
      }],
      tableData: {
        dataAll: [],
        tableDataLength: 0,
        pageLength: 20,
        item: [20, 40, 50, 80, 100],
        paginationShow: true,
      },
      search: {
        searchOptions: [{
          value: 0,
          label: 'ID'
          }, {
          value: 1,
          label: '创建日期'
          }, {
          value: 2,
          label: '头条号'
          }, {
          value: 3,
          label: '姓名'
          }, {
          value: 4,
          label: '账号'
          }, {
          value: 5,
          label: '单位'
          }],
        defaultOption: {
          value: 2,
          label: '头条号'
        },
        searchValue: ''
      },
    }
  },
  watch: {

  },
  mounted() {
    this.getTableData();
  },
  computed: {
    data() {
      let start = (this.tableData.pageLength) * (this.page - 1);
      let end = (this.tableData.pageLength) * this.page;
      return this.tableData.dataAll.slice(start, end)
    }
  },
  methods: {
    clickHeader(column, event) {
      this.$refs.multipleTable.clearSort();
    },
    SortChange(column, prop, order) {
      if (column.prop === 'h_create_id') this.idSort(column.order);
    },
    idSort(order) {
      console.log(order);
      this.tableData.paginationShow = false;
      this.loading = true;
      this.page = 1;
      if (order === 'descending') {
        this.id_order = 'descending';
        this.timeout = setTimeout(() => {
          this.tableData.dataAll = this.tableData.dataAll.sort(my_desc_sort);
          this.tableData.paginationShow = true;
          this.loading = false;
        }, 100);
      } else if (order === 'ascending') {
        this.id_order = 'ascending';
        this.timeout = setTimeout(() => {
          this.tableData.dataAll = this.tableData.dataAll.sort(my_asc_sort);
          this.tableData.paginationShow = true;
          this.loading = false;
        }, 100);
      }
    },
    handleSelect(item) {
      //选中选项后处理
      console.log(item);
      this.handleSearch();
    },
    querySearchAsync(queryString, callback) {
      var list = [{
        'value': this.search.searchValue
      }];
      callback(list);
      if (this.getInputState === false) {
        this.$post('/list/searchLoad', {
          option: this.search.defaultOption.value,
          value: this.search.searchValue
        }).then(response => {
          //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
          // for (let i of response.data) {
          //   i.value = i.account; //将想要展示的数据作为value
          // }
          list = response.data;
          list.unshift({
            'value': this.search.searchValue
          })
          callback(list);
        }).catch((error) => {
          this.log(error);
        });
      }
    },
    reGetData(text) {
      //处理搜索框长度为0后的数据重载
      //由于中文输入法输入时会触发input事件,导致多次数据重载,
      //故使用compositionstart,compositionend事件判断输入状态
      //当getInputState===true && search.searchValue.length===0时数据重载
      if (text.length === 0 && this.getInputState === false) {
        this.getTableData();
      }
    },
    handleSearch() {
      //搜索函数,发送搜索选项
      this.loading = true;
      this.tableData.paginationShow = false;
      this.tableData.dataAll = [];
      this.timeout = setTimeout(() => {
        this.$post('/list/searchOption', {
          option: this.search.defaultOption.value,
          value: this.search.searchValue
        }).then(res => {
          let resData = res.data;
          this.tableData.dataAll = resData;
          this.tableData.tableDataLength = resData.length;
        });
        this.tableData.paginationShow = true;
        this.loading = false;
      }, 1000);
    },
    handleOption(command) {
      //更改显示的搜索选项
      this.search.defaultOption.value = command;
      if (this.search.searchValue.length > 0) {
        this.handleSearch();
      }
    },
    handleInputState(bool) {
      //compositionstart,compositionend事件触发,获取汉字输入状态
      this.getInputState = bool
      console.log(this.getInputState)
    },
    getTableData() {
      //载入所有数据
      this.tableData.paginationShow = false;
      this.loading = true;
      this.tableData.dataAll = [];
      this.timeout = setTimeout(() => {
        this.$post('/list').then(res => {
          let resData = res.data;
          this.tableData.dataAll = resData;
          this.tableData.tableDataLength = resData.length;
          this.tableData.paginationShow = true;
          this.loading = false;
        });
      }, 1000);
    },
    handleSizeChange(val) {
      //改变每页数据条数
      this.loading = true;
      this.tableData.paginationShow = false;
      this.page = 1;
      setTimeout(() => {
        this.tableData.pageLength = val;
        this.tableData.paginationShow = true;
        this.loading = false;
      }, 100)
    },
    handleCurrentChange(val) {
      //装载每页数据
      this.page = val;
    },
    log(row, index) {
      console.log(row, index)
    },
    iscertification(row, column) {
      //0,1的转换
      return row.iscertification == 1 ? '已实名' : row.sex == 0 ? '未实名' : '未知';
    },
    handleEdit(index, row) {
      //编辑按钮
      console.log(index, row)
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
    filterTag: (value, row) => {
      //性别筛选
      return row.gender === value
    },
    filterIsc: (value, row) => {
      //是否实名筛选
      return row.iscertification === value
    },
  }
}
</script>
<style scoped>
.home {
  height: 100%;
  padding-top: 50px;
}

.tool_menu {
  padding: 10px;
}

.tool_menu_span {
  font-size: 13px;
  font-family: Arial;
}

.selectLen {
  width: 100px;
}

.searchOption {
  cursor: pointer;
  padding-top: 5px;
  text-align: center;
}

.self_dropdown_block {
  width: 120px;
}

.self_dropdown {
  font-size: 13px;
  width: 110px;
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  border: 1px #ccc solid;
  outline: none !important;
  border-radius: 3px;
  cursor: pointer;
}

.self_dropdown:hover {
  border: 1px #409EFF solid;
}

.self_dropdown_icon {
  color: #ccc;
}

.self_dropdown_item {
  width: 120px;
}

.breadcrumb {
  padding-top: 20px;
  height: 40px;
  cursor: pointer;
}

.top_block {
  position: relative;
  height: 30px;
  width: 100%;
}

.block {
  position: relative;
  height: 30px;
  width: 100%;
}

.pagination {
  position: absolute;
  top: 20px;
  right: 100px;
}
</style>
