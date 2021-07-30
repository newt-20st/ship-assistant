<template>
  <div class="hello">
    <h2>Welcome web app</h2>
    <p>
      [caution!] This is beta version. You'll catch some bugs. I Welcome your
      unkown issue's report
    </p>
    <h3>Recent Post List</h3>
    <a href="/post">here</a>
    <h3>user data</h3>
    <a href="/user">here</a>
    <h3>getlog</h3>
    <a href="/getlog">here</a>
    <h3>more info</h3>
    <a
      href="https://newt-house.notion.site/SHIP-Assistant-Project-Note-c599cf2125364a80920b0447f76d717a"
      target="_blank"
      >introduce functions, known bugs, fixes, later release schedule, and more
    </a>
    <h3>twitter</h3>
    <a href="https://twitter.com/ShipNotify" target="_blank">here</a>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
