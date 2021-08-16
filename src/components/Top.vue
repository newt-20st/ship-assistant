<template>
  <div class="hello">
    <h2>最近の投稿</h2>
    <p>
      <router-link to="/post">こちら</router-link>
    </p>
    <h2>ユーザー情報</h2>
    <p>
      <router-link to="/user">こちら</router-link>
    </p>
    <h2>取得ログ</h2>
    <p>
      <router-link to="/log">こちら</router-link>
    </p>
    <h2>このアプリについて</h2>
    <ul>
      <li>
        <a
          href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
          target="_blank"
          >詳細( Notion, 外部サイトが開きます)
        </a>
      </li>
    </ul>
    <h2>Twitter</h2>
    <p>
      <a href="https://twitter.com/ShipNotify" target="_blank">こちら</a>
    </p>
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
