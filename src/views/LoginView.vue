<template>
  <div class="basic-view">
    <user-login :user-type="userType" v-on:handle-login="handleLogin"></user-login>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import UserLogin from "@/components/Login.vue";
import {UserLoginBean} from "@/bean/api-bean";
import {UserLoginEntity} from "@/bean/entity";
import {ElLoading} from "element-plus";
import {userLogin} from "@/api/user-api";
import {RESULT_OK, USER_TYPE_CLIENT} from "@/constant/constant";
import {showErrorMessage, showSuccessMessage, showWarningMessage} from "@/util/ElMessageUtil";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: "LoginView",
  components: {
    UserLogin
  },
  setup() {
    //当前的路由对象
    const route = useRoute();
    //路由实例
    const router = useRouter();

    const userType = ref(route.query.userType as string);

    //登录，子组件回调
    function handleLogin(data: UserLoginEntity) {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      const login: UserLoginBean = {
        userId: data.userId,
        password: data.password,
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
    }

    return {
      userType,
      handleLogin
    };
  },
});
</script>
