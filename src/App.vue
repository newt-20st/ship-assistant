<template>
  <div id="app">
    <div id="header">
      <h1>SHIP Assistant [beta]</h1>
    </div>
    <div class="content">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" src="./style.scss"></style>
<style lang="scss">
#header {
  background-color: var(--base-color);
  border-radius: 0 0 3rem 3rem;
  height: 3rem;
  width: clamp(200px, 98vw, 750px);
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: clamp(3vh, 1.5rem, 8vw);
    margin: 0;
    color: var(--back-color);
  }
}
.content {
  margin: 0 clamp(5px, 5vw, 50px);
}
</style>
