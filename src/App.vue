<template>
  <router-view />
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription
        }
      ]
    }
  }
}
</script>

<style lang="scss">
    // Theme variables
    :root {
        --background-color: #071521;
        --background-color-secondary: #091a28;
        --background-color-tertiary: #0d2538;
        --border-color: #0d2538;
        --text-color: #ebf4f1;

        [data-theme="light"] {
            --background-color: #f3f5f4;
            --background-color-secondary: #fff;
            --background-color-tertiary: #fafafa;
            --border-color: #cfe6e6;
            --text-color: rgba(0,0,0,0.8);
        }
    }


    @import "~bulma/sass/utilities/_all";
    @import "./styles/variables.scss";
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
</style>