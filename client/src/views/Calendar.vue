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
        <transition-group name="calendar" tag="div">
          <planning v-for="item in plannings" :key="item.id" :id="item.id" class="calendar-item"></planning>
        </transition-group>
      <v-btn fab x-large color="primary" class="btn-calendar-plus" @click="createNewPlanning()">
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
      // Get plannings from store
      let plannings = this.$store.state.plannings

      // Only show selected day plannings, or all
      if (this.selectedDay < 7) {
        plannings = plannings.filter(p => p.days[this.selectedDay])
      }

      // Order plannings by time
      plannings = plannings.sort((a, b) => {
        const hour = a.time.hour - b.time.hour
        const min = a.time.min - b.time.min
        return hour || min
      })

      return plannings
    }
  },
  mounted () {
    this.$store.dispatch('getPlannings')
  },
  methods: {
    createNewPlanning: function () {
      this.$store.dispatch('createPlanning')
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

.activeday {
  background-color: green;
}

.calendar-item {
  transition: all 0.4s;
}

.calendar-enter {
  opacity: 0;
  transform: translateX(200px);
}

.calendar-leave {
  opacity: 0;
  transform: translateX(0px);
}

.calendar-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.calendar-leave-active {
  position: absolute;
}
</style>
