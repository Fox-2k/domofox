<template>
  <div class="home">
    <v-container class="d-flex flex-wrap justify-center">
      <clock />
      <block icon="mdi-tune" class="block-sm"></block>
      <block icon="mdi-thermometer"></block>
      <Setpoint />
      <block class="block-xxl"></block>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from '@/components/Block.vue'
import Clock from '@/components/Clock.vue'
import Setpoint from '@/components/Setpoint.vue'

export default {
  name: 'Home',
  components: {
    Block,
    Clock,
    Setpoint
  }
}
</script>

<style>
  .block-xxl {
    width: 26em!important;
    height: 12em;
  }
  .block-xl {
    width: 18em!important;
    height: 12em;
  }
  .block-sm {
    width: 6em!important;
    height: 12em;
  }
</style>
