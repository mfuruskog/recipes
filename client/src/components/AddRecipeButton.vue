<template>  
  <router-link to="/add" tag="button" class="button is-rounded is-fullwidth">Lägg till recept</router-link>
</template>

<script>
export default {
  name: 'AddRecipeButton'  
}
</script>

<style lang="scss" scoped>
  button {
    border: 0;
    margin-bottom: 10px;
    background-color: #DB5461;
    color: white;
    font-weight: bold;    
  }
</style>
