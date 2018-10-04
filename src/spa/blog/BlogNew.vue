<template>
  <div class="d-flex flex-column align-items-center blog-new-w">
    <div class="blog-new-c">
      <b-form @submit.prevent="onSubmit">
        <div class="blog-new-nav-c d-flex align-items-center">
          <b-link @click="goBack">Back</b-link>
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
        <b-form-group id="blog-new-form-title"
                      label="Title"
                      label-for="title">
          <b-form-input id="title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
        <p v-if="alert == 'title'">제목을 입력해주세요</p>
        <b-form-group id="blog-new-form-tag"
                      label="Tag"
                      label-for="tag">
          <div class="blog-new-form-tag-c" ref="tag-content" @click="onTagFocus">
            <input v-if="tagsCount" type="text" v-model="form.tag" @keydown="onKeydown">
          </div>
        </b-form-group>
        <blog-text-editor></blog-text-editor>
      </b-form>
    </div>
  </div>
</template>
<script>
import BlogTextEditor from '@/shared-components/BlogTextEditor.vue'
export default {
  name: 'blog-new',
  components: {
    'blog-text-editor': BlogTextEditor
  },
  data() {
    return {
      form: {
        title: '',
        tags: [],
        tag: '',
      },
      url: '',
      selection: null,
      alert: ''
    }
  },
  computed: {
    tagsCount: function() { return (this.form.tags.length >= 4) ? false : true },
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.form.title,
        tags: this.form.tags,
        content: this.$children[2].$refs['blog-content'].innerHTML
      }
      this.$http.post(
        'http://127.0.0.1:3000/api/blog', 
        form,
        {
          headers: {
          'authorization': localStorage.getItem('user-token')
        }
      })
      .then(() => this.$router.push('/')
      )
      /* eslint-disable */
      .catch(err => console.log('error')) // error 처리 화면 표시 처리해야함 
    },
    goBack() {
      this.$router.go(-1)
    },
    onTagFocus(event) {
      const target = event.target
      const input = target.lastChild
      if(input && input.focus) input.focus()
    },
    // tag shift + tab 시 tag keydown이 prevent 되는 현상이 있음 수정 요망
    onKeydown(event) {
      let keyCode = event.keyCode
      const tag = this.form.tag
      if(keyCode == 32 || keyCode == 188 || keyCode == 9) {
        event.preventDefault()
        if(this.containsTag(tag)) return
        const div = this.createTagAsDiv(tag)
        this.putTagDiv(div)
        this.form.tags.push(tag)
      }
    },
    putTagDiv(div) {
      const tagContent = this.$refs['tag-content']
      if(tagContent.children.length == 1) tagContent.prepend(div)
      else {
        const childrenLen = tagContent.children.length
        tagContent.children[childrenLen - 2].after(div)
      }
      this.form.tag = ''
    },
    containsTag(tag) {
      return this.form.tags.includes(tag)
    },
    createTagAsDiv(tag) {
      const div = document.createElement('div')
      div.classList.add('tag-span')
      div.innerHTML = tag
      return div 
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-new.scss"></style>