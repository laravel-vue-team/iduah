import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
if (process.client) {
  
  Vue.use(VueQuillEditor)

}