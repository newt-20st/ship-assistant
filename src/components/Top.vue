<template>
  <div class="hello">
    <h2>Welcome web app</h2>
    <h3>Recent Post List</h3>
    <a href="/post">here</a>
    <h3>user data</h3>
    <a href="/user">here</a>
    <h3>getlog</h3>
    <a href="/getlog">here</a>
    <h3>search</h3>
    <a href="/search">here</a>
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
