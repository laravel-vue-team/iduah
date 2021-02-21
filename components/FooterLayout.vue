<template>
  <footer class="footer_container">
    <div class="container_responsive_wrapper footer_box flex_item">
      <div class="links">
        <nav class="right">
          <nuxt-link class="terms" to="/use-terms"> شروط الاستخدام </nuxt-link>
          <nuxt-link to="/privacy-content"> محتوى الخصوصية </nuxt-link>
        </nav>
        <nav class="left">
          <span class="footer_content">
            جميع الحقوق © محوظة لدى <nuxt-link to="/">اضاءة</nuxt-link>
          </span>
        </nav>
      </div>
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
  position: fixed;
  bottom: 0;
  background-color: #222831;
  width: 100%;
  .footer_box {
    width: 100%;
    height: auto;
    padding: 9px;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    a {
      text-decoration: none;
    }
    .links {
      display: flex;
      justify-content: space-between;
      width: 100%;
      @media only screen and (max-width: 575px) {
        flex-direction: column;
        .right {
          margin-bottom: 2px;
        }
      }
      a {
        color: #ddd;
        text-decoration: none;
      }
      /* .left */
    }
    .footer_content {
      margin-left: a {
        color: #eb596e;
        padding: 0 5px;
      }
    }
  }
}
</style>
