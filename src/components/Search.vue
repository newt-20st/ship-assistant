<template>
  <div class="hello">
    <a href="/">Back to top</a>
    <h2>Seach Post</h2>
    <p>!!! this function won't work</p>
    <div id="input-form">
      <div>
        <input type="text" v-model="word" />
        <button @click="getSearch()">search</button>
      </div>
      <div v-show="this.word != ''">
        {{ this.word }} で検索した結果
        <ul>
          <li v-for="each in list" v-bind:key="each.id">
            <a v-bind:href="'/post/' + each.id"> {{ each.title }} </a>
          </li>
        </ul>
      </div>
    </div>
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
      word: "",
    };
  },
  methods: {
    getSearch: function () {
      const db = firebase.firestore();
      console.log(this.word);
      db.collection("shipPost")
        .orderBy("title")
        .startAt(this.word)
        .endAt(this.word + "\uf8ff")
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
  },
  computed: {
    fullName: function () {
      return this.name + this.mei;
    },
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
