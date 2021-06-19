<template>
  <Layout>
    <section class="wi-container wi-mx-auto wi-px-6 md:wi-px-2">
      <h1 class="wi-text-3xl">
        Tracks 2021
      </h1>
      <ul class="wi-flex wi-items-center wi-mx-auto wi-justify-center wi-flex-wrap wi-my-16 wi-text-2xl">
        <li v-for="track in tracks" :key="track.name" class="wi-mx-auto wi-rounded-full dark:wi-bg-white wi-flex wi-justify-center wi-items-center wi-bg-blue-900 wi-w-56 wi-px-4">
          <g-link :to="track.link" class="wi-rounded-full wi-flex wi-justify-center wi-items-center wi-text-center wi-w-56 wi-h-56">
            {{ track.name }}
          </g-link>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<script>

export default {
  metaInfo: {
    title: "Tracks 2021"
  },
  data() {
    return {
      tracks: [
        {
          name:"Web Development",
          link:"/2021/web"
        },
        {
          name:"Native Android",
          link:"/2021/android"
        },
        {
          name:"Cross Platform",
          link:"/2021/flutter"
        },
      ]
    }
  },
  methods:{

  }
}

</script>

<style scoped>
.dark h1 {
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
}

h1 {
  background: #159957;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #155799, #159957);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #155799, #159957); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
