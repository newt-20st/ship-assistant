<template>
  <div id="app">
    <div id="header">
      <h1>SHIP Assistant [beta]</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
:root {
  --base-color: #1e88e5;
}
#app {
  margin: 0;
  h1 {
    color: var(--base-color);
    border-bottom: 1px solid var(--base-color);
  }
}
</style>
