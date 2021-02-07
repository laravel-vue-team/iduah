<template>
   <div>
    <div class="users_content">
   <table class="users_data" width="100%">
      <thead>
          <tr>
               <th>إسم الصفحة</th>
               <th>الاجراء</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="(item, index) in pages" :key="index" >
            <td>{{item.name}}</td>
            <td>
               <button class="btn_edit transition" @click="EditPageContent(index)">
                  <i class="far fa-edit"></i>
               </button>
            </td>
         </tr>
      </tbody>
   </table>
   </div>
   
      <form class="edit_content" v-show="show" ref="EditContentPage" @sumbit.prevent="SubmitContentPage">
         <client-only>
          <vue-editor v-model="content" />
         </client-only>
         <button class="btn_submit" name="submit" type="submit">حفظ</button>
         <button class="btn_cancel" name="reset" type="reset" @click="show = false">الغاء</button>
      </form>   

         
   </div>
</template>

<script>

import { VueEditor } from "vue2-editor";

   export default {
       data(){
        return {
            content : '',
         pages:[
            {
               name: 'شروط الاستخدام',
               path: 'use-terms',
               pagecontent: '<h1>محتوى صفحة شروط الاستخدام</h1>',
               id: 0,
            },
            {
               name: 'محتوى الخصوصية',
               path: 'privacy-content',
               pagecontent: '<h1>محتوى صفحة محتوى الخصوصية</h1>',
               id: 1,
            }
         ],
         show: false
        };
    },
    components:{
       'vue-editor': VueEditor
    },
  
    watch: {
       content(){
            localStorage.setItem('content' , this.content);
       }
    },
    methods: {
       EditPageContent(id){
          const EditForm = this.$refs.EditContentPage;
            EditForm.setAttribute('data-index' , id);
           this.show = true;
           this.content = this.pages[id].pagecontent;
       },
       SavePageContent(){
          return this.show = false;
       },
       SubmitContentPage(){
          const CurrentForm = this.$refs.EditContentPage;
          let itid = CurrentForm.dataset.index;
          console.log('loading...');
       }
    },
    
   }
</script>

<style lang="scss" scoped>

  .users_content{
   padding: 10px;
   width: 100%;
}
.users_data{
   position: relative;
   display: table;
   height: auto;
   background-color: #fff;
   border-collapse: collapse;
   border-spacing: 0;
   th{
      background-color: #1b5fdf;
      color: #fff;
      font-weight: 500;
   }
   th , td{
      padding: 10px;
      text-align: center;
      text-align: -webkit-center;
      border-left: 1px solid #bbbbbb;
         &:last-child{
            border-left: 0;
         }
         a{
            color: #1b5fdf;
            text-decoration: none;
         }
   }
  
   tr{
      &:nth-child(even){
         background-color: #f1f1f1;
      }
      .btn_edit{
      padding: 5px 10px;
      border-radius: 5px;
      color: #16c79a;
      cursor: pointer;
      border: none;
      line-height: 1.5;
      background-color: #16c79a50;
   }
   
   }
}
.edit_content{
   padding: 10px;
   
   button{
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      border: none;
      line-height: 1.5;
      
   }
   .btn_submit{
      background-color: #16c79a;
   }
   .btn_cancel{
      background-color: #e11d74;
   }
   
}
</style>