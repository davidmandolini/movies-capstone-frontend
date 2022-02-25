<script>
import axios from "axios";
export default {
  data: function () {
    return {
      groups: [],
    };
  },
  created: function () {
    this.groupsIndex();
  },
  methods: {
    groupsIndex() {
      axios.get("/groups").then((response) => {
        this.groups = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Your Groups</h1>
    <div v-for="group in groups" :key="group.id">
      <a :href="`/groups/` + `${group.id}`">{{ group.name }}</a>
    </div>
  </div>
</template>

<style></style>
