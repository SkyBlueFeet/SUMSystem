<template>
  <el-col :offset="6" :span="8" class="edit">
    <el-form
      :model="editForm"
      status-icon
      :rules="roles"
      ref="editForm"
      label-width="100px"
      class="demo-ruleForm"
      :inline-message="false"
    >
      <el-form-item label="头条号名称" prop="nickname">
        <el-input v-model="editForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="region">
        <el-select v-model="editForm.region" placeholder="性别" @change="log(editForm.region)">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="editForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="editForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="editForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <p class="minilabel">根据国家相关法律法规,在互联网上发布信息需要进行实名认证</p>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="editForm.name" @input.native="log(editForm.name.length)"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="CardID">
        <el-input v-model.number="editForm.CardID"></el-input>
      </el-form-item>

      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="editForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="头条分类" prop="type">
        <el-checkbox-group v-model="editForm.type">
          <el-checkbox label="政治" name="type"></el-checkbox>
          <el-checkbox label="经济" name="type"></el-checkbox>
          <el-checkbox label="互联网" name="type"></el-checkbox>
          <el-checkbox label="教育" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性质" prop="resource">
        <el-radio-group v-model="editForm.resource">
          <el-radio label="个人"></el-radio>
          <el-radio label="工作室"></el-radio>
          <el-radio label="企业"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" " prop="type">
        <el-checkbox-group v-model="editForm.type">
          <el-checkbox label="我同意遵守互联网信息安全条例" name="type"></el-checkbox>
          <el-checkbox label="我自愿加入互联网净化行动" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
        <el-button @click="resetForm('editForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import { checkCardID, checkAge, checkName } from "@/utils/checkForm";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.editForm.checkPass !== "") {
          this.$refs.editForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      editForm: {
        name: "",
        nickname: "",
        account: "",
        pass: "",
        checkPass: "",
        CardID: "",
        region: "男",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "个人"
      },
      roles: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入头条号名称", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        CardID: [{ required: true, validator: checkCardID, trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    log(text) {
      console.log(text);
    }
  }
};
</script>

<style scoped>
.edit {
  padding-top: 60px;
}
.minilabel {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  text-indent: 100px;
}
</style>
