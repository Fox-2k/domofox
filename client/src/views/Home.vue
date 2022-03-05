<template>
  <div class="home container">
    <div class="row justify-content-center">
      <Clock />
      <Block class="block-sm" icon="toggles" />
      <Block icon="thermometer-half"/>
      <Setpoint />
      <Block class="block-xxl" icon="journals"/>
    </div>
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
