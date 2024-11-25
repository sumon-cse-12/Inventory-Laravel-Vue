import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';

export const useCartStore = defineStore('cart', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        carts: [],
        subtotal: 0,
        cartCount: 0,
        errors: [],
        is_loading: false,
        swal: null,
        router: null,
    }),

    getters: {
        getTotalCount(state){
            return state.cartCount;
        },
        getSubTotal(state){
            return state.subtotal;
        },
    },

    actions: {
        async getCartItems(){
            this.is_loading = true;
            try {
                const { data, status } = await inventoryAxiosClient.get("/carts");
                console.log(data, status);
                this.rawData = data;
                this.carts = data.data;
                this.subtotal = data.metadata.subtotal;
                this.cartCount = data.metadata.total_items;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },

        async storeCart(formData){
            this.is_loading = false;
            try {
                const {data} = await inventoryAxiosClient.post('/add-to-cart', formData);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'pos-index'});
            } catch (error) {
                this.is_loading = false;
                console.log(error);
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title: 'Something went wrong!',
                    text: this.errors
                })
            }
        },
        async removeCart(cart_id){
            this.is_loading = false;
            try {
                const {data} = await inventoryAxiosClient.get(`/remove-from-cart/${cart_id}`);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.getCartItems();
                this.is_loading = false;

            } catch (error) {
                this.is_loading = false;
                console.log(error);
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title: 'Something went wrong!',
                    text: this.errors
                })
            }
        },

        async increaseItemQty(cart_id){
            this.is_loading = false;
            try {
                const { data } = await inventoryAxiosClient.get(`/increase-item-qty/${cart_id}`);
                this.swal({
                    icon: 'success',
                    title: 'Action Performed Successfully',
                    timer: 1000,
                })
                this.getCartItems();
                this.is_loading = false;
            } catch (error) {
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
                this.is_loading = false;
            }
        },
        async decreaseItemQty(cart_id){
            this.is_loading = false;
            try {
                const { data } = await inventoryAxiosClient.get(`/decrease-item-qty/${cart_id}`);
                this.swal({
                    icon: 'success',
                    title: 'Action Performed Successfully',
                    timer: 1000,
                })
                this.getCartItems();
                this.is_loading = false;
            } catch (error) {
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
                this.is_loading = false;
            }
        },

    }


}); 
