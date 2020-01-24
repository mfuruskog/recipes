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
    <form id="recipeForm" @submit.prevent="submitRecipe">
      <div class="field">
        <label class="label">Titel</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="T.ex. Pasta Carbonara"
            v-model="recipe.title"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="http://www.x.y"
            v-model="recipe.url"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Typ</label>
        <div class="control">
          <label
            v-for="(type, index) in RECIPE_TYPES"
            :key="index"
            class="radio"
          >
            <input type="radio" :value="type.type" v-model="recipe.type" />
            {{ type.name }}
          </label>
        </div>
      </div>
      <div class="field">
        <label class="label">Betyg</label>
        <div class="control">
          <label class="rating" v-for="n in MAX_RATING" :key="n" :value="n">
            <input type="radio" :value="n" v-model="recipe.rating" />
            <font-awesome-icon :icon="getStarIcon(n)" />
          </label>
        </div>
      </div>
      <button class="button is-link" type="submit">Spara</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { faStar as faStarSolid, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { MAX_RATING, RECIPE_TYPES } from "../common/constants";

export default {
  name: "AddRecipe",
  data() {
    return {
      MAX_RATING: MAX_RATING,
      RECIPE_TYPES: RECIPE_TYPES,
      recipe: {
        title: null,
        url: null,
        type: null,
        rating: null
      }
    };
  },
  computed: {
    angleLeft() {
      return faAngleLeft;
    }    
  },
  methods: {
    submitRecipe() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/recipes`, this.recipe)
        .then(() => this.$router.push({ name: "home" }));
    },
    getStarIcon(index) {
      if (this.recipe.rating === null) return faStarRegular;
      else if (index <= this.recipe.rating) return faStarSolid;
      return faStarRegular;
    }
  }
};
</script>

<style lang="scss" scoped>
.rating {
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
}
</style>
