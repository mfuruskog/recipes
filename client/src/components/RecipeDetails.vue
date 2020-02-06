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
      <div>
        {{ recipe.title }}
      </div>
      <div>
        {{ recipe.type }}
      </div>
      <div>
        {{ recipe.url }}
      </div>
    </nav>
  </section>
</template>

<script>
import axios from "axios";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "RecipeDetails",
  props: {
    id: String
  },
  data() {
    return {
      recipe: {}
    };
  },
  computed: {
    angleLeft() {
      return faAngleLeft;
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL}/recipes/${this.id}`)
      .then(response => (this.recipe = response.data.data));
  }
};
</script>

<style lang="scss" scoped></style>
