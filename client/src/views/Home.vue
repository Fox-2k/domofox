<template>
  <div class="home container">
    <div class="row justify-content-center">
      <Clock />
      <Block class="block-sm" />
      <Block title="Température"/>
      <Block title="Consigne"/>
      <Block title="Planning"/>
      <Block />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from '@/components/Block.vue'
import Clock from '@/components/Clock.vue'

export default {
  name: 'Home',
  components: {
    Block,
    Clock
  }
}
</script>

<style>
  .clock .title{
    background: url(../assets/logo.png) !important;
    background-size: contain !important;
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
