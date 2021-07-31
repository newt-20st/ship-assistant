<template>
  <div class="hello">
    <router-link to="/post">back</router-link>
    <h2>{{ rows[0].value }}</h2>
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
  name: "PostId",
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
  head: {
    title() {
      return {
        inner: this.title,
      };
    },
  },
  created: function () {
    const me = this;
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
            const storage = firebase.storage();
            for (var eachUrl of getData.link) {
              storage
                .refFromURL(eachUrl)
                .getDownloadURL()
                .then((url) => {
                  me.files.push(url);
                  console.log(url);
                });
            }
          }
        });
      })
      .then(() => {
        this.$emit("updateHead");
      })
      .catch((error) => {
        this.title = "Error getting documents: " + String(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
th,
td {
  padding: 0.5rem;
}
th {
  text-align: right;
  border-right: 0.2rem solid var(--base-color);
}
</style>
