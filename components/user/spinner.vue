<template>
  <div class="container">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "spinner",
};
</script>
<style scoped>
.container {
  background-color: rgba(245, 245, 245, 0.65);
  backdrop-filter: blur(5px);
  z-index: 9999;
}
.lds-ripple {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 50% 0;
  /* transform: translate(-50%, -50%); */
  margin: 0 auto;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #ec6d7a;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
    border-color: #ec6d7a;
  }
  50% {
    border-color: #f03c4e;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0.1;
    border-color: #f8031c;
  }
}
</style>
