<template>
  <div id="app">
    <Header />
    <div class="content">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: { Header },
};
</script>

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
  padding: 1rem 0;
}
</style>
