<template>
  <b-navbar :transparent="true" :class="['theme-navbar', themeTransitionStyle, 'wi-container wi-mx-auto wi-px-4 md:wi-px-0']">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <div class="csoc-logo">{{ logoText }}</div>
      </b-navbar-item>
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
  props: {
    is404: {
      type: Boolean,
      default: false
    }
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
  margin-bottom: 20px;
}
</style>
