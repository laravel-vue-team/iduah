<template>
  <div class="container_responsive_wrapper container_hg create_container">
    <div class="create_box">
      <h3 class="title">شاركنا الأجر في كتابة مقال ديني</h3>
      <p class="error_content transition" v-show="requires">
        رجاءَ قم بملىء البيانات المطلوبة
      </p>
      <form class="create-form" @submit.prevent="CreateArticle" ref="create">
        <div class="form_group">
          <label for="title"
            >عنوان المقال <span class="required">*</span></label
          >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="..."
            autocomplete="off"
            autocorrect="off"
            spellcheck="off"
            required
            class="transition focus_elem"
          />
        </div>
        <div class="form_group">
          <label for="center">القسم <span class="required">*</span></label>
          <select
            name="center"
            id="center"
            class="focus_elem transition"
            required
            spellcheck="off"
            autocomplete="off"
          >
            <option value="" selected disabled>--اختار--</option>
            <!-- <option value="القراءن الكريم">القراءن الكريم</option> -->
            <option :value="item.id" v-for="item in center" :key="item.id">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="form_group">
          <label for="content">المحتوى <span class="required">*</span></label>
          <textarea
            name="content"
            id="content"
            placeholder=".."
            class="focus_elem transition"
            required
            spellcheck="off"
            autocomplete="off"
          ></textarea>
        </div>

        <div class="form_group">
          <button
            class="btn_submit trasistion"
            name="submit"
            type="submit"
            @click="CheckRequires"
          >
            أنشر الآن
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requires: false,
      title: "إنشاء مقالة",
      desc: "شاركنا الأجر في كتابة مقال ديني",
      center: [],
    };
  },
  created() {
    this.$axios
      .get("/api/categories")
      .then((res) => {
        let { data: categories } = res.data;
        console.log(categories);
        this.center = [...categories];
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    CreateArticle() {
      const CurrentSubmitForm = this.$refs.create;

      const data = {
        title: CurrentSubmitForm["title"].value,
        category_id: CurrentSubmitForm["center"].value,
        description: CurrentSubmitForm["content"].value,
      };
      console.log(data);
      const jsonData = JSON.stringify(data);
      this.$axios
        .post("/api/posts/store", jsonData)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/articles");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    CheckRequires() {
      const CurrentForm = this.$refs.create;
      const requires = CurrentForm.querySelectorAll("[required]");

      requires.forEach((require) => {
        let val = require.value;
        if (val === "") {
          return (this.requires = true), require.classList.add("empty_elem");
        } else {
          return (
            (this.requires = false), require.classList.remove("empty_elem")
          );
        }
      });
    },
  },
  //seo tags to this page Home page
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.desc,
        },
      ],
    };
  },
  middleware: "authenticated",
};
</script>

<style lang="scss" scoped>
.create_container {
  position: relative;
  padding: 20px 10px;
  .create_box {
    padding: 10px;
    border-radius: 10px;
    position: relative;
    display: block;
    margin: auto;
    max-width: 600px;
    height: auto;
    background-color: #fff;
    box-shadow: 0 0 30px #f3f3f3;
    .title {
      text-align: center;
      text-align: -webkit-center;
      font-weight: 400;
      padding: 5px 10px;
      margin-bottom: 10px;
    }
    .error_content {
      color: #eb596e;
      padding: 0 10px 10px 5px;
      text-align: center;
      text-align: -webkit-center;
      font-size: 17px;
    }
    .create-form {
      width: 100%;
      position: relative;
      .form_group {
        display: block;
        margin-bottom: 10px;
        width: 100%;
        input {
          height: 40px;
        }
        label {
          display: block;
          margin-bottom: 10px;
          span {
            color: #eb596e;
            font-size: 20px;
            font-weight: 600;
          }
        }
        .focus_elem {
          width: 100%;
          padding: 10px 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: block;
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
        select {
          padding-left: 30px !important;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-size: 10px;
          background-repeat: no-repeat;
          background-image: url(~assets/img/arrow.svg);
          background-position: center left 12.5px;
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        .btn_submit {
          position: relative;
          padding: 5px 15px;
          background-color: #1b5fdf;
          border-radius: 5px;
          border: none;
          color: #fff;
          cursor: pointer;
          &:disabled {
            opacity: 0.5;
            cursor: no-drop;
          }
        }
      }
    }
  }
}
</style>
