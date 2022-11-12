<template>
  <div class="settings" :style="styleObject">
    <v-container class="d-flex flex-wrap justify-center">
      <block icon="mdi-home-thermometer-outline" class="block-tall-xxl pa-3 pt-8" style="position: relative;">
        <div style="overflow-y: auto; height: 100%;">
          <sensor-config v-for="item in getSensorsList" :key="item.id" :id="item.id" class="calendar-item mb-1"></sensor-config>
        </div>
        <v-btn fab color="primary" class="btn-sensor-plus" @click="createNewSensor()">
          <v-icon>mdi-thermometer-plus</v-icon>
        </v-btn>
      </block>
      <div class="d-flex flex-row flex-sm-column justify-content-between">
        <hysteresis sign="pos"></hysteresis>
        <hysteresis sign="neg"></hysteresis>
      </div>
      <div class="d-flex flex-row flex-sm-column justify-content-between">
        <v-btn elevation="6" dark fab large class="ma-3" @click="refreshBrowser()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-dialog v-model="dialogReboot">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="6" dark fab large class="ma-3" v-bind="attrs" v-on="on">
              <v-icon>mdi-cog-refresh</v-icon>
            </v-btn>
          </template>
          <v-card class="grey darken-2">
            <v-card-title>Reboot system ?</v-card-title>
            <v-card-actions class="justify-space-around">
              <v-btn fab x-large color="secondary" @click="dialogReboot = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
              <v-btn fab x-large color="primary" @click="rebootDevice()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogShutdown">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="6" dark fab large class="ma-3" v-bind="attrs" v-on="on">
              <v-icon>mdi-power</v-icon>
            </v-btn>
          </template>
          <v-card class="grey darken-2">
            <v-card-title>Shutdown system ?</v-card-title>
            <v-card-actions class="justify-space-around">
              <v-btn fab x-large color="secondary" @click="dialogShutdown = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
              <v-btn fab x-large color="primary" @click="shutdownDevice()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'
import Hysteresis from '@/components/Hysteresis.vue'
import SensorConfig from '@/components/SensorConfig.vue'
import device from '@/api/device.js'

export default {
  name: 'Settings',
  components: {
    Block,
    Hysteresis,
    SensorConfig
},
  computed: {
    ...mapGetters(['getSensorsList'])
  },
  data () {
    return {
      dialogReboot: false,
      dialogShutdown: false,
      styleObject: {
        height: "100%",
        background: this.$config.SETTINGS_BKG || "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed"
      }
    }
  },
  methods: {
    createNewSensor: function () {
      this.$store.dispatch('createSensor')
    },
    refreshBrowser: function () {
      location.reload()
    },
    rebootDevice: function () {
      this.dialogReboot = false
      device.reboot()
    },
    shutdownDevice: function () {
      this.dialogShutdown = false
      device.shutdown()
    }
  }
}
</script>

<style>

.btn-sensor-plus {
  position: absolute;
  right: 1em;
  bottom: 1em;
  opacity: 0.8;
}

</style>
