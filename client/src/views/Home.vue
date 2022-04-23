<template>
  <div class="home">
    <v-container class="d-flex flex-wrap justify-center">
      <clock />
      <block icon="mdi-tune" class="block-sm"></block>
      <sensor-value icon="mdi-tune" :value="getSensorsAverage"></sensor-value>
      <Setpoint />
      <block class="block-xxl"></block>
      <v-alert dark border="top" type="error" transition="scale-transition" :value="!getIsOnline">Vous semblez déconnecté de DomoFox ! Vérifiez votre connexion.</v-alert>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from '@/components/Block.vue'
import Clock from '@/components/Clock.vue'
import Setpoint from '@/components/Setpoint.vue'
import SensorValue from '@/components/SensorValue.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Block,
    Clock,
    Setpoint,
    SensorValue
  },
  computed: {
    ...mapGetters(['getIsOnline', 'getSensorsAverage'])
  }
}
</script>

<style>
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
