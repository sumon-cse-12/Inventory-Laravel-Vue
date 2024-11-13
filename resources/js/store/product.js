import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';


export const useProductStore = defineStore('product', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        products: [],
        product: null,
        errors: [],
        is_loading: false,
        swal: null,
        router: null,
        pagination: {
            current_page: 1,
            last_page: 0,
            totalCount: 0,
        },
        editFormData: {
            brand_id: '',
            category_id: '',
            supplier_id: '',
            name: '',
            code: '',
            original_price: 0,
            sell_price: 0,
            stock: 1,
            description: null,
            file: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state){
            return state.pagination.totalCount;
        },
    },

    actions: {
        async getAllProducts(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/all-products");
                this.rawData = data;
                this.products = data.data;
                this.pagination.totalCount = data.metadata.count;
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
        async getProducts(page=1, limit = this.dataLimit, search="", filterFormData=""){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/products", {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                        category_id: filterFormData.category_id,
                        brand_id: filterFormData.brand_id,
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.products = data.data.data;
                this.pagination.current_page = data.data.current_page;
                this.pagination.last_page = data.data.last_page;
                this.pagination.totalCount = data.data.total;
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
        async getProduct(product_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/products/${product_id}`);
                console.log(data);
                this.product = data.data;
                this.editFormData.name = data.data.name;
                this.editFormData.code = data.data.code;
                this.editFormData.original_price = data.data.original_price;
                this.editFormData.sell_price = data.data.sell_price;
                this.editFormData.stock = data.data.stock;
                this.editFormData.description = data.data.description;
                this.editFormData.brand_id = data.data.brand_id;
                this.editFormData.category_id = data.data.category_id;
                this.editFormData.supplier_id = data.data.supplier_id;

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
        async storeProduct(formData){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post('/products', formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'product-index'});
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
        async updateProduct(formData, product_id){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post(`/products/${product_id}`, formData, config);
                console.log(data,'product data');

                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.getProducts(this.pagination.current_page, this.dataLimit);
                this.is_loading = false;
                this.router.push({name: 'product-index'});
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
        async deleteProduct(product_id, callback){
            this.is_loading = false;
            try {
                const { data } = await inventoryAxiosClient.delete(`/products/${product_id}`);
                callback('success');
                this.swal({
                    icon: 'success',
                    title: 'Action Performed Successfully',
                    timer: 1000,
                })
                this.is_loading = false;
            } catch (error) {
                console.log(error);

                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
                callback('error');
                this.is_loading = false;
            }
        },
        async changeStatus(product_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/products/status/${product_id}`);
                this.is_loading = false;
                this.swal({
                    icon: 'success',
                    title: 'Status Updated!',
                    timer: 1000,
                })
            } catch (error) {
                this.errors = error.response.data;
                this.is_loading = false;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
            }
        },
    }


});
