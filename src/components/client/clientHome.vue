<template>
  <div class="client-home">
    <h3 class="title">SrsRtcWebClient</h3>
    <div class="header-body">
      <div class="header-left">
        <el-avatar :size="80" :src="avatar" alt="avatar"/>
        <div class="header-container">
          <div class="header-name">{{userName}}</div>
          <div class="header-id" style="color: #3e9bfa ;font-size: small">{{userId}}</div>
        </div>
      </div>
      <div class="header-right"
           :class="{connected:connectionStatus===SocketIoConnectionStatus.CONNECTED,disconnected:connectionStatus!==SocketIoConnectionStatus.CONNECTED}">
        <img
            :src="connectionStatus===SocketIoConnectionStatus.CONNECTED?require('@/assets/ic_connected_status.webp'):require('@/assets/ic_disconnected_status.webp')"
            alt="connect status"/>
        <div class="header-status" style="font-size: small"
             :style="{color:connectionStatus===SocketIoConnectionStatus.CONNECTED?'#13CC66':'#B3B6BA'}">{{
            connectionStatus === SocketIoConnectionStatus.CONNECTING ? "CONNECTING" : connectionStatus === SocketIoConnectionStatus.CONNECTED ? "CONNECTED" : "DISCONNECTED"
          }}
        </div>
      </div>
    </div>


    <el-button size="large" round type="primary" plain @click="privateChat">私&#12288;聊</el-button>
    <el-button size="large" round type="primary" plain @click="groupChat">群&#12288;聊</el-button>
    <el-button size="large" round type="primary" plain @click="chatRoom">聊天室</el-button>

  </div>
</template>

<script lang="ts" setup>
import {PropType, ref} from "vue";
import {SocketIoConnectionStatus} from "@/util/signal/signal-client";
import icAvatar from "../../assets/ic_avatar.svg";

const avatar = ref(icAvatar);

defineProps({
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
    type: Number as PropType<SocketIoConnectionStatus>,
    required: true
  }
});

const emit = defineEmits(['privateChat', 'groupChat', 'chatRoom']);

const privateChat = () => {
  emit("privateChat");
};
const groupChat = () => {
  emit("groupChat");
};
const chatRoom = () => {
  emit("chatRoom");
};

</script>

<style scoped lang="scss">

.client-home {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 25px 25px;

  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .el-button {
    width: 100%;
    margin-top: 15px;
  }

  .el-button + .el-button {
    margin-left: 0 !important;
  }
}

.header-body {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;

    .header-container {
      margin-left: 6px;
      display: flex;
      flex-direction: column;
      align-items: start;
      height: 80px;
      justify-content: space-between;
    }
  }

  .header-right {
    background-size: 100% 100%;
    width: 130px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;

    img {
      width: 24px;
      height: 24px;
    }

    .header-status {
      margin-left: 8px;
    }
  }

  .connected {
    background-image: url("../../assets/ic_connected_status_bg.webp");
  }

  .disconnected {
    background-image: url("../../assets/ic_disconnected_status_bg.webp");
  }
}
</style>
