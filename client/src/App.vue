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
  background-color: #FFF7E4 !important;
}
#app {
  font-family: 'Helvetica';
  color: #3e4540;    

  a {
    color: black;
    font-size: 18px;
  }
}
</style>
