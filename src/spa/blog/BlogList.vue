<template>
  <div class="blog-list-c">
    <auth-header></auth-header>
    <app-header></app-header>
    <app-nav></app-nav>
    <b-list-group>
      <b-list-group-item v-for="(list, index) in posts" :key="index" class="flex-column align-items-start">
        <router-link :to="`/post/${list.blog._id}`">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{list.blog.title}}</h5>
            <small>{{list.blog.registerDate}}</small>
          </div>
        </router-link>
        <div class="blog-tag-list-w">
          <div class="blog-tag-list-c" v-for="(tag, idx) in list.blog.tags" :key="idx">
            <router-link :to="`/search/${tag}`">{{tag}}</router-link>
          </div>
        </div>
        <small>wrote by {{list.email}}</small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AppNav from '@/shared-components/AppNav.vue'
import AuthHeader from '@/shared-components/AuthHeader.vue'
import dateHelper from '@/commons/functions/dateHelper'
export default {
  name: 'blog-list',
  components: {
    'app-header': AppHeader,
    'app-nav': AppNav,
    'auth-header': AuthHeader
  },
  data() {
    return {
      posts: ''
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    calculateDate(date) {
      return dateHelper.calculateDate(date)
    },
    getPosts() {
      let url = ''
      if(this.$route.params.tag) url = `http://127.0.0.1:3000/api/blog/search/${this.$route.params.tag}`
      else url = 'http://127.0.0.1:3000/api/blog'
      this.$http.get(url)
      .then(res => {
        const posts = res.data
        const mappedPosts = posts.map(cur => {
          let post = []
          post = cur._id
          return post
        })
        mappedPosts.filter(el => el.blog.registerDate = this.calculateDate(new Date(el.blog.registerDate)))
        this.posts = mappedPosts
      })
    }
  },
  watch: {
    '$route': 'getPosts'
  }
}
</script>
<style lang="scss">
.blog-list-c {
  width: 50%;
  .blog-tag-list-w {
    display: flex;
    .blog-tag-list-c {
      border-radius: .25rem;
      background-color: #4374D9;
      color: #FFFFFF;
      font-size: .8rem;
      padding: 1px;
      margin-right: 5px;
      a {
        color: #FFFFFF;
      }
    }
  }
  a {
    color: #000000;
  }
  a:hover {
    color: #B0B0B0;
  }
}
</style>