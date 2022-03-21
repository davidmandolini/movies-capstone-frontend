<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showGroupParams: {},
      events: [],
      members: [],
    };
  },
  created: function () {
    this.groupsShow();
  },
  methods: {
    groupsShow() {
      axios.get("/groups/" + this.$route.params.id).then((response) => {
        this.showGroupParams = response.data;
        this.events = response.data.events;
        this.members = response.data.users;
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showGroupParams.name }}</h1>
    <h2>Members:</h2>
    <ul>
      <li v-for="member in members" :key="member">{{ member.username }}</li>
    </ul>
    <h2>Events:</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="event in events" :key="event.id">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="`/events/` + `${event.id}`">{{ event.name }}</a>

                ({{ event.format_date }})
              </h5>

              <!-- <p>{{ event.nominations.length }} nominations</p> -->
              <span v-if="event.status === `closed`">
                <p class="card-text">
                  <b>Winner: {{ event.top_nomination.name }}</b>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a:visited {
  color: blue;
}
</style>
