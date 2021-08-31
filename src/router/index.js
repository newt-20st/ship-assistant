import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'
import firebase from 'firebase'

const loadView = view => () => import(`@/view/${view}`)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: loadView('Top')
    }, {
      path: '/user/',
      name: 'User',
      component: loadView('User')
    }, {
      path: '/post/',
      name: 'Post',
      component: loadView('Post'),
      meta: { requiresAuth: true },
    }, {
      path: '/post/:id',
      name: 'PostId',
      component: loadView('PostId'),
      meta: { requiresAuth: true },
    }, {
      path: '/log/',
      name: 'Log',
      component: loadView('Log'),
      meta: { requiresAuth: true },
    }, {
      path: '/log/:id',
      name: 'LogId',
      component: loadView('LogId'),
      meta: { requiresAuth: true },
    }
  ]
})

Vue.use(VueHead)
Vue.use(Router);


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next();
      } else {
        console.log(to);
        if ((to.name == "PostId") || (to.name == "LogId")) {
          if (to.fullPath.split('?').length == 2) {
            next({ path: '/user?redirect=' + to.name + ',' + String(to.params.id) + '&' + to.fullPath.split('?')[1].replaceAll('%3D', '=') });
          } else {
            next({ path: '/user?redirect=' + to.name + ',' + String(to.params.id) });
          }
        } else {
          if (to.fullPath.split('?').length == 2) {
            next({ path: '/user?redirect=' + to.name + '&' + to.fullPath.split('?')[1].replaceAll('%3D', '=') });
          } else {
            next({ path: '/user?redirect=' + to.name });
          }
        }
      }
    })
  } else {
    next();
  }
});

export default router;
