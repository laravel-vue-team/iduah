<template>
  <div class="users_content">
    <a
      href="javascript:void(0)"
      class="new_section"
      @click="
        () => {
          actionType = 'adding';
          sectionshow = !sectionshow;
          sectionname = '';
        }
      "
    >
      قسم جديد
    </a>

    <div class="new_section_container" v-show="sectionshow">
      <form
        class="section_form"
        ref="newsection"
        v-on:submit.prevent="formSubmit"
      >
        <input
          type="text"
          placeholder="..."
          required
          autocomplete="off"
          autofocus
          autocorrect="off"
          spellcheck="off"
          class="transition focus_elem"
          name="section"
          v-model="sectionname"
        />
        <button class="btn_submit" name="submit" type="submit">موافق</button>
        <button
          class="btn_cancel"
          name="cancel"
          type="reset"
          @click="clearSection"
        >
          <!-- sectionshow = false; -->
          الغاء
        </button>
      </form>
    </div>
    <table class="users_data" width="100%">
      <thead>
        <tr>
          <th>إسم القسم</th>
          <th>رقم القسم</th>
          <th>الاجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sections" :key="item.id">
          <td>{{ item.title }}</td>
          <td>
            <a href="javascript:void(0)" @click="CopySectionID(item.id)">
              <i class="far fa-copy"></i> {{ item.id }}
            </a>
          </td>
          <td>
            <button
              class="btn_edit transition"
              @click="
                () => {
                  currentObj = { index, id: item.id };
                  sectionshow = !sectionshow;
                  actionType = 'editting';
                }
              "
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn_delete transition"
              @click="deleteSection({ id: item.id, index })"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("ar");
export default {
  data() {
    return {
      sectionshow: false,
      sectionname: "",
      actionType: "editting",
      currentObj: {},
    };
  },
  computed: {
    sections() {
      return this.$store.getters["categories/categories"];
    },
  },
  created() {
    this.$store.dispatch("categories/fetchCategories");
  },
  methods: {
    formSubmit() {
      console.log(this.actionType);
      if (this.actionType === "adding") {
        this.addSection();
      } else {
        this.editSection(this.currentObj);
      }
    },
    addSection() {
      const form = this.$refs.newsection;
      const newSection = {
        title: form["section"].value,
      };
      const json = JSON.stringify(newSection);
      this.$axios
        .post("/api/categories/store", json)
        .then((res) => {
          console.log(res.data.data);
          let lastId = this.sections[this.sections.length - 1].id;
          this.$store.commit("categories/addCategory", {
            title: form["section"].value,
            id: lastId + 1,
          });
          this.sectionshow = false;
          this.sectionname = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteSection(obj) {
      this.$store.dispatch("categories/deleteCategory", obj);
    },
    editSection(obj) {
      console.log("editting...");
      const form = this.$refs.newsection;
      let title = form["section"].value;
      obj = { ...obj, title };
      console.log(obj);
      this.$store.dispatch("categories/editCategory", obj);
      this.sectionname = "";
    },
    CopySectionID(id) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id);
      }
    },
    clearSection() {
      this.sectionname = "";
      this.sectionshow = false;
    },
  },
  name: "sections",
};
</script>

<style lang="scss" scoped>
.users_content {
  padding: 0 10px;
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
  }
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    line-height: 1.5;
    @media screen and(max-width: 360px) {
      width: 100%;
      margin-bottom: 3px;
    }
  }
  .btn_edit {
    background-color: #16c79a50;
    color: #16c79a;
  }
  .btn_delete {
    background-color: #e11d7450;
    color: #e11d74;
  }
}
.new_section {
  margin-bottom: 10px;
  padding: 7px 10px;
  text-decoration: none;
  display: table;
  color: #fff;
  background-color: #1f4068;
  border-radius: 5px;
}
.new_section_container {
  margin-bottom: 10px;
  position: relative;
  max-width: 300px;
  .focus_elem {
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    display: block;
    height: 40px;
    margin-bottom: 10px;
    &:focus {
      box-shadow: 0 0 0 3px #bad2fd;
      -webkit-box-shadow: 0 0 0 3px #d2e2ff;
      border-color: #d2e2ff;
    }
  }
  .empty_elem {
    background-color: #eb596e50;
    border-color: #eb596e60;
    &:focus {
      box-shadow: 0 0 0 3px #eb596e60;
      -webkit-box-shadow: 0 0 0 3px #eb596e60;
      border-color: #eb596e60;
    }
  }
  button {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    border: none;
    line-height: 1.5;
  }
  .btn_submit {
    background-color: #16c79a;
  }
  .btn_cancel {
    background-color: #e11d74;
  }
}
</style>
