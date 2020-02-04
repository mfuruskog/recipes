<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style lang="scss">
html, body {
  background-color: #FFF7E4;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Helvetica';
  color: #3e4540;
  height: 100%;  
  background-color: #FFF7E4;

  a {
    color: black;
    font-size: 18px;
  }
}
</style>
