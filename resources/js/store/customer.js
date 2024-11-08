import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';


export const useCustomerStore  = defineStore('customer',{
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        customers: [],
        customer: null,
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
            name: null,
            phone: null,
            email: null,
            password: null,
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
        async getAllCustomers(){
            this.is_loading = true;
            try {
                const {data}= await inventoryAxiosClient.get("/all-customers");
                this.rawData = data;
                this.customers = data.data;
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
        async getCustomers(page=1, limit = this.dataLimit, search=""){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/customers", {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                console.log(data,'oooo');
                this.rawData = data;
                this.customers = data.data;
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
        async getCustomer(customer_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/customers/${customer_id}`);
                this.customer = data.data;
                this.editFormData.name = data.data.name;
                this.editFormData.email = data.data.email;
                this.editFormData.phone = data.data.phone;
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
        async storeCustomer(formData){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post('/customers', formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'customer-index'});
            } catch (error) {
                this.is_loading = false;

                this.errors = error.response.data;
                console.log(error.response.data.message,'ppp');
                this.swal({
                    icon:'error',
                    title: 'Something went wrong!',
                    text: error.response.data.message
                })
            }
        },
        async updateCustomer(formData, customer_id){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post(`/customers/${customer_id}`, formData, config);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'customer-index'});
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
        async deleteCustomer(customer_id, callback){
            this.is_loading = false;
            try {
                const { data } = await inventoryAxiosClient.delete(`/customers/${customer_id}`);
                callback('success');
                this.swal({
                    icon: 'success',
                    title: 'Action Performed Successfully',
                    timer: 1000,
                })
                this.is_loading = false;
            } catch (error) {
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
  async changeStatus(customer_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/customers/status/${customer_id}`);
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

