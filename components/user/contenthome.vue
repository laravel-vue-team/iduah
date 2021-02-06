<template>
   <div class="articles_container flex_item">
      <article class="article_box" v-for="(item, index) in articles" :key="index" :data-index="index">
      <!-- article header -->
         <div class="article_header">
            <p class="header_content">
               <span class="name">
                  <i class="far fa-user"></i>
                  {{ item.user.name }} 
               </span>
                |
               <span class="date">
                  <i class="far fa-clock"></i>
                  {{ item.date }}
               </span>
            </p>
         </div>

         <!-- article content -->

         <div class="artcile_content">
            <p class="content">
            {{ item.content }}
            </p>
         </div>

         <!-- article controls  -->
         <div class="article_controls">
            <button class="btn_heart transition" @click="HeartIt(index)">
               <span class="length">{{ item.likes }}</span>
               <i class="far fa-heart transition"></i>
            </button>

            <div class="view">
               <span class="length">{{ item.viewed }}</span>
               <i class="far fa-eye"></i>
            </div>

            <div class="btn_share" @click="Clickme(index)">
               <i class="fa fa-share"></i>

               <div class="share_box transition">
                  <ul class="share_socials">
                     <li class="share_li">
                        <a 
                        
                        :href="'https://www.facebook.com/sharer.php?u=' + encodeURI(loc.origin + '/' + index)"
                         class="social_icon" target="_blank" rel="noopener noreferrer">
                           <i class="fab fa-facebook"></i>
                        </a>
                     </li>
                     <li class="share_li">
                        <a :href="encodeURI(`https://twitter.com/intent/tweet?url=${loc.origin}/${index}&text=${item.content}`)" class="social_icon" target="_blank" rel="noopener noreferrer">
                           <i class="fab fa-twitter"></i>
                        </a>
                     </li>
                     <li class="share_li">
                        <a 
                        :href="encodeURI(`https://wa.me/?text=${item.content} ${loc.origin}/${index}`)" class="social_icon" target="_blank" rel="noopener noreferrer">
                           <i class="fab fa-whatsapp"></i>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            <div class="clear"></div>
         </div>

      </article>
   </div>
</template>

<script>
   export default {
      data() {
         return {
            classname: '',
            articles: [
               {
                  content: 'عن أبي هريرة رضي الله عنه أنّه قال: (أنَّ رَسولَ اللَّهِ صَلَّى اللهُ عليه وسلَّمَ ذَكَرَ يَومَ الجُمُعَةِ، فَقالَ: فيه سَاعَةٌ، لا يُوَافِقُهَا عَبْدٌ مُسْلِمٌ، وهو قَائِمٌ يُصَلِّي، يَسْأَلُ اللَّهَ تَعَالَى شيئًا، إلَّا أعْطَاهُ إيَّاهُ وأَشَارَ بيَدِهِ يُقَلِّلُهَا).',
                  user:{
                     name: 'محمد ايمن',
                     id: '59ef0488a4f34c1'
                  },
                  date: 'منذ 5 ساعات',
                  viewed: 140,
                  likes: 150
               },
               {
                  content: 'في شهر رجب يَفِدُ بعض الناس إلى المدينة النبوية المنورة بزيارتها بزيارة يسمونها الرَّجَبِية ، يرون أنها من السُّنن ، وهذه الزيارة المسماة بالرَّجَبِيةِ ليس لها أصل في كلام أهل العلم ، ولا ريب أن المسجد النبوي تُشَدُّ إليه الرحال في كل وقت وحين ، لكن تخصيصُ شهر معين أو يوم معين لهذا العمل يحتاج إلى دليل خاص ، ولا دليلَ هنا على تخصيصِ رجب بذلك ، وعلى هذا فاتخاذ هذا سنة يُتقَرَّبُ بها إلى الله في هذا الشهر بخصوصه أمر محدث ليس عليه دليل في الشريعة.',
                  user:{
                     name: 'محمد ايمن',
                     id: '59ef0488a4f34c1'
                  },
                  date: 'منذ 5 ساعات',
                  viewed: 140,
                  likes: 150
               },
               {
                  content: 'حقيقة اتباع النبي صلى الله عليه وسلم هي التمسك بسنته فِعلاً فيما فعل، وتركًا فيما تَرك ؛ فمن زاد عليها أو نقص منها ، فقد نقصَ حظُّه من المتابعة بحسب ذلك ، لكن الزيادة أعظم ؛ لأنها تقدم بين يدي الله ورسوله صلى الله عليه وسلم والله تعالى يقول: ﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُقَدِّمُوا بَيْنَ يَدَيِ اللَّهِ وَرَسُولِهِ وَاتَّقُوا اللَّهَ إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ ﴾ [الحجرات : 1].',
                  user:{
                     name: 'محمد ايمن',
                     id: '59ef0488a4f34c1'
                  },
                  date: 'منذ 5 ساعات',
                  viewed: 140,
                  likes: 150
               },
               
               
            
            ],
            loc: ''
         }
      },
      created() {
         if(process.browser){
            this.loc = window.location;
         }

      },
      methods: {
         Clickme(id){
            const shareBox = document.querySelector(`.article_box[data-index='${id}'] .share_box`);

            shareBox.classList.toggle('share_opened');
         },
         HeartIt(id){
            const btnHeart = document.querySelector(`.article_box[data-index='${id}'] .btn_heart`);
            const icon = btnHeart.querySelector('.fa-heart');

               btnHeart.classList.toggle('hearted');

            if(btnHeart.classList.contains('hearted')){
               icon.classList.replace('far',  'fas');
               this.articles[id].likes += 1;
            }else{
               icon.classList.replace('fas' , 'far');
               this.articles[id].likes -= 1;

            }
         }
      },
      name: 'contenthome'
   }
</script>

<style lang="scss" scoped>
.articles_container{
   align-items: flex-start;
   justify-content: flex-start;
   flex-direction: column;
   -ms-flex-direction: column;
   flex-wrap: nowrap;
   -ms-flex-wrap: nowrap;
   width: 100%;
   height: auto;
   position: relative;
   padding: 0 10px;
   .article_box{
      width: 100%;
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
      position: relative;
      margin: 10px auto;
      box-shadow: 0 0 30px #f3f3f3;
      .article_header{
         padding: 10px 0;
         margin-bottom: 10px;
         span{
            padding: 0 5px;
            font-size: 14px;
            position: relative;
            i{
               padding-left: 5px;
            }
         }
      }
      .artcile_content{
         padding: 10px;
         border-radius: 5px;
         background-color: #fbfbfb;
         position: relative;
         .content{
            line-height: 1.7;
            font-size: 18px;
         }
      }
      .article_controls{
         padding: 10px;
         position: relative;
         .btn_heart{
            padding: 5px 10px;
            border-radius: 5px;
            background-color: transparent;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 1;
            i{
               padding-right: 3px;
            }
         }
         .hearted{
            background-color: #eb596e30;
            border-color: #eb596e40 !important;
            .fas{
               color: #eb596e;
            }
         }
         .view{
            display: inline-block;
            margin: 0 10px;
            padding: 5px 10px;
            i{
               vertical-align: middle;
            }
         }
         .btn_share{
            float: left;
            padding: 5px 10px;
            font-size: 16px;
            background-color: #74a2f8;
            color: #fff;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            position: relative;
            .share_opened{
               bottom: calc(100% + 5px) !important;
               visibility: visible !important;
               opacity: 1 !important;
               pointer-events: all !important;
            }
            .share_box{
               position: absolute;
               width: 50px;
               height: auto;
               padding: 5px;
               border-radius: 5px;
               background-color: #fff;
               box-shadow: 0 0 10px #f3f3f3;
               left: 0;
               z-index: 1;
               bottom: 0;
               visibility: hidden;
               opacity: 0;
               pointer-events: none;
               
               li{
                  list-style: none;
                  display: block;
                  margin: 3px auto;
                  text-align: center;
                  text-align: -webkit-center;
               }
               a{
                  text-decoration: none;
                  font-size: 20px;
                  .fa-facebook{
                     color: #4267B2;
                  }
                  .fa-twitter{
                     color: #1DA1F2;
                  }
                  .fa-whatsapp{
                     color: #25D366;
                  }
               }
            }
         }
         .clear{
            clear: both;
         }
      }
      
   }
}
</style>