<template>
  <b-navbar :transparent="true" :class="['theme-navbar', themeTransitionStyle]">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <div class="csoc-logo">{{ logoText }}</div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        :active="true"
        class="csoc-leaderboard"
        tag="router-link"
        :to="{ path: '/' }"
      >Leaderboard</b-navbar-item>
    </template>

    <template slot="end">
      <ToggleThemeButton />
    </template>

    <!-- Kind of a hack for buefy -->
    <ToggleThemeButton :isBurgerButton="true" slot="burger" />
  </b-navbar>
</template>

<script>
import ToggleThemeButton from "./ToggleThemeButton";

export default {
  name: "Navbar",
  components: {
    ToggleThemeButton
  },
  computed: {
    logoText() {
      if (["xxl", "xl", "lg", "buefy"].includes(this.$mq)) {
        return "COPS Summer of Code";
      }
      return "CSoC";
    },
    themeTransitionStyle: function() {
      return this.$store.getters.inTransition ? "themeTransition" : null;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.csoc-logo {
  font-family: "Agency FB", arial;
  color: $primary;
  font-size: 30px;
}

.csoc-leaderboard {
  color: var(--text-color) !important;
}

.theme-navbar {
  background: var(--background-color) !important;
}
</style>