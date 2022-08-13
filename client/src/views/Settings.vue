<template>
  <div class="settings" :style="styleObject">
    <v-container class="d-flex flex-wrap justify-center">
      <block class="block-tall-xxl pa-3 pt-8" style="position: relative;">
        <div style="overflow-y: auto; height: 100%;">
          <sensor-config v-for="item in getSensorsList" :key="item.id" :id="item.id" class="calendar-item mb-1"></sensor-config>
        </div>
      </block>
      <div class="d-flex flex-row flex-sm-column justify-content-between">
        <hysteresis sign="pos"></hysteresis>
        <hysteresis sign="neg"></hysteresis>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'
import Hysteresis from '@/components/Hysteresis.vue'
import SensorConfig from '@/components/SensorConfig.vue'

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
}
</script>
