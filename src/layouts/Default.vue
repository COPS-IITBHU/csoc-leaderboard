<template>
  <div :data-theme="$store.getters.currentTheme" :class="['layout', themeTransitionStyle]">
    <Navbar />
    <slot/>
    <Footer />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    themeTransitionStyle: function() {
      return this.$store.getters.inTransition ? 'themeTransition' : null;
    }
  }
}
</script>

<style>
.layout {
  background: var(--background-color);
  min-height: 100vh;
}

.themeTransition {
  transition: all 0.4s !important;
}
</style>
