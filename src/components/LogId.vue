<template>
  <div class="hello">
    <router-link to="/log">back</router-link>
    <h2>getLog: {{ this.timestamp }}</h2>
    <div v-show="this.highCon.length != 0">
      <h3>高校連絡事項</h3>
      <ul>
        <li v-for="each in this.highCon" v-bind:key="each">
          <a v-bind:href="'/post/' + each.id[0]">{{ each.title }}</a>
        </li>
      </ul>
    </div>
    <div v-show="this.highStudy.length != 0">
      <h3>高校学習教材</h3>
      <ul>
        <li v-for="each in this.highStudy" v-bind:key="each">
          <a v-bind:href="'/post/' + each.id[0]">{{ each.title }}</a>
        </li>
      </ul>
    </div>
    <div v-show="this.highSchoolNews.length != 0">
      <h3>高校学校通信</h3>
      <ul>
        <li v-for="each in this.highSchoolNews" v-bind:key="each">
          <a v-bind:href="'/post/' + each.id[0]">{{ each.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "logId",
  data() {
    return {
      id: this.$route.params.id,
      timestamp: "timestamp",
      highCon: [],
      highStudy: [],
      highSchoolNews: [],
    };
  },
  created: function () {
    const db = firebase.firestore();
    const docRef = db.collection("getLog").doc(this.$route.params.id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const getData = doc.data();
          this.timestamp = getData.timestamp.toDate();
          this.highCon = getData.highCon;
          this.highStudy = getData.highStudy;
          this.highSchoolNews = getData.highSchoolNews;
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
