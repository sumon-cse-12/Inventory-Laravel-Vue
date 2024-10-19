import {ref,  computed} from 'vue'

import { defineStore } from 'pinia';
import {baseClient,inventoryAxiosClient} from '../utils/system_axios'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('username')||'',
    token: localStorage.getItem('token') || 0,
    error:[],
    message:[]

  }),
  getters: {
    getToken:(state) => state.token,
    getUserName:(state) => state.username,
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setUserName(name) {
        this.username = name
        localStorage.setItem('username', name)
      },
    removeToken: () => localStorage.removeItem('token'),
    removeUserName: () => localStorage.removeItem('username'),

 async login(formData,callback){
        try {
            const response = await baseClient.get('/scantum/csrf-cookie');
            const {data, status } = await inventoryAxiosClient.post('/loginurl', formData);

            console.log(data);

        } catch (error) {

        }
    }
  },
});
