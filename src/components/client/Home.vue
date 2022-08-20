<template>
  <div class="client-home">
    <h3 class="title">SrsRtcWebClient</h3>
    <h3 class="title">{{ connectionStatus }}</h3>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, SetupContext} from "vue";
import {SocketIoConnectionStatus} from "@/util/signal/signal-client";

export default defineComponent({
  name: "ClientHome",
  props: {
    userType: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    /**
     * 连接状态
     */
    connectionStatus: {
      type: Object as PropType<SocketIoConnectionStatus>,
      required: true
    }
  },
  setup(props, {emit}: SetupContext) {
    console.log();
  }
});
</script>

<style scoped lang="scss">

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.client-home {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 25px 25px;
}
</style>
