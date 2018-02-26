import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/components/view/index')
const ArticleContent = () => import('@/components/view/content')
const Article = () => import('@/components/view/article')
const Headlines = () => import('@/components/view/headlines')
const LeaveWord = () => import('@/components/view/leave-word')
const About = () => import('@/components/view/about')

import { mapState } from "vuex";

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/page/:id',
      name: 'page',
      component: Index
    },
    {
      path: '/details/:id',
      name: 'v-content',
      component: ArticleContent
    },
    {
      path: '/headlines',
      name: 'v-headlines',
      component: Headlines
    },
    {
      path: '/footprint',
      name: 'v-leaveWord',
      component: LeaveWord
    },
    {
      path: '/article/:article',
      name: 'v-article',
      component: Article
    },
    {
      path: '/article/:article/:id',
      name: 'v-article-page',
      component: Article
    },
    {
      path: '/about',
      name: 'v-about',
      component: About
    },
  ]
})
