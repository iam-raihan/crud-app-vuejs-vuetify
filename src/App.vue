<template>
  <v-app toolbar>
    <my-navbar></my-navbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer fixed class="pa-4">
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        fixed: true
      }
    }
  }
</script>

<style scoped>

</style>