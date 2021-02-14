<template>
  <div class="users_content">
    <a
      href="javascript:void(0)"
      class="new_section"
      @click="
        () => {
          sectionshow = !sectionshow;
          actionType = 'adding';
        }
      "
    >
      قسم جديد
    </a>

    <div class="new_section_container" v-show="sectionshow">
      <form
        class="section_form"
        ref="newsection"
        v-on:submit.prevent="addSection"
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
          @click="addSection;"
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
        <tr v-for="item in sections" :key="item.id">
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
                  editSection(item.id);
                  sectionshow = !sectionshow;
                  actionType = 'editting';
                }
              "
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn_delete transition"
              @click="deleteSection(item.id)"
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
      // {
      //   ID: 0,
      //   name: "القراءن الكريم",
      // },
      // {
      //   ID: 1,
      //   name: "حديث شريف",
      // },
      // {
      //   ID: 2,
      //   name: "فقه",
      // },
      sectionshow: false,
      sectionname: "",
      actionType: "editting",
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
    addSection() {
      // this.sectionshow = true;
      this.actionType = "adding";
      const form = this.$refs.newsection;
      console.log(form["section"].value);
      const newSection = {
        title: form["section"].value,
      };
      const json = JSON.stringify(newSection);
      this.$axios
        .post("/api/categories/store", json)
        .then((res) => {
          console.log(res.data.data);
          this.sectionshow = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteSection(id) {
      let config = {
        method: "delete",
        url: `http://idauh.com/idauh/api/categories/${id}/delete`,
      };
      this.$axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editSection(id) {
      const form = this.$refs.newsection;
      console.log(form["section"].value);
    },
    CopySectionID(id) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id);
      }
    },
  },
  name: "sections",
};
</script>

<style lang="scss" scoped>
.users_content {
  padding: 10px;
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
