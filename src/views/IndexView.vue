<template>
  <div class="index-view">
    <el-button type="primary" round>AAA</el-button>
    <el-button type="primary" round>BBB</el-button>
    <el-button type="primary" round>CCC</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "IndexView"
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
    background: #bfbfbf;
  }
}

</style>
