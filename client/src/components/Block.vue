<template>
  <div class="block rounded m-3">
    <div class="title rounded text-left p-1">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Block",
  props: {
    title: String
  },
}
</script>

<style scoped>
  .block {
    position: relative;
    background: #ffffff20;
    width: 12em;
    height: 12em;
  }
  .title {
    display: inline-block;
    position: absolute;
    top: -0.5em;
    left: -0.5em;
    min-width: 3em;
    height: 3em;
    line-height: 2.5em;
    color: white;
    background: linear-gradient(to top, #400000, #800000);
  }
</style>
