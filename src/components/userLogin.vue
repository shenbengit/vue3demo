<template>
  <div class="login-form">
    <h3 class="title">{{ userType === clientType ? "Client" : "Administrator" }} Login</h3>

    <el-form
        :model="loginForm"
        :rules="loginRules"
    >
      <el-form-item prop="userId">
        <el-input
            v-model="loginForm.userId"
            type="text"
            clearable="clearable"
            auto-complete="off"
            placeholder="用户ID"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            clearable="clearable"
            auto-complete="off"
            placeholder="密码"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-button
        size="large"
        type="primary"
        style="width: 100%;margin-top: 15px"
        @click="handleLogin"

    >登录
    </el-button>

    <div style="float: right;margin-top: 20px">
      <router-link class="link-type" style="color:#409eff;" :to="{name:'register', query:{userType: userType}}">
        立即注册
      </router-link>
    </div>

  </div>
</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import {USER_TYPE_CLIENT} from "@/constant/constant";

defineProps({
  /**
   * 用户类型
   */
  userType: {
    type: String,
    required: true
  }
});

//和父组件通信
const emit = defineEmits<{
  (e: 'handleLogin'): void
}>();

const clientType = ref(USER_TYPE_CLIENT);
//登录信息
const loginForm = reactive({
  userId: "",
  password: ""
});

const loginRules = reactive({
  userId: [
    {required: true, trigger: "blur", message: "请输入您的用户ID"}
  ],
  password: [
    {required: true, trigger: "blur", message: "请输入您的密码"}
  ]
});

//处理登录事件
const handleLogin = () => {
  //与父组件通信
  emit("handleLogin");
};

defineExpose({
  loginForm
});

</script>

<style scoped lang="scss">

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
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
