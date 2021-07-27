<template>
  <div>
    <p v-show="this.$route.query.from == 'top'">ログインしてください。</p>
    <button @click="googleSignIn">Sign In with Google</button>
    <button @click="googleSignOut">Sign Out</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "SignUp",
  methods: {
    googleSignIn: function () {
      // We'll create functionality here
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    },
    googleSignOut: function () {
      firebase.auth().signOut();
    },
  },
};
</script>
