<template>
  <ul class="recipe-list">
    <li class="recipe is-flex" :key="recipe.id" v-for="recipe in recipes" @click="goToRecipeDetails(recipe._id)">
      <div class="recipe-title">
        <h2 class="subtitle">{{ recipe.title }}</h2>
      </div>
      <div class="recipe-type">{{ translateRecipeType(recipe.type) }}</div>
      <div class="recipe-rating">
        <font-awesome-icon
          :class="n <= recipe.rating ? 'solid-star' : 'regular-star'"
          :key="n"
          v-for="n in MAX_RATING"
          :icon="n <= recipe.rating ? solidStarIcon : regularStarIcon"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { MAX_RATING, RECIPE_TYPES } from "../common/constants";

export default {
  name: "RecipeList",
  data() {
    return {
      recipes: [],
      MAX_RATING: MAX_RATING,
      RECIPE_TYPES: RECIPE_TYPES
    };
  },
  computed: {
    regularStarIcon() {
      return faStarRegular;
    },
    solidStarIcon() {
      return faStarSolid;
    }
  },
  methods: {
    goToRecipeDetails(id) {
      this.$router.push({ name: "recipe-details", params: { id } })
    },
    goToRecipe(url) {
      window.location.href = url;
    },
    //TODO refactor this. Perhaps recipe as its own component and this as computed property?
    translateRecipeType(type) {
      let recipeType = RECIPE_TYPES.find(x => x.type === type);
      return recipeType ? recipeType.name : '';
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL}/recipes`)
      .then(response => (this.recipes = response.data.data));
  }
};
</script>

<style lang="scss" scoped>
.recipe-list {
  //TODO Temporary solution
  margin: 0 -1.5rem;

  .recipe {
    background-color: white;
    margin-bottom: 5px;
    flex-wrap: wrap;
    padding: 1.2rem 1rem;
    justify-content: space-between;

    .recipe-title {
      h2 {
        font-size: 1rem;
        }
      flex: 1 1 100%;      
    }

    .recipe-type {
      font-size: 0.9rem;
    }

    .regular-star {
      color: black;
      .fa-star g g path {
        stroke: red;
        stroke-width: 10;
      }
    }
    .solid-star {
      color: #D4AF37;
    }
  }
}
</style>
