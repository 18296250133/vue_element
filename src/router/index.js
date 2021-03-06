import Vue from 'vue'
import VueRouter from 'vue-router'
//import users from'../components/content/user/users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
    
  },
  {
    path:'/login',
    component:()=>import ('../components/content/login.vue')
  },

  {
    path:'/home',
    redirect:'users',
    component:()=>import ('../components/content/home.vue'),
    children:[
       
       {path:'/users',name:'users',component:()=>import ("../components/content/user/users.vue")},
       {path:'/roles',name:'roles',component:()=>import ("../components/content/roles/roles.vue")},
       {path:'/goods',name:'goods',component:()=>import ("../components/content/goods/goods.vue")},
       {path:'/rights',name:'rights',component:()=>import ("../components/content/roles/rights.vue")},
       {path:'/categories',name:'categories',component:()=>import('../components/content/goods/categories.vue')}
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next();
  let temp=window.sessionStorage.getItem('token');
  if(!temp)return  next('/login')
  next()
})

export default router
