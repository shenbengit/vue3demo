<template>
  <div class="home-view">


  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";
import {SignalClient} from "@/util/signal/signal-client";

export default defineComponent({
  name: "ClientHomeView",
  setup() {
    //当前的路由对象
    const route = useRoute();
    //路由实例
    const router = useRouter();

    const userId = ref(route.query.userId as string);

    const signalClient = SignalClient.getInstance();

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
    signalClient.connect(userId.value);

    return {
      userId
    };
  }
});
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: -webkit-gradient(linear, 180 0, 0 50%, from(#3e9bfa), to(#21bd96));
}
</style>
