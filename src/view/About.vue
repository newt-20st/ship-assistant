<template>
  <div class="about">
    <router-link to="/" class="back">Back</router-link>
    <h2>このアプリについて</h2>
    <p>
      最新情報は<a
        href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
        target="_blank"
        >Notion</a
      >で確認してください。
    </p>
    <h3>概要</h3>
    <p>
      SHIP ( https://ship.sakae-higashi.jp/ )
      の情報を定期的に取得し、新しい投稿が確認されたら各SNSなどを通じて更新を通知するサービスです。
    </p>
    <h3>システム構成図</h3>
    <img src="@/assets/ship-assistant-system-map.jpg" />
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
img {
  max-width: 100%;
}
</style>
