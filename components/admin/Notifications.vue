<template>
   <div class="notifications_container" v-show="notifyShow">
            <div class="notify_header">
               <span class="title">الاشعارات</span>
               <button class="btn_close">
                  <i class="fa fa-times"></i>
               </button>
            </div>
            
            <div class="notify_box">
               <div class="notify_item" v-for="(item, index) in notifications" :key="index">
                  <p class="content">
                     {{ item.content }}
                     <nuxt-link :to="'/admin/users#' + item.user.id">
                        {{ item.user.name }}
                     </nuxt-link>
                  </p>
               </div>
               
            </div>
         </div>
</template>

<script>
   export default {
      data() {
         return {
            props: ['shownotify' , 'notificationss'],
            
         }
      },
      name: 'Notifications'
   }
</script>

<style lang="scss" scoped>

</style>