import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
import PostAll from '@/components/PostAll'
import PostId from '@/components/PostId'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
        next({ path: 'user?from=top' });
      }
    })
  } else {
    next();
  }
});

export default router;
