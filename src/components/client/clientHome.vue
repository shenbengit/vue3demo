<template>
  <div class="client-home">
    <h3 class="title">SrsRtcWebClient</h3>
    <el-avatar :size="80" :src="avatar" alt="avatar"/>

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
</style>
