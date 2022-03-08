<template>
  <div class="home-view">

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ClientHomeView",
  data() {
    return {};
  },
  methods: {}
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