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
      youtubeId: "",
    };
  },
  created: function () {
    this.nominationsShow();
  },
  methods: {
    nominationsShow() {
      axios.get("/nominations/" + this.$route.params.id).then((response) => {
        this.showNominationParams = response.data;
        this.youtubeId = response.data.youtube_id;
        console.log(response.data);
      });
    },
    nominationsUpdate() {
      this.showNominationParams.trailer_url = this.embedded_trailer;
      axios
        .patch("/nominations/" + this.$route.params.id, this.showNominationParams)
        .then((response) => {
          this.youtubeId = response.data.youtube_id;
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
      <button
        v-if="showNominationParams.event.status === 'open'"
        class="btn btn-primary"
        id="right-align-button"
        v-on:click="votesCreate()"
      >
        Vote for {{ showNominationParams.name }}!
      </button>
    </h1>

    <div v-if="showNominationParams.trailer_url && showNominationParams.trailer_url.length > 0">
      <iframe width="620" height="415" :src="`https://www.youtube.com/embed/${youtubeId}`"></iframe>
    </div>
    <div v-else>
      <a
        :href="`https://www.youtube.com/results?search_query=trailer+${showNominationParams.name}+${showNominationParams.year}`"
        target="_blank"
        class="btn btn-primary"
        v-on:click="findTrailer()"
      >
        Add Trailer
      </a>
    </div>
    <div>
      <h3>
        <b>Rated:</b>
        {{ showNominationParams.rating }}
      </h3>
      <h3>
        <b>Genre:</b>
        {{ showNominationParams.genre }}
      </h3>
      <h3>
        <b>Runtime:</b>
        {{ showNominationParams.runtime }}
      </h3>
      <h3>
        <b>Directed by:</b>
        {{ showNominationParams.director }}
      </h3>
      <h3>
        <b>IMDB Rating:</b>
        {{ showNominationParams.imdb_rating }}
      </h3>
      <h3>
        <b>Metascore:</b>
        {{ showNominationParams.metacritic_rating }}
      </h3>
      <h3>
        <b>Plot:</b>
        {{ showNominationParams.plot }}
      </h3>
      <p>
        <a
          :href="`https://www.justwatch.com/us/search?q=${showNominationParams.name}`"
          target="_blank"
          class="btn btn-primary"
        >
          Search Streaming Services
        </a>
      </p>
    </div>
    <dialog id="trailer-find">
      <form method="dialog">
        <div>
          <h2>Enter the movie trailer URL:</h2>
          <div>
            <p>
              <input class="form-control" v-model="embedded_trailer" />
            </p>
            <span>
              <button class="btn btn-primary" v-on:click="nominationsUpdate()">Submit</button>
              <button class="btn btn-primary" id="right-align-button">Close</button>
            </span>
          </div>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style>
a {
  color: #555;
}
.home {
  margin: 0 auto;
  max-width: 50em;
  line-height: 1.5;
  padding: 4em 1em;
  color: #555;
}
h2 {
  margin-top: 1em;
  padding-top: 1em;
}
h1,
h2,
strong {
  color: #333;
}
#right-align-button {
  float: right;
}
</style>
