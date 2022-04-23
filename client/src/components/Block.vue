<template>
  <v-card elevation="6" shaped class="block ma-3">
    <div class="title rounded text-center">
      <v-icon>{{ icon }}</v-icon>
    </div>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'Block',
  props: {
    icon: String
  }
}
</script>

<style scoped>
  .block {
    /* position: relative; */
    /* background: #ffffff20; */
    width: 12em;
    height: 12em;
  }
  .title {
    display: inline-block;
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    width: 2em;
    height: 2em;
    /* line-height: 2.5em; */
    color: white;
    font-size: 1.5em;
    background: linear-gradient(to top, #400000, #800000);
  }
</style>
