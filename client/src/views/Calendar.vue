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
          <v-btn>all</v-btn>
        </v-btn-toggle>
    </v-app-bar>
    <div class="pa-2 mt-12">
      <div class="list">
        <planning v-for="item in plannings" :key="item.id" :id="item.id"></planning>
      </div>
      <v-btn fab x-large color="primary" class="btn-calendar-plus">
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Planning from '@/components/Planning.vue'

export default {
  name: 'Calendar',
  components: {
    Planning
  },
  data () {
    return {
      selectedDay: 0
    }
  },
  computed: {
    // ...mapGetters(['getPlannings']),
    plannings: function () {
        return this.selectedDay < 7 ? this.$store.state.plannings.filter(p => p.days[this.selectedDay]) : this.$store.state.plannings      
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
