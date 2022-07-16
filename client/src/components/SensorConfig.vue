<template>
  <v-card elevation="4" outlined color="#282d33">
    <v-card-title class="SensorElement d-flex py-0">
      <v-switch v-model="config.active" @change="update('active', $event)"></v-switch>
      <v-dialog persistent v-model="dialog" width="320px">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex justify-space-between flex-grow-1">
            <div class=" flex-shrink-1">{{ config.label }}</div>
            <v-dialog v-model="dialogDelete">
              <template v-slot:activator="{ on, attrs }">
                <v-btn small text color="#B71C1C" v-bind="attrs" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
              </template>
            <v-card class="grey darken-2">
              <v-card-title>Delete this sensor ?</v-card-title>
              <v-card-actions class="justify-space-around">
                <v-btn fab x-large color="secondary" @click="dialogDelete = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
                <v-btn fab x-large color="primary" @click="deleteSensor()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </div>
        </template>
        <v-card>
          <v-card-title>{{ config.label }}</v-card-title>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-actions class="pt-0 pr-3 d-flex justify-start">
      <div class="font-weignt-medium">{{ config.value }}°C x {{ config.weight }}</div>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: 'SensorConfig',
  data () {
    return {
      dialog: false,
      dialogDelete: false
    }
  },
  props: {
    id: String
  },
  computed: {
    config () {
      return this.$store.state.sensors.list.find(s => s.id === this.id)
    }
  }
}
</script>
