<template>
  <v-card class="my-2">
    <v-card-title class="justify-space-between flex-grow-1 pb-0">
      <v-switch v-model="planning.active" @change="update('active', $event)"></v-switch>
      <div class="text-h4 flex-grow-1" @click.stop="openDialogTime()">{{ ('0' + planning.time.hour).slice(-2) }}:{{ ('0' + planning.time.min).slice(-2) }}</div>
      <v-dialog persistent v-model="dialogTime" width="320px">
        <v-time-picker dark v-if="dialogTime" v-model="time" full-width format="24hr" color="primary">
          <v-btn fab x-large color="secondary" @click="dialogTime = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn fab x-large color="primary" @click="validateTime()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
        </v-time-picker>
      </v-dialog>
      <value-input class="flex-grow-1" :value="planning.setpoint" @input="update('setpoint', $event)">
        <div class="text-h3">{{ planning.setpoint }}°C</div>
      </value-input>
      <v-dialog v-model="dialogDelete">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small text color="#B71C1C" v-bind="attrs" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <v-card class="grey darken-2">
          <v-card-title>Delete this setpoint ?</v-card-title>
          <v-card-actions class="justify-space-around">
            <v-btn fab x-large color="secondary" @click="dialogDelete = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
            <v-btn fab x-large color="primary" @click="deletePlanning()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-actions class="d-flex justify-end">
      <v-chip x-small class="mx-1" :color="planning.days[0] ? 'success' : 'secondary'" :text-color="planning.days[0] ? 'black' : 'white'" @click="toggleDay(0)">Mon</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[1] ? 'success' : 'secondary'" :text-color="planning.days[1] ? 'black' : 'white'" @click="toggleDay(1)">Tue</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[2] ? 'success' : 'secondary'" :text-color="planning.days[2] ? 'black' : 'white'" @click="toggleDay(2)">Wed</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[3] ? 'success' : 'secondary'" :text-color="planning.days[3] ? 'black' : 'white'" @click="toggleDay(3)">Thu</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[4] ? 'success' : 'secondary'" :text-color="planning.days[4] ? 'black' : 'white'" @click="toggleDay(4)">Fri</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[5] ? 'success' : 'secondary'" :text-color="planning.days[5] ? 'black' : 'white'" @click="toggleDay(5)">Sat</v-chip>
      <v-chip x-small class="mx-1" :color="planning.days[6] ? 'success' : 'secondary'" :text-color="planning.days[6] ? 'black' : 'white'" @click="toggleDay(6)">Sun</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
import ValueInput from '@/components/ValueInput.vue'

export default {
  name: 'Planning',
  data () {
    return { dialogTime: false, time: '', dialogDelete: false }
  },
  props: {
    id: String
  },
  components: {
    ValueInput
  },
  computed: {
    planning: function () {
      return this.$store.state.plannings.find(p => p.id === this.id)
    }
  },
  methods: {
    toggleDay (index) {
      // Create a clone of days
      const newDays = [...this.planning.days]
      // Toggle the specified index
      newDays[index] = !this.planning.days[index]
      // Update the planning
      this.update('days', newDays)
    },
    update (key, value) {
      // Create a clone of planning to dispatch and change the specified key
      const newPlanning = { ...this.planning, [key]: value }
      // Launch the planning update
      this.$store.dispatch('setPlanning', { id: this.id, value: newPlanning })
    },
    openDialogTime () {
      this.time = ('00' + (this.planning.time.hour || 0)).slice(-2) + ':' + ('00' + (this.planning.time.min || 0)).slice(-2)
      this.dialogTime = true
    },
    validateTime () {
      if (this.time && this.time.includes(':')) {
        this.update('time', { hour: parseInt(this.time.split(':')[0]), min: parseInt(this.time.split(':')[1]) })
      }
      this.dialogTime = false
    },
    deletePlanning () {
      this.$store.dispatch('deletePlanning', this.id)
    }
  }
}
</script>

<style>
.v-time-picker-title {
  justify-content: center!important;
}
</style>
