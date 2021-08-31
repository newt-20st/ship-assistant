<template>
  <div class="user">
    <b-breadcrumb :items="path" class="overflow-scroll"></b-breadcrumb>
    <div v-show="message.text !== ''">
      <div :class="'alert alert-' + message.type" role="alert">
        {{ message.text }}
      </div>
    </div>
    <div v-show="status === false" id="notLoggedIn">
      <p>
        SHIPのデータを確認するためには在校生である確認が必要です。学校配布のGoogleアカウントでログインしてください。
      </p>
      <p>
        <button
          type="button"
          @click="googleSignIn"
          class="signIn btn btn-primary"
        >
          学校のアカウントでログイン
        </button>
      </p>
      <p>
        または、「栄東生にしか分からない質問」に答えてください:
        <b>学習実践五訓その四、「けじめある学習を行い、 [ ？ ] を育てよう」</b>
      </p>
      <form>
        <div class="mb-3">
          <label class="form-label">※すべてひらがなで入力してください</label>
          <input type="text" class="form-control" v-model="passPhrase" />
        </div>
        <button
          type="button"
          @click="passPhraseSignIn()"
          class="btn btn-success"
        >
          確認
        </button>
      </form>
    </div>
    <div v-show="status === true" id="loggedIn">
      <div v-show="type == 'own'">
        <h2>{{ user.displayName }}</h2>
        <img id="userIcon" :src="user.photoURL" />
        <table>
          <tbody>
            <tr v-for="each of userData" :key="each.id">
              <th>{{ each.name }}</th>
              <td>{{ each.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="type == 'public'">
        <h2>共有アカウントでのログイン</h2>
        <p>
          このアカウントは共有アカウントです。データの閲覧は可能ですが、セキュリティ上栄東生であることを完全に担保できるものではないため一部の機能を制限しております。当サイトをご利用になる際はなるべく個人のアカウントでログインしていただきますようお願いします。
        </p>
        <h3>共有アカウントで制限される機能</h3>
        <ul>
          <li>再度アクセスした際にログイン状態を維持する機能</li>
        </ul>
        <p>
          <button
            type="button"
            @click="googleSignIn"
            class="signIn btn btn-primary"
          >
            学校のGoogleアカウントでログイン
          </button>
        </p>
      </div>
      <button
        type="button"
        @click="signOut"
        id="signOut"
        class="btn btn-danger"
      >
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
      message: { text: "", type: "primary" },
      status: false,
      type: "",
      user: {},
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
      passPhrase: "",
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
  head: {
    title() {
      return {
        inner: "ユーザー情報",
      };
    },
  },
  mounted() {
    if (this.type !== "public") {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.status = true;
          if (user.email.indexOf("@ship.sakaehigashi.ed.jp") != -1) {
            this.type = "own";
            this.user = user;
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
            this.type = "public";
          }
        } else {
          this.status = false;
        }
      });
    }
  },
  methods: {
    googleSignIn() {
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
                this.type = "own";
                this.user = user;
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
                this.message = {
                  text: "ログインに成功しました。",
                  type: "success",
                };
                this.$gtag.event("login", {
                  event_category: "engagement",
                  event_label: "success",
                });
                this.redirect();
              } else {
                user
                  .delete()
                  .then(() => {
                    this.message = {
                      text: "これは栄東のアカウントではありません。 @ship.sakaehigashi.ed.jp で終わるGoogleアカウントでログインしてください。",
                      type: "danger",
                    };
                  })
                  .catch((error) => {
                    console.log(error);
                  });
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
    signOut() {
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
    passPhraseSignIn() {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              "ship.assistant.official@gmail.com",
              this.passPhrase
            )
            .then((result) => {
              this.status = true;
              this.type = "public";
              this.user = result.user;
              this.message = {
                text: "ログインに成功しました。",
                type: "success",
              };
              this.$gtag.event("login", {
                event_category: "engagement",
                event_label: "success_public",
              });
              this.redirect();
            })
            .catch((error) => {
              this.$gtag.event("login", {
                event_category: "engagement",
                event_label: "reject_public",
              });
              this.message = {
                text: "パスフレーズが違います。",
                type: "danger",
              };
            });
        });
    },
    redirect() {
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
    },
  },
};
</script>

<style lang="scss" scoped>
#userIcon {
  border-radius: 50%;
}
</style>
