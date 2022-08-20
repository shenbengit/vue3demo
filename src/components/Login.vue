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

<script lang="ts">

import {defineComponent, reactive, ref, SetupContext, toRefs} from "vue";
import {UserLoginEntity} from "@/bean/entity";
import {USER_TYPE_ADMINISTRATOR, USER_TYPE_CLIENT} from "@/constant/constant";
import {showWarningMessage} from "@/util/ElMessageUtil";

export default defineComponent({
  name: "UserLogin",
  props: {
    /**
     * 用户类型
     */
    userType: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}: SetupContext) {
    const clientType = ref(USER_TYPE_CLIENT);
    const administratorType = ref(USER_TYPE_ADMINISTRATOR);
    const loginForm = reactive(new UserLoginEntity());
    const loginRules = reactive({
      userId: [
        {required: true, trigger: "blur", message: "请输入您的用户ID"}
      ],
      password: [
        {required: true, trigger: "blur", message: "请输入您的密码"}
      ]
    });

    //处理登录事件
    function handleLogin() {
      if (loginForm.userId === "") {
        showWarningMessage("请输入您的用户ID");
        return;
      }
      if (loginForm.password === "") {
        showWarningMessage("请输入您的密码");
        return;
      }
      loginForm.userType = props.userType;
      //与父组件通信
      emit("handleLogin", loginForm);
    }

    return {
      clientType,
      administratorType,
      loginForm,
      loginRules,
      handleLogin
    };
  }
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
