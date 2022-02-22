<template>
  <div class="login-form">
    <h3 class="title">SrsRtcWebClient登录</h3>

    <el-form
        ref="loginForm"
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
            @keyup="handleLogin"
        >
        </el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width: 100%"
            @click="handleLogin"
        >登录
        </el-button>
      </el-form-item>
    </el-form>

    <div style="float: right">
      <router-link class="link-type" style="color:#409eff;" :to="'/client/register'">立即注册
      </router-link>
    </div>

  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "ClientLogin",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        userId: "",
        password: "",
        userType: 0
      },
      loginRules: {
        userId: [
          {required: true, trigger: "blur", message: "请输入您的用户ID"},
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"},
        ],
        code: [{required: true, trigger: "change", message: "请输入验证码"}],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined,
    }
  },
  methods: {
    handleLogin() {
      console.log("login  - onSubmit")
    },
  },
  beforeCreate() {
    console.log("login  - beforeCreate")
  },
  created() {
    console.log("login  - created")
  },
  beforeMount() {
    console.log("login  - beforeMount")
  },
  beforeUpdate() {
    console.log("login  - beforeUpdate")
  },
  updated() {
    console.log("login  - updated")
  },
  mounted() {
    console.log("login  - mounted")
  },
  beforeUnmount() {
    console.log("login  - beforeUnmount")
  },
  unmounted() {
    console.log("login  - unmounted")
  }
})

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
  padding: 25px 25px 5px 25px;

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

.register {
  color: #409eff;
  text-align: right;
  line-height: 20px;
  cursor: pointer;
}
</style>