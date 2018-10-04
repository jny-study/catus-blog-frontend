<template>
  <div class="blog-text-editor-w" @click="disabledEveryShow">
    <div class="blog-text-editor-helper-c">
      <b-dropdown class="blog-text-editor-heading-c" size="sm" variant="link" no-caret>
        <template slot="button-content">
          <span id="editor-heading-popover" size="sm">&#72;</span>
        </template>
        <b-dropdown-item class="heading-2" @click="changeToHeading('<H2>')">제목</b-dropdown-item>
        <b-dropdown-item class="heading-3" @click="changeToHeading('<H3>')">부제목</b-dropdown-item>
        <b-dropdown-item class="heading-5" @click="changeToHeading('<H5>')">소제목</b-dropdown-item>
      </b-dropdown>
      <b-button size="sm" @click="changeToBold">
        <font-awesome-icon icon="bold"></font-awesome-icon>
      </b-button>
      <b-button size="sm" @click="changeToItalic">
        <font-awesome-icon icon="italic"></font-awesome-icon>
      </b-button>
      <b-button size="sm" @click="changeToOrderedList">
        <font-awesome-icon icon="list-ol"></font-awesome-icon>
      </b-button>
      <b-button size="sm" @click="changeToUnOrderedList">
        <font-awesome-icon icon="list-ul"></font-awesome-icon>
      </b-button>
      <b-button size="sm" @click="changeToPreCode">
        <font-awesome-icon icon="code"></font-awesome-icon>
      </b-button>
      <b-button id="editor-link-button" size="sm" @click="getSelection">
        <font-awesome-icon icon="link"></font-awesome-icon>
      </b-button>
      <b-popover :show.sync="linkShow" class="editor-link-popover-c" ref="popover" target="editor-link-button">
        <b-form-input class="editor-link-popover-input" type="text" placeholder="url" size="sm" v-model="linkUrl"></b-form-input>
        <b-button class="editor-link-popover-button" size="sm" @click="addLink">Add</b-button>
        <b-button class="editor-link-popover-button" size="sm" @click="cancelLink">Cancel</b-button>
        <b-alert :show="linkAlertShow"
                  fade
                  variant="warning">
          Please select texts where you need to put a link
        </b-alert>
      </b-popover>
      <b-button id="editor-image-button" size="sm" @click="getSelectionForImage">
        <font-awesome-icon icon="image"></font-awesome-icon>
      </b-button>
      <b-popover :show.sync="imageShow" class="editor-image-popover-c" ref="popover" target="editor-image-button">
        <b-form-input class="editor-image-popover-input" type="text" placeholder="url" size="sm" v-model="imageUrl"></b-form-input>
        <b-button class="editor-image-popover-button" size="sm" @click="addImage">Add</b-button>
        <b-button class="editor-image-popover-button" size="sm" @click="cancelImage">Cancel</b-button>
      </b-popover>
    </div>
    <div class="editor-content-area" contenteditable="true" ref="blog-content" placeholder="Tell your story..."></div>
  </div>
</template>
<script>
export default {
  name: 'blog-text-editor',
  data() {
    return {
      headingShow: false,
      linkUrl: '',
      linkAlertShow: false,
      imageUrl: '',
      selection: null,
      linkShow: false,
      imageShow: false,
    }
  },
  methods: {
    disabledEveryShow() {
      this.linkShow = false
      this.imageShow = false
    },
    changeToHeading(heading) {
      document.execCommand('formatBlock', false, heading)
      this.headingShow = false
    },
    changeToBold() { document.execCommand('bold') },
    changeToItalic() { document.execCommand('italic') },
    changeToOrderedList() { document.execCommand('insertOrderedList') },
    changeToUnOrderedList() { document.execCommand('insertUnOrderedList') },
    changeToPreCode() { document.execCommand('formatBlock', false, '<PRE>') },
    // 중복 코드 제거해야함
    getSelection() {
      this.imageShow = false
      if(document.getSelection().toString()) this.selection = document.getSelection().getRangeAt(0)
    },
    getSelectionForImage() {
      this.linkShow = false
      this.selection = document.getSelection().getRangeAt(0)
    },
    addLink() {
      if(!this.selection) {
        this.linkAlertShow = true
        return
      }
      const aEl = document.createElement('a')
      aEl.setAttribute('href', this.linkUrl)
      aEl.innerHTML = this.selection.toString()
      this.selection.deleteContents()
      this.selection.insertNode(aEl)
      this.selection = null
      this.linkShow = false
      this.linkUrl = ''
    },
    cancelLink() { this.linkShow = false },
    addImage() {
      const divEl = document.createElement('div')
      const imageEl = document.createElement('img')
      divEl.classList.add('blog-editor-images-c')
      imageEl.setAttribute('src', this.imageUrl)
      imageEl.setAttribute('alt', 'image')
      divEl.appendChild(imageEl)
      if(this.selection.toString()) this.selection.deleteContents()
      this.selection.insertNode(divEl)
      this.selection = null
      this.imageShow = false
      this.imageUrl = ''
    },
    cancelImage() { this.imageShow = false },
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-text-editor.scss"></style>
<style lang="scss" src="@/assets/css/blog-text-editor-view.scss"></style>