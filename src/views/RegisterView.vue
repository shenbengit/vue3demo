<template>
  <div class="basic-view">
    <client-register :user-type="userType" v-on:handle-register="handlerRegister" :loading="loading"></client-register>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ClientRegister from "@/components/Register.vue";
import {UserRegisterEntity} from "@/bean/entity";
import {checkUserId, insertUser} from "@/api/user-api";
import {CheckUserIdBean, UserRegisterBean} from "@/bean/api-bean";
import {RESULT_OK} from "@/constant/constant";
import {useRoute, useRouter} from "vue-router";
import {showErrorMessage, showSuccessMessage, showWarningMessage} from "@/util/ElMessageUtil";
import {$ref} from 'vue/macros';

export default defineComponent({
  name: "RegisterView",
  components: {
    ClientRegister
  },
  setup() {
    //当前的路由对象
    const route = useRoute();
    //路由实例
    const router = useRouter();

    const userType = $ref(route.query.userType as string);
    let loading = $ref(false);

    const handlerRegister = (entity: UserRegisterEntity) => {
      loading = true;
      const checkUser: CheckUserIdBean = {
        userId: entity.userId, userType: entity.userType
      };
      checkUserId(checkUser).then(response => {
        if (response.code == RESULT_OK) {
          registerUser(entity);
        } else {
          loading = false;
          showWarningMessage("用户id已被注册");
        }
      }).catch(error => {
        loading = false;
        showErrorMessage("校验用户id是否可用error：" + error);
      });
    };

    const registerUser = (entity: UserRegisterEntity) => {
      const bean: UserRegisterBean = {
        password: entity.password, userId: entity.userId, userType: entity.userType, username: entity.username
      };
      insertUser(bean).then(response => {
        loading = false;
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
        loading = false;
        showErrorMessage("注册error：" + error);
      });
    };

    return {
      userType,
      loading,
      handlerRegister
    };
  }
});

</script>
