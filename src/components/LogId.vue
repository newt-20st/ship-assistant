<template>
  <div class="hello">
    <router-link to="/log" class="back">Back</router-link>
    <h2>{{ this.timestamp }} の取得</h2>
    <div v-for="channel of updateChannel" :key="channel.channel">
      <h3>{{ channel.name }}</h3>
      <ul>
        <li v-for="each in channel.data" :key="each.id[0]">
          <router-link v-bind:to="'/post/' + each.id[0]">{{
            each.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import moment from "moment";
export default {
  name: "logId",
  data() {
    return {
      id: this.$route.params.id,
      timestamp: "",
      updateChannel: [],
    };
  },
  head: {
    title() {
      return {
        inner: this.timestamp + " の取得",
      };
    },
  },
  created: function () {
    const db = firebase.firestore();
    const docRef = db.collection("getLog").doc(this.$route.params.id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const getData = doc.data();
          this.timestamp = moment(getData.timestamp.toDate()).format(
            "YYYY/MM/DD HH:mm:ss"
          );
          for (const channel of this.$store.state.channelList) {
            if (getData[channel] != 0) {
              this.updateChannel.push({
                channel: channel,
                name: this.$store.state.channelData[channel].name,
                data: getData[channel],
              });
            }
          }
        } else {
          console.log("No such document!");
        }
      })
      .then(() => {
        this.$emit("updateHead");
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
