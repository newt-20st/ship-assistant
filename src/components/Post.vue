<template>
  <div class="hello">
    <router-link to="/" class="backBtn">back</router-link>
    <h2>Recent Post</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <router-link v-bind:to="'/post/' + each.id">{{
          each.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "Post",
  data() {
    return {
      list: [],
    };
  },
  head: {
    title() {
      return {
        inner: "投稿一覧",
      };
    },
  },
  created: function () {
    const db = firebase.firestore();
    db.collection("shipPost")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const getData = doc.data();
          this.list.push({
            id: getData.id,
            title: getData.title + " (" + getData.channel + ")",
          });
        });
      })
      .catch((error) => {
        this.title = "Error getting documents: " + String(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  li {
    margin: 1rem 0;
  }
}
</style>
