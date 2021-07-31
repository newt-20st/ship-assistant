<template>
  <div class="hello">
    <router-link to="/">back to top</router-link>
    <h2>GetLog list</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <router-link v-bind:to="'/log/' + each.id">{{
          each.timestamp.toDate()
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "Log",
  data() {
    return {
      list: [],
    };
  },
  head: {
    title() {
      return {
        inner: "ログ一覧",
      };
    },
  },
  created: function () {
    const db = firebase.firestore();
    db.collection("getLog")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const getData = doc.data();
          this.list.push({
            id: doc.id,
            timestamp: getData.timestamp,
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
</style>
