<template>
  <div @click.stop="openDialog()" class="value-input">
    <slot></slot>
    <v-dialog v-model="dialog" width="400">
      <v-card class="grey darken-2">
        <v-container>
          <v-row>
            <v-col class="mb-0"><p class="display-3 text-center mb-0">{{ tempValue }}</p></v-col>
          </v-row>
          <v-row>
            <!-- <v-col> -->
              <v-divider></v-divider>
            <!-- </v-col> -->
          </v-row>
          <v-row class="justify-space-around">
            <v-col cols="5"><v-btn x-large block color="primary" @click="increment(-1)"><v-icon>mdi-chevron-double-left</v-icon></v-btn></v-col>
            <v-col cols="5"><v-btn x-large block color="primary" @click="increment(1)"><v-icon>mdi-chevron-double-right</v-icon></v-btn></v-col>
          </v-row>
          <v-row class="justify-space-around">
            <v-col cols="5"><v-btn x-large block color="primary" @click="increment(-0.1)"><v-icon>mdi-chevron-left</v-icon></v-btn></v-col>
            <v-col cols="5"><v-btn x-large block color="primary" @click="increment(0.1)"><v-icon>mdi-chevron-right</v-icon></v-btn></v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-space-around">
          <v-btn fab x-large color="secondary" @click="dialog = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          <v-btn fab x-large color="primary" @click="validate()"><v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ValueInput',
  data () {
    return {
      dialog: false,
      tempValue: 0
    }
  },
  props: {
    value: Number
  },
  methods: {
    openDialog () {
      this.tempValue = this.value
      this.dialog = true
    },
    validate () {
      this.$emit('input', this.tempValue)
      this.dialog = false
    },
    increment (step) {
      this.tempValue = Math.round((this.tempValue + step) * 100) / 100
    }
  }
}
</script>

<style scoped>
  .value-input {
    height: 100%;
    cursor: pointer;
  }
</style>
