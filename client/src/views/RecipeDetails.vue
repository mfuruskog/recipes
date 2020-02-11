<template>
  <section class="section">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <router-link v-if="!isEditing" to="/" tag="a">
        <font-awesome-icon
          :icon="angleLeft"
          style="margin-right: 5px;"
        ></font-awesome-icon>
        Bakåt
      </router-link>
      <font-awesome-icon
        v-if="!isEditing"
        :icon="editIcon"
        @click="isEditing = true"
        style="font-size: 1.2rem;" />
        <button class="button is-text" v-if="isEditing" @click="isEditing = false">Avbryt</button>
        <button class="button is-text" v-if="isEditing" @click="isEditing = false">Klar</button>
    </nav>
    <div class="container" v-if="!isEditing">
      <h1 class="title">
        {{ recipe.title }}
      </h1>
      <hr />
      <div class="details">
        <div class="details--top">
          <rating class="rating" :rating="recipe.rating" />
          {{ recipeType }}
        </div>
        <div class="description">
          {{ recipe.description }}
        </div>
        <div>
          <a :href="recipe.url">{{ recipe.url }}</a>
        </div>
      </div>
    </div>
    <div class="container" v-if="isEditing">
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
        <label class="label">Länk till recept</label>
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
        <label class="label">Beskrivning eller kommentarer</label>
        <div class="control">
          <textarea 
            class="textarea" 
            placeholder="Gärna en kort beskrivning av receptet!" 
            v-model="recipe.description"/>
        </div>
      </div>
      
      <button class="button is-link" type="submit">Spara</button>
    </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { faAngleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RECIPE_TYPES } from "../common/constants";
import Rating from "../components/Rating";

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
      recipe: {},
      isEditing: false
    };
  },
  computed: {
    angleLeft() {
      return faAngleLeft;
    },
    editIcon() {
      return faEdit;
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
}
.container {
  margin-top: 1rem;
  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .details {
    display: flex;
    flex-wrap: wrap;
    .details--top {
      display: flex;
      flex: 1 1 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .rating {
        font-size: 1.5rem;
      }
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
