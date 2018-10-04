import Vue from 'vue'
import Router from 'vue-router'
import BlogList from '@/spa/blog/BlogList.vue'
import BlogTags from '@/spa/blog/BlogTags.vue'
import BlogAbout from '@/spa/blog/BlogAbout.vue'
import BlogDetail from '@/spa/blog/BlogDetail.vue'
import BlogNew from '@/spa/blog/BlogNew.vue'
import Signup from '@/spa/user/Signup.vue'
import Signin from '@/spa/user/Signin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: BlogList },
    { path: '/search/:tag', component: BlogList },
    { path: '/tags', component: BlogTags },
    { path: '/about', component: BlogAbout },
    { path: '/post/:id', component: BlogDetail },
    { path: '/new', component: BlogNew },
    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin }
  ]
})
