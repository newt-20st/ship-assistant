<template>
  <div class="hello">
    <a href="/">Back to top</a>
    <h2>Recent Post</h2>
    <ul>
      <li v-for="each in list" v-bind:key="each.id">
        <a v-bind:href="'/post/' + each.id"> {{ each.title }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "PostAll",
  data() {
    return {
      list: [],
    };
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
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
      } else {
        next({ name: "Login" });
      }
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
