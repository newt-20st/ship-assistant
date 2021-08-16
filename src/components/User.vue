<template>
  <div>
    <router-link to="/" class="back">Back</router-link>
    <p>{{ this.message }}</p>
    <div v-show="this.status === false" id="notLoggedIn">
      <p>
        SHIPのデータを確認するためには在校生である確認が必要です。学校配布のGoogleアカウントでログインしてください。
      </p>
      <button @click="googleSignIn" class="signIn btn btn-primary">
        Googleアカウントでログイン
      </button>
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
      <button @click="googleSignOut" id="signOut" class="btn btn-danger">
        ログアウト
      </button>
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
              if (
                user.email.indexOf("@ship.sakaehigashi.ed.jp") != -1 ||
                user.email == "ship.assistant.official@gmail.com"
              ) {
                this.status = true;
                this.userData.username = user.displayName;
                this.userData.mailaddress = user.email;
                this.userData.creationTime = user.metadata.creationTime;
                this.userData.lastLoginTime = user.metadata.lastSignInTime;
                this.message = "ログインに成功しました。";
                this.$gtag.event("login", {
                  event_category: "engagement",
                  event_label: "success",
                });
              } else {
                user
                  .delete()
                  .then(() => {
                    this.message =
                      "これは栄東のアカウントではありません。 @ship.sakaehigashi.ed.jp で終わるGoogleアカウントでログインしてください。";
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .then(() => {
              if (this.status) {
                if (this.$route.query.redirect) {
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
              } else {
                this.$gtag.event("login", {
                  event_category: "engagement",
                  event_label: "reject",
                });
              }
            })
            .catch((error) => {
              this.$gtag.event("login", {
                event_category: "engagement",
                event_label: "resign",
              });
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
          this.$gtag.event("logout", {
            event_category: "engagement",
            event_label: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.$gtag.event("logout", {
            event_category: "engagement",
            event_label: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#userIcon {
  border-radius: 50%;
}
</style>
