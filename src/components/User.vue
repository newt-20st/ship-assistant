<template>
  <div>
    <a href="/">Back to top</a>
    <p>{{ this.message }}</p>
    <div v-show="this.status === false" id="notLoggedIn">
      <p>ログインしてください。</p>
      <button @click="googleSignIn">Sign In with Google</button>
    </div>
    <div v-show="this.status === true" id="loggedIn">
      <h2>{{ this.userData.username }}</h2>
      <img :src="this.userData.photoURL" />
      <p>メールアドレス: {{ this.userData.mailaddress }}</p>
      <p>アカウント作成日時: {{ this.userData.creationTime }}</p>
      <p>最終ログイン: {{ this.userData.lastLoginTime }}</p>
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
              if (this.status == true) {
                if (this.$route.query.type == "PostAll") {
                  this.$router.push("/post/");
                } else if (this.$route.query.type == "GetLogAll") {
                  this.$router.push("/getlog/");
                } else if (this.$route.query.type == "PostId") {
                  this.$router.push("/post/" + this.$route.query.redirect);
                } else if (this.$route.query.type == "GetLogId") {
                  this.$router.push("/getlog/" + this.$route.query.redirect);
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
