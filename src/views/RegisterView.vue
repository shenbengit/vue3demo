<template>
  <div class="register-view">
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
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "RegisterView",
  components: {
    ClientRegister
  },
  data() {
    return {
      userType: "",
      loading: false
    };
  },
  methods: {
    handlerRegister(entity: UserRegisterEntity) {
      this.loading = true;
      const checkUser: CheckUserIdBean = {
        userId: entity.userId, userType: entity.userType
      };
      checkUserId(checkUser).then(response => {
        if (response.code == RESULT_OK) {
          this.registerUser(entity);
        } else {
          this.loading = false;
          ElMessage.warning("用户id已被注册");
        }
      }).catch(error => {
        this.loading = false;
        ElMessage.error("校验用户id是否可用error：" + error);
      });
    },
    registerUser(entity: UserRegisterEntity) {
      const bean: UserRegisterBean = {
        password: entity.password, userId: entity.userId, userType: entity.userType, username: entity.username
      };

      insertUser(bean).then(response => {
        this.loading = false;
        if (response.code == RESULT_OK) {
          ElMessage.success("注册成功");
          setTimeout(() => {
            this.$router.push({name: "login", query: {userType: this.userType}});
          }, 1000);
        } else {
          ElMessage.warning("注册失败：" + response.msg);
        }
      }).catch(error => {
        this.loading = false;
        ElMessage.error("注册error：" + error);
      });
    }
  },

  created() {
    this.userType = this.$route.query.userType as string;
  }
});

</script>

<style scoped lang="scss">

.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: -webkit-gradient(linear, 180 0, 0 50%, from(#3e9bfa), to(#21bd96));
}
</style>