<template>
  <div>
    <client-register></client-register>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClientRegister from '@/components/client/Register.vue';

export default defineComponent({
  name: "ClientRegisterView",
  data() {
    return {}
  },
  components: {
    ClientRegister,
  }
})

</script>

<style scoped>

</style>