<template>
  <div @click.stop="openDialog()" class="value-input">
    <slot></slot>
    <v-dialog v-model="dialog" width="400">
      <v-card class="grey darken-2">
        <v-container>
          <v-row>
            <v-col><p class="display-3 text-center mb-0">{{ tempValue }}</p></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col><v-btn block color="primary" @click="increment(-1)">--</v-btn></v-col>
            <v-col><v-btn block color="primary" @click="increment(1)">++</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col><v-btn block color="primary" @click="increment(-0.1)">-</v-btn></v-col>
            <v-col><v-btn block color="primary" @click="increment(0.1)">+</v-btn></v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn color="secondary" @click="dialog = false">Annuler</v-btn>
          <v-btn color="primary" @click="validate()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ValueInput',
  data() {
    return { 
      dialog: false,
      tempValue: 0,
    }
  },
  props: {
    value: Number,
  },
  methods: {
    openDialog () {
      this.tempValue = this.value
      this.dialog = true
    },
    validate() {
      this.$emit('input', this.tempValue)
      this.dialog = false
    },
    increment(step) {
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
