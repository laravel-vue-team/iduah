<template>
  <div class="container_responsive_wrapper container_hg settings_container">
    <div class="settings_box">
      <h3 class="title">الاعدادات</h3>

      <p class="error_content transition" v-show="requires">
        رجاءً تأكد من صحة البيانات الدخلة
      </p>

      <form class="settings-form" @submit.prevent="EditUser" ref="settings">
        <div class="form_group">
          <label for="pre_pass">
            كلمة المرور الحالية <span class="required">*</span></label
          >
          <input
            type="password"
            name="pre_pass"
            id="pre_pass"
            placeholder="••••••••"
            autocomplete="off"
            autocorrect="off"
            spellcheck="off"
            required
            class="transition focus_elem"
          />
        </div>
        <div class="form_group">
          <label for="new_pass"
            >كلمة المرور الجديدة <span class="required">*</span></label
          >
          <input
            type="password"
            name="new_pass"
            id="new_pass"
            placeholder="••••••••"
            required
            autocorrect="off"
            autocomplete="off"
            spellcheck="off"
            class="transition focus_elem"
            minlength="6"
          />
        </div>
        <div class="form_group">
          <label for="confirm_pass">
            تأكيد كلمة المرور الجديدة <span class="required">*</span></label
          >
          <input
            type="password"
            name="c_new_pass"
            id="confirm_pass"
            placeholder="••••••••"
            required
            autocorrect="off"
            autocomplete="off"
            spellcheck="off"
            class="transition focus_elem"
            onpaste="return false"
            minlength="6"
          />
        </div>

        <div class="form_group">
          <button
            class="btn_submit trasistion"
            name="submit"
            type="submit"
            @click="CheckRequires"
          >
            حفظ
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
      title: "الاعدادات",
      desc: "تعديل بيانات الملف الشخصي",
    };
  },
  methods: {
    EditUser() {
      const CurrentSubmitForm = this.$refs.settings;
      const newPass = {
        password: CurrentSubmitForm["pre_pass"].value,
        new_password: CurrentSubmitForm["new_pass"].value,
        confirm_new_password: CurrentSubmitForm["c_new_pass"].value,
      };
      const newPassJson = JSON.stringify(newPass);
      console.log(newPass);
      this.$router.push("/profile");
    },
    CheckRequires() {
      const CurrentForm = this.$refs.settings;
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
  name: "login",
};
</script>

<style lang="scss" scoped>
.settings_container {
  position: relative;
  padding: 20px 10px;
  .settings_box {
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
    .settings-form {
      width: 100%;
      position: relative;
      .form_group {
        display: block;
        margin-bottom: 10px;
        width: 100%;
        input {
          height: 40px;
        }
        .checkbox {
          input {
            height: auto;
            position: relative;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            border-radius: 5px;
            border: 1.5px solid #ddd;
            width: 15px;
            height: 15px;
            padding: 0;
            display: inline-block;
            margin-left: 5px;
            &:checked {
              border: 5px solid #3176f7;
              border-radius: 100px;
            }
          }
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
        a {
          color: #1b5fdf;
          text-decoration: none;
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
