<template>
  <div class="hello">
    <a href="/post">＜ Back Recent Post List</a>
    <h2>{{ title }}</h2>
    <table>
      <tr v-for="row in rows" v-bind:key="row.id">
        <th>{{ row.key }}</th>
        <td>{{ row.value }}</td>
      </tr>
    </table>
    <div v-show="files.length != 0">
      <h3>ファイル</h3>
      <ul>
        <li v-for="file in files" v-bind:key="file">
          <a v-bind:href="file" target="_blank">{{ file }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "post-id",
  data() {
    return {
      id: this.$route.params.id,
      rows: [
        {
          key: "title",
          value: "",
        },
        {
          key: "channel",
          value: "",
        },
        {
          key: "id",
          value: "",
        },
        {
          key: "date",
          value: "",
        },
        {
          key: "folder",
          value: "",
        },
        {
          key: "description",
          value: "",
        },
      ],
      files: [],
      title: "title",
    };
  },
  created: function () {
    const db = firebase.firestore();
    db.collection("shipPost")
      .where("id", "==", Number(this.id))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const getData = doc.data();
          this.title = getData.title;
          for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].value = getData[this.rows[i].key];
          }
          if (getData.channel == "highCon") {
            this.files = getData.link;
            console.log(getData.link);
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
