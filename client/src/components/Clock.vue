<template>
  <block class="block-xl" icon="mdi-clock">
    <v-card-text class="text-center pt-8">
      <p class="display-3">{{ getTime }}</p>
      <p class="display-1">{{ getDate }}</p>
    </v-card-text>
  </block>
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

<style>

</style>
