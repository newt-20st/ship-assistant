<template>
  <div class="hello">
    <h2>最近の投稿</h2>
    <router-link to="/post">こちら</router-link>
    <h2>ユーザー情報</h2>
    <router-link to="/user">こちら</router-link>
    <h2>取得ログ</h2>
    <router-link to="/log">こちら</router-link>
    <h2>このアプリについて</h2>
    <ul>
      <li><router-link to="/about/">詳細</router-link></li>
      <li><router-link to="/about/terms">利用規約</router-link></li>
      <li>
        <a
          href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
          target="_blank"
          >最新情報( Notion, 外部サイトが開きます)
        </a>
      </li>
    </ul>
    <h2>Twitter</h2>
    <a href="https://twitter.com/ShipNotify" target="_blank">こちら</a>
    <img id="logo" src="@/assets/ship-notify.png" />
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
<style lang="scss" scoped>
#logo {
  display: block;
  max-width: 10rem;
  margin: 0 auto;
}
</style>
