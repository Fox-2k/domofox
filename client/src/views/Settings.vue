<template>
  <div class="settings">
    <v-container class="d-flex flex-wrap justify-center">
        <hysteresis sign="pos"></hysteresis>
        <hysteresis sign="neg"></hysteresis>
        <block class="block-xxl"></block>
    </v-container>
  </div>
</template>

<script>
import Block from '@/components/Block.vue'
import Hysteresis from '@/components/Hysteresis.vue'

export default {
  name: 'Settings',
  components: {
    Block,
    Hysteresis
  }
}
</script>
