<template>
  <div class="blog-detail-w d-flex">
    <auth-header></auth-header>
    <app-header></app-header>
    <app-nav></app-nav>
    <div class="profile-w d-flex justify-content-center align-items-center">
      <div class="profile-picture-c"><img src="@/assets/logo.png" alt="profile"></div>
      <div class="profile-info-c">
        {{post.email}} 
        <small v-if="post">{{post.blog.registerDate}}</small>
      </div>
    </div>
    <div class="blog-detail-title-c" v-if="post">
      <h1>{{post.blog.title}}</h1></div>
    <div class="blog-detail-content-c editor-content-area" v-if="post" v-html="post.blog.content"></div>
  </div>
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AppNav from '@/shared-components/AppNav.vue'
import AuthHeader from '@/shared-components/AuthHeader.vue'
import dateHelper from '@/commons/functions/dateHelper'
export default {
  name: 'blog-detail',
  components: {
    'app-header': AppHeader,
    'app-nav': AppNav,
    'auth-header': AuthHeader
  },
  data() {
    return {
      post: ''
    }
  },
  created() {
    const _id = this.$route.params.id
    this.$http.get(`http://127.0.0.1:3000/api/blog/${_id}`)
    .then(res => {
      this.post = res.data
      this.post.blog.registerDate = this.calculateDate(new Date(this.post.blog.registerDate))
    })
    .catch(() => this.$router.push('/'))
  },
  methods: {
    calculateDate(date) {
      return dateHelper.calculateDate(date)
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-detail.scss"></style>
<style lang="scss" src="@/assets/css/blog-text-editor-view.scss"></style>