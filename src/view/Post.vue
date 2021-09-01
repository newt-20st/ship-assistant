<template>
  <div class="post">
    <div class="container-xxl">
      <b-breadcrumb :items="path"></b-breadcrumb>
      <h2>最近の投稿</h2>
      <div class="row">
        <div class="col-lg-8">
          <ul>
            <li v-for="each in list" v-bind:key="each.id">
              <router-link v-bind:to="'/post/' + each.id">{{
                each.title
              }}</router-link>
            </li>
          </ul>
          <button class="btn btn-primary" @click="load()">Load more</button>
        </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
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
      path: [
        {
          text: "ホーム",
          to: "/",
        },
        {
          text: "投稿一覧",
          active: true,
        },
      ],
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
            title:
              "[" +
              this.$store.state.channelData[getData.channel].name +
              "] " +
              getData.title,
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
              title:
                "[" +
                this.$store.state.channelData[getData.channel].name +
                "] " +
                getData.title,
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
