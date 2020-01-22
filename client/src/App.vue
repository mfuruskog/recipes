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

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Regular';
  height: 100%;
  background-color: #91ffcc;
}
</style>
