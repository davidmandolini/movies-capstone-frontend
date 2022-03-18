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
    nominationsUpdate() {
      axios
        .patch("/nominations/" + this.$route.params.id, this.showNominationParams)
        .then((response) => {
          console.log(this.showNominationParams);
          console.log("hi");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    votesCreate() {
      axios.post("/votes", this.newVoteParams).then((response) => {
        this.newVoteParams = response.data;
        console.log(response.data);
        this.$router.push("/events/" + this.showNominationParams.event_id);
      });
    },
    findTrailer() {
      document.querySelector("#trailer-find").showModal();
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
      <p>
        IMDB Rating: {{ showNominationParams.imdb_rating }}, Metascore: {{ showNominationParams.metacritic_rating }}
      </p>
      <p>Plot: {{ showNominationParams.plot }}</p>
      <p>
        Find
        <a
          :href="`https://www.youtube.com/results?search_query=trailer+${this.showNominationParams.name}`"
          target="_blank"
          v-on:click="findTrailer()"
        >
          Trailer
        </a>
        or
        <a :href="`https://www.justwatch.com/us/search?q=${showNominationParams.name}`" target="_blank">
          Streaming Service
        </a>
      </p>
      <button v-on:click="votesCreate()">Vote for {{ showNominationParams.name }}!</button>
    </div>
    <dialog id="trailer-find">
      <form method="dialog">
        <div>
          <h2>Add or update the movie trailer</h2>
          <div>
            <p>
              Trailer URL:
              <input v-model="showNominationParams.trailer_url" />
            </p>
            <span>
              <button v-on:click="nominationsUpdate()">Submit</button>
            </span>
          </div>

          <button>Close</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style></style>
-->
