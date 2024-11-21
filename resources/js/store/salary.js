import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
import config from '../utils/config';

export const useSalaryStore = defineStore('salary', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        salaries: [],
        salary: null,
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
            staff_id: '',
            amount: 0,
            date: '',
            month: '',
            year: '',
            type: '',
        },
        salary_types: ['regular', 'advance', 'late']
    }),

    getters: {
        getTotalCount(state){
            return state.pagination.totalCount;
        },
    },

    actions: {
        async getSalarys(page = 1, limit = this.dataLimit, search = "", filterData = ''){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/salaries", {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                        staff_id: filterData.staff_id,
                        month: filterData.month,
                        year: filterData.year,
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.salaries = data.data.data;
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
        async getSalary(salary_id){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/salaries/${salary_id}`);
                console.log(data);
                this.salary = data.data;
                this.editFormData.month = data.data.month;
                this.editFormData.date = data.data.date;
                this.editFormData.year = data.data.year;
                this.editFormData.staff_id = data.data.staff_id;
                this.editFormData.amount = data.data.amount;
                this.editFormData.type = data.data.type;
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
        async storeSalary(formData){
            this.is_loading = false;
            try {
                const {data} = await inventoryAxiosClient.post('/salaries', formData);
                console.log(data);
                this.swal({
                    icon: data.status,
                    title: data.message
                });
                this.is_loading = false;
                this.router.push({name: 'salary-index'});
            } catch (error) {
                this.is_loading = false;
                console.log(error);
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title: error.message,
                    text: this.errors
                })
            }
        },
        async updateSalary(formData, salary_id){
            this.is_loading = false;
            try {
                const {data} = await inventoryAxiosClient.put(`/salaries/${salary_id}`, formData);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.getSalarys(this.pagination.current_page, this.dataLimit);
                this.is_loading = false;
                this.router.push({name: 'salary-index'});
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
