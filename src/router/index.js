import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import China from '@/components/China'
import Foreign from '@/components/Foreign'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/china',
      name: 'China',
      component: China
    },{
      path: '/foreign',
      name: 'Foreign',
      component: Foreign
    },{
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
