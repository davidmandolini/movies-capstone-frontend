<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showEventParams: {},
      nominations: [],
      newNominationParams: {
        event_id: this.$route.params.id,
      },
      errors: [],
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
        console.log(response.data.nominations);
      });
    },
    nominationsCreate() {
      axios.post("/nominations", this.newNominationParams).then((response) => {
        this.newNominationParams = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showEventParams.name }}</h1>
    <h2>Nominate A Movie!</h2>
    <div>
      <p>
        Name:
        <input v-model="newNominationParams.name" />
      </p>
      <p>
        Trailer URL:
        <input v-model="newNominationParams.trailer_url" />
      </p>
      <button v-on:click="nominationsCreate()">Submit</button>
    </div>
    <h2>Current Nominations:</h2>
    <div v-for="nomination in nominations" :key="nomination.id">
      <a :href="`/nominations/` + `${nomination.id}`">{{ nomination.name }}</a>
    </div>
  </div>
</template>

<style></style>
