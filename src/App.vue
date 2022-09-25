<template>
  <div id="app" class="header">
    <!-- <CreateBox/> -->
    <!-- <Slide>
      <span>Model</span>
      <router-link to="/modify-data">
        <span>Modify Data</span>
      </router-link>
      <router-link to="/add-data">
        <span>Add Data</span>
      </router-link>
    </Slide> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import { Slide } from "vue-burger-menu";

export default {
  name: "App",
  components: {
    // Slide,
  },
  methods: {},
};
</script>
<style scoped>
body{
  margin: 0;
  /* margin: 0 !important; */
}
</style>

