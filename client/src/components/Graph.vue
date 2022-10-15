<template>
  <block class="block-xxl" icon="mdi-chart-areaspline">
    <v-card-text class="text-center pt-8 position-relative">
      <canvas width="210" height="85" style="margin-top: -10px; width: 100%; height: 100%;"></canvas>
    </v-card-text>
  </block>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'

let timer

export default {
  name: 'Graph',
  components: {
    Block
  },
  data () {
    return {
      chart: {}
    }
  },
  computed: {
    AVG_TEMP () {
      return this.$store.state.traces.AVG_TEMP
    },
    SETPOINT () {
      return this.$store.state.traces.SETPOINT
    },
    HEATER () {
      return this.$store.state.traces.HEATER
    }
  },
  destroyed: function () {
    clearInterval(timer)
  },
  mounted: function () {
    timer = setInterval(() => {
      this.askForChartData()
    }, 5000)
    this.askForChartData()
  
    const canvas = this.$el.querySelector('canvas');
    const orangeGradient = canvas.getContext('2d').createLinearGradient(0,25,0,256);
    orangeGradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
    orangeGradient.addColorStop(1, 'orange');
    const redGradient = canvas.getContext('2d').createLinearGradient(0,25,0,256);
    redGradient.addColorStop(0, 'rgba(255, 50, 90, 0.8)');
    redGradient.addColorStop(1, 'red');

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
        {
          label: 'Setpoint',
          data: this.SETPOINT,
          // backgroundColor: orangeGradient,
          borderColor: 'white', //'#2a74ff',
          borderWidth: 1,
          stepped: true,
          pointRadius: 0,
          pointHitRadius: 10,
          // fill: 'origin',  
        },
        {
          label: 'Heater',
          data: this.HEATER,
          borderColor: 'red',
          backgroundColor: redGradient,
          borderWidth: 0,
          stepped: true,
          pointRadius: 0,
          pointHitRadius: 10,
          fill: 'origin',
          yAxisID: 'yheaterAxis'
        },
        {
          label: 'T°',
          data: this.AVG_TEMP,
          backgroundColor: orangeGradient,
          borderWidth: 0,
          tension: 0.3,
          pointRadius: 0,
          pointHitRadius: 10,
          fill: 'origin',
        },
      ]
      },
      options: {
        interaction: {
          mode: "index"
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
              type: 'time',
              min: new Date().setDate(new Date().getDate() - 1),
              time: {
                // unit: 'day',
                displayFormats: {
                  hour: 'H\\h',
                  day: 'D/MM'
                }
              },
              ticks: {
                color: "rgba(200,200,200)",
              },
              grid: {
                  color: "rgba(255,255,255,0.05)"
              }
            },
            y: {
                // min: 10,
                ticks: {
                  color: "rgba(200,200,200)",
                },
                grid: {
                  color: "rgba(255,255,255,0.25)"
                }
            },
            yheaterAxis: {
                min: 0,
                max: 10, 
                display: false,
                ticks: {
                  color: "rgba(200,200,200)",
                },
                grid: {
                  color: "rgba(255,255,255,0.25)"
                }
            }
        }
      }
    });
  },
  watch: {
    SETPOINT: function (data) {
      this.chart.data.datasets[0].data = data
      this.chart.update()
    },
    HEATER: function (data) {
      this.chart.data.datasets[1].data = data
      this.chart.update()
    },
    AVG_TEMP: function (data) {
      this.chart.data.datasets[2].data = data
      this.chart.options.scales.x.min = new Date().setDate(new Date().getDate() - 1),
      this.chart.options.scales.y.min = data.reduce((c, v) => Math.min(c, v.y), data[0]?.y || 15) - 1
      this.chart.options.scales.y.max = data.reduce((c, v) => Math.max(c, v.y), data[0]?.y || 15) + 1
      this.chart.update()
    },
  },
  methods: {
    askForChartData: function () {
      const now = new Date()
      const to = now.toISOString()

      let from = new Date()
      from.setDate(now.getDate() - 1)
      from = from.toISOString()
      
      this.$store.dispatch('getTraces', {code: "SETPOINT", from, to})
      this.$store.dispatch('getTraces', {code: "AVG_TEMP", from, to})
      this.$store.dispatch('getTraces', {code: "HEATER", from, to})
    }
  }
}
</script>

<style>

</style>
