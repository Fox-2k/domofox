<template>
  <div class="block rounded m-3">
    <div class="title rounded text-center p-1">
      <b-icon :icon="icon"></b-icon>
      </div>
    <slot></slot>
  </div>
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
    width: 2em;
    height: 2em;
    /* line-height: 2.5em; */
    color: white;
    font-size: 1.5em;
    background: linear-gradient(to top, #400000, #800000);
  }
</style>
