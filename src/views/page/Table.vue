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
        <el-pagination
          @size-change="handleSizeChange"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
          :page-sizes="tableData.item"
          :page-size="tableData.pageLength"
          debounce="100"
          layout="total,sizes"
          :background="true"
          :total="tableData.tableDataLength"
        ></el-pagination>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click.native="log(page)" size="mini">
          <i class="iconfont icon-add"></i> 增加用户
        </el-button>
      </el-col>
      <el-col :offset="8" :span="4" class="filter">
        <el-button size="mini" @click.native="getTableData">
          <i class="iconfont icon-shuaxin"></i>
        </el-button>
        <el-button type="info" @click.native="Dialog=true" size="mini">
          <i class="iconfont icon-shaixuan1"></i> 自定义筛选
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-autocomplete
          placeholder="请输入内容"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          :debounce="200"
          size="small"
          select-when-unmatched
          @input.native="reGetData(search.searchValue)"
          @select="handleSelect"
          @compositionstart.native="handleInputState(true)"
          @compositionend.native="handleInputState(false)"
          v-model="search.searchValue"
          class="input-with-select"
        >
          <el-select
            @change="handleOption"
            slot="prepend"
            v-model="search.defaultOption.value"
            placeholder="请选择"
            style="width:100px;"
          >
            <el-option
              :label="index.label"
              :value="index.value"
              v-for="(index,item) in search.searchOptions"
              :key="item"
            >{{index.label}}</el-option>
          </el-select>
        </el-autocomplete>
      </el-col>
    </el-col>
    <el-col :offset="4" :span="20">
      <transition name="el-zoom-in-top">
        <el-table
          height="555"
          v-loading="loading"
          :empty-text="emptyText"
          element-loading-text="加载中..."
          @sort-change="SortChange"
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          @header-click="clickHeader"
          :highlight-current-row="true"
          style="width: 100%"
          border
        >
          <el-table-column
            sortable="custom"
            column-key="h_create_id"
            :sort-orders="sortorders"
            prop="h_create_id"
            label="ID"
            align="center"
            :resizable="false"
            width="120"
          ></el-table-column>
          <el-table-column
            sortable="custom"
            column-key="createdate"
            :sort-orders="sortorders"
            prop="createdate"
            label="注册日期"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="nickname"
            column-key="nickname"
            sortable="custom"
            label="头条号"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="realname"
            column-key="realname"
            sortable="custom"
            label="姓名"
            width="80"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="gender"
            column-key="gender"
            sortable="custom"
            label="性别"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="iscertification"
            column-key="iscertification"
            sortable="custom"
            label="是否实名"
            width="120"
            align="center"
            :formatter="iscertification"
          ></el-table-column>
          <el-table-column
            prop="account"
            column-key="account"
            label="账号"
            align="center"
            width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="compony"
            column-key="compony"
            label="单位"
            align="center"
            width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="focus"
            sortable="custom"
            column-key="focus"
            label="关注"
            align="center"
            width="120"
          ></el-table-column>
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
      <el-col :span="24">
        <el-col :span="11" :offset="13" class="block">
          <el-pagination
            v-if="tableData.paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="tableData.item"
            :page-size="tableData.pageLength"
            debounce="100"
            layout="sizes, prev, pager, next"
            :background="true"
            :total="tableData.tableDataLength"
          ></el-pagination>
        </el-col>
      </el-col>
    </el-col>
    <el-dialog
      :visible.sync="Dialog"
      width="35%"
      :lock-scroll="false"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <span slot="title">
        <i class="iconfont icon-shaixuan1"></i> 自定义筛选
      </span>
      <el-form
        :model="focusForm"
        status-icon
        :rules="rules2"
        ref="focusForm"
        label-width="90px"
        class="demo-ruleForm filterForm"
        inline
      >
        <el-form-item label="是否实名">
          <el-select size="mini" v-model="form.isc" @change="getItem_isc">
            <el-option
              v-for="item in iscOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select size="mini" v-model="form.gender" @change="getItem_gender">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间段" class="pointer">
          <el-date-picker
            size="mini"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            @change="log(form.DateScope)"
            :editable="false"
            v-model="form.DateScope"
            :default-value="form.defaultDate"
            type="daterange"
            align="right"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-form-item>
        <transition name="el-zoom-in-top">
          <el-form-item v-show="focusSelect" label="关注数">
            <el-select size="mini" @change="getForm_Focus" v-model="form.focus">
              <el-option :label="focusOptions_b.label" :value="focusOptions_b.value"></el-option>
              <el-option :label="focusOptions_t.label" :value="focusOptions_t.value"></el-option>
              <el-option
                v-for="item in focusOptions"
                :label="item.label"
                :value="item.value"
                :key="item.start"
              >
                <span style="font-size: 13px;text-align:center">{{ item.start }}-{{item.end}}</span>
              </el-option>
              <el-option :label="focusOptions_a.label" :value="focusOptions_a.value"></el-option>
              <el-option :label="focusOptions_c.label" :value="focusOptions_c.value"></el-option>
            </el-select>
          </el-form-item>
        </transition>
        <el-form-item
          :required="focusCustom"
          label=" "
          label-width="90px"
          prop="startFocus"
          v-show="focusCustom"
        >
          <el-input
            size="mini"
            style="width:120px"
            v-model.number="focusForm.startFocus"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :required="focusCustom"
          label=" "
          label-width="0px"
          prop="endFocus"
          v-show="focusCustom"
        >
          <el-input
            size="mini"
            style="width:120px"
            v-model.number="focusForm.endFocus"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleForm">筛 选</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import {
  id_desc_sort,
  id_asc_sort,
  date_asc_sort,
  date_desc_sort,
  nickname_desc_sort,
  nickname_asc_sort,
  realname_asc_sort,
  realname_desc_sort,
  gender_asc_sort,
  gender_desc_sort,
  isc_asc_sort,
  isc_desc_sort,
  focus_asc_sort,
  focus_desc_sort
} from "@/utils/table";
export default {
  data() {
    var checkNum = /^[0-9]*$/;
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkStartFocus = (rule, value, callback) => {
      if (this.focusCustom) {
        if (value === "") {
          callback("必填!");
        } else if (!checkNum.test(value)) {
          callback(new Error("请输入正确的数字"));
          this.log(checkNum.test(value));
        } else {
          if (this.focusForm.endFocus !== "") {
            this.$refs.focusForm.validateField("endFocus");
          }
          callback();
        }
      } else {
        this.$refs.focusForm.clearValidate("startFocus");
      }
    };
    var checkEndFocus = (rule, value, callback) => {
      if (this.focusCustom) {
        if (value === "") {
          callback("必填!");
        } else if (!checkNum.test(value)) {
          callback(new Error("请输入正确的数字"));
          this.log(checkNum.test(value));
        } else if (value < this.focusForm.startFocus) {
          callback(new Error("末值必须大于初值!"));
        } else {
          callback();
        }
      } else {
        this.$refs.focusForm.clearValidate("endFocus");
      }
    };
    return {
      focusForm: {
        startFocus: "",
        endFocus: "",
        age: ""
      },
      focusSelect: true,
      focusCustom: false,
      rules2: {
        startFocus: [
          {
            validator: checkStartFocus,
            trigger: "blur"
          }
        ],
        endFocus: [
          {
            validator: checkEndFocus,
            trigger: "blur"
          }
        ],
        age: [
          {
            validator: checkAge,
            trigger: "blur"
          }
        ]
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      defaultIsc: "null",
      Dialog: false,
      form: {
        name: "",
        DateScope: null,
        isc: null,
        focus: 5,
        startFocus: "",
        endFocus: "",
        defaultDate: this.timer(),
        gender: null
      },
      iscOptions: [
        {
          value: null,
          label: "不限"
        },
        {
          value: 1,
          label: "已实名"
        },
        {
          value: 0,
          label: "未实名"
        }
      ],
      genderOptions: [
        {
          value: null,
          label: "不限"
        },
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      focusOptions_t: {
        label: "1000以下",
        start: 0,
        end: 1000,
        value: 0
      },
      focusOptions: [
        {
          label: "1001 - 10000",
          start: 1001,
          end: 10000,
          value: 1
        },
        {
          label: "10000 - 100000",
          start: 10001,
          end: 100000,
          value: 2
        },
        {
          label: "100001 - 500000",
          start: 100001,
          end: "500000",
          value: 3
        }
      ],
      focusOptions_a: {
        label: "500000以上",
        start: 500001,
        value: 4
      },
      focusOptions_b: {
        label: "不限",
        value: 5
      },
      focusOptions_c: {
        label: "自定义",
        value: false
      },
      getInputState: false,
      loading: false,
      page: 1,
      emptyText: "暂无数据",
      sortorders: ["descending", "ascending", null],
      formLabelWidth: "120px",
      tableData: {
        pageData: [],
        dataAll: [],
        tableDataLength: 0,
        pageLength: 20,
        item: [20, 40, 50, 80, 100],
        paginationShow: true
      },
      search: {
        searchOptions: [
          {
            value: 0,
            label: "ID"
          },
          {
            value: 1,
            label: "创建日期"
          },
          {
            value: 2,
            label: "头条号"
          },
          {
            value: 3,
            label: "姓名"
          },
          {
            value: 4,
            label: "账号"
          },
          {
            value: 5,
            label: "单位"
          }
        ],
        defaultOption: {
          value: 2,
          label: "头条号"
        },
        searchValue: ""
      }
    };
  },
  watch: {},
  mounted() {
    this.getTableData();
    this.timer();
  },
  computed: {
    data() {
      let show = this.tableData.dataAll;
      let length = this.tableData.pageLength;
      let page = this.page;
      let start = length * (page - 1);
      let end = length * page;
      return show.slice(start, end);
    }
  },
  methods: {
    handleCancel() {
      //form清零
      this.Dialog = false;
      this.form.isc = null;
      this.form.DateScope = null;
      this.form.gender = null;
      this.focusCustom = false;
      this.focusForm.startFocus = "";
      this.focusForm.endFocus = "";
      this.form.focus = 5;
    },
    handleForm() {
      if (this.focusCustom) {
        this.submitForm("focusForm");
      } else {
        this.Dialog = false;
        this.loading = true;
        this.getFormToQuery();
      }
    },
    getFormToQuery() {
      setTimeout(() => {
        this.$post("/list/queryConditions", {
          isc: this.form.isc,
          gender: this.form.gender,
          date: this.form.DateScope,
          focusCustom: this.focusCustom,
          focus: this.focusCustom
            ? [this.focusForm.startFocus, this.focusForm.endFocus]
            : this.form.focus
        }).then(res => {
          let resData = res.data;
          this.tableData.dataAll = resData;
          this.tableData.pageData = this.tableData.dataAll.slice(
            0,
            this.tableData.pageLength
          );
          this.tableData.tableDataLength = resData.length;
          this.tableData.paginationShow = true;
          this.loading = false;
        });
      }, 500);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Dialog = false;
          this.loading = true;
          this.getFormToQuery();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    timer() {
      //获取当日时间的前几天日期
      const date = new Date();
      date.setDate(date.getDate() - 30);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const now_time = `${year}-${month}-${day}`;
      return now_time;
    },
    SortChange(column, prop, order) {
      this.Sort(column.order, column.prop);
    },
    Sort(order, object) {
      this.tableData.paginationShow = false;
      this.loading = true;
      this.page = 1;
      let data = this.tableData.dataAll;
      setTimeout(() => {
        switch (true) {
          case order === "descending" && object === "h_create_id":
            data = data.sort(id_desc_sort);
            break;
          case order === "ascending" && object === "h_create_id":
            data = data.sort(id_asc_sort);
            break;
          case order === "descending" && object === "createdate":
            data = data.sort(date_desc_sort);
            break;
          case order === "ascending" && object === "createdate":
            data = data.sort(id_asc_sort);
            break;
          case order === "ascending" && object === "nickname":
            data = data.sort(nickname_asc_sort);
            break;
          case order === "descending" && object === "nickname":
            data = data.sort(nickname_desc_sort);
            break;
          case order === "ascending" && object === "realname":
            data = data.sort(realname_asc_sort);
            break;
          case order === "descending" && object === "realname":
            data = data.sort(realname_desc_sort);
            break;
          case order === "ascending" && object === "gender":
            data = data.sort(gender_asc_sort);
            break;
          case order === "descending" && object === "gender":
            data = data.sort(gender_desc_sort);
            break;
          case order === "ascending" && object === "iscertification":
            data = data.sort(isc_asc_sort);
            break;
          case order === "descending" && object === "iscertification":
            data = data.sort(isc_desc_sort);
            break;
          case order === "ascending" && object === "account":
            data = data.sort(isc_asc_sort);
            break;
          case order === "descending" && object === "account":
            data = data.sort(isc_desc_sort);
            break;
          case order === "ascending" && object === "focus":
            data = data.sort(focus_asc_sort);
            break;
          case order === "descending" && object === "focus":
            data = data.sort(focus_desc_sort);
            break;
          default:
            data = data.sort(id_asc_sort);
            break;
        }
        this.tableData.paginationShow = true;
        this.loading = false;
      }, 100);
    },
    querySearchAsync(queryString, callback) {
      var list = [
        {
          value: this.search.searchValue
        }
      ];
      callback(list);
      if (this.getInputState === false) {
        this.$post("/list/searchLoad", {
          option: this.search.defaultOption.value,
          value: this.search.searchValue
        })
          .then(response => {
            //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
            // for (let i of response.data) {
            //   i.value = i.account; //将想要展示的数据作为value
            // }
            list = response.data;
            list.unshift({
              value: this.search.searchValue
            });
            callback(list);
          })
          .catch(error => {
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
        this.$post("/list/searchOption", {
          option: this.search.defaultOption.value,
          value: this.search.searchValue
        }).then(res => {
          let resData = res.data;
          this.tableData.dataAll = resData;
          this.tableData.tableDataLength = resData.length;
        });
        this.tableData.paginationShow = true;
        this.loading = false;
      }, 800);
    },
    filter() {
      this.form.DateScope === null
        ? this.log(`DateScope:${this.form.DateScope}`)
        : this.log(
            `DateScope:(start:${this.form.DateScope[0]},end:${
              this.form.DateScope[1]
            })`
          );
      this.form.focus === false
        ? this.log(
            `focus:(start:${this.form.startFocus},end:${this.form.endFocus})`
          )
        : this.log(`focus:${this.form.focus}`);
      this.log(`gender:${this.form.gender},isc:${this.form.isc}`);
    },
    getTableData() {
      //载入所有数据
      this.tableData.paginationShow = false;
      this.loading = true;
      this.tableData.dataAll = [];
      this.timeout = setTimeout(() => {
        this.$post("/list").then(res => {
          let resData = res.data;
          this.tableData.dataAll = resData;
          this.tableData.pageData = this.tableData.dataAll.slice(
            0,
            this.tableData.pageLength
          );
          this.tableData.tableDataLength = resData.length;
          this.tableData.paginationShow = true;
          this.loading = false;
        });
      }, 500);
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
      }, 100);
    },
    clickHeader(column, event) {
      //点击表头触发
      setTimeout(() => {
        this.$refs.multipleTable.clearSort();
        //this.$refs.multipleTable.doLayout();
        this.Sort("ascending", "h_create_id");
      }, 100);
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
      this.getInputState = bool;
      console.log(this.getInputState);
    },
    handleCurrentChange(val) {
      //切换页数
      this.loading = true;
      setTimeout(() => {
        this.page = val;
        this.loading = false;
      }, 100);
    },
    getForm_Focus(value) {
      this.log(value);
      if (value === false) {
        //this.focusSelect = false;
        this.focusCustom = true;
      } else {
        this.focusCustom = false;
      }
    },
    getItem_gender(item) {
      //选择性别
      this.form.gender = item;
    },
    getItem_isc(item) {
      //选择是否实名
      this.log(item);
    },
    showDialog(bool) {
      //显示Dialog
      this.showDialog2 = bool;
      this.showDialog1 = bool;
    },
    handleSelect(item) {
      //选中选项后处理
      console.log(item);
      this.handleSearch();
    },
    log(index) {
      console.log(index);
    },
    iscertification(row, column) {
      //0,1的转换
      return row.iscertification === 1 ? "已实名" : "未实名";
    },
    handleEdit(index, row) {
      //编辑按钮
      console.log(index, row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  padding-top: 50px;
}

.filterForm {
  height: 280px;
}

.unselect {
  /* Opera */
  -webkit-user-select: none !important;
  /* 禁选 */
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.tool_menu {
  padding: 10px;
}

.tool_menu_span {
  font-size: 13px;
  font-family: Arial;
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

.filter {
  text-align: center;
}

.self_dropdown:hover {
  border: 1px #409eff solid;
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

.pointer {
  cursor: pointer;
  /*鼠标变为手形*/
}

.block {
  padding: 10px;
}
</style>
