<template>
  <section class="section">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <router-link v-if="!isEditing" to="/" tag="a">
        <font-awesome-icon :icon="angleLeft" style="margin-right: 5px;"></font-awesome-icon>Bakåt
      </router-link>
      <font-awesome-icon
        v-if="!isEditing"
        :icon="editIcon"
        @click="isEditing = true"
        style="font-size: 1.2rem;"
      />
      <button class="button is-text" v-if="isEditing" @click="isEditing = false">Avbryt</button>
    </nav>
    <div class="container" v-if="!isEditing">
      <h1 class="title">{{ recipe.title }}</h1>
      <hr />
      <div class="details">
        <div class="details--top">
          <rating class="rating" :rating="recipe.rating" />
          {{ recipeType }}
        </div>
        <div class="description">{{ recipe.description }}</div>
        <div>
          <a :href="recipe.url">{{ recipe.url }}</a>
        </div>
      </div>
    </div>
    <div class="container" v-if="isEditing">
      <recipe-editor :initial-recipe="recipe" :callback="onSubmit" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { faAngleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RECIPE_TYPES } from "../common/constants";
import Rating from "../components/Rating";
import RecipeEditor from "../components/RecipeEditor";

export default {
  name: "RecipeDetails",
  props: {
    id: String
  },
  components: {
    Rating,
    RecipeEditor
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
  methods: {
    onSubmit() {
       axios
      .get(`${process.env.VUE_APP_API_URL}/recipes/${this.id}`)
      .then(response => {
        this.recipe = response.data.data;
        this.isEditing = false;
        });
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
