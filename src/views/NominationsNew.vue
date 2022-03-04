<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newNominationParams: {},
      errors: [],
    };
  },
  methods: {
    nominationsCreate() {
      axios.post("/nominations", this.newNominationParams).then((response) => {
        this.newNominationParams = response.data;
        console.log("yo");
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Your Nomination!</h1>

    <div>
      <p>
        Name:
        <input v-model="newNominationParams.name" />
      </p>
      <p>
        Trailer URL:
        <input v-model="newNominationParams.trailer" />
      </p>
      <button v-on:click="nominationsCreate()">Submit</button>
    </div>
  </div>
</template>

<style></style>
