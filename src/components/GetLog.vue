<template>
  <div class="hello">
    <a href="/">Back to top</a>
    <h2>GetLog list</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <a v-bind:href="'/getlog/' + each.id"> {{ each.timestamp }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "GetLog",
  data() {
    return {
      list: [],
    };
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
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
