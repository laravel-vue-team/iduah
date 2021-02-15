<template>
  <footer class="footer_container">
    <div class="container_responsive_wrapper footer_box flex_item">
      <div class="links">
        <nuxt-link class="terms" to="/use-terms"> شروط الاستخدام </nuxt-link>
        <nuxt-link to="/privacy-content"> محتوى الخصوصية </nuxt-link>
      </div>
      <p class="footer_content">
        جميع الحقوق © محوظة لدى <nuxt-link to="/">اضاءة</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.terms {
  margin-left: 15px;
}
.footer_container {
  height: auto;
  position: relative;
  background-color: #222831;
  width: 100%;
  .footer_box {
    width: 100%;
    height: auto;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    a {
      text-decoration: none;
    }
    .links {
      a {
        color: #ddd;
        text-decoration: none;
      }
    }
    .footer_content {
      a {
        color: #eb596e;
        padding: 0 5px;
      }
    }
  }
}
</style>
