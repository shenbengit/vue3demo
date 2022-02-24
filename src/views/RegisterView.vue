<template>
  <div>
    <client-register></client-register>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ClientRegister from "@/components/Register.vue";

export default defineComponent({
  name: "ClientRegisterView",
  data() {
    return {};
  },
  components: {
    ClientRegister
  },
  created() {
    console.log(this.$route.query);
  }
});

</script>

<style scoped>

</style>