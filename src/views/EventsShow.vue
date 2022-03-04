<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showEventParams: {},
      nominations: [],
    };
  },
  created: function () {
    this.eventsShow();
  },
  methods: {
    eventsShow() {
      axios.get("/events/" + this.$route.params.id).then((response) => {
        this.showEventParams = response.data;
        this.nominations = response.data.nominations;
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showEventParams.name }}</h1>
    <h2>Nominations:</h2>
    <div v-for="nomination in nominations" :key="nomination.id">
      <a :href="`/nominations/` + `${nomination.id}`">{{ nomination.name }}</a>
    </div>
  </div>
</template>

<style></style>
