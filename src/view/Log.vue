<template>
  <div class="log">
    <b-breadcrumb :items="path"></b-breadcrumb>
    <h2>ログ一覧</h2>
    <table>
      <tbody>
        <tr v-for="each in list" :key="each.id">
          <th>{{ each.timestamp }}</th>
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
      path: [
        {
          text: "ホーム",
          to: "/",
        },
        {
          text: "ログ一覧",
          to: true,
        },
      ],
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
