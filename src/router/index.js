import Vue from 'vue'
import Router from 'vue-router'
import RandomString from '@/components/RandomString'
import RandomName from '@/components/RandomName'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/string',
      name: 'RandomString',
      component: RandomString
    },
    {
      path: '/name',
      name: 'RandomName',
      component: RandomName
    }
  ],
  mode: 'history'
})
