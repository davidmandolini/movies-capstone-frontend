<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showNominationParams: {},
      newVoteParams: {
        nomination_id: this.$route.params.id,
      },
      errors: [],
    };
  },
  created: function () {
    this.nominationsShow();
  },
  methods: {
    nominationsShow() {
      axios.get("/nominations/" + this.$route.params.id).then((response) => {
        this.showNominationParams = response.data;
        console.log(response.data);
      });
    },
    votesCreate() {
      axios.post("/votes", this.newVoteParams).then((response) => {
        this.newVoteParams = response.data;
        console.log(response.data);
        this.$router.push("/events/" + this.showNominationParams.event_id);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showNominationParams.name }} ({{ showNominationParams.year }})</h1>
    <div>
      <p>Rated: {{ showNominationParams.rating }}</p>
      <p>Genre: {{ showNominationParams.genre }}</p>
      <p>Runtime: {{ showNominationParams.runtime }}</p>
      <p>Directed by: {{ showNominationParams.director }}</p>
      <p>IMDB Rating: {{ showNominationParams.imdb_rating }}</p>
      <p>Metascore: {{ showNominationParams.metacritic_rating }}</p>
      <p>Plot: {{ showNominationParams.plot }}</p>
      <p>
        <a :href="`https://www.youtube.com/results?search_query=trailer+${showNominationParams.name}`" target="_blank">
          Find Trailer
        </a>
      </p>
      <button v-on:click="votesCreate()">Vote for {{ showNominationParams.name }}!</button>
    </div>
  </div>
</template>

<style></style>
