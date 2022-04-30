<template>
  <block icon="mdi-pencil">
    <value-input v-model="setpoint">
      <v-card-text class="text-center display-3 pt-6">{{ setpoint }}<span class="display-2">{{ unit }}</span></v-card-text>
    </value-input>
  </block>
</template>

<script>
import Block from '@/components/Block.vue'
import ValueInput from '@/components/ValueInput.vue'

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
    Block,
    ValueInput
  },
  computed: {
    // ...mapGetters(['getSetpoint']),
    setpoint: {
      get () {
        return this.$store.state.setpoint
      },
      set (value) {
        this.$store.dispatch('setSetpoint', value)
      }
    }
  }

}
</script>

<style>

</style>
