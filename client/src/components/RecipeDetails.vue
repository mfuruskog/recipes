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
      <div class="container">
        <h1 class="title">
          {{ recipe.title }}
        </h1>
        <hr />
        <div class="details">
          <rating class="rating" :rating="recipe.rating" />
          {{ recipeType }}
          <div class="description">
            God, enkel mat. Kan absolut kryddas lite extra och kanske ta lite
            mindre av tomatpurén.
          </div>
          <div>
            <a :href="recipe.url">{{ recipe.url }}</a>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import axios from "axios";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { RECIPE_TYPES } from "../common/constants";
import Rating from "./Rating";

export default {
  name: "RecipeDetails",
  props: {
    id: String
  },
  components: {
    Rating
  },
  data() {
    return {
      recipe: {}
    };
  },
  computed: {
    angleLeft() {
      return faAngleLeft;
    },
    recipeType() {
      let recipeType = RECIPE_TYPES.find(x => x.type);
      return recipeType ? recipeType.name : "";
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL}/recipes/${this.id}`)
      .then(response => (this.recipe = response.data.data));
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .rating {
      font-size: 1.5rem;
    }
    .description {
      margin: 1.5rem 0;
    }
  }

  hr {
    background-color: lightgray;
    margin: 0.9rem 0;
  }
}
</style>
