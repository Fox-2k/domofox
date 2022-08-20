<template>
  <v-card elevation="4" outlined color="#282d33">
    <v-card-title class="SensorElement d-flex flex-nowrap py-0">
      <v-switch v-model="config.active" @change="update('active', $event)"></v-switch>

      <div class="d-flex justify-space-between flex-grow-1 flex-nowrap">
        <div class=" flex-shrink-1 text-truncate" style="max-width:10em;">{{ config.label }}</div>
        <div>
          <v-btn small text color="white" @click="beginUpdate()">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog persistent v-model="dialogConfig">
            <v-card>
              <v-card-title>{{ dialogConfigContent.label }}</v-card-title>
            
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Sensor label" outlined v-model="dialogConfigContent.label" :rules="[dialogRules.required]"></v-text-field>
                      <v-text-field label="Driver" placeholder="driverFile.js" outlined v-model="dialogConfigContent.driver" :rules="[dialogRules.required]"></v-text-field>
                      <v-text-field label="Sensor id for driver" outlined v-model="dialogConfigContent.params.id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="number" label="Weight" outlined v-model="dialogConfigContent.weight" :rules="[dialogRules.required]"></v-text-field>
                      <v-text-field type="number" label="Calibration (factor)" outlined v-model="dialogConfigContent.calibration.a" :rules="[dialogRules.required]"></v-text-field>
                      <v-text-field type="number" label="Calibration (offset)" outlined v-model="dialogConfigContent.calibration.b" :rules="[dialogRules.required]"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            
              <v-card-actions class="justify-space-around">
                <v-btn fab x-large color="secondary" @click="dialogConfig = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
                <v-btn fab x-large color="primary" @click="confirmUpdate()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small text color="#B71C1C" v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card class="grey darken-2">
              <v-card-title>Delete this sensor ?</v-card-title>
              <v-card-actions class="justify-space-around">
                <v-btn fab x-large color="secondary" @click="dialogDelete = false">
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
                <v-btn fab x-large color="primary" @click="deleteSensor()">
                  <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

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
  data() {
    return {
      dialogConfig: false,
      dialogDelete: false,
      dialogConfigContent: {
        label: "",
        driver: "",
        params: {
          id: "",
        },
        weight: 1,
        calibration: {
          a: 1,
          b: 0,
        },
      },
      dialogRules: {
        required: value => !!value || value === 0 || "This field is required"
      },
    }
  },
  props: {
    id: String
  },
  computed: {
    config() {
      return this.$store.state.sensors.list.find(s => s.id === this.id)
    }
  },
  methods: {
    update (key, value) {
      // Create a clone of sensor to dispatch and change the specified key
      const newConfig = { ...this.config, [key]: value }
      // Launch the sensor update
      this.$store.dispatch('setSensor', { id: this.id, value: newConfig })
    },
    beginUpdate() {
      this.dialogConfigContent = { ...this.config };
      this.dialogConfig = true;
    },
    confirmUpdate() {
      const valid = this.$refs.form.validate()

      // Ensure numerical values are ... numeric 
      this.dialogConfigContent.weight = parseFloat(this.dialogConfigContent.weight)
      this.dialogConfigContent.calibration.a = parseFloat(this.dialogConfigContent.calibration.a)
      this.dialogConfigContent.calibration.b = parseFloat(this.dialogConfigContent.calibration.b)
      
      // If valid, launch the sensor update with the filled dialog content
      if(valid) this.$store.dispatch('setSensor', { id: this.id, value: this.dialogConfigContent })

      // Then close the form dialog
      this.dialogConfig = false
    },
    deleteSensor() {
      this.$store.dispatch('deleteSensor', this.id)
    }
  }
}
</script>
