<template>
  <div class="blog-tags-w">
    <auth-header></auth-header>
    <app-header></app-header>
    <app-nav></app-nav>
    <div class="d-flex justify-content-center align-items-center">
      <b-list-group class="blog-tags-c">
        <b-list-group-item v-for="(tag, index) in tags" :key="index" class="blog-tags-p d-flex justify-content-between">
          <router-link :to="`/search/${tag.name}`">{{tag.name}}</router-link>
          <b-badge class="blog-tags-i" variant="info">{{tag.count}}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AppNav from '@/shared-components/AppNav.vue'
import AuthHeader from '@/shared-components/AuthHeader.vue'
export default {
  name: 'blog-tags',
  components: {
    'app-header': AppHeader,
    'app-nav': AppNav,
    'auth-header': AuthHeader
  },
  data() {
    return {
      tags: ''
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:3000/api/tags')
    .then(res => this.tags = res.data)
    /* eslint-disable */
    .catch(err => console.log('서버 에러'))
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-tags.scss"></style>