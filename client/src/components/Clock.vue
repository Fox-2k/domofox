<template>
  <Block class="clock block-xl pt-5 align-items-center">
    <p class="display-3">{{ getTime }}</p>
    <p class="display-4">{{ getDate }}</p>
  </Block>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'

export default {
  name: 'Clock',
  components: {
    Block
  },
  computed: {
    ...mapGetters(['getDate', 'getTime'])
  }
}
</script>

<style scoped>

</style>
