<template>
  <b-nav class="blog-nav-c d-flex align-items-center justify-content-center">
    <b-nav-item><router-link to="/">Posts</router-link></b-nav-item>
    <b-nav-item><router-link to="/tags">Tags</router-link></b-nav-item>
    <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
    <!-- <b-nav-item><router-link to="/new">New</router-link></b-nav-item> -->
  </b-nav>
</template>
<script>
export default {
  name: 'app-nav'
}
</script>
<style lang="scss"></style>