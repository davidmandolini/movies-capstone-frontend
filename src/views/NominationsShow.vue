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
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showNominationParams.name }}</h1>
    <div>
      <p>Name: {{ showNominationParams.name }}</p>
      <p>Trailer URL: {{ showNominationParams.trailer_url }}</p>
      <button v-on:click="votesCreate()">Vote for this!</button>
    </div>
  </div>
</template>

<style></style>
