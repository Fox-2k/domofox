<template>
  <div class="calendar">
    <v-app-bar fixed class="justify-center">
        <v-btn-toggle mandatory class="mx-auto" v-model="selectedDay">
          <v-btn>Mon</v-btn>
          <v-btn>Tue</v-btn>
          <v-btn>Wed</v-btn>
          <v-btn>Thu</v-btn>
          <v-btn>Fri</v-btn>
          <v-btn>Sat</v-btn>
          <v-btn>Sun</v-btn>
        </v-btn-toggle>
    </v-app-bar>
    <div class="pa-2 mt-12">
      <div class="list">
        <v-card class="my-2" v-for="item in plannings" :key="item.id">
          <v-card-title class="justify-space-between flex-grow-1 pb-0">
            <v-switch v-model="item.active"></v-switch>
            <div class="text-h4 flex-grow-1">{{ item.time.hour }}:{{ item.time.min }}</div>
            <div class="text-h3 flex-grow-1">{{ item.setpoint }}°C</div>
            <v-btn small text color="light"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn small text color="#B71C1C"><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-title>
          <v-card-actions class="d-flex justify-end">
            <v-chip x-small class="mx-1" :color="item.days[0] ? 'success' : 'secondary'" :text-color="item.days[0] ? 'black' : 'white'">Mon</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[1] ? 'success' : 'secondary'" :text-color="item.days[1] ? 'black' : 'white'">Tue</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[2] ? 'success' : 'secondary'" :text-color="item.days[2] ? 'black' : 'white'">Wed</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[3] ? 'success' : 'secondary'" :text-color="item.days[3] ? 'black' : 'white'">Thu</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[4] ? 'success' : 'secondary'" :text-color="item.days[4] ? 'black' : 'white'">Fri</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[5] ? 'success' : 'secondary'" :text-color="item.days[5] ? 'black' : 'white'">Sat</v-chip>
            <v-chip x-small class="mx-1" :color="item.days[6] ? 'success' : 'secondary'" :text-color="item.days[6] ? 'black' : 'white'">Sun</v-chip>
          </v-card-actions>
        </v-card>
      </div>
      <v-btn fab x-large color="primary" class="btn-calendar-plus">
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Calendar',
  data () {
    return {
      selectedDay: 0,
      items: [{ time: '11:22', temp: 19 }, { time: '12:22', temp: 20 }, { time: '13:22', temp: 23 },{ time: '14:22', temp: 15 }]
    }
  },
  computed: {
    ...mapGetters(['getPlannings']),
    plannings: function () {
      return this.$store.state.plannings.filter(p => p.days[this.selectedDay])
    }
  },
  mounted () {
    this.$store.dispatch('getPlannings')
  }
}
</script>

<style scoped>
.btn-calendar-plus {
  position: fixed;
  right: 1em;
  bottom: 5em;
}

.activeday {
  background-color: green;
}
</style>
