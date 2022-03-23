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
          console.log(response.data);
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
                <p>Total members: {{ group.users.length }}</p>
              </h5>
            </div>
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
