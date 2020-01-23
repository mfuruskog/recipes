<template>
  <div id="app">    
    <home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Regular';
  height: 100%;  
  background-image: linear-gradient(#91ffcc, #75B9BE);
}
</style>
