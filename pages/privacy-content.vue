<template>
  <div class="container_responsive_wrapper container_hg">
    <div class="container">
      <main>
        <div class="txt" v-html="privacy"></div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("textEditor/fetchSettings");
  },
  computed: {
    privacy() {
      return this.$store.getters["textEditor/privacy"];
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
