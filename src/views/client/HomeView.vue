<template>
  <div class="basic-view">
    <client-home :user-type="userInfo.userType"
                 :user-id="userInfo.userId"
                 :user-name="userInfo.username"
                 :connection-status="socketIoConnectionStatus"
                 @private-chat="onPrivateChat"
                 @group-chat="onGroupChat"
                 @chat-room="onChatRoom">

    </client-home>
    <!--选择用户弹出框-->
    <el-dialog v-model="showCheckUserDialog"
               destroy-on-close
               title="选择通话用户"
               width="30%">

      <template #footer>
        <span class="dialog-footer">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref} from "vue";
import ClientHome from "@/components/client/clientHome.vue";
import {useRoute, useRouter} from "vue-router";
import {Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";
import {SignalClient} from "@/util/signal/signal-client";
import {getAllUserInfo, getUserInfo} from "@/api/user-api";
import {RESULT_OK} from "@/constant/constant";
import {UserInfoBean} from "@/bean/user-api-bean";
import {getElLoading} from "@/util/ElLoadingUtil";
import {showErrorMessage, showWarningMessage} from "@/util/ElMessageUtil";

//当前的路由对象
const route = useRoute();
//路由实例
const router = useRouter();

let checkUserList = reactive<UserInfoBean[]>([]);

//显示选择用户列表弹出框
const showCheckUserDialog = ref(false);
//是否是多选用户
const isMultipleCheckUser = ref(false);
//显示输入房间号弹出框
const showEnterChatRoomDialog = ref(false);

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
const getUser = () => {
  const loading = getElLoading();
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
};

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
  //添加回调
  signalClient.addConnectionStatusCallback(connectionStatusCallback);
  //网络请求
  getUser();
  //连接信令服务
  signalClient.connect(userId);
});

onUnmounted(() => {
  //移除回调
  signalClient.removeConnectionStatusCallback(connectionStatusCallback);
});

const onPrivateChat = () => {
  getCheckUserList(false);
};
const onGroupChat = () => {
  getCheckUserList(true);
};

const getCheckUserList = (isMultiple: boolean) => {
  const loading = getElLoading();

  getAllUserInfo().then(response => {
    loading.close();

    if (response.code == RESULT_OK) {
      checkUserList = response.data;
      showCheckUserDialog.value = true;
      isMultipleCheckUser.value = isMultiple;

    } else {
      showWarningMessage("获取所有用户信息失败：" + response.msg);
    }
  }).catch(error => {
    loading.close();
    console.log("获取所有用户信息异常：", error);
    showErrorMessage("获取所有用户信息异常：" + error);
  });
};
const onChatRoom = () => {
  console.log("chatRoom");
};
</script>

<style scoped lang="scss">

</style>
