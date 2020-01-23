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
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g Alex Smith" />
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
