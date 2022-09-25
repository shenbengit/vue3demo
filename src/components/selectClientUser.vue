<template>
  <div>{{ props.multipleSelect }}</div>
  <div>
    <span class="dialog-footer">

      <el-button type="primary" @click="onSelectUser">确认</el-button>
    </span>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, reactive} from "vue";
import {getAllUserInfo} from "@/api/user-api";
import {getElLoading} from "@/util/ElLoadingUtil";
import {showErrorMessage, showWarningMessage} from "@/util/ElMessageUtil";
import {RESULT_OK} from "@/constant/constant";
import {UserInfoBean} from "@/bean/user-api-bean";

interface Props {
  /**
   * 是否是多选用户
   */
  multipleSelect: boolean;
  /**
   * 不可选择的用户列表
   */
  unSelectedUserList: string[];
}

const props = withDefaults(defineProps<Props>(), {
  multipleSelect: false,
  unSelectedUserList: () => []
});


const emit = defineEmits<{
  (e: 'onSelectUser', users: UserInfoBean[]): void
}>();

//所有用户的列表
let checkUserList = reactive<UserInfoBean[]>([]);
//选择的用户列表
let selectUserList = reactive<UserInfoBean[]>([]);

//选择用户
const onSelectUser = () => {
  selectUserList = checkUserList;
  //传值给父组件
  emit("onSelectUser", selectUserList);
};
onMounted(() => {
  console.log("unSelectedUserList", props.unSelectedUserList);
  const loading = getElLoading();
  getAllUserInfo()
      .then(response => {
        loading.close();
        if (response.code == RESULT_OK) {
          checkUserList = response.data;
        } else {
          console.log("获取所有用户信息失败：", response);
          showWarningMessage("获取所有用户信息失败：" + response.msg);
        }
      })
      .catch(error => {
        loading.close();
        console.log("获取所有用户信息异常：", error);
        showErrorMessage("获取所有用户信息异常：" + error);
      });
});
//
// onUnmounted(() => {
//
// });
</script>

<style scoped lang="scss">

</style>
