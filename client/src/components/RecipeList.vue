<template>
  <ul class="recipe-list">
    <li class="recipe is-flex" :key="recipe.id" v-for="recipe in recipes">
      <div class="recipe-title">
        <h2 class="subtitle">{{recipe.title}}</h2>
      </div>
      <div class="recipe-type">{{recipe.type}}</div>
      <div class="recipe-rating">
        <font-awesome-icon
          :key="n"
          v-for="n in 5"
          :icon="n < recipe.rating ? solidStarIcon : regularStarIcon"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "RecipeList",
  data() {
    return {
      recipes: [
        {
          title: "Tomat- och palsternacksoppa",
          url: "https://google.se",
          rating: 4,
          type: "Vegetarisk"
        },
        {
          title: "Carbonara",
          url: "https://google.se",
          rating: 5,
          type: "Fläsk"
        },
        {
          title: "Grönsaker",
          url: "https://google.se",
          rating: 2,
          type: "Vegetarisk"
        }
      ]
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
    goToRecipe(url) {
      window.location.href = url;
    },
    addRecipe()
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_API_URL}/api/recipes`).then(response => this.recipes = response.data.data)
  }
};
</script>

<style lang="scss" scoped>
.recipe-list {
  .recipe {
    background-color: white;
    border: 2px solid #069c57;
    border-radius: 8px;
    margin-bottom: 5px;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;

    .recipe-title {
      flex: 1 1 100%;
    }
  }
}
</style>
