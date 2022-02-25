<script>
import axios from "axios";
export default {
  data: function () {
    return {
      showGroupParams: {},
    };
  },
  created: function () {
    this.groupsShow();
  },
  methods: {
    groupsShow() {
      axios.get("/groups/" + this.$route.params.id).then((response) => {
        this.showGroupParams = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ showGroupParams.name }}</h1>
  </div>
</template>

<style></style>
