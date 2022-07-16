<template>
  <block :icon="sign === 'pos' ? 'mdi-timeline-plus' : 'mdi-timeline-minus'">
    <value-input v-model="hysteresisValue">
      <v-card-text class="text-center display-3 pt-15">{{ hysteresisValue }}<span class="display-1">{{ unit }}</span></v-card-text>
    </value-input>
  </block>
</template>

<script>
import Block from '@/components/Block.vue'
import ValueInput from '@/components/ValueInput.vue'

export default {
  name: 'Hysteresis',
  props: {
    sign: String,
    unit: {
      type: String,
      default: '°C'
    }
  },
  components: {
    Block,
    ValueInput
  },
  computed: {
    hysteresisValue: {
      get () {
        return this.sign === 'pos' ? this.$store.state.hysteresis.pos : this.$store.state.hysteresis.neg
      },
      set (value) {
        this.$store.dispatch('setHysteresis', { sign: this.sign, value })
      }
    }
  }

}
</script>

<style>

</style>
