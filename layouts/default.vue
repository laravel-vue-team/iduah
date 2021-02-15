<template>
  <div>
    <HeaderLayout />
    <Nuxt />
    <FooterLayout />
  </div>
</template>
<script>
export default {
  mounted() {
    if (process.client) {
      this.$store.commit("auth/setIsLoading", false);
      this.$store.dispatch("auth/setToken", localStorage.getItem("TOKEN"));
      if (!this.$store.getters["auth/isAuth"]) {
        return this.$router.push("/login");
      }
      this.$store.dispatch(
        "auth/setUser",
        JSON.parse(localStorage.getItem("USER"))
      );
    }
  },
};
</script>
