<template>
  <div class="container_responsive_wrapper container_hg home_page_container">
    <slidebar />
    <contenthome />
    <!-- <slidebar v-on:addLight="addLight" />
    <contenthome v-bind:articles="articles" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "اضاءه",
      desc: "شاركنا الأجر في كتابة مقال ديني",
    };
  },
  created() {
    if (process.browser) {
      this.loc = window.location;
    }
  },
  // computed: {
  //   async getArticles() {
  //     try {
  //       let res = await this.$axios.get("/public/api/lights");
  //       this.articles = res.data.data.data;
  //       return re.data.data.data;
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   },
  // },
  methods: {
    addLight(newLight) {
      const lastId = this.articles[0].id;
      let username = this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].name
        : "";
      const customNewLight = {
        ...newLight,
        id: lastId + 1,
        views: [],
        likes: [],
        title: "",
        user: { name: username }, // edit: add current user name
        created_at: "منذ لحظات",
      };
      this.articles.unshift(customNewLight);
      this.$axios
        .post("/api/lights/store", newLight)
        .then((res) => {
          console.log(res.data);
          // let currentuser = this.$store.getters["auth/user"];
          // let newLight = { ...res.data.data, user: currentuser };
          // this.articles.unshift(newLight);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  //seo tags to this page Home page
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.desc,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home_page_container {
  width: 100%;
  display: grid;
  display: -moz-grid;
  display: -ms-grid;
  grid-template-columns: 300px auto;
  gap: 10px;
  position: relative;
  padding: 20px 10px;
  @media screen and(max-width: 768px) {
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
