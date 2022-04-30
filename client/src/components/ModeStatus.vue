<template>
  <block icon="mdi-tune">
    <v-btn-toggle v-model="mode" mandatory>
      <v-btn></v-btn>
      <v-btn></v-btn>
      <v-btn></v-btn>
    </v-btn-toggle>
  </block>
</template>

<script>
import Block from '@/components/Block.vue'

const MODE_OFF = 0
const MODE_MANU = 1
const MODE_AUTO = 2
const MODE_FORCED = 3

export default {
  name: 'ModeStatus',
  components: {
    Block
  },
  computed: {
    // ...mapGetters(['getMode']),
    mode: {
      get () {
        return this.$store.mode
      },
      set (value) {
        this.$store.dispatch('setMode', value)
      }
    }
  }
}
</script>

<style scoped>
  .v-btn-toggle {
    flex-direction: column;
  }
</style>
