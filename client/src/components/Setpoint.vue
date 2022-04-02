<template>
  <Block class="pt-5 align-items-center" icon="pencil-square" v-b-modal.user-input>
    <p class="display-2">{{ getSetpointManu }}<span class="display-4">{{ unit }}</span></p>
    <b-modal
      id="user-input"
      :header-bg-variant="'dark'"
      :body-bg-variant="'dark'"
      :footer-bg-variant="'dark'"
      button-size="lg"
      centered >
        <template #default>
          <value-input />
        </template>
        <template #modal-footer="{ ok, cancel }">
          <b-row class="w-100">
            <b-col><b-button block size="lg" variant="secondary" @click="cancel()"><b-icon :icon="'x-square'"></b-icon></b-button></b-col>
            <b-col><b-button block size="lg" variant="primary" @click="ok()"><b-icon :icon="'check-square'"></b-icon></b-button></b-col>
          </b-row>
        </template>
      </b-modal>
  </Block>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from '@/components/Block.vue'
import ValueInput from '@/components/ValueInput.vue'

export default {
  name: 'SetPoint',
  props: {
    type: String,
    unit: {
      type: String,
      default: '°C'
    }
  },
  components: {
    Block,
    ValueInput
  },
  computed: {
    ...mapGetters(['getSetpointManu'])
  }
}
</script>

<style scoped>

</style>
