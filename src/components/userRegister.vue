<template>
  <div class="register-form">
    <h3 class="title">{{ userType === clientType ? "Client" : "Administrator" }} Register</h3>

    <el-form
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

<script lang="ts" setup>

import {reactive, ref} from "vue";
import {UserRegisterEntity} from "@/bean/entity";
import {USER_TYPE_CLIENT} from "@/constant/constant";
import {showWarningMessage} from "@/util/ElMessageUtil";

const props = defineProps({
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
});

//和父组件通信
const emit = defineEmits<{ (e: 'handleRegister'): void }>();

const clientType = ref(USER_TYPE_CLIENT);
//注册信息
const registerForm = reactive({
  userId: "",
  username: "",
  password: "",
  passwordAgain: "",
});
const registerRules = reactive({
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
});

//登录
const handleLogin = () => {
  if (registerForm.userId === "") {
    showWarningMessage("请输入您的用户ID");
    return;
  }
  if (registerForm.username === "") {
    showWarningMessage("请输入您的用户名");
    return;
  }
  if (registerForm.password === "") {
    showWarningMessage("请输入您的密码");
    return;
  }
  if (registerForm.passwordAgain === "") {
    showWarningMessage("请再次输入您的密码");
    return;
  }
  if (registerForm.password !== registerForm.passwordAgain) {
    showWarningMessage("两次密码输入不一致");
    return;
  }
  //与父组件通信
  emit("handleRegister");
};

defineExpose({
  registerForm
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

</style>
