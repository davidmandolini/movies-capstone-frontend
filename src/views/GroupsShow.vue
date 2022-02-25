<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showGroupParams: {},
      events: [],
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
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showGroupParams.name }}</h1>
    <h2>Events:</h2>
    <div v-for="event in events" :key="event.id">
      <a :href="`/events/` + `${event.id}`">{{ event.name }}</a>
    </div>
  </div>
</template>

<style></style>
