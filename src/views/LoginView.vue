<template>
  <div class="login-view">
    <client-login :user-type="userType" v-on:handle-login="handleLogin"></client-login>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ClientLogin from "@/components/Login.vue";
import {UserLoginBean} from "@/bean/api-bean";
import {UserLoginEntity} from "@/bean/entity";
import {ElMessage, ElLoading} from "element-plus";
import {userLogin} from "@/api/user-api";
import {RESULT_OK, USER_TYPE_CLIENT} from "@/constant/constant";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      userType: ""
    };
  },
  components: {
    ClientLogin
  },
  created() {
    this.userType = this.$route.query.userType as string;
  },
  methods: {
    showWarningMessage(msg: string) {
      ElMessage.warning({
        showClose: true,
        message: msg,
        center: true
      });
    },
    showErrorMessage(msg: string) {
      ElMessage.error({
        showClose: true,
        message: msg,
        center: true
      });
    },
    showSuccessMessage(msg: string) {
      ElMessage.success({
        showClose: true,
        message: msg,
        center: true
      });
    },
    handleLogin(data: UserLoginEntity) {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      const login: UserLoginBean = {
        userId: data.userId,
        password: data.password,
        userType: this.userType
      };

      userLogin(login).then(response => {
        loading.close();
        if (response.code === RESULT_OK) {
          this.showSuccessMessage("登录成功");
          setTimeout(() => {
            this.$router.push({
              name: `${this.userType === USER_TYPE_CLIENT ? "clientHome" : "administratorHome"}`
            });
          }, 1500);
        } else {
          this.showWarningMessage("登录失败：" + response.msg);
        }
      }).catch(error => {
        loading.close();
        this.showErrorMessage("登录异常：" + error);
      });
    }
  }
});
</script>

<style scoped lang="scss">

.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: -webkit-gradient(linear, 180 0, 0 50%, from(#3e9bfa), to(#21bd96));
}
</style>