<template>
  <div class="pages_rightside">
    <div class="md_screen flex_item">
      <span class="name"> القائمة </span>
      <button class="btn_nav_md" @click="NavBarActiveIt()" ref="BtnMdNav">
        <span class="menu_icon transition"></span>
      </button>
    </div>
    <ul class="links" ref="MdNav">
      <li class="links_par">
        <nuxt-link to="/admin/users">
          <i class="fa fa-users"></i> المستخدمين</nuxt-link
        >
      </li>
      <li class="links_par settings_par">
        <span class="name"><i class="fa fa-cogs"></i> الاعدادات</span>
        <nuxt-link to="/admin/administrative_pages"
          ><i class="fas fa-tasks"></i> الصفحات الادارية</nuxt-link
        >
      </li>
      <li class="links_par">
        <nuxt-link to="/admin/sections">
          <i class="fa fa-layer-group"></i> الاقسام</nuxt-link
        >
      </li>
      <li class="links_par">
        <nuxt-link to="/admin/lights">
          <i class="fa fa-lightbulb"></i> الإضاءات</nuxt-link
        >
      </li>
      <li class="links_par">
        <nuxt-link to="/admin/articles">
          <i class="fa fa-newspaper"></i> المقالات</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    NavBarActiveIt() {
      const CurrentBtn = this.$refs.BtnMdNav;
      const CurrentMdNav = this.$refs.MdNav;

      CurrentBtn.classList.toggle("btn_active");
      CurrentMdNav.classList.toggle("nav_active");
    },
  },
};
</script>

<style lang="scss" scoped>
.pages_rightside {
  position: sticky;
  position: -webkit-sticky;
  top: 60px;
  right: 0;
  padding: 10px;
  width: 100%;
  background-color: #1a1a2e;
  z-index: 1;
  display: inline-block;
  height: 100%;
  @media screen and(max-width: 768px) {
    position: relative;
    min-height: auto;
    width: 100%;
    margin: 10px 0;
    top: 0;
    .links {
      display: none;
    }
    .nav_active {
      display: block !important;
    }
  }
  .links_par {
    padding: 10px;
    margin-bottom: 5px;
    &:nth-child(2) {
      border-bottom: 1px solid #28283a;
    }
    a {
      color: #ffffff;
      text-decoration: none;
      i {
        margin-left: 4px;
        color: #949494;
      }
    }
    .name {
      color: #fff;
      display: block;
    }
  }
  .settings_par {
    a {
      margin: 10px 0;
      padding-right: 20px;
      display: block;
    }
  }
  .md_screen {
    justify-content: space-between;
    align-items: center;
    height: auto;
    flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    color: #fff;
    @media screen and(min-width: 768px) {
      display: none;
    }
    .btn_nav_md {
      position: relative;
      padding: 7px;
      border-radius: 10px;
      background-color: #f1f1f1;
      border: none;
      width: 35px;
      height: 35px;
      cursor: pointer;
      .menu_icon {
        width: 100%;
        height: 2px;
        background-color: #333;
        border-radius: 100px;
        display: block;
        position: relative;
        &::after,
        &::before {
          position: absolute;
          content: "";
          width: 50%;
          height: 2px;
          background-color: #333;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          -moz-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
          -o-transform: translateX(-50%);
          transition: 0.3s ease-in-out;
          -webkit-transition: 0.3s ease-in-out;
          -moz-transition: 0.3s ease-in-out;
          -ms-transition: 0.3s ease-in-out;
          -o-transition: 0.3s ease-in-out;
        }
        &::after {
          top: -6px;
        }
        &::before {
          top: 6px;
        }
      }
    }
    .btn_active {
      .menu_icon {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        &::after {
          transform: rotate(90deg) translate(0.5px, 5px);
          -webkit-transform: rotate(90deg) translate(0.5px, 5px);
          -moz-transform: rotate(90deg) translate(0.5px, 5px);
          -ms-transform: rotate(90deg) translate(0.5px, 5px);
          -o-transform: rotate(90deg) translate(0.5px, 5px);
        }
        &::before {
          transform: rotate(90deg) translate(-1px, 5px);
          -webkit-transform: rotate(90deg) translate(-1px, 5px);
          -moz-transform: rotate(90deg) translate(-1px, 5px);
          -ms-transform: rotate(90deg) translate(-1px, 5px);
          -o-transform: rotate(90deg) translate(-1px, 5px);
        }
      }
    }
  }
}
</style>
