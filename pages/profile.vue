<template>
  <div class="container_responsive_wrapper container_hg profile_container">
    <profileright />
    <profilecontent />
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
};
</script>

<style lang="scss" scoped>
.profile_container {
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
