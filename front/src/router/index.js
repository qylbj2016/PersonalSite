import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      name: 'home',
      path: '/home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      path: '/article',
      component: resolve => require(['@/views/Article.vue'], resolve),
      children: [
        {
          path: '/article/:type',
          name: 'article',
          component: resolve => require(['@/components/titles.vue'], resolve)
        },
        {
          path: '/article/:type/:id',
          name: 'detail',
          component: resolve => require(['@/components/detail.vue'], resolve)
        }
      ]
    },
    {
      name: 'about',
      path: '/about',
      component: resolve => require(['@/views/About.vue'], resolve)
    },
    {
      name: 'comment',
      path: '/comment',
      component: resolve => require(['@/views/Comment.vue'], resolve)
    }
  ]
})
