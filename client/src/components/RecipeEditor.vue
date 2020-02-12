<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form id="recipeForm" @submit.prevent="handleSubmit(submitRecipe)">
      <div class="field">
        <label class="label">Titel</label>
        <validation-provider rules="required" v-slot="{ classes, errors }">
          <div class="control" :class="classes">
            <input
              class="input"
              type="text"
              placeholder="T.ex. Pasta Carbonara"
              v-model="recipe.title"
            />
            <span class="validation-message">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="field">
        <label class="label">Länk till recept</label>
        <validation-provider rules="required" v-slot="{ classes, errors }">
          <div class="control" :class="classes">
            <input
              class="input"
              type="text"
              placeholder="http://www.x.y"
              v-model="recipe.url"
            />
            <span class="validation-message">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="field">
        <label class="label">Betyg</label>
        <validation-provider rules="required" v-slot="{ classes, errors }">
          <div class="control" :class="classes">
            <label class="rating" v-for="n in MAX_RATING" :key="n" :value="n">
              <input type="radio" :value="n" v-model="recipe.rating" />
              <font-awesome-icon
                :icon="n <= recipe.rating ? starSolid : starRegular"
                :class="n <= recipe.rating ? 'solid-star' : 'regular-star'"
              />
            </label>
            <span class="validation-message">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="field">
        <label class="label">Typ</label>
        <validation-provider rules="required" v-slot="{ classes, errors }">
          <div class="control" :class="classes">
            <label
              v-for="(type, index) in RECIPE_TYPES"
              :key="index"
              class="radio"
            >
              <input type="radio" :value="type.type" v-model="recipe.type" />
              {{ type.name }}
            </label>
            <span class="validation-message">{{ errors[0] }}</span>
          </div>
        </validation-provider>
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
  </validation-observer>
</template>

<script>
import axios from "axios";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { MAX_RATING, RECIPE_TYPES } from "../common/constants";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Fältet är obligatoriskt"
});

export default {
  name: "AddRecipe",
  components: {
    ValidationProvider,
    ValidationObserver
  },
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
  computed: {
    starRegular() {
      return faStarRegular;
    },
    starSolid() {
      return faStarSolid;
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
.control {
  &.invalid {
    input {
      border-color: red;
    }
  }
  .validation-message {
    display: block;
    color: red;
    font-size: 0.9rem;
  }
}
.rating {
  font-size: 1.3rem;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .regular-star {
    color: black;
  }
  .solid-star {
    color: #d4af37;
  }
}
</style>
