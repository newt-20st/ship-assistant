<template>
  <div class="post">
    <router-link to="/" class="back">Back</router-link>
    <h2>Recent Post</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <router-link v-bind:to="'/post/' + each.id">{{
          each.title
        }}</router-link>
      </li>
    </ul>
    <button class="btn btn-primary" @click="load()">Load more</button>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
const db = firebase.firestore();
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
  created() {
    db.collection("shipPost")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const getData = doc.data();
          this.list.push({
            id: getData.id,
            title: getData.title + " (" + getData.channel + ")",
            timestamp: getData.timestamp,
          });
        });
      })
      .catch((error) => {
        this.title = "Error getting documents: " + String(error);
      });
  },
  methods: {
    load() {
      console.log(this.list[this.list.length - 1].timestamp);
      db.collection("shipPost")
        .where("timestamp", "<", this.list[this.list.length - 1].timestamp)
        .orderBy("timestamp", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const getData = doc.data();
            this.list.push({
              id: getData.id,
              title: getData.title + " (" + getData.channel + ")",
              timestamp: getData.timestamp,
            });
          });
        })
        .catch((error) => {
          this.title = "Error getting documents: " + String(error);
        });
    },
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
