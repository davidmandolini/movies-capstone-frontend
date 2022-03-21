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
      loading: true,
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
      });
    },
    searchMovie() {
      document.querySelector("#nomination-new").showModal();
      axios.get("/searches/" + this.searchParams).then((response) => {
        console.log(this.searchParams);
        this.searches = response.data.results;
        console.log(response.data.results);
      });
    },
    newRating() {
      // document.querySelector("#nomination-new").showModal();
      // axios.get("/searches/" + this.searchParams).then((response) => {
      //   console.log(this.searchParams);
      //   this.searches = response.data.results;
      //   console.log(response.data.results);
      // });
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
      : {{ showEventParams.name }} ({{ showEventParams.format_date }})
    </h1>
    <div v-if="showEventParams.status == 'open'">
      <h2>Add Nomination</h2>
      <input type="text" v-model="searchParams" />
      <button v-on:click="searchMovie()">Search</button>
      <p v-if="showEventParams.top_nomination">
        <button v-on:click="eventsUpdate()">Crown the Winner</button>
      </p>
    </div>
    <div v-else>
      <h2>Winner: {{ showEventParams.top_nomination.name }}</h2>
      <p>{{ showEventParams.group.name }} rating: 3/5</p>
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

      <!-- <span>&nbsp;Votes: {{ nomination.votes.length }}</span> -->
    </div>
    <dialog id="nomination-new">
      <form method="dialog">
        <div>
          <h2>Select from the {{ searches.length }} search result(s)</h2>
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
  </div>
</template>

<style>
a:visited {
  color: blue;
}
</style>
