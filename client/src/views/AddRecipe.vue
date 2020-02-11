<template>
  <section class="section">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" tag="a">
          <font-awesome-icon
            :icon="angleLeft"
            style="margin-right: 5px;"
          ></font-awesome-icon>
          Bakåt
        </router-link>
      </div>
    </nav>    
    <recipe-editor :callback="onSubmit" />
  </section>
</template>

<script>
import RecipeEditor from '../components/RecipeEditor'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "AddRecipe",
  components: {
    RecipeEditor
  },
  computed: {
    angleLeft() {
      return faAngleLeft;
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
