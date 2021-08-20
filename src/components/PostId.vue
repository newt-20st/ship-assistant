<template>
  <div class="hello">
    <router-link to="/post" class="back">Back</router-link>
    <h2>{{ rows[0].value }}</h2>
    <table>
      <tr v-for="row in rows" v-bind:key="row.id">
        <th>{{ row.key }}</th>
        <td>{{ row.value }}</td>
      </tr>
    </table>
    <div v-show="file.name.length != 0">
      <h3>Files</h3>
      <ul>
        <li v-for="(name, i) in file.name" :key="name">
          <a :href="file.link[i]" target="_blank">{{ name }}</a>
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
      file: {
        name: [],
        link: [],
      },
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
            if (this.rows[i].key == "channel") {
              this.rows[i].value =
                this.$store.state.channelData[getData[this.rows[i].key]].name;
            } else {
              this.rows[i].value = getData[this.rows[i].key];
            }
          }
          if (getData.channel == "highCon" || getData.channel == "highStudy") {
            const storage = firebase.storage();
            console.log(getData.link.length);
            for (let i = 0; i < getData.link.length; i++) {
              storage
                .refFromURL(getData.link[i])
                .getMetadata()
                .then(function (metadata) {
                  me.file.name.push({});
                  me.file.name[i] = metadata.name;
                  console.log(metadata.name);
                });
              storage
                .refFromURL(getData.link[i])
                .getDownloadURL()
                .then(function (url) {
                  me.file.link.push({});
                  me.file.link[i] = url;
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
</style>
