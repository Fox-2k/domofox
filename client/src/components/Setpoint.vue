<template>
  <block icon="mdi-pencil">
    <value-input v-model="setpointManu">
      <v-card-text class="text-center display-3 pt-6">{{ setpointManu }}<span class="display-2">{{ unit }}</span></v-card-text>
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
    // ...mapGetters(['getSetpointManu']),
    setpointManu: {
      get () {
        return this.$store.state.setpoint.manu
      },
      set (value) {
        this.$store.dispatch('setSetpoint', {type: 'manu', value})
      }
    }
  }

}
</script>

<style>

</style>
