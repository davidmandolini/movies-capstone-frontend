<script>
import axios from "axios";
export default {
  data: function () {
    return {
      searchParams: "",
      searches: [],
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
    searchMovie() {
      document.querySelector("#nomination-new").showModal();
      axios.get("/searches?expression=" + this.searchParams).then((response) => {
        console.log(this.searchParams);

        this.searches = response.data.results;
        console.log(response.data.results);
        this.searchParams = "";
      });
    },
    nominationsCreate() {
      axios.post("/nominations", this.newNominationParams).then((response) => {
        this.newNominationParams = response.data;
        this.nominations.push(response.data);
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showEventParams.name }}</h1>
    <h2>Add Nomination</h2>
    <input type="text" v-model="searchParams" />
    <button v-on:click="searchMovie()">Search</button>

    <h2>Current Nominations:</h2>
    <div v-for="nomination in nominations" :key="nomination.id">
      <a :href="`/nominations/` + `${nomination.id}`">{{ nomination.name }}</a>
      <span>&nbsp;Votes: {{ nomination.votes.length }}</span>
    </div>
    <dialog id="nomination-new">
      <form method="dialog">
        <div>
          <h2>Select from the search results</h2>
          <div v-for="search in searches" v-bind:key="search">{{ search.title }}</div>
          <button v-on:click="nominationsCreate()">Submit</button>
          <button>Close</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style></style>
