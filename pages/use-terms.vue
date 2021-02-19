<template>
  <div class="container_responsive_wrapper container_hg">
    <div class="container">
      <main>
        <p class="txt" v-html="terms"></p>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "use-terms",
  created() {
    this.$store.dispatch("textEditor/fetchSettings");
  },
  computed: {
    terms() {
      return this.$store.getters["textEditor/terms"];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 5vh 5vw;
  height: 81vh;
  background-color: rgb(201, 201, 201, 0.3);
  padding: 13px 20px 10px;
  border-radius: 20px 20px 8px 8px;
  backdrop-filter: blur(5px);
}
</style>
