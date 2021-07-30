<template>
  <div class="hello">
    <h2>Recent post list</h2>
    <router-link to="/post">here</router-link>
    <h2>User data</h2>
    <router-link to="/user">here</router-link>
    <h2>Log</h2>
    <router-link to="/log">here</router-link>
    <h2>More info</h2>
    <a
      href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
      target="_blank"
      >Introduce functions, known bugs, later release schedule, and more
    </a>
    <h2>twitter</h2>
    <a href="https://twitter.com/ShipNotify" target="_blank">here</a>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
