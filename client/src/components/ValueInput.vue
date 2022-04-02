<template>
  <b-container fluid>
    <b-row class="my-2">
      <b-col class="p-1 col-1"><b-button class="p-0 h-100" block size="lg" variant="primary"><b-icon-chevron-double-left /></b-button></b-col>
      <b-col class="p-1 col-1"><b-button class="p-0 h-100" block size="lg" variant="primary"><b-icon-chevron-left /></b-button></b-col>
      <b-col class="p-1 col-8"><b-form-input class="text-center" size="lg" type="number"></b-form-input></b-col>
      <b-col class="p-1 col-1"><b-button class="p-0 h-100" block size="lg" variant="primary"><b-icon-chevron-double-right /></b-button></b-col>
      <b-col class="p-1 col-1"><b-button class="p-0 h-100" block size="lg" variant="primary"><b-icon-chevron-right /></b-button></b-col>
    </b-row>
    <b-row class="my-2">
      <b-col><b-button block size="lg" variant="primary">7</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">8</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">9</b-button></b-col>
    </b-row>
    <b-row class="my-2">
      <b-col><b-button block size="lg" variant="primary">4</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">5</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">6</b-button></b-col>
    </b-row>
    <b-row class="my-2">
      <b-col><b-button block size="lg" variant="primary">1</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">2</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">3</b-button></b-col>
    </b-row>
    <b-row class="my-2">
      <b-col><b-button block size="lg" variant="primary"><b-icon :icon="'backspace'" /></b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">0</b-button></b-col>
      <b-col><b-button block size="lg" variant="primary">.</b-button></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ValueInput'

}
</script>

<style>

</style>
