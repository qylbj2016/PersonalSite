import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'
import Comment from '@/views/Comment.vue'
import About from '@/views/About.vue'
import Detail from '@/components/detail.vue'
import Titles from '@/components/titles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      path: '/article',
      component: Article,
      children: [
        {
          path: '/article/:type',
          name: 'article',
          component: Titles
        },
        {
          path: '/article/:type/:id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'comment',
      path: '/comment',
      component: Comment
    }
  ]
})
