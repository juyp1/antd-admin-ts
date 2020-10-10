<template>
  <div id="app">

    <div>
      <router-view />
     </div>
  </div>
</template>

<script>

export default {
  name: 'app'

}
</script>

<style lang="scss">
.fade-in-left {
	-webkit-animation: fade-in-left 0.8s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in-left 0.8s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

</style>
