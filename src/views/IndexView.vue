<template>
  <div class="basic-view index-view">
    <el-button type="primary" round @click="toLogin(administratorType)">管理员</el-button>
    <el-button type="primary" round @click="toLogin(clientType)">客户端</el-button>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, onMounted, onUnmounted, reactive} from "vue";
import {USER_TYPE_CLIENT, USER_TYPE_ADMINISTRATOR} from "@/constant/constant";
import {useRouter} from "vue-router";
import {showWarningMessage} from "@/util/ElMessageUtil";

export default defineComponent({
  name: "IndexView",
  setup() {
    const router = useRouter();

    const clientType = ref(USER_TYPE_CLIENT);
    const administratorType = ref(USER_TYPE_ADMINISTRATOR);

    //跳转到登录页
    function toLogin(userType: string) {
      if (userType === USER_TYPE_ADMINISTRATOR) {
        showWarningMessage("功能暂未开放！");
        return;
      }
      router.push({name: "login", query: {userType: userType}});
    }

    return {
      clientType,
      administratorType,
      toLogin
    };
  }
});
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

.el-button + .el-button {
  margin-left: 0;
}
</style>
