<template>
  <div class="top">
    <p>
      SHIPに投稿された文書の情報の確認や閲覧ができる簡易Webクライアントアプリです。
    </p>
    <div class="topGridMenu">
      <router-link to="/post/">最近の投稿</router-link
      ><router-link to="/user/">ユーザー情報</router-link
      ><router-link to="/log/">取得ログ</router-link>
      <a
        href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
        target="_blank"
        >このアプリについて
      </a>
      <a href="https://twitter.com/ShipNotify" target="_blank">Twitter</a>
      <a href="https://forms.gle/kthgGcTNvPSHh7bW8" target="_blank"
        >お問い合わせ</a
      >
    </div>
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
.topGridMenu {
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  flex-direction: row;
  justify-content: center;
  a {
    color: var(--link-color);
    text-decoration: none;
    display: block;
    width: clamp(15vw, 300px, 40vw);
    padding: 1rem;
    border: 0.2rem solid var(--link-color);
    border-radius: 1rem;
    transition: all ease-in 0.2s;
    &:hover {
      background-color: var(--link-color);
      color: var(--back-color);
    }
  }
}
#logo {
  display: block;
  max-width: 10rem;
  margin: 0 auto;
}
</style>
