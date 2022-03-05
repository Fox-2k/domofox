<template>
  <Block class="clock pt-5 align-items-center" icon="pencil-square">
    <p class="display-2">{{ getSetpointManu }}<span class="display-4">{{ unit }}</span></p>
  </Block>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'

export default {
  name: 'SetPoint',
  props: {
    type: String,
    unit: {
      type: String,
      default: '°C'
    }
  },
  components: {
    Block
  },
  computed: {
    ...mapGetters(['getSetpointManu'])
  }
}
</script>

<style scoped>

</style>
