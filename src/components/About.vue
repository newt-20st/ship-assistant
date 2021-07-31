<template>
  <div class="hello">
    <router-link to="/">トップへ戻る</router-link>
    <h2>このアプリについて</h2>
    <p>
      最新情報は<a
        href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
        target="_blank"
        >Notion</a
      >で確認してください。
    </p>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
  head: {
    title() {
      return {
        inner: "このアプリについて",
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#logo {
  display: block;
  max-width: 10rem;
  margin: 0 auto;
}
</style>
