<template>
  <div class="basic-view index-view">
    <el-button type="primary" round @click="toLogin(USER_TYPE_ADMINISTRATOR)">管理员</el-button>
    <el-button type="primary" round @click="toLogin(USER_TYPE_CLIENT)">客户端</el-button>
  </div>
</template>

<script lang="ts" setup>
import {USER_TYPE_CLIENT, USER_TYPE_ADMINISTRATOR} from "@/constant/constant";
import {useRouter} from "vue-router";
import {showWarningMessage} from "@/util/ElMessageUtil";

const router = useRouter();
//跳转到登录页
const toLogin = (userType: string) => {
  if (userType === USER_TYPE_ADMINISTRATOR) {
    showWarningMessage("功能暂未开放！");
    return;
  }
  router.push({name: "login", query: {userType: userType}});
};
</script>

<style scoped lang="scss">
.index-view {
  flex-direction: column;

  .el-button {
    width: 300px;
    height: 50px;
    background: #21bd96;
    margin-top: 20px;
  }

  .el-button + .el-button {
    margin-left: 0 !important;
  }

}
</style>
