<template>
  <div class="signin-w">
    <auth-header></auth-header>
    <app-header></app-header>
    <b-form @submit.prevent="onSubmit" id="form">
      <b-form-group label="Email:"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter your email">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <p>{{alert}}</p>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div> 
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AuthHeader from '@/shared-components/AuthHeader.vue'
export default {
  name: 'signin',
  components: {
    'app-header': AppHeader,
    'auth-header': AuthHeader
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      alert: ''
    }
  },
  methods: {
    onSubmit() {
      if(this.form.password.length < 5) this.alert = '비밀번호 길이가 충분하지 않습니다.'
      else {
        this.alert = ''
        this.$http.post('http://127.0.0.1:3000/api/signin', { email: this.form.email, password: this.form.password })
        .then(res => {
          const token = res.data.token
          localStorage.setItem('user-token', token)
          this.$router.push('/')
        })
        .catch(err => this.alert = err.response.data.msg)
      }
    }
  }
}
</script>
<style lang="scss">
.signin-w {
  width: 50%;
}
</style>