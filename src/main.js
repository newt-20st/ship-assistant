// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyDdqdUQnlsXifihcCbDrQmYa8-u2wkZiOE",
  authDomain: "ship-assistant.firebaseapp.com",
  databaseURL: "https://ship-assistant-default-rtdb.firebaseio.com",
  projectId: "ship-assistant",
  storageBucket: "ship-assistant.appspot.com",
  messagingSenderId: "837214312091",
  appId: "1:837214312091:web:a212417a98086e4b5a583e",
  measurementId: "G-5T7NM8EH07"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
