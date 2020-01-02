<template>
  <el-dialog :visible.sync="$store.state.dialogVisible" width="30%" :before-close="handleClose">
    <span slot="title">修改密码</span>
    <div>
      <el-form
        :model="modify"
        status-icon
        :rules="rules"
        ref="modify"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="oldPwd">
          <el-input type="password" v-model="modify.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newPwd">
          <el-input type="password" v-model="modify.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="modify.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$store.state.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('modify')">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Dialog } from "element-ui";

Vue.use(Dialog);

@Component
export default class modifyPwd extends Vue {
  validatePass = (rule, value, callback) => {
    try {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.modify.checkPass !== "") {
          this.$refs.modify.validateField("checkPass");
        }
        callback();
      }
    } catch (error) {
      console.log(error);
      console.log(this.$refs);
    }
  };
  validatePass2 = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.modify.newPwd) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
  modify = {
    oldPwd: "",
    newPwd: "",
    checkPass: ""
  };
  rules = {
    oldPwd: [
      { required: true, message: "请输入原密码", trigger: "blur" },
      { min: 8, max: 20, message: "密码应为8-20个字符", trigger: "blur" }
    ],
    newPwd: [{ validator: this.validatePass, trigger: "blur" }],
    checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
  };
  submitForm(formName) {
    this.$refs[formName].validate(async valid => {
      if (valid) {
        let res=await this.$axios({
            url:"/app/modifyPwd",
            method:"post",
            data:this.modify
        });
        if(res.key===200){
            this.$message.success("修改成功!");
        }else if(res.key===446){
            this.$message.error("原密码错误!");
        };
      } else {
        this.$message.error("请检查表单!");
        return false;
      }
    });
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
  handleClose(done) {
    this.$confirm("确认关闭？")
      .then(_ => {
        done();
      })
      .catch(_ => {});
  }
}
</script>