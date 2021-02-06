<template>
   <div class="container_responsive_wrapper container_hg artciles_container">
    <slidebar />
      <article_content />
   </div>
</template>

<script>
import articlecontent from '~/components/user/article_content.vue';
   export default {
      components:{
         'article_content': articlecontent
      },
      data() {
         return {
            title: 'المقالات',
            desc: 'شاركنا الأجر في كتابة مقال ديني'
         }
      },
      //seo tags to this page Home page
       head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.desc
          },
        ]
      }
    }
      
   }
</script>

<style lang="scss" scoped>
.artciles_container{
  width: 100%;
  display: grid;
  display: -moz-grid;
  display: -ms-grid;
  grid-template-columns: 300px auto;
  gap: 10px;
  position: relative;
  padding: 20px 10px;
  @media screen and(max-width: 768px){
    grid-template-columns: none;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    -ms-flex-direction: column;
    flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
  }
}
</style>