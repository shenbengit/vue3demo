<template>
  <div class="login-view">
    <client-login/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClientLogin from '@/components/client/Login.vue';
import {getAllUserInfo} from "@/util/request"

export default defineComponent({
  name: "ClientLoginView",
  data() {
    return {}
  },
  components: {
    ClientLogin,
  },
  beforeCreate() {
    console.log("login view - beforeCreate")
  },
  created() {
    console.log("login view - created")
  },
  beforeMount() {
    console.log("login view - beforeMount")
  },
  beforeUpdate() {
    console.log("login view - beforeUpdate")
  },
  updated() {
    console.log("login view - updated")
  },
  mounted() {
    console.log("login view - mounted")
    getAllUserInfo()
  },
  beforeUnmount() {
    console.log("login view - beforeUnmount")
  },
  unmounted() {
    console.log("login view - unmounted")
  }
})
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(47, 149, 245, 0.856);
}
</style>