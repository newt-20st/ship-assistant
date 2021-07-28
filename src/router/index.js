import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import User from '@/components/User'
import GetLog from '@/components/GetLog'
import GetLogId from '@/components/GetLogId'
import Search from '@/components/Search'
import PostAll from '@/components/PostAll'
import PostId from '@/components/PostId'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    }, {
      path: '/user',
      name: 'user',
      component: User
    }, {
      path: '/post/',
      name: 'PostAll',
      component: PostAll,
      meta: { requiresAuth: true },
    }, {
      path: '/getlog/',
      name: 'GetLog',
      component: GetLog,
      meta: { requiresAuth: true },
    }, {
      path: '/getlog/:id',
      name: 'GetLogId',
      component: GetLogId,
      meta: { requiresAuth: true },
    }, {
      path: '/search/',
      name: 'Search',
      component: Search,
      meta: { requiresAuth: true },
    }, {
      path: '/post/:id',
      name: 'PostId',
      component: PostId,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    // 認証状態を取得
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next();
      } else {
        // 認証されていない場合
        console.log(to)
        next({ path: '/user?type=' + to.name + '&redirect=' + String(to.params.id) });
      }
    })
  } else {
    next();
  }
});

export default router;
