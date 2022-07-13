<template>
  <Layout>
    <section class="wi-container wi-mx-auto wi-px-6 md:wi-px-2">
      <ul class="wi-flex wi-items-center wi-mx-auto wi-justify-center wi-flex-wrap wi-my-16 wi-text-2xl">
        <li v-for="track in tracks" :key="track.name" class="wi-mx-auto wi-rounded-full dark:wi-bg-white wi-flex wi-justify-center wi-items-center wi-my-6 wi-bg-teal-600 wi-w-56 wi-h-56 wi-px-4">
          <g-link :to="track.link" class="wi-text-center hover:wi-text-white wi-text-cool-gray-300 dark:wi-text-teal-600 dark:hover:wi-text-cyan-800">
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
    title: "Tracks 2022"
  },
  data() {
    return {
      tracks: [
        {
          name:"Web Development",
          link:"/2022/web"
        },
        {
          name:"Native Android",
          link:"/2022/android"
        },
        {
          name:"Cross Platform",
          link:"/2022/flutter"
        },
      ]
    }
  },
  methods:{

  }
}

</script>

<style scoped>
a {
  vertical-align: middle;
}
</style>
