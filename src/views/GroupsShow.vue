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
    <h2><u>Members</u></h2>
    <ul>
      <li v-for="member in members" :key="member">{{ member.username }}</li>
    </ul>
    <h2><u>Events</u></h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="event in events" :key="event.id">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="`/events/` + `${event.id}`">{{ event.name }}</a>

                ({{ event.format_date }})
              </h5>
            </div>
            <div v-if="event.status === `closed`" class="card-footer">Winner: {{ event.top_nomination.name }}</div>
            <!-- <p v-if="event.status === `open`">Total nominations: {{ event.nominations.length }}</p> -->
          </div>
        </div>
      </div>
    </div>
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
