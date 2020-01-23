<template>
  <section class="section">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" tag="a">
          <font-awesome-icon :icon="angleLeft" style="margin-right: 5px;"></font-awesome-icon>Bakåt
        </router-link>
      </div>
    </nav>
    <div class="field">
      <label class="label">Titel</label>
      <div class="control">
        <input class="input" type="text" placeholder="T.ex. Pasta Carbonara" />
      </div>
    </div>
    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input class="input" type="text" placeholder="http://www.x.y" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question" />
          1
        </label>
        <label class="radio">
          <input type="radio" name="question" />
          2
        </label>
        <label class="radio">
          <input type="radio" name="question" />
          3
        </label>
        <label class="radio">
          <input type="radio" name="question" />
          4
        </label>
        <label class="radio">
          <input type="radio" name="question" />
          5
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "AddRecipe",
  computed: {
    angleLeft() {
      return faAngleLeft;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
