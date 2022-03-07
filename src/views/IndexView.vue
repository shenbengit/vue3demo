<template>
  <div class="index-view">
    <el-button type="primary" round @click="toLogin(administrator)">管理员</el-button>
    <el-button type="primary" round @click="toLogin(clientType)">客户端</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {USER_TYPE_CLIENT, USER_TYPE_ADMINISTRATOR} from "@/constant/constant";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "IndexView",
  data() {
    return {
      clientType: USER_TYPE_CLIENT,
      administrator: USER_TYPE_ADMINISTRATOR
    };
  },
  methods: {
    toLogin(userType: string) {
      if (userType === USER_TYPE_ADMINISTRATOR) {
        ElMessage.warning({
          showClose: true,
          message: "功能暂未开放！",
          center: true
        });
        return;
      }
      this.$router.push({name: "login", query: {userType: userType}});
    }
  }
});
</script>

<style scoped lang="scss">
.index-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: -webkit-gradient(linear, 180 0, 0 50%, from(#3e9bfa), to(#21bd96));
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
