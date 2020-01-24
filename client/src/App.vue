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
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Helvetica';
  color: #3e4540;
  height: 100%;  
  background-image: linear-gradient(#91ffcc, #75B9BE);

  a {
    color: black;
    font-size: 18px;
  }
}
</style>
