<template>
  <div class="hello">
    <router-link to="/" class="back">Back</router-link>
    <h2>ログ一覧</h2>
    <table>
      <thead>
        <tr>
          <th>取得日時</th>
          <th>更新チャンネル</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="each in list" :key="each.id">
          <td>{{ each.timestamp }}</td>
          <td>
            <router-link :to="'/log/' + each.id">
              {{ each.channelList.slice(0, -1) }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
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
          const getData = doc.data();
          let updateChannel = "";
          for (const prop of this.$store.state.channelList) {
            if (getData[prop].length != 0) {
              updateChannel += this.$store.state.channelData[prop].name + ",";
            }
          }
          this.list.push({
            id: doc.id,
            timestamp: moment(getData.timestamp.toDate()).format(
              "YYYY/MM/DD HH:mm:ss"
            ),
            channelList: updateChannel,
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
