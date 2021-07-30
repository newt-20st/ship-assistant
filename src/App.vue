<template>
  <div id="app">
    <div id="header">
      <h1>SHIP Assistant [beta]</h1>
    </div>
    <p id="caution">
      [caution!] This is beta version. You'll catch some bugs. I Welcome your
      unkown issue's report
    </p>
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" src="./style.scss"></style>
