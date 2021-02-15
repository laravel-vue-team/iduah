<template>
  <div>
    <div class="users_content">
      <table class="users_data" width="100%">
        <thead>
          <tr>
            <th>إسم الصفحة</th>
            <th>الاجراء</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pages" :key="index">
            <td>{{ item.name }}</td>
            <td>
              <button
                class="btn_edit transition"
                @click="EditPageContent(index)"
              >
                <i class="far fa-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form
      class="edit_content"
      ref="EditContentPage"
      @sumbit.prevent="formSubmit"
      v-show="show"
    >
      <client-only>
        <TextEditor
          :pagepath="CurrentPagePath"
          :pagename="CurrentPageName"
          v-on:show="toggleShow"
          v-on:save="formSubmit"
          v-on:change="handleChange"
          :initTxt="'s'"
        />
      </client-only>
    </form>
  </div>
</template>

<script>
import TextEditor from "~/components/admin/TextEditor";
export default {
  data() {
    return {
      currentHtml: "",
      currentEdit: "",
      content: "",
      CurrentPageName: "",
      CurrentPagePath: "",
      pages: [
        {
          name: "شروط الاستخدام",
          path: "use-terms",
          pagecontent: "## شروط الاستخدام",
          id: 0,
        },
        {
          name: "محتوى الخصوصية",
          path: "privacy-content",
          pagecontent: "## محتوى الخصوصية",
          id: 1,
        },
      ],
      show: false,
    };
  },
  components: {
    TextEditor,
  },
  created() {
    this.$store.dispatch("textEditor/fetchSettings");
  },
  computed: {
    data() {
      return this.$store.getters["textEditor/data"];
    },
    terms() {
      console.log(this.$store.getters["textEditor/terms"]);
      return this.$store.getters["textEditor/terms"];
    },
    privacy() {
      console.log(this.$store.getters["textEditor/privacy"]);
      return this.$store.getters["textEditor/privacy"];
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    EditPageContent(id) {
      const EditForm = this.$refs.EditContentPage;
      EditForm.setAttribute("data-index", id);
      this.show = true;
      this.currentHtml = "";
      this.$store.commit("textEditor/setId", id);
      this.CurrentPageName = this.pages[id].name;
      this.CurrentPagePath = this.pages[id].path;
    },
    formSubmit() {
      const CurrentForm = this.$refs.EditContentPage;
      let itid = CurrentForm.dataset.index;
      let oldData = {
        email: this.data.email,
        phone: this.data.phone,
        logo: this.data.logo,
        privacy: this.data.privacy,
        terms: this.data.terms,
      };
      let newData =
        itid === 0
          ? { ...oldData, terms: "" + this.currentHtml }
          : { ...oldData, privacy: "" + this.currentHtml };
      console.log(newData);
      itid === 0
        ? this.$store.dispatch("textEditor/editTerms", newData)
        : this.$store.dispatch("textEditor/editPrivacy", newData);
    },
    handleChange(newContent) {
      this.currentHtml = newContent;
    },
  },
};
</script>

<style lang="scss" scoped>
.users_content {
  padding: 0 5px 0 0;
  width: 100%;
}
.users_data {
  position: relative;
  display: table;
  height: auto;
  background-color: #fff;
  border-collapse: collapse;
  border-spacing: 0;
  th {
    background-color: #1b5fdf;
    color: #fff;
    font-weight: 500;
  }
  th,
  td {
    padding: 10px;
    text-align: center;
    text-align: -webkit-center;
    border-left: 1px solid #bbbbbb;
    &:last-child {
      border-left: 0;
    }
    a {
      color: #1b5fdf;
      text-decoration: none;
    }
  }

  tr {
    &:nth-child(even) {
      background-color: #f1f1f1;
    }
    .btn_edit {
      padding: 5px 10px;
      border-radius: 5px;
      color: #16c79a;
      cursor: pointer;
      border: none;
      line-height: 1.5;
      background-color: #16c79a50;
    }
  }
}
.edit_content {
  padding: 10px;
}
</style>
