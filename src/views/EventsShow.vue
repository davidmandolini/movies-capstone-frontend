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
      searchMessage: "",
      rating: 0,
      ratingParams: {},
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
    eventsUpdate() {
      this.showEventParams.status = "closed";
      axios.patch("/events/" + this.$route.params.id, this.showEventParams).then((response) => {
        this.showEventParams = response.data;
        console.log(response.data);
        document.querySelector("#nomination-win").showModal();
      });
    },
    searchMovie() {
      this.searchMessage = "Searching for movies...";
      document.querySelector("#nomination-new").showModal();
      axios.get("/searches/" + this.searchParams).then((response) => {
        console.log(this.searchParams);
        this.searches = response.data.results;
        console.log(response.data.results);
        this.searchMessage = `Select from the ${response.data.results.length} result(s) below.`;
      });
    },
    newRating() {
      document.querySelector("#nomination-rate").showModal();
    },
    ratingsPost() {
      console.log(this.rating);
      this.ratingParams.nomination_id = this.showEventParams.top_nomination.id;
      this.ratingParams.value = parseInt(this.rating);
      axios.post("/user_ratings", this.ratingParams).then((response) => {
        console.log(response.data);
        this.eventsShow();
      });
    },
    nominationsCreate(search) {
      this.newNominationParams.name = search.title;
      axios.post("/nominations", this.newNominationParams).then((response) => {
        this.newNominationParams = {
          event_id: this.$route.params.id,
        };
        this.nominations.push(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>
      <a :href="`/groups/` + `${showEventParams.group.id}`">{{ showEventParams.group.name }}</a>
      {{ showEventParams.name }} ({{ showEventParams.format_date }})
    </h1>
    <div v-if="showEventParams.status == 'open'">
      <h2>Add Nomination</h2>
      <input type="text" v-model="searchParams" />
      <button v-on:click="searchMovie()">Search</button>
      <p></p>
      <p v-if="showEventParams.top_nomination">
        <button v-on:click="eventsUpdate()">Crown the Winner</button>
      </p>
    </div>
    <div v-else>
      <h2>Winner: {{ showEventParams.top_nomination.name }}</h2>
      <div v-for="nomination in nominations" :key="nomination.id">
        <h3 v-if="nomination.average_rating">
          {{ showEventParams.group.name }} rates this: {{ nomination.average_rating }} stars
        </h3>
      </div>
      <p>
        <button v-on:click="newRating()">Rate {{ showEventParams.top_nomination.name }}</button>
      </p>
    </div>

    <h2 v-if="showEventParams.status == 'open'">Current Nominations:</h2>
    <h2 v-else>Nominations</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="nomination in nominations" :key="nomination.id">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="`/nominations/` + `${nomination.id}`">{{ nomination.name }}</a>
              </h5>
              <p class="card-text">
                {{ nomination.plot }}
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Nominated by {{ nomination.user.username }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="container" style="width: 100%; height: 400px"></div>

    <dialog id="nomination-new">
      <form method="dialog">
        <div>
          <h2>{{ searchMessage }}</h2>
          <div v-for="search in searches" v-bind:key="search">
            <p></p>
            {{ search.title }} {{ search.description }}
            <span>
              <button v-on:click="nominationsCreate(search)">Nominate</button>
            </span>
          </div>
          <p></p>
          <button>Close</button>
        </div>
      </form>
    </dialog>
    <dialog id="nomination-win">
      <form method="dialog">
        <h2>
          And the winner is...
          <b>{{ showEventParams.top_nomination.name }}</b>
          !!!
        </h2>
        <p></p>
        <button>Close</button>
      </form>
    </dialog>
    <dialog id="nomination-rate">
      <form method="dialog">
        <h2>How many stars do you give {{ showEventParams.top_nomination.name }}?</h2>
        <div class="form-check form-check-inline">
          <input v-model="rating" class="form-check-input" type="radio" value="1" id="one" />
          <label for="one">1 star</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="rating" class="form-check-input" type="radio" value="2" id="two" />
          <label for="two">2 stars</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="rating" class="form-check-input" type="radio" value="3" id="three" />
          <label for="three">3 stars</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="rating" class="form-check-input" type="radio" value="4" id="four" />
          <label for="four">4 stars</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="rating" class="form-check-input" type="radio" value="5" id="five" />
          <label for="five">5 stars</label>
        </div>
        <button v-on:click="ratingsPost()">Submit</button>

        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
a {
  color: #e81c4f;
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
</style>
