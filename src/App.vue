<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">SHIP-Assistant Web</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/post/">最近の投稿</b-nav-item>
          <b-nav-item to="/log/">ログ</b-nav-item>
          <b-nav-item to="/user/">ユーザー情報</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
  padding: 1rem 0;
}
</style>
