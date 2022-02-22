<template>
  <div>
    <client-register></client-register>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClientRegister from '@/components/client/Register.vue';
import {httpGet} from "@/util/http"

export default defineComponent({
  name: "ClientRegisterView",
  data() {
    return {}
  },
  components: {
    ClientRegister,
  },
  created() {
    //
  }
})

</script>

<style scoped>

</style>