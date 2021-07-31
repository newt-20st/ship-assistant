<template>
  <div class="hello">
    <router-link to="/">トップへ戻る</router-link>
    <h2>利用規約</h2>
  </div>
</template>

<script>
export default {
  name: "Terms",
  data() {
    return {};
  },
  head: {
    title() {
      return {
        inner: "利用規約",
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
