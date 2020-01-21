<template>
<section class="section">  
  <h1 class="title is-2 has-text-centered">Favvorecepten</h1>
  <recipe-list></recipe-list>
</section>
</template>

<script>
import RecipeList from './RecipeList.vue'
export default {
  name: 'Home',
  components: {
    RecipeList
  }
}
</script>

<style scoped>
</style>
