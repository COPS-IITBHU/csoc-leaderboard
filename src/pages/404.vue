<template>
  <Layout :is404="true">
      <div class="error-message-container">
        <b-message :class="['error-message', themeTransitionStyle]" type="is-danger" has-icon pack="fas" icon="exclamation">
           <b>Error 404!</b>
        </b-message>
      </div>
      <div class="counter-container">
          Redirecting back to home page in {{ timeLeft }}s
      </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: '404'
  },
  computed: {
    themeTransitionStyle: function() {
      return this.$store.getters.inTransition ? 'themeTransition' : null;
    }
  },
  data() {
      return {
          timeLeft: 5
      }
  },
  mounted() {
    setInterval(() => {
        this.timeLeft -= 1;
        if (!this.timeLeft) {
            this.$router.push({path: '/'});
        }
    }, 1000);
  }
}
</script>

<style lang="scss">
.error-message-container {
    text-align: center;
    display: flex;
    justify-content: center;
}

.error-message {
    width: auto;
    border: 1px solid var(--border-color);
    border-left: 0px;
    background: var(--background-color-secondary) !important;

    .media-content {
        margin: auto;
    }
}

.counter-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--text-color);
}
</style>