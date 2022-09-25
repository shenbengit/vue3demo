<template>
  <div class="basic-view">
    <client-register :user-type="userType" @handle-register="handlerRegister" :loading="loading"
                     ref="childRef"></client-register>
  </div>
</template>

<script lang="ts" setup>
import ClientRegister from "@/components/userRegister.vue";
import {UserRegisterEntity} from "@/bean/entity";
import {checkUserId, insertUser} from "@/api/user-api";
import {CheckUserIdBean, UserRegisterBean} from "@/bean/user-api-bean";
import {RESULT_OK} from "@/constant/constant";
import {useRoute, useRouter} from "vue-router";
import {showErrorMessage, showSuccessMessage, showWarningMessage} from "@/util/ElMessageUtil";
import {ref} from "vue";

const childRef = ref();
//当前的路由对象
const route = useRoute();
//路由实例
const router = useRouter();

const userType = ref(route.query.userType as string);
const loading = ref(false);

const handlerRegister = () => {
  const registerForm = childRef.value.registerForm;
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
  const entity: UserRegisterEntity = {
    userId: registerForm.userId,
    username: registerForm.username,
    password: registerForm.password,
    passwordAgain: registerForm.passwordAgain,
    userType: userType.value
  };

  loading.value = true;

  const checkUser: CheckUserIdBean = {
    userId: entity.userId, userType: entity.userType
  };
  checkUserId(checkUser).then(response => {
    if (response.code == RESULT_OK) {
      registerUser(entity);
    } else {
      loading.value = false;
      showWarningMessage("用户id已被注册");
    }
  }).catch(error => {
    loading.value = false;
    showErrorMessage("校验用户id是否可用error：" + error);
  });
};

const registerUser = (entity: UserRegisterEntity) => {
  const bean: UserRegisterBean = {
    password: entity.password, userId: entity.userId, userType: entity.userType, username: entity.username
  };
  insertUser(bean).then(response => {
    loading.value = false;
    if (response.code == RESULT_OK) {
      showSuccessMessage("注册成功");
      setTimeout(() => {
        // router.push({name: "login", query: {userType: userType.value}});
        //回退
        router.back();
      }, 1000);
    } else {
      console.log("注册失败，" + response);
      showWarningMessage("注册失败：" + response.msg);
    }
  }).catch(error => {
    loading.value = false;
    showErrorMessage("注册异常：" + error);
  });
};

</script>
