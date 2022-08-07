<template>
  <div class="settings" :style="styleObject">
    <v-container class="d-flex flex-wrap justify-center">
        <hysteresis sign="pos"></hysteresis>
        <hysteresis sign="neg"></hysteresis>
        <block class="block-xxl pa-3 pt-8">
          <sensor-config v-for="item in getSensorsList" :key="item.id" :id="item.id" class="calendar-item"></sensor-config>
        </block>
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
