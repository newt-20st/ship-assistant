<template>
  <div>
    <router-link to="/">Back to top</router-link>
    <p>{{ this.message }}</p>
    <div v-show="this.status === false" id="notLoggedIn">
      <p>ログインしてください。</p>
      <button @click="googleSignIn">Sign In with Google</button>
    </div>
    <div v-show="this.status === true" id="loggedIn">
      <h2>{{ this.userData.username }}</h2>
      <img id="userIcon" :src="this.userData.photoURL" />
      <table>
        <tr v-for="(value, key) in this.userData" v-bind:key="key">
          <th>{{ key }}</th>
          <td>{{ value }}</td>
        </tr>
      </table>
      <button @click="googleSignOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "User",
  data() {
    return {
      status: false,
      message: "",
      userData: {
        username: "",
        mailaddress: "",
        creationTime: "",
        lastLoginTime: "",
        photoURL: "",
      },
    };
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.status = true;
        this.userData.username = user.displayName;
        this.userData.mailaddress = user.email;
        this.userData.creationTime = user.metadata.creationTime;
        this.userData.lastLoginTime = user.metadata.lastSignInTime;
        this.userData.photoURL = user.photoURL;
      } else {
        this.status = false;
      }
    });
  },
  head: {
    title() {
      return {
        inner: "ユーザー情報",
      };
    },
  },
  methods: {
    googleSignIn: function () {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          const provider = new firebase.auth.GoogleAuthProvider();
          provider.setCustomParameters({
            prompt: "select_account",
          });
          firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
              const user = result.user;
              if (user.email.indexOf("@ship.sakaehigashi.ed.jp") != -1) {
                this.status = true;
                this.userData.username = user.displayName;
                this.userData.mailaddress = user.email;
                this.userData.creationTime = user.metadata.creationTime;
                this.userData.lastLoginTime = user.metadata.lastSignInTime;
                this.message = "ログインに成功しました。";
              } else {
                user
                  .delete()
                  .then(() => {
                    this.message = "これは栄東のアカウントではありません。";
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .then(() => {
              if (this.status && this.$route.query.redirect) {
                const redirect = this.$route.query.redirect.split(",");
                if (redirect[0] == "Post") {
                  this.$router.push("/post/");
                } else if (redirect[0] == "PostId") {
                  this.$router.push("/post/" + redirect[1]);
                } else if (redirect[0] == "Log") {
                  this.$router.push("/log/");
                } else if (redirect[0] == "LogId") {
                  this.$router.push("/log/" + redirect[1]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    googleSignOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.status = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#userIcon {
  border-radius: 50%;
}
th,
td {
  padding: 0.5rem;
}
th {
  text-align: right;
  border-right: 0.2rem solid var(--base-color);
  min-width: 7rem;
}
</style>
