<template>
   <div class="editor_container">

   <nuxt-link :to="pagepath" class="page_name">{{pagename}}</nuxt-link>
      <TuiEditor v-model="converted" height="350px" />
      <div class="buttons">
         <button class="btn_submit" type="submit" name="save">حفظ</button>
         <button class="btn_cancel" type="reset" name="cancel" @click="showpro = false">الغاء</button>
      </div>
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
            converted: this.editorcontentpage,
            showpro: this.showfunc
         }
      },
      props: {
        editorcontentpage:{
           type: String
        },
        showfunc:{
           type: Boolean
        },
        pagepath:{
           type: String
        },
        pagename: {
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
   .buttons{
      margin: 10px 0;
      button{
         position: relative;
         padding: 5px 10px;
         border: none;
         cursor: pointer;
         line-height: 1.5;
         color: #fff;
         border-radius: 5px;
      }
       .btn_submit{
         background-color: #16c79a;
      }
      .btn_cancel{
         background-color: #e11d74;
      }
   }
   .page_name{
      padding: 5px 10px; 
      border-radius: 5px;
      display: table;
      background-color: #1b5fdf50;
      text-decoration: none;
      color: #1b5fdf;
      margin: 10px 0;
   }
}
</style>