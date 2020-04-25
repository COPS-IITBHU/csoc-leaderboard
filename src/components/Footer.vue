<template>
  <footer :class="['footer csoc-footer', themeTransitionStyle]">
    <div class="container csoc-footer-container">
      <div class="content">
        <p class="csoc-footer-text">
          Made with
          <span style="color: #e25555;">&#9829;</span> by
          <a href="https://copsiitbhu.co.in/" class="footer-logo">COPS</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    themeTransitionStyle: function() {
      return this.$store.getters.inTransition ? "themeTransition" : null;
    }
  }
};
</script>

<style lang="scss">
.csoc-footer {
  background: var(--background-color) !important;
}

.csoc-footer-container {
  text-align: center;
}

.footer-logo {
  font-family: "Agency FB", arial;
  font-size: 18px;
}

.csoc-footer-text {
    color: var(--text-color);
}
</style>