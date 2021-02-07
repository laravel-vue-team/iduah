<template>
  <div class="container_responsive_wrapper container_hg admin_container">
    <RightSide />
    <users />

   </div>
</template>

<script>
   export default {
      layout: 'admin'
   }
</script>

<style lang="scss" scoped>
.admin_container{
   display: grid;
   display: -moz-grid;
   display: -ms-grid;
   grid-template-columns: 250px auto;
   @media screen and(max-width: 768px){
      grid-template-columns: none;
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      flex-direction: column;
      -ms-flex-direction: row;
      flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
   }
}
</style>