<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showNominationParams: {},
      newVoteParams: {
        nomination_id: this.$route.params.id,
      },
      embedded_trailer: "",
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
      this.showNominationParams.trailer_url = this.embedded_trailer;
      axios
        .patch("/nominations/" + this.$route.params.id, this.showNominationParams)
        .then((response) => {
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
        this.$router.push("/events/" + this.showNominationParams.event.id);
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
    <h1>
      <a :href="`/events/` + `${showNominationParams.event.id}`">{{ showNominationParams.event.name }}</a>
      : {{ showNominationParams.name }} ({{ showNominationParams.year }})
    </h1>

    <div v-if="showNominationParams.trailer_url && showNominationParams.trailer_url.length > 0">
      <iframe
        width="620"
        height="415"
        :src="`https://www.youtube.com/embed/${this.showNominationParams.youtube_id}`"
      ></iframe>
    </div>
    <div v-else>
      Find
      <a
        :href="`https://www.youtube.com/results?search_query=trailer+${this.showNominationParams.name}+${this.showNominationParams.year}`"
        target="_blank"
        v-on:click="findTrailer()"
      >
        Trailer
      </a>
    </div>
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
        Search
        <a :href="`https://www.justwatch.com/us/search?q=${showNominationParams.name}`" target="_blank">
          Streaming Services
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
              <input v-model="embedded_trailer" />
            </p>
            <span>
              <button v-on:click="nominationsUpdate()">Submit</button>
              <button>Close</button>
            </span>
          </div>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style></style>
-->
