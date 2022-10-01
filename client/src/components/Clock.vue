<template>
  <block class="block" icon="mdi-clock">
    <v-card-text class="text-center pt-12">
      <p class="display-1">{{ getTime }}</p>
      <p style="font-size: 2em;">{{ getDate }}</p>
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
