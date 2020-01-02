<template>
  <div class="transaction">
    <el-tabs v-model="activeName" @tab-click="handleClick" keep-alive>
      <el-tab-pane v-loading="tableIsLoading" label="成员管理" name="member">
        <div class="transaction-operate">
          <el-button
            @click.native.prevent="addNew('member')"
            type="primary"
            icon="el-icon-plus"
          >新成员</el-button>
        </div>
        <div class="pack-table">
          <el-table stripe border :data="memberData">
            <template v-for="(item,key,index) of memberConfig" v-if="item.show">
              <el-table-column
                :formatter="dateFormat"
                :fixed="item.isFixed"
                :label="item.label"
                :prop="key"
                :key="index"
              ></el-table-column>
            </template>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="handleEdit('member',scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete('member',scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane v-loading="tableIsLoading" lazy label="财务管理" name="finance">
        <div class="transaction-operate">
          <el-button
            @click.native.prevent="addNew('finance')"
            type="primary"
            icon="el-icon-plus"
          >添加</el-button>
        </div>
        <div class="pack-table">
          <el-table stripe border :data="financeData">
            <template v-for="(item,key,index) of financeConfig" v-if="item.show">
              <el-table-column
                :formatter="dateFormat"
                :fixed="item.isFixed"
                :label="item.label"
                :prop="key"
                :key="index"
              ></el-table-column>
            </template>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane v-loading="tableIsLoading" lazy label="物品管理" name="goods">
        <div class="transaction-operate">
          <el-button
            @click.native.prevent="addNew('goods')"
            type="primary"
            icon="el-icon-plus"
          >登记新成员</el-button>
        </div>
        <div class="pack-table">
          <el-table stripe border :data="goodsData">
            <template v-for="(item,key,index) of goodsConfig" v-if="item.show">
              <el-table-column
                :formatter="dateFormat"
                :fixed="item.isFixed"
                :label="item.label"
                :prop="key"
                :key="index"
              ></el-table-column>
            </template>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="handleEdit('goods',scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete('goods',scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane lazy v-loading="tableIsLoading" label="文档管理" name="document">
        <div class="transaction-operate">
          <el-button
            @click.native.prevent="addNew('document')"
            type="primary"
            icon="el-icon-plus"
          >新文档</el-button>
        </div>
        <div class="pack-table">
          <el-table stripe border :data="documentData">
            <template v-for="(item,key,index) of documentConfig" v-if="item.show">
              <el-table-column
                :formatter="dateFormat"
                :fixed="item.isFixed"
                :label="item.label"
                :prop="key"
                :key="index"
              ></el-table-column>
            </template>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="handleEdit('document',scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete('document',scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane v-loading="tableIsLoading" label="物品借还记录" name="record">
        <div class="transaction-operate">
          <el-button
            @click.native.prevent="addNew('record')"
            type="primary"
            icon="el-icon-plus"
          >新纪录</el-button>
        </div>
        <div class="pack-table">
          <el-table stripe border :data="recordData">
            <template v-for="(item,key,index) of recordConfig" v-if="item.show">
              <el-table-column
                :formatter="dateFormat"
                :fixed="item.isFixed"
                :label="item.label"
                :prop="key"
                :key="index"
              ></el-table-column>
            </template>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="handleEdit('record',scope.$index, scope.row)"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog.member"
        direction="rtl"
        custom-class="demo-drawer"
        :with-header="false"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form
            :model="form.member"
            :rules="rules.member"
            ref="member"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item hidden label="id" prop="id">
              <el-input readonly v-model="form.member.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="form.member.name"></el-input>
            </el-form-item>
            <el-form-item label="学号/教工号" prop="account">
              <el-input type="text" v-model.trim.number="form.member.account"></el-input>
            </el-form-item>
            <el-form-item label="加入时间" prop="joinTime">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="form.member.joinTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-select v-model="form.member.department">
                <el-option
                  v-for="(item,index) of allDep"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
                <el-option label="其他" value="OTHERS"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号等级" prop="alevel">
              <el-select clearable v-model.number="form.member.alevel">
                <el-option
                  v-for="(item,index) in alevelOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份" prop="type">
              <el-radio v-model="form.member.type" label="学生"></el-radio>
              <el-radio v-model="form.member.type" label="老师"></el-radio>
            </el-form-item>
            <el-form-item label="职位" prop="position">
              <el-select clearable v-model.number="form.member.position">
                <el-option
                  v-for="(item,index) in positionList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="number">
              <el-input v-model.trim.number="form.member.number"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('member')"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
          <!-- @click="$refs.drawer.closeDrawer()" -->
        </div>
      </el-drawer>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog.finance"
        direction="rtl"
        custom-class="demo-drawer"
        :with-header="false"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form
            :rules="rules.finance"
            ref="finance"
            :model="form.finance"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item hidden label="id" prop="id">
              <el-input type="text" v-model="form.finance.id"></el-input>
            </el-form-item>
            <el-form-item label="条目名称" prop="applyName">
              <el-input type="text" v-model="form.finance.applyName"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="amount">
              <el-input placeholder="请输入金额" type="text" v-model.number.trim="form.finance.amount">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="用途" prop="use">
              <el-input type="textarea" v-model="form.finance.use"></el-input>
            </el-form-item>
            <el-form-item label="申请人" prop="applicant">
              <el-input type="text" v-model="form.finance.applicant"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="number">
              <el-input type="text" v-model.number="form.finance.number"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" prop="applicaTime">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="form.finance.applicaTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-select v-model="form.finance.department">
                <el-option
                  v-for="(item,index) in allDep"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
                <el-option label="其他" value="OTHERS"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('finance')"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog.goods"
        direction="rtl"
        custom-class="demo-drawer"
        :with-header="false"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form
            :rules="rules.goods"
            ref="goods"
            :model="form.goods"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item hidden label="id" prop="id">
              <el-input type="text" v-model="form.goods.id"></el-input>
            </el-form-item>
            <el-form-item label="物品名称" prop="name">
              <el-input type="text" v-model="form.goods.name"></el-input>
            </el-form-item>
            <el-form-item label="购买单价" prop="unitPrice">
              <el-input placeholder="请输入金额" v-model.number.trim="form.goods.unitPrice">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="购买时间" prop="buyTime">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="form.goods.buyTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-select v-model="form.goods.department">
                <el-option
                  v-for="(item,index) in allDep"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
                <el-option label="其他" value="OTHERS"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('goods')"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog.document"
        direction="rtl"
        custom-class="demo-drawer"
        :with-header="false"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form
            :model="form.document"
            :rules="rules.document"
            ref="document"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item hidden label="id" prop="id">
              <el-input readonly v-model="form.document.id"></el-input>
            </el-form-item>
            <el-form-item hidden aria-hidden prop="fileName">
              <el-input type="hidden" v-model="form.document.fileName"></el-input>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-upload
                class="upload-demo"
                :action="fileAction"
                ref="upload"
                :on-change="checkFile"
                :auto-upload="false"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                accept="application/pdf"
              >
                <el-button @click="clearFileList" slot="trigger" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="负责人" prop="principal">
              <el-input type="text" v-model="form.document.principal"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-select v-model="form.document.department">
                <el-option
                  v-for="(item,index) in allDep"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
                <el-option label="其他" value="OTHERS"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="存档日期" prop="archiveDate">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="form.document.archiveDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.document.remark"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('document')"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog.record"
        direction="rtl"
        custom-class="demo-drawer"
        :with-header="false"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form
            :model="form.record"
            :rules="rules.record"
            ref="record"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item hidden label="id" prop="id">
              <el-input readonly v-model="form.record.id"></el-input>
            </el-form-item>
            <el-form-item label="物品名称" prop="goodsName">
              <el-select v-model="form.record.goodsName">
                <el-option
                  v-for="(item,index) in goodsList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出借时间" prop="lendTime">
              <el-date-picker v-model="form.record.lendTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="出借人" prop="lender">
              <el-input v-model="form.record.lender"></el-input>
            </el-form-item>
            <el-form-item label="出借人电话" prop="lenderNumber">
              <el-input v-model.number.trim="form.record.lenderNumber"></el-input>
            </el-form-item>
            <el-form-item label="归还时间" prop="returnTime">
              <el-date-picker v-model="form.record.returnTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="归还人" prop="returnee">
              <el-input v-model="form.record.returnee"></el-input>
            </el-form-item>
            <el-form-item label="归还人电话" prop="returnNumber">
              <el-input type="text" v-model.trim.number="form.record.returnNumber"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-select v-model="form.record.department">
                <el-option
                  v-for="(item,index) in allDep"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
                <el-option label="其他" value="OTHERS"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('record')"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import db, {
  member,
  finance,
  document as iDocument,
  goods,
  record
} from "@/apis/feild";
import ucFirst from "@/utils/ucFirst";
import dep from "@/utils/dep";
import reqConf from '@/utils/reqConfig';
import {
  Tabs,
  TabPane,
  Popover,
  Tag,
  Drawer,
  Option,
  Select,
  DatePicker,
  Upload
} from "element-ui";
import dateFormat from "@/utils/dateFormat";
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Drawer);
Vue.use(Option);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Upload);
const checkAmount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入金额"));
  } else if (!Number.isInteger(value)) {
    callback(new Error("请输入合法的金额"));
  } else {
    callback();
  }
};

const checkAccount = (rule, value, callback) => {
  if (!Number.isInteger(value)) {
    callback(new Error("请输入合法的学号/教工号"));
  } else {
    callback();
  }
};

const checkPhone = (rule, value, callback) => {
  let checkMobilePhone = /^1(3|4|5|7|8)\d{9}$/;
  if (checkMobilePhone.test(value)) {
    callback();
  } else {
    callback(new Error("请输入合法的联系方式"));
  }
};

@Component({
  components: {},
  watch: {
    $route(oldRoute, newRoute) {
      if (oldRoute.name === newRoute.name && oldRoute.name === "transaction")
        this.loadData(this.activeName);
    }
  }
})
export default class transaction extends Vue {
  timer = null;
  memberIsLoading = true;
  financeIsLoading = true;
  goodsIsLoading = true;
  documentIsLoading = true;
  recordIsLoading = true;
  fileAction ="/app/ReceiveFile";
    // process.env !== "production" ? "/api/app/ReceiveFile" : "/app/ReceiveFile";
  form = {
    member: {
      ...member.mapping
    },
    finance: {
      ...finance.mapping
    },
    goods: {
      ...goods.mapping
    },
    document: {
      ...iDocument.mapping
    },
    record: {
      ...record.mapping
    }
  };

  get alevelOption() {
    return this.transactionConfig.alevelOption;
  }

  dialog = {
    member: false,
    finance: false,
    goods: false,
    document: false,
    record: false
  };

  uploadButton = false;

  status = "";

  get format() {
    return this.transactionConfig.format;
  }

  get rules() {
    const rules = this.transactionConfig.rules;
    let numberFeilds = ["lenderNumber", "number", "returnNumber"];
    let amountFeilds = ["unitPrice", "amount"];
    for (let [key, value] of Object.entries(rules)) {
      for (const [subKey, subVal] of Object.entries(value)) {
        if (numberFeilds.includes(subKey)) {
          subVal.push({
            validator: checkPhone,
            trigger: "blur"
          });
        } else if (amountFeilds.includes(subKey)) {
          subVal.push({
            validator: checkAmount,
            trigger: "blur"
          });
        }
      }
    }
    return rules;
  }

  get positionList() {
    return this.transactionConfig.positionList;
  }

  dateFormat(row, column, cellValue, index) {
    let columns = [
      "lendTime",
      "returnTime",
      "archiveDate",
      "buyTime",
      "applicaTime"
    ];
    if (columns.includes(column.property)) {
      cellValue = dateFormat(new Date(cellValue), this.format);
    }
    return cellValue;
  }

  data = {
    member: [],
    finance: [],
    goods: [],
    document: [],
    record: []
  };
  memberData = [];
  financeData = [];
  goodsData = [];
  documentData = [];
  recordData = [];
  file = {};
  fileList = [];

  get resMessage() {
    return this.transactionConfig.resMessage;
  }

  handlePreview(file, list) {
    if (file.status === "success") {
      const a = document.createElement("a");
      a.setAttribute("href", file.url);
      a.setAttribute("target", "_blank");
      a.click();
    }
  }

  submitForm(formName) {
    if (
      this.activeName === "document" &&
      this.$refs.upload.uploadFiles.length === 0
    ) {
      this.$message.warning("请选择文件");
    } else {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = {
            type: this.status,
            ...this.$route.params,
            modifyData: {
              ...this.form[formName]
            }
          };
          let res = await this.$axios({
            url: `/app/modify${ucFirst(formName)}`,
            method: "post",
            data: data
          });
          if (this.activeName == "document") {
            if (
              (this.file.name !== this.form.document.fileName ||
                this.file.dep !== this.form.document.department) &&
              this.status === "edit"
            ) {
              this.deleteFile(this.file);
            }

            this.$refs.upload.submit();
          }
          if (res.key === 200) {
            this.$message.success(`${this.resMessage[this.status]}成功!`);
            this[`${formName}Data`] = res.data[formName];
          }
          return true;
        } else {
          this.$message.error("请检查表单!");
          return false;
        }
      });
    }
  }

  clearFileList(...arg) {
    this.$refs.upload.clearFiles();
  }

  submitUpload(...arg) {}

  checkFile(files, fileList) {
    this.form.document.fileName = files.name;
  }
  handleRemove(file, fileList) {}

  async deleteFile(message) {
    let res = await this.$axios({
      url: "/app/deleteFile",
      method: "post",
      data: message
    });
    if (res.key === 200) {
      return true;
    } else {
      return false;
    }
  }
  handleExceed(files, fileList) {}
  beforeRemove(file, fileList) {}

  addNew(form) {
    this.dialog[form] = true;
    this.status = "add";
    this.form[form] = {};
    this.fileList = [];
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }

  loading = false;

  activeName = "member";

  activeDialog = "";

  async handleClick(tab, event) {
    this.loadData(tab.name);
  }

  tableIsLoading = true;

  async loadData() {
    this.tableIsLoading = true;

    const dataRes = await this.$axios({
      url: `app/${this.activeName}s`,
      method: "post",
      data: this.$route.params
    });
    if (this.activeName === "record") {
      const goodsListRes = await this.$axios({
        url: "app/goodsList",
        method: "post",
        data: this.$route.params
      });
      if (goodsListRes.key === 200) {
        this.goodsList = goodsListRes.data.goodsList;
      }
    }
    if (dataRes.key === 200) {
      this[`${this.activeName}Data`] = dataRes.data[this.activeName];
    }
    this.tableIsLoading = false;
  }

  async handleEdit(name, index, row) {
    if (this.activeName === "document") {
      this.file = {
        name: row.fileName
      };
      let result = await this.$axios({
        url: "app/checkFile",
        method: "post",
        data: this.file
      });
      if (result.key === 200) {
        this.fileList = [
          {
            name: row.fileName,
            url: `/api/app/showPdf?name=${row.fileName}`
          }
        ];
      } else {
        this.fileList = [];
        this.$message.warning("未找到文件,请重新上传!");
      }
    }
    this.activeDialog = name;
    this.dialog[name] = true;
    this.status = "edit";
    this.form[name] = {
      ...row
    };
  }

  async handleDelete(name, index, row) {
    this.status = "delete";
    this.loadData(name);
    const data = {
      type: this.status,
      ...this.$route.params,
      modifyData: {
        ...row
      }
    };
    this.deleteFile({
      department: row.department,
      name: row.fileName
    });
    let res = await this.$axios({
      url: `/app/modify${ucFirst(name)}`,
      method: "post",
      data: data
    });
    if (res.key === 200) {
      this.$message.success(`${this.resMessage[this.status]}成功!`);
      this[`${name}Data`] = res.data[name];
    }
  }
  allDep = [];
  goodsList = [];

  handleClose(hidden) {
    this.$confirm("是否关闭表单?")
      .then(sure => hidden())
      .catch(cancal => void 0);
  }

  cancelForm() {
    this.loading = false;
    this.dialog[this.activeName] = false;
  }
  memberConfig = member.config;
  goodsConfig = goods.config;
  documentConfig = iDocument.config;
  financeConfig = finance.config;
  recordConfig = record.config;

  async created() {
    this.transactionConfig=await reqConf("transaction.json")
    this.allDep = await dep();
    this.loadData();
  }
}
</script>
<style lang="scss">
.transaction {
  width: 1100px;
  margin: 0 auto;
  min-height: calc(100% - 8rem);
  &-operate {
    padding-bottom: 15px;
  }
  .demo-drawer__footer {
    display: flex;
  }
  .demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .demo-drawer__footer button {
    flex: 1;
  }
  .el-drawer__body {
    padding: 20px;
  }
}
</style>