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
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="group in groups" :key="group.id">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="`/groups/` + `${group.id}`">{{ group.name }}</a>
              </h5>
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
