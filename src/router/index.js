import Vue from 'vue'
import VueRouter from 'vue-router'
import Pindex from '../views/pindex.vue'
import Login from '../views/login.vue'
import Reg from '../views/reg.vue'
import Post from '../views/post.vue'
import Overview from '../views/overview.vue'
import Detail from '../views/detail.vue'
import Adminmain from '../adminviews/adminmain.vue'


Vue.use(VueRouter)

const routes = [
    /*{
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
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue'),
        meta: {
            title: '关于',
            keepAlive: true, // 需要被缓存
        }
    },*/
    {
        path: '/',
        name: 'pindex',
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
            keepAlive: false, // 不需要被缓存
        }
    },
    {
        path: '/reg',
        name: 'reg',
        component: Reg,
        meta: {
            title: '注册',
            keepAlive: false, // 不需要被缓存
        }
    },
    {
        path: '/post',
        name: 'post',
        component: Post,
        meta: {
            title: '发帖',
            keepAlive: false, // 不需要被缓存
        }
    },
    {
        path: '/overview',
        name: 'overview',
        component: Overview,
        meta: {
            title: '预览',
            keepAlive: false, // 不需要被缓存
        }
    },
    {
        path: '/detail/:tid',
        name: 'detail',
        component: Detail,
        meta: {
            title: '详情',
            keepAlive: false, // 不需要被缓存
        }
    },
    {
        path: '/adminmain',
        name: 'adminmain',
        component: Adminmain,
        meta: {
            title: '管理员页面',
            keepAlive: true, // 需要被缓存
            requireAuth: true
        },
        children: [
            {
                path: 'topicControl',
                name: 'topicControl',
                component: resolve => require(['../adminviews/components/topicControl.vue'], resolve),
                meta: {
                    title: '话题管理',
                    keepAlive: false,
                    requireAuth: true
                }
            },
            {
                path: 'categoryControl',
                name: 'categoryControl',
                component: resolve => require(['../adminviews/components/categoryControl.vue'], resolve),
                meta: {
                    title: '类别管理',
                    keepAlive: false,
                    requireAuth: true
                }
            },
            {
                path: 'userControl',
                name: 'userControl',
                component: resolve => require(['../adminviews/components/userControl.vue'], resolve),
                meta: {
                    title: '人员管理',
                    keepAlive: false,
                    requireAuth: true
                }
            },
            {
                path: 'test1',
                name: 'test1',
                component: resolve => require(['../adminviews/components/test1.vue'], resolve),
                meta: {
                    title: '测试',
                    keepAlive: false,
                    requireAuth: true
                }
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
    if (to.meta.requireAuth) {
        let loginuser = JSON.parse(localStorage.getItem("loginUser")).access;
        //let anonymous = Cookies.get('user_name');
        if (loginuser == 'admin') {// 判断是不是管理员  如果不是 哪来回哪去
            next();
        } else {
            next({
                path: "/pindex"
            })
        }
    }
    if (to.fullPath === "/login") {
        if (localStorage.getItem("loginUser")) {
            next({
                path: "/pindex"
            });
        } else {
            next();
        }
    }
    next();
})

