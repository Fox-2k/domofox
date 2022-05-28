<template>
  <v-app>

    <v-main dark class="">
      <router-view/>
      <v-footer id="nav" padless absolute fixed class="justify-space-around pa-3">
        <v-btn value="home" plain class="flex-grow-1">
          <router-link to="/"><v-icon x-large color="#E57373">mdi-home</v-icon></router-link>
        </v-btn>
        <v-btn value="calendar" plain class="flex-grow-1">
          <router-link to="/calendar"><v-icon x-large color="#E57373">mdi-calendar</v-icon></router-link>
        </v-btn>
        <v-btn value="settings" plain class="flex-grow-1">
          <router-link to="/settings"><v-icon x-large color="#E57373">mdi-cog</v-icon></router-link>
        </v-btn>
    </v-footer>

    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style scoped>
  #nav {
    position: fixed;
  }
</style>
