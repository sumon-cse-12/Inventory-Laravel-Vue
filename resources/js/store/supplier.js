import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';


export const useSupplierStore  = defineStore('supplier',{
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        suppliers: [],
        supplier: null,
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
            nid: null,
            address: null,
            company_name: null,
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
        async getAllSuppliers(){
            this.is_loading = true;
            try {
                const {data}= await inventoryAxiosClient.get("/all-suppliers");
                this.rawData = data;
                this.suppliers = data.data;
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
        async getSuppliers(page=1, limit = this.dataLimit, search=""){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/suppliers", {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.suppliers = data.data.data;
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
        async getSupplier(supplier_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/Suppliers/${supplier_id}`);
                console.log(data);
                this.supplier = data.data;
                this.editFormData.name = data.data.supplier_name;
                this.editFormData.code = data.data.supplier_code;
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
        async storeSupplier(formData){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post('/suppliers', formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'supplier-index'});
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
        async updateSupplier(formData, supplier_id){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post(`/Suppliers/${supplier_id}`, formData, config);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'supplier-index'});
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
        async deleteSupplier(supplier_id, callback){
            this.is_loading = false;
            try {
                const { data } = await inventoryAxiosClient.delete(`/suppliers/${supplier_id}`);
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
  async changeStatus(supplier_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/Suppliers/status/${supplier_id}`);
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

