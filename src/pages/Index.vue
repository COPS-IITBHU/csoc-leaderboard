<template>
  <Layout>
    <section class="wi-container wi-mx-auto wi-px-6 md:wi-px-2">
      <h1 class="wi-text-4xl">
        Application Development Track
      </h1>
      <ul class="wi-flex wi-flex-col wi-items-center wi-list-none wi-my-2">
        <li v-for="year in years" :key="year.name" class="wi-my-4">
          <div class="wi-flex wi-items-center dark:wi-text-light-100">
            <h2 class="wi-inline-block wi-text-2xl">
              {{ combineName(year.link,year.icon) }}s
            </h2>
            <b-icon pack="fas" :icon="year.icon" size="is-large" />
          </div>
          <p class="wi-text-lg wi-text-justify dark:wi-text-gray-50 wi-my-2">
            {{ year.description }}
          </p>
          <g-link :to="year.link" class="wi-rounded-md wi-shadow-lg dark:wi-bg-gray-200 wi-py-[0.4rem] wi-px-3 wi-mt-4">
            Scoreboard
          </g-link>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<script>

export default {
  metaInfo: {
    title: "Home"
  },
  data() {
    return {
      years: [
        {
          description: "First ever batch to complete a six week long track. Becoming Full Stack Developers at end. Students were provided resources on how to develop responsive frontend design, make XHR request and connect to remote APIs. They were also provided with assignments to develop Backend Applications using batteries included Django Framework. Finally they had to choose between learning Flutter vs Web VR.",
          icon: "dragon",
          link: "2020"
        },
        {
          description: "Enthusiastic first yearties force COPS to start track based CSOC Dev for both frontend and backend. The Frontend track included good 'ol Web Development and Native Android as well as Cross Platform Flutter Development were the new additions.",
          icon: "otter",
          link: "2021"
        }
      ]
    }
  },
  methods:{
    combineName(link,icon){
      return link+" "+icon.slice(0,1).toUpperCase()+icon.slice(1)
    }
  }
}

</script>

<style scoped>
.dark h1 {
  background-image: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background-image: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
}

h1 {
  background-image: -webkit-linear-gradient(to right, #155799, #159957);  /* Chrome 10-25, Safari 5.1-6 */
  background-image: linear-gradient(to right, #155799, #159957); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-repeat: repeat;
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
