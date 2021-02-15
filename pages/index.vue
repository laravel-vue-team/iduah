<template>
  <div class="container_responsive_wrapper container_hg home_page_container">
    <slidebar />
    <contenthome />
  </div>
</template>

<script>
export default {
  created() {
    if (process.browser) {
      this.loc = window.location;
    }
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
