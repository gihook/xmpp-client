import Vue from 'vue'
import Router from 'vue-router'
import PrivateChat from '../pages/PrivateChat'
import SearchPage from '../pages/SearchPage'
import MenuPage from '../pages/MenuPage'

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
      path: '/menu',
      name: 'menu',
      component: MenuPage
    },
    {
      path: '/private-chat/:jid',
      name: 'private-chat',
      component: PrivateChat
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    }
  ]
})
