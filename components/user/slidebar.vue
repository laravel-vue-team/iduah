<template>
   <div class="slidebar_box">
      <newlight />

      <p class="create_content">
      شاركنا الأجر في كتابة مقال ديني
      </p>

      <nuxt-link to="/create-article" class="btn_create">
         أضف مقالك الآن
      
      </nuxt-link>
      

   </div>
</template>

<script>
   export default {
      name: 'slidebar'
   }
</script>

<style lang="scss" scoped>
.slidebar_box{
   width: 100%;
   height: 100%;
   position: relative;
   form{
      width: 100%;
      input{
         width: 100%;
         padding: 10px 15px;
         border-radius: 5px;
         border: 1px solid #ddd;
         background-color: #fff;
         &:focus{
            -webkit-box-shadow: 0 0 0 3px #cddcf8;
                     box-shadow: 0 0 0 3px #cddcf8;
         }
      }
   }
   .result{
      font-size: 15px;
      color: rgb(73, 73, 73);
      margin: 10px;
      font-weight: 600;
   }
   .line{
      margin: 20px 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
      display: block;
   }
   .create_content{
      padding: 5px 10px 10px 5px;
      font-size: 18px;
   }
   .btn_create{
      padding: 7px 15px;
      border-radius: 5px;
      width: 100%;
      border: none;
      color: #fff;
      background-color: #eb596e;
      cursor: pointer;
      display: block;
      text-align: center;
      text-align: -webkit-center;
      text-decoration: none;
   }
   
}
</style>