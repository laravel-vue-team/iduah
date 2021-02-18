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
      console.log(this.$router.history._startLocation);
      if (
        !this.$store.getters["auth/isAuth"] &&
        (this.$router.history._startLocation === "/profile" ||
          this.$router.history._startLocation === "/admin" ||
          this.$router.history._startLocation === "/admin/users" ||
          this.$router.history._startLocation ===
            "/admin/administrative_pages" ||
          this.$router.history._startLocation === "/admin/sections" ||
          this.$router.history._startLocation === "/admin/lights" ||
          this.$router.history._startLocation === "/admin/articles" ||
          this.$router.history._startLocation === "/settings")
      ) {
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
