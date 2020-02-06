<template>
  <div>
    <font-awesome-icon
      :class="n <= rating ? 'solid-star' : 'regular-star'"
      :key="n"
      v-for="n in MAX_RATING"
      :icon="n <= rating ? solidStarIcon : regularStarIcon"
    />
  </div>
</template>

<script>
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { MAX_RATING } from "../common/constants";

export default {
  name: "AddRecipeButton",
  props: {
    rating: Number
  },
  data() {
    return {
      MAX_RATING: MAX_RATING
    };
  },
  computed: {
    regularStarIcon() {
      return faStarRegular;
    },
    solidStarIcon() {
      return faStarSolid;
    }
  }
};
</script>

<style lang="scss" scoped>
.regular-star {
  color: black;
  .fa-star g g path {
    stroke: red;
    stroke-width: 10;
  }
}
.solid-star {
  color: #d4af37;
}
</style>
