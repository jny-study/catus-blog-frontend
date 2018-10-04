<template>
  <b-container fluid class="d-flex align-items-center justify-content-center">
    <h1><router-link to="/">Vuetiful</router-link></h1>
  </b-container>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      isSignin: false
    }
  }
}
</script>
<style lang="scss">
a {
  color: #000000;
}
a:hover {
  color: #B0B0B0;
}
</style>