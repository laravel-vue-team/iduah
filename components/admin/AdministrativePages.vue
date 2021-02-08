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
   
      <form class="edit_content" ref="EditContentPage" @sumbit.prevent="SubmitContentPage" v-show="show">
         <client-only>
            <TextEditor 
            :editorcontentpage="content" 
            :pagepath="CurrentPagePath" 
            :pagename="CurrentPageName"
            :showfunc="show"
            />
         </client-only>
         
      </form>   

         
   </div>
</template>

<script>
import TextEditor from '~/components/admin/TextEditor';
   export default {
       data(){
        return {
            content : '',
            CurrentPageName: '',
            CurrentPagePath: '',
         pages:[
            {
               name: 'شروط الاستخدام',
               path: 'use-terms',
               pagecontent: '## شروط الاستخدام',
               id: 0,
            },
            {
               name: 'محتوى الخصوصية',
               path: 'privacy-content',
               pagecontent: '## محتوى الخصوصية',
               id: 1,
            }
         ],
         show: false
        };
    },
    components: {
       TextEditor,
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
           this.CurrentPageName = this.pages[id].name;
           this.CurrentPagePath = this.pages[id].path;
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
}
</style>