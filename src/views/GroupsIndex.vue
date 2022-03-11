<script>
import axios from "axios";
export default {
  data: function () {
    return {
      error: {},
      groups: [],
    };
  },
  created: function () {
    this.groupsIndex();
  },
  methods: {
    groupsIndex() {
      axios
        .get("/groups")
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => {
          this.error = error.response;
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1 v-if="error.status">{{ error.status }}: {{ error.statusText }}</h1>
    <h1 v-else>Your Groups</h1>
    <div v-for="group in groups" :key="group.id">
      <a :href="`/groups/` + `${group.id}`">{{ group.name }}</a>
    </div>
  </div>
</template>

<style></style>
