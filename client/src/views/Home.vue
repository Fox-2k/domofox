<template>
  <div class="home" :style="styleObject">
    <v-container class="d-flex flex-wrap justify-center">
      <div class="d-flex flex-row flex-sm-column justify-content-between">
        <sensor-value icon="mdi-tune" :value="getSensorsAverage"></sensor-value>
        <Setpoint />
      </div>
      <clock />
      <div class="d-flex flex-row flex-sm-column justify-content-between">
        <ModeStatus />
        <block class="block"></block>
      </div>
      <v-alert dark border="top" type="error" transition="scale-transition" :value="!getIsOnline" style="position: absolute; top: 0.5em;">Vous semblez déconnecté de DomoFox ! Vérifiez votre connexion.</v-alert>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from '@/components/Block.vue'
import Clock from '@/components/Clock.vue'
import Setpoint from '@/components/Setpoint.vue'
import SensorValue from '@/components/SensorValue.vue'
import ModeStatus from '@/components/ModeStatus.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Block,
    Clock,
    Setpoint,
    SensorValue,
    ModeStatus
  },
  data () {
    return {
      styleObject: {
        height: "100%",
        background: this.$config.HOME_BKG || "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed"
      }
    }
  },
  computed: {
    ...mapGetters(['getIsOnline', 'getSensorsAverage'])
  }
}
</script>

<style>
  .block-tall-xxl {
    width: 26em!important;
    height: 24em!important;
  }
  .block-xxl {
    width: 26em!important;
    height: 12em;
  }
  .block-xl {
    width: 18em!important;
    height: 12em;
  }
  .block-sm {
    width: 6em!important;
    height: 12em;
  }
</style>
