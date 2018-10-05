import Vue from 'vue'
import Router from 'vue-router'
import PrivateChat from '../pages/PrivateChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/private-chat',
      name: 'private-chat',
      component: PrivateChat
    }
  ]
})
