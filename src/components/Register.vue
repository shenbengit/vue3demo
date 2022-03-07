<template>
  <div class="register-form">
    <h3 class="title">{{ userType === clientType ? "Client" : "Administrator" }} Register</h3>

    <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
    >
      <el-form-item prop="userId">
        <el-input
            v-model="registerForm.userId"
            type="text"
            clearable="clearable"
            auto-complete="off"
            placeholder="请输入用户ID"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
            v-model="registerForm.username"
            type="text"
            clearable="clearable"
            auto-complete="off"
            placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="registerForm.password"
            type="password"
            clearable="clearable"
            auto-complete="off"
            placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="passwordAgain">
        <el-input
            v-model="registerForm.passwordAgain"
            type="password"
            clearable="clearable"
            auto-complete="off"
            placeholder="请再次输入密码"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-button
        :loading="loading"
        size="large"
        type="primary"
        style="width: 100%;margin-top: 15px"
        @click="handleLogin"
    >注册
    </el-button>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {UserRegisterEntity} from "@/bean/entity";
import {ElMessage} from "element-plus";
import {USER_TYPE_ADMINISTRATOR, USER_TYPE_CLIENT} from "@/constant/constant";

export default defineComponent({
  name: "UserRegister",
  props: {
    /**
     * 用户类型
     */
    userType: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    }

  },
  data() {
    return {
      clientType: USER_TYPE_CLIENT,
      administrator: USER_TYPE_ADMINISTRATOR,
      registerForm: new UserRegisterEntity(),
      registerRules: {
        userId: [
          {required: true, trigger: "blur", message: "请输入您的用户ID"}
        ],
        username: [
          {required: true, trigger: "blur", message: "请输入您的用户名"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ],
        passwordAgain: [
          {required: true, trigger: "blur", message: "请再次输入您的密码"}
        ]
      }
    };
  },
  methods: {
    showWarningMessage(msg: string) {
      ElMessage({
        showClose: true,
        message: msg,
        type: "warning",
        center: true
      });
    },
    handleLogin() {
      if (this.registerForm.userId === "") {
        this.showWarningMessage("请输入您的用户ID");
        return;
      }
      if (this.registerForm.username === "") {
        this.showWarningMessage("请输入您的用户名");
        return;
      }
      if (this.registerForm.password === "") {
        this.showWarningMessage("请输入您的密码");
        return;
      }
      if (this.registerForm.passwordAgain === "") {
        this.showWarningMessage("请再次输入您的密码");
        return;
      }
      if (this.registerForm.password !== this.registerForm.passwordAgain) {
        this.showWarningMessage("两次密码输入不一致");
        return;
      }
      this.registerForm.userType = this.userType;
      //与父组件通信
      this.$emit("handleRegister", this.registerForm);
    }
  }
});

</script>

<style scoped lang="scss">

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 25px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}


</style>