<template>
  <div class="editor_container">
    <nuxt-link :to="'/' + pagepath" class="page_name">{{ pagename }}</nuxt-link>
    <client-only>
      <div id="summernote"></div>
    </client-only>
    <div class="buttons">
      <button class="btn_submit" type="button" @click="save" name="save">
        حفظ
      </button>
      <button
        class="btn_cancel"
        type="reset"
        name="cancel"
        @click="$emit('hide')"
      >
        الغاء
      </button>
    </div>
    <!-- <div id="preview" class="preview" v-html=""></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: "",
    };
  },
  props: {
    pagepath: {
      type: String,
    },
    pagename: {
      type: String,
    },
  },
  // callbacks: {
  //   onChange: function (contents) {
  //     console.log(contents);
  //   },
  // },
  watch: {
    id() {
      let editior = $("#summernote");
      editior.summernote({
        minHeight: "250px",
        focus: true,
      });
      $("#summernote").summernote("code", this.current);
    },
  },
  methods: {
    save() {
      let markupStr = $("#summernote").summernote("code");
      this.$emit("save", markupStr);
    },
  },
  computed: {
    current() {
      let terms = this.$store.getters["textEditor/terms"];
      let privacy = this.$store.getters["textEditor/privacy"];
      let id = this.$store.getters["textEditor/id"];
      let newValue = id === 0 ? terms : privacy;
      return newValue;
    },
    id() {
      let editior = $("#summernote");
      editior.summernote({
        minHeight: "250px",
        focus: true,
      });
      return this.$store.getters["textEditor/id"];
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  margin-right: 18px;
}
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
