<template>
  <div class="hello">
    <router-link to="/" class="back">Back</router-link>
    <h2>ログ一覧</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <router-link v-bind:to="'/log/' + each.id">{{
          each.timestamp
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import moment from "moment";

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
            timestamp: moment(getData.timestamp.toDate()).format(
              "YYYY/MM/DD HH:mm:ss"
            ),
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
