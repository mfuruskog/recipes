<template>
  <form id="recipeForm" @submit.prevent="submitRecipe">
    <div class="field">
      <label class="label">Titel</label>
      <div class="control">
        <input class="input" type="text" placeholder="T.ex. Pasta Carbonara" v-model="recipe.title" />
      </div>
    </div>
    <div class="field">
      <label class="label">Länk till recept</label>
      <div class="control">
        <input class="input" type="text" placeholder="http://www.x.y" v-model="recipe.url" />
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
    <div class="field">
      <label class="label">Typ</label>
      <div class="control">
        <label v-for="(type, index) in RECIPE_TYPES" :key="index" class="radio">
          <input type="radio" :value="type.type" v-model="recipe.type" />
          {{ type.name }}
        </label>
      </div>
    </div>
    <div class="field">
      <label class="label">Beskrivning eller kommentarer</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Gärna en kort beskrivning av receptet!"
          v-model="recipe.description"
        />
      </div>
    </div>

    <button class="button is-link" type="submit">Spara</button>
  </form>
</template>

<script>
import axios from "axios";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { MAX_RATING, RECIPE_TYPES } from "../common/constants";

export default {
  name: "AddRecipe",
  props: {
    initialRecipe: {
      type: Object,
      default: function() {
        return {
          id: null,
          title: null,
          url: null,
          type: null,
          rating: null,
          description: null
        };
      }
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      MAX_RATING: MAX_RATING,
      RECIPE_TYPES: RECIPE_TYPES,
      recipe: { ...this.initialRecipe }
    };
  },
  methods: {
    getStarIcon(index) {
      if (this.recipe.rating === null) return faStarRegular;
      else if (index <= this.recipe.rating) return faStarSolid;
      return faStarRegular;
    },
    submitRecipe() {
      if (this.initialRecipe._id != null) {
        axios
          .put(
            `${process.env.VUE_APP_API_URL}/recipes/${this.initialRecipe._id}`,
            this.recipe
          )
          .then(() => this.callback());
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}/recipes`, this.recipe)
          .then(() => this.callback());
      }
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
