import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutPage from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: LayoutPage,
    children: [
      {
        path: '/home',
        name: 'Home',
        // redirect: '/register',
        meta: {
          isAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
      },
      {
        path: '/syllabary',
        name: 'Syllabary',
        meta: {
          isAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/syllabary.vue')
      },
      {
        path: '/test',
        name: 'Test',
        meta: {
          isAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error404',
    meta: {
      isAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../layout/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
