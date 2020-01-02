<template>
  <div class="user">
    <div class="demo-drawer__content">
      <el-form :model="form" :rules="rules" ref="member" label-width="120px" class="demo-ruleForm">
        <el-form-item hidden label="id" prop="id">
          <el-input readonly v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input :readonly="notModify" v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学号/教工号" prop="account">
          <el-input readonly type="text" v-model.trim.number="form.account"></el-input>
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-date-picker
            readonly
            format="yyyy-MM-dd"
            v-model="form.joinTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="form.department" readonly />
        </el-form-item>
        <el-form-item label="身份" prop="type">
          <el-input v-model="form.type" readonly />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" readonly />
        </el-form-item>
        <el-form-item label="联系方式" prop="number">
          <el-input :readonly="notModify" v-model.trim.number="form.number"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button
          @click="notModify=!notModify;form=JSON.parse($store.state.user)"
        >{{ notModify? "编 辑":"放弃编辑" }}</el-button>
        <el-button :disabled="notModify" @click="submitForm('member')" type="primary">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Radio,
  TimePicker,
  Switch,
  Row,
  Col
} from "element-ui";
import { member } from "@/apis/feild";
import dep from "@/utils/dep";
import map from "@/utils/map";
import record_login from "@/utils/record_login";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.use(Switch);
Vue.use(Row);
Vue.use(Col);

@Component
export default class User extends Vue {
  async created(){
    // console.log(allDep);
  }
  notModify = true;
  form = {
    ...JSON.parse(record_login.get())
  };
  rules = {
    name: [
      {
        required: true,
        message: "请输入成员姓名",
        trigger: "blur"
      },
      {
        min: 2,
        max: 15,
        message: "长度在 2 到 15 个字符",
        trigger: "blur"
      }
    ],
    account: [
      {
        required: true,
        message: "请输入学号/教工号",
        trigger: "blur"
      },
      {
        type: "number",
        message: "格式不正确",
        trigger: "blur"
      }
    ],
    joinTime: [{ required: true, message: "请输入日期", trigger: "blur" }],
    position: [
      {
        required: true,
        message: "请选择职位",
        trigger: "change"
      }
    ],
    alevel: [
      {
        required: true,
        message: "请选择账号等级",
        trigger: "blur"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择身份",
        trigger: "change"
      }
    ],
    number: [
      {
        required: true,
        message: "请输入联系方式",
        trigger: "blur"
      },
      {
        type: "number",
        message: "格式不正确",
        trigger: "blur"
      }
    ]
  };
  get alevelOption() {
    return this.transactionConfig.alevelOption;
  }

  get positionList() {
    return this.transactionConfig.positionList;
  }

  submitForm(formName) {
    this.$refs[formName].validate(async valid => {
      if (valid) {
        const data={
          type:"edit",
          ...this.$route.params,
          modifyData:this.form
        }
        let res=await this.$axios({
          url:"/app/modifyMember",
          method:"post",
          data:data
        });
        if(res.key===200){
          record_login.save(res.user);
          this.$store.state.user=record_login.get();

          this.$message.success("submit!");
        }else{
          this.$message.error("修改失败!");
        }
      } else {
        this.$message.warning("请检查表单!");
        return false;
      }
    });
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 500px;
  margin: 0 auto;
}
.el-input__inner:read-only {
  border-color: transparent;
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
</style>