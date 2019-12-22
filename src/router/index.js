import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pindex from '../views/pindex.vue'
import Login from  '../views/login.vue'
import Reg from '../views/reg.vue'
import Post from '../views/post.vue'
import Overview from '../views/overview.vue'
import Detail from '../views/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '登录页',
      keepAlive: true, // 需要被缓存
    }
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于',
      keepAlive: true, // 需要被缓存
    }
  },
  {
    path: '/pindex',
    name: 'pindex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Pindex,
    meta: {
      title: '主页',
      keepAlive: true, // 需要被缓存
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      keepAlive: false, // 需要被缓存
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    meta: {
      title: '注册',
      keepAlive: false, // 需要被缓存
    }
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
    meta: {
      title: '发帖',
      keepAlive: false, // 需要被缓存
    }
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
    meta: {
      title: '预览',
      keepAlive: false, // 需要被缓存
    }
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    component: Detail,
    meta: {
      title: '详情',
      keepAlive: false, // 需要被缓存
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined?'默认标题':to.meta.title
  if (to.meta.requireAuth) {
    let token = Cookies.get('access_token');
    let anonymous = Cookies.get('user_name');
    if (token) {

      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })

    }
  }
  next();
})

