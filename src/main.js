import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import firebase from 'firebase'
import VueGtag from "vue-gtag";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

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
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

Vue.use(VueGtag, {
  config: { id: "G-GBC6NMWRPC" }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
