import './bootstrap';
// import 'admin-lte/plugins/jquery/jquery.min.js';


import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import router from './router'
import { createApp } from 'vue'
import VeeValidationPlugin from './utils/validation'

import VueSweetalert2  from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
const app = createApp({})
const pinia = createPinia();

app.use(VueSweetalert2,{
    confirmButtonColor: '#A95EEE',
    cancelButtonColor: '#900900'
})
app.use(router)
app.use(VeeValidationPlugin)
app.use(pinia);

app.mount('#app')
