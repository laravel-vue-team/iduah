<template>
  <div class="editor_container">
    <nuxt-link :to="'/' + pagepath" class="page_name">{{ pagename }}</nuxt-link>
    <TuiEditor
      class="dialogMessageArea"
      :html="m"
      ref="msgArea"
      @change="handChange"
      height="310px"
    />
    <div class="buttons">
      <button
        class="btn_submit"
        type="button"
        @click="$emit('save')"
        name="save"
      >
        حفظ
      </button>
      <button
        class="btn_cancel"
        type="reset"
        name="cancel"
        @click="$emit('show')"
      >
        الغاء
      </button>
    </div>
    <div class="preview" v-html="contentmd"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentmd: "",
      displayed: "",
      m: "",
    };
  },
  props: {
    initTxt: {
      type: String,
    },
    pagepath: {
      type: String,
    },
    pagename: {
      type: String,
    },
  },
  created() {
    let t = this.$store.getters["textEditor/terms"];
    let p = this.$store.getters["textEditor/privacy"];
    let id = this.$store.getters["textEditor/id"];
    if (id === -1) {
      this.m = "";
    } else {
      this.m = id === 0 ? t : p;
    }
  },
  watch: {
    currnt() {
      this.m = "" + this.currnt;
    },
    m() {
      this.contentmd = this.$md.render(this.m);
      let res = this.$refs.msgArea.invoke("getHtml");
      this.$emit("change", this.contentmd);
    },
  },
  methods: {
    handChange() {
      let html = this.$refs.msgArea.invoke("getHtml");
      console.log(html);
      // this.contentmd = this.$md.render(html);
      this.contentmd = html;
      this.$emit("change", html);
    },
  },
  computed: {
    currnt() {
      let t = this.$store.getters["textEditor/terms"];
      let p = this.$store.getters["textEditor/privacy"];
      let id = this.$store.getters["textEditor/id"];
      if (id === -1) {
        return "";
      } else {
        return id === 0 ? t : p;
      }
    },
    id() {
      return this.$store.getters["textEditor/id"];
    },
  },
};
</script>

<style lang="scss" scoped>
.editor_container {
  margin: 10px auto;
  .buttons {
    margin: 10px 0;
    button {
      position: relative;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      line-height: 1.5;
      color: #fff;
      border-radius: 5px;
    }
    .btn_submit {
      background-color: #16c79a;
    }
    .btn_cancel {
      background-color: #e11d74;
    }
  }
  .page_name {
    padding: 5px 10px;
    border-radius: 5px;
    display: table;
    background-color: #1b5fdf50;
    text-decoration: none;
    color: #1b5fdf;
    margin: 10px 0;
  }
}
</style>
