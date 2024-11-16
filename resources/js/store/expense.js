import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';


export const useExpenseStore = defineStore('expense', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        expenses: [],
        expenses_category: [],
        expense: null,
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
            expense_category_id: '',
            staff_id: '',
            amount: 0,
            notes: '',
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
        async getAllExpenseCategory(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/all-expenses-category");
                console.log(data);
                this.expenses_category = data.data;
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
        async getAllExpenses(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/all-expenses");
                console.log(data);
                this.rawData = data;
                this.expenses = data.data;
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
        async getExpenses(page=1, limit = this.dataLimit, search=""){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/expenses", {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.expenses = data.data.data;
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
        async getExpense(expense_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/expenses/${expense_id}`);
                console.log(data);
                this.expense = data.data;
                this.editFormData.expense_category_id = data.data.expense_category_id;
                this.editFormData.staff_id = data.data.staff_id;
                this.editFormData.amount = data.data.amount;
                this.editFormData.notes = data.data.notes;
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
        async storeExpense(formData){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post('/expenses', formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'expense-index'});
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
        async updateExpense(formData, expense_id){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await inventoryAxiosClient.post(`/expenses/${expense_id}`, formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.getExpenses(this.pagination.current_page, this.dataLimit);
                this.is_loading = false;
                this.router.push({name: 'expense-index'});
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
    }


}); 
