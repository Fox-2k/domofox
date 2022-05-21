<template>
  <block icon="mdi-tune">
    <v-container class="text-center">
      <v-btn color="dark" fab x-large dark class="mt-10"  @click="dialog = true">
        <v-icon>{{ modeIcon }}</v-icon>
      </v-btn>
      <v-icon v-if="getHeating" large class="mt-4">mdi-radiator</v-icon>
    </v-container>
    <v-dialog v-model="dialog" width="400">
      <v-card class="grey darken-2 pa-5">
        <v-container>
          <v-row>
            <v-btn-toggle v-model="mode" mandatory group class="col justify-center">
              <v-btn class="mx-2"><v-icon x-large class="mx-5" @click="dialog = false">mdi-power-standby</v-icon></v-btn>
              <v-btn class="mx-2"><v-icon x-large class="mx-5" @click="dialog = false">mdi-hand-pointing-up</v-icon></v-btn>
              <v-btn class="mx-2"><v-icon x-large class="mx-5" @click="dialog = false">mdi-thermostat-box</v-icon></v-btn>
            </v-btn-toggle>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </block>
</template>

<script>
import Block from '@/components/Block.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ModeStatus',
  components: {
    Block
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['getHeating']),
    mode: {
      get () {
        return this.$store.state.mode
      },
      set (value) {
        this.$store.dispatch('setMode', value)
      }
    },
    modeIcon: function () {
      return [
        'mdi-power-standby', // MODE_OFF = 0
        'mdi-hand-pointing-up', // MODE_MANU = 1
        'mdi-thermostat-box' // MODE_AUTO = 2
      ][this.$store.state.mode]
    }
  }
}
</script>

<style scoped>
  /* .v-btn-toggle {
    flex-direction: column;
  } */
</style>
