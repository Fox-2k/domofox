<template>
  <div class="calendar">
    <v-app-bar fixed class="justify-center">
        <v-btn-toggle class="mx-auto">
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
        <v-card class="my-2" v-for="item in items" :key="item.time">
          <v-card-title class="justify-space-between flex-grow-1 pb-0">
            <div class="text-h3 flex-grow-1">{{ item.time }}</div>
            <div class="text-h3 flex-grow-1">{{ item.temp }}°C</div>
            <v-btn text color="light"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn text color="#B71C1C"><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-title>
          <v-card-actions class="d-flex justify-end">
            <v-chip x-small class="mx-1">Mon</v-chip>
            <v-chip x-small class="mx-1">Tue</v-chip>
            <v-chip x-small class="mx-1">Wed</v-chip>
            <v-chip x-small class="mx-1">Thu</v-chip>
            <v-chip x-small class="mx-1">Fri</v-chip>
            <v-chip x-small class="mx-1">Sat</v-chip>
            <v-chip x-small class="mx-1">Sun</v-chip>
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

export default {
  name: 'Calendar',
  data () {
    return {
      items: [{ time: '11:22', temp: 19 }, { time: '12:22', temp: 20 }, { time: '13:22', temp: 23 },{ time: '14:22', temp: 15 }]
    }
  }
}
</script>

<style scoped>
.btn-calendar-plus {
  position: fixed;
  right: 1em;
  bottom: 5em;
}
</style>
