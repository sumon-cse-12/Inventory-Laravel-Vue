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
        { path: 'admin/pos', name: 'pos', component: () => import('../Pages/Pos/Index.vue') },


        { path: '/admin/category', name:'category-index', component: () => import('../Pages/Category/Index.vue') },
        { path: '/admin/category/create', name:'category-create', component: () => import('../Pages/Category/Create.vue') },
        { path: '/admin/category/edit/:id', name:'category-edit', component: () => import('../Pages/Category/Edit.vue') },

        {path: '/admin/brand/index', name:'brand-index', component: () => import('../Pages/Brand/Index.vue')},
        {path: 'admin/brand/create', name:'brand-create', component: () => import('../Pages/Brand/Create.vue')},
        {path: 'admin/brand/edit/:id', name:'brand-edit', component: () => import('../Pages/Brand/Edit.vue')},

        {path: '/admin/supplier/index', name:'supplier-index', component: () => import('../Pages/Supplier/Index.vue')},
        {path: 'admin/supplier/create', name:'supplier-create', component: () => import('../Pages/Supplier/Create.vue')},
        {path: 'admin/supplier/edit/:id', name:'supplier-edit', component: () => import('../Pages/Supplier/Edit.vue')},

        {path: 'admin/customer/index', name:'customer-index', component: () => import('../Pages/Customer/Index.vue')},
        {path: 'admin/customer/create', name:'customer-create', component: () => import('../Pages/Customer/Create.vue')},
        {path: 'admin/customer/edit/:id', name:'customer-edit', component: () => import('../Pages/Customer/Edit.vue')},

        {path: 'admin/staff/index', name:'staff-index', component: () => import('../Pages/Staff/Index.vue')},
        {path: 'admin/staff/create', name:'staff-create', component: () => import('../Pages/Staff/Create.vue')},
        {path: 'admin/staff/edit/:id', name:'staff-edit', component: () => import('../Pages/Staff/Edit.vue')},

        {path: 'admin/product/index', name:'product-index', component: () => import('../Pages/Product/Index.vue')},
        {path: 'admin/product/create', name:'product-create', component: () => import('../Pages/Product/Create.vue')},
        {path: 'admin/product/edit/:id', name:'product-edit', component: () => import('../Pages/Product/Edit.vue')},

        {path: 'admin/expense/index', name:'expense-index', component: () => import('../Pages/Expense/Index.vue')},
        {path: 'admin/expense/create', name:'expense-create', component: () => import('../Pages/Expense/Create.vue')},
        {path: 'admin/expense/edit/:id', name:'expense-edit', component: () => import('../Pages/Expense/Edit.vue')},

        {path: 'admin/salary/index', name:'salary-index', component: () => import('../Pages/Salary/Index.vue')},
        {path: 'admin/salary/create', name:'salary-create', component: () => import('../Pages/Salary/Create.vue')},
        {path: 'admin/salary/edit/:id', name:'salary-edit', component: () => import('../Pages/Salary/Edit.vue')},
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
