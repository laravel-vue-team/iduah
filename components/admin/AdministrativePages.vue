<template>
  <div class="container_page">
    <div class="users_content">
      <div class="users_data2">
        <div v-show="isLoading" class="spinner">
          <spinner />
        </div>
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
    </div>

    <form
      class="edit_content"
      ref="EditContentPage"
      @sumbit.prevent=""
      v-show="show"
    >
      <client-only>
        <TextEditorCopy
          :pagepath="CurrentPagePath"
          :pagename="CurrentPageName"
          v-on:hide="toggleShow"
          v-on:save="formSubmit"
          v-on:change="handleChange"
          :initTxt="'s'"
        />
      </client-only>
    </form>
  </div>
</template>

<script>
import Spinner from "../user/spinner.vue";
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
    Spinner,
  },
  created() {
    this.$store.dispatch("textEditor/fetchSettings");
  },
  computed: {
    data() {
      return this.$store.getters["textEditor/data"];
    },
    terms() {
      return this.$store.getters["textEditor/terms"];
    },
    privacy() {
      return this.$store.getters["textEditor/privacy"];
    },
    isLoading() {
      return this.$store.getters["textEditor/isLoading"];
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
      this.$store.commit("textEditor/setId", id + 2);
      this.$store.commit("textEditor/setId", id);
      this.CurrentPageName = this.pages[id].name;
      this.CurrentPagePath = this.pages[id].path;
    },
    formSubmit(a) {
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
        +itid !== 0
          ? { ...oldData, privacy: "" + a }
          : { ...oldData, terms: "" + a };
      +itid !== 0
        ? this.$store.dispatch("textEditor/editPrivacy", newData)
        : this.$store.dispatch("textEditor/editTerms", newData);
    },
    handleChange(newContent) {
      this.currentHtml = newContent;
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  margin: 2vh auto;
  width: 100%;
  z-index: 9999;
  & > div {
    height: 137px;
  }
}
.container_page {
  /* height: 100vh; */
  /* overflow-y: scroll; */
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgb(255 255 255 / 50%);
  }
}
.users_content {
  padding: 0 5px 0 0;
  width: 100%;
}
.users_data2 {
  position: relative;
  height: auto;
  background-color: #fff;
}
.users_data {
  background-color: #fff;
  display: table;
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
