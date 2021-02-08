import Vue from 'vue';
import VueEditor from 'vue2-editor';

if (process.client || process.browser || process.BROWSER_BUILD) {
    Vue.use(VueEditor)
} 