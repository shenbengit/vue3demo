<template>
  <div class="basic-view">
    <client-home :user-type="userType" :user-id="userId" :user-name="username"
                 :connection-status="socketIoConnectionStatus"></client-home>

  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref, toRefs} from "vue";
import ClientHome from "@/components/client/Home.vue";
import {useRoute, useRouter} from "vue-router";
import {Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";
import {SignalClient} from "@/util/signal/signal-client";
import {getUserInfo} from "@/api/user-api";
import {ElLoading} from "element-plus";
import {RESULT_OK} from "@/constant/constant";

export default defineComponent({
  name: "ClientHomeView",
  components: {
    ClientHome
  },

  setup() {
    //当前的路由对象
    const route = useRoute();
    //路由实例
    const router = useRouter();

    //userId
    const userId = route.query.userId as string;
    //userId
    const userType = route.query.userType as string;

    //用户信息
    const userInfo = reactive({
      createdAt: "--",
      userId: "--",
      username: "--",
      userType: "--",
    });

    //获取用户信息
    function getUser() {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getUserInfo(userId, userType)
          .then(response => {
            loading.close();
            if (response.code == RESULT_OK) {
              const infoBean = response.data;

              userInfo.createdAt = infoBean.createdAt;
              userInfo.userId = infoBean.userId;
              userInfo.userType = infoBean.userType;
              userInfo.username = infoBean.username;
            } else {
              console.log("获取个人信息失败：", response);
            }
          })
          .catch(error => {
            console.log("获取个人信息异常：", error);
            loading.close();
          });
    }

    getUser();

    const signalClient = SignalClient.getInstance();

    const socketIoConnectionStatus = signalClient.getConnectionStatus();

    const connectionStatusCallback = reactive({
      connected() {
        console.log("SignalClient connected");

      },
      connectError(err: Error) {
        console.log("SignalClient connectError", err);
      },
      disconnected(reason: Socket.DisconnectReason) {
        console.log("SignalClient disconnected", reason);
      }
    } as ConnectionStatusCallback);

    onMounted(() => {
      signalClient.addConnectionStatusCallback(connectionStatusCallback);
    });
    onUnmounted(() => {
      signalClient.removeConnectionStatusCallback(connectionStatusCallback);
    });

    //连接信令服务
    signalClient.connect(userId);

    return {
      socketIoConnectionStatus,
      ...toRefs(userInfo)
    };
  }
});
</script>

<style scoped lang="scss">

</style>
