<template>
  <b-navbar-item
    v-show="shouldShowThisButton"
    class="toggle-button"
    v-on:click="toggleTheme()"
    tag="div"
  >
    <b-icon pack="fas" :icon="toggleIcon" size="is-large" class="theme-button"></b-icon>
  </b-navbar-item>
</template>

<script>
export default {
  name: "ToggleThemeButton",
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggle_theme");
    }
  },
  computed: {
    shouldShowThisButton() {
      if (this.isBurgerButton) {
        return !["xxl", "xl", "lg"].includes(this.$mq);
      }
      return true;
    },
    toggleIcon() {
        return this.$store.getters.currentTheme === 'dark' ? 'moon' : 'sun';
    }
  },
  props: {
    isBurgerButton: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.toggle-button {
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
}

.theme-button {
  color: var(--text-color);
}
</style>