<template>
  <block icon="mdi-thermometer">
    <v-card-text class="text-center display-3 pt-15">{{ value }}<span class="display-1">{{ unit }}</span></v-card-text>
  </block>
</template>

<script>
import Block from '@/components/Block.vue'

export default {
  name: 'SetPoint',
  props: {
    value: Number,
    unit: {
      type: String,
      default: '°C'
    }
  },
  components: {
    Block
  }
}
</script>

<style>

</style>
