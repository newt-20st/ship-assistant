<template>
  <div class="user">
    <b-breadcrumb :items="path" class="overflow-scroll"></b-breadcrumb>
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
      <h2>{{ this.userName }}</h2>
      <img id="userIcon" :src="this.photoURL" />
      <table>
        <tbody>
          <tr v-for="each of this.userData" :key="each.id">
            <th>{{ each.name }}</th>
            <td>{{ each.value }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="googleSignOut" id="signOut" class="btn btn-danger">
        ログアウト
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
export default {
  name: "User",
  data() {
    return {
      status: false,
      message: "",
      userName: "",
      photoURL: "",
      userData: [
        {
          id: "mailaddress",
          prop: ["email"],
          name: "メールアドレス",
          value: "",
        },
        {
          id: "creationTime",
          prop: ["metadata", "creationTime"],
          name: "アカウント作成",
          value: "",
        },
        {
          id: "lastSignInTime",
          prop: ["metadata", "lastSignInTime"],
          name: "最終ログイン",
          value: "",
        },
      ],
      path: [
        {
          text: "ホーム",
          to: "/",
        },
        {
          text: "ユーザー情報",
          active: true,
        },
      ],
    };
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.status = true;
        this.userName = user.displayName;
        this.photoURL = user.photoURL;
        for (const [index, data] of this.userData.entries()) {
          var f = user;
          for (const each of data.prop) {
            f = f[each];
          }
          if (data.id.indexOf("Time") != -1) {
            this.userData[index].value = moment(f).format(
              "YYYY/MM/DD HH:mm:ss"
            );
          } else {
            this.userData[index].value = f;
          }
        }
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
                this.userName = user.displayName;
                this.photoURL = user.photoURL;
                for (const [index, data] of this.userData.entries()) {
                  var f = user;
                  for (const each of data.prop) {
                    f = f[each];
                  }
                  if (data.id.indexOf("Time") != -1) {
                    this.userData[index].value = moment(f).format(
                      "YYYY/MM/DD HH:mm:ss"
                    );
                  } else {
                    this.userData[index].value = f;
                  }
                }
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
