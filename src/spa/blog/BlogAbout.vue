<template>
  <div>
    <auth-header></auth-header>
    <app-header></app-header>
    <app-nav></app-nav>
    <b-container class="d-flex justify-content-center align-items-center">
      <div class="blog-about-c"><img src="@/assets/logo.png" alt="profile"></div>
      <div>
        nice to meet you everyone I'd like to know what you are doing man!
        <small>by nomad</small>
      </div>
    </b-container>
  </div>
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AppNav from '@/shared-components/AppNav.vue'
import AuthHeader from '@/shared-components/AuthHeader.vue'
export default {
  name: 'blog-about',
  components: {
    'app-header': AppHeader,
    'app-nav': AppNav,
    'auth-header': AuthHeader
  },
}
</script>
<style lang="scss">
.blog-about-c img {
  width: 100px;
  height: 100px;
}
.blog-about-c {
}
</style>