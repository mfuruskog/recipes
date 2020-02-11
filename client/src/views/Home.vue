<template>
  <section class="section">
    <h1 class="title is-2 has-text-centered">Receptlådan</h1>
    <add-recipe-button></add-recipe-button>
    <recipe-list></recipe-list>
  </section>
</template>

<script>
import RecipeList from "../components/RecipeList.vue";
import AddRecipeButton from "../components/AddRecipeButton.vue";
export default {
  name: "Home",
  components: {
    RecipeList,
    AddRecipeButton
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-family: "Pacifico";
}
</style>
