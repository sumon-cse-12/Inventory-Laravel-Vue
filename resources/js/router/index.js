import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue';
// import AuthLayout from '../layouts/AuthLayout.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
    //   redirect: 'admin/dashboard',
    //   component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        { path: 'admin/dashboard', name: 'dashboard', component: () => import('../components/Dashboard.vue') },


        { path: '/admin/category', name:'category-index', component: () => import('../Pages/Category/Index.vue') },
        { path: '/admin/category/create', name:'category-create', component: () => import('../Pages/Category/Create.vue') },
        { path: '/admin/category/edit', name:'category-edit', component: () => import('../Pages/Category/Create.vue') },
        // { path: '/category/edit/:id', name:'category-edit', component: () => import('@/Pages/Category/Edit.vue') },

      ]
    },
    // {
    //   path: '/auth',
    //   redirect: '/login',
    //   component: AuthLayout,
    //   meta: { isGuest: true},
    //   children: [
    //     { path: '/login', name: 'login', component: () => import('@/views/Auth/Login.vue') }
    //   ]
    // }
  ]
})

// middleware
// router.beforeEach((to,form,next) => {
//   if(to.meta.requiresAuth && !localStorage.getItem('token')){
//     next({name: 'login'});
//   }else if(to.meta.isGuest && localStorage.getItem('token')){
//     next({name: 'dashboard'})
//   }else{
//     next();
//   }
// })


export default router
