<template>
  <v-card class="my-2">
    <v-card-title class="justify-space-between flex-grow-1 pb-0">
      <v-switch v-model="planning.active" @change="update('active', $event)"></v-switch>
      <div class="text-h4 flex-grow-1">{{ planning.time.hour }}:{{ planning.time.min }}</div>
      <value-input :value="planning.setpoint" @input="update('setpoint', $event)">
        <div class="text-h3 flex-grow-1">{{ planning.setpoint }}°C</div>
      </value-input>
      <v-btn small text color="light"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn small text color="#B71C1C"><v-icon>mdi-delete</v-icon></v-btn>
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
      // update the planning
      this.update('days', newDays)
    },
    update (key, value) {
      // Create a clone of planning to dispatch
      const newPlanning = { ...this.planning, [key]: value }
      console.log('update', newPlanning)
      this.$store.dispatch('setPlanning', { id: this.id, value: newPlanning })
    }
  }
  // watch: {
  //   planning: function (value) {
  //     console.log('planning changed: ', value)
  //   }
  // }
}
</script>
