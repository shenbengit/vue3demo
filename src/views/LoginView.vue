<template>
  <div class="basic-view">
    <UserLogin :user-type="userType" @handle-login="handleLogin" ref="childRef"></UserLogin>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import UserLogin from "@/components/userLogin.vue";
import {UserLoginBean} from "@/bean/user-api-bean";
import {userLogin} from "@/api/user-api";
import {RESULT_OK, USER_TYPE_CLIENT} from "@/constant/constant";
import {showErrorMessage, showSuccessMessage, showWarningMessage} from "@/util/ElMessageUtil";
import {useRoute, useRouter} from "vue-router";
import {getElLoading} from "@/util/ElLoadingUtil";

const childRef = ref();
//当前的路由对象
const route = useRoute();
//路由实例
const router = useRouter();

const userType = ref(route.query.userType as string);

//登录，子组件回调
const handleLogin = () => {
  const loginForm = childRef.value.loginForm;

  if (loginForm.userId === "") {
    showWarningMessage("请输入您的用户ID");
    return;
  }
  if (loginForm.password === "") {
    showWarningMessage("请输入您的密码");
    return;
  }
  const loading = getElLoading();

  const login: UserLoginBean = {
    userId: loginForm.userId,
    password: loginForm.password,
    userType: userType.value
  };

  userLogin(login).then(response => {
    loading.close();
    if (response.code === RESULT_OK) {
      showSuccessMessage("登录成功");
      //延迟跳转
      setTimeout(() => {
        const infoBean = response.data;
        router.push({
          name: `${userType.value === USER_TYPE_CLIENT ? "clientHome" : "administratorHome"}`,
          query: {userId: infoBean.userId, userType: infoBean.userType}
        });
      }, 1500);
    } else {
      console.log("登录失败，" + response);
      showWarningMessage("登录失败：" + response.msg);
    }
  }).catch(error => {
    loading.close();
    showErrorMessage("登录异常：" + error);
  });
};
</script>
