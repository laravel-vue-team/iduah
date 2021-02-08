<template>
   <div class="editor_container">

      <TuiEditor v-model="converted" height="350px" />
            <div class="preview" v-html="contentmd">
      </div>

   </div>
</template>

<script>
   export default {
      data() {
         return {
            content: '',
            contentmd: '',
            converted: this.editorcontentpage
         }
      },
      props: {
        editorcontentpage:{
           type: String
        }
      },
      watch: {
         converted(){
             this.contentmd = this.$md.render(this.converted);
         },
         
      },
      
   }
</script>

<style lang="scss" scoped>
.editor_container{
   margin: 10px auto;
   width: 100%;
}
</style>