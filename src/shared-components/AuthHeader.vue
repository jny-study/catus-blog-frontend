<template>
  <div class="auth-header-w d-flex align-items-center">
    <div v-if="auth">
      환영합니다! <router-link to="/new">글쓰기</router-link>
      <button @click="onLogout">로그아웃</button>
    </div>
    <div v-else>
      <router-link to="/signin">로그인</router-link>
      <router-link to="/signup">계정 생성하기</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'auth-header',
  data() {
    return {
      auth: false,
      email: ''
    }
  },
  created() {
    const token = localStorage.getItem('user-token')
    if(token) {
      this.auth = true
    }
  },
  methods: {
    onLogout() {
      localStorage.removeItem('user-token')
      this.$router.go(this.$router.currentRoute)
    }
  }
}
</script>
<style lang="scss">
.auth-header-w {
  justify-content: flex-end; 
  a {
    margin: 0 10px;
  }
}
</style>