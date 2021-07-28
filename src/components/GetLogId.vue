<template>
  <div class="hello">
    <a href="/">Back to top</a>
    <h2>{{ String(timestamp) }}</h2>
    <p>{{ String(highCon) }}</p>
    <p>{{ String(highStudy) }}</p>
    <p>{{ String(highSchoolNews) }}</p>
    <p>{{ String(juniorCon) }}</p>
    <p>{{ String(juniorStudy) }}</p>
    <p>{{ String(juniorSchoolNews) }}</p>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "GetLogId",
  data() {
    return {
      id: this.$route.params.id,
      timestamp: "timestamp",
      highCon: [],
      highStudy: [],
      highSchoolNews: [],
      juniorCon: [],
      juniorStudy: [],
      juniorSchoolNews: [],
    };
  },
  created: function () {
    const db = firebase.firestore();
    db.collection("getLog")
      .document(String(id))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const getData = doc.data();
          for (eachProp in getData) {
            this[eachProp] = getData[eachProp];
          }
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
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
