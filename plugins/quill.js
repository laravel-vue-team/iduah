import Vue from 'vue'
import tinymce from 'vue-tinymce-editor'


if (process.client || process.browser || process.BROWSER_BUILD) {
    Vue.component('tinymce', tinymce)
} 