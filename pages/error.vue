<template>
  <div class="container_responsive_wrapper container_hg error_page">
      <div class="error_box">
            <img src="~/assets/img/error.svg" alt="error image">
      <p class="content">
         لا يوجد صفحة بتلك الاسم التي تبحث عنه برجاء إعادة المحاولة
      </p>
      </div>
   </div>
</template>

<script>
   export default {
        name: 'error'
   }
</script>

<style lang="scss" scoped>
.error_box{
   max-width: 400px;
   display: block;
   margin: 20px auto;
   text-align: center;
   text-align: -webkit-center;
   img{
      max-width: 300px;
      margin-bottom: 10px;
   }
   .content{
      padding: 10px;
      font-size: 17px;
   }
}
</style>