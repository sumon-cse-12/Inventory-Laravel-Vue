import  {defineStore} from 'pinia'
import { inventoryAxiosClient } from '../utils/system_axios';
import config from '../utils/config';
import { times } from 'lodash';

export const useBrandStore  = defineStore('brand', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        is_loading : false,
        brands: [],
        brand: null,
        swal:null,
        errors:[],
        router:null,
        paigination: {
            current_page: 1,
            last_page: 0,
            totalCount: 0,
        },
        editBrandData: {
            name:null,
            code:null,
            file:null,
            _method:'PUT',
        }

    }),
    getters:{
        getTotalCount(state){
            return state.paigination.totalCount;
        }
    },

    actions: {
        async getAllBrands(){
            this.is_loading = true;

            try{
                const {data} = await inventoryAxiosClient.get("/all-brands");
                console.log(data);
                this.rawData = data;
                this.brands = data.data.data;

                this.paigination.totalCount = data.metadata.count;

                this.is_loading = false;
            } catch(error){
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: this.errors.message
                })
            }
        },
        async getBrands(page=1,limit = this.dataLimit, search= ""){
            this.is_loading = true;

            try{
                const {data} = await inventoryAxiosClient.get("/brands",{
                    params: {
                        page: page,
                        per_page: limit,
                        search:search

                    }
                });
                console.log(data,'ppp');
                this.rawData = data;
                this.brands = data.data.data;
                this.paigination.current_page = data.data.current_page;
                this.paigination.last_page = data.data.last_page;
                this.paigination.totalCount = data.metadata.count;
                // this.paigination.totalCount = data.metadata.count;
                this.is_loading = false;

            } catch(error){
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: this.errors.message
                })
            }
        },
        async getBrand(brand_id){
            this.is_loading =false;
            try{
                const {data} = await inventoryAxiosClient.get(`/brands/${brand_id}`);
                console.log(data);
                this.brand = data.data;
                this.editBrandData.name = this.brand.brand_name;
                this.editBrandData.code = this.brand.brand_code;
            } catch(error){
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: this.errors.message
                })
            }

        },
        async storeBrand(formData){
            this.is_loading = false;
            try{
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                const {data} = await inventoryAxiosClient.post('/brands', formData, config);
                this.swal({
                    icon:'success',
                    title:'Brand Successfully Created'
                });
                this.is_loading = false;
                this.router.push({name:'brand-index'})
            }catch(error){
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title:'Something Error',
                    text: this.errors.message
                })
            }

        },
        async updateBrand(editBrandData,brand_id){
            this.is_loading = false;
            try{
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                const {data} = await inventoryAxiosClient.post(`/brands/${brand_id}`, editBrandData, config);
                this.swal({
                    icon:'success',
                    title:'Brand Successfully Updated'
                });
                this.is_loading = false;
                this.router.push({name:'brand-index'})
            }catch(error){
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title:'Something Error',
                    text: this.errors.message
                })
            }
        },
        async deleteBrand(brand_id, callback){
            this.is_loading = false;

            try{
                const {data} = await inventoryAxiosClient.delete(`/brands/${brand_id}`);
                callback('success');
                this.is_loading = false;
                this.swal({
                    title: 'Action Performed Successfully',
                    icon: 'success',
                    timer:1000,
                })
            }catch(error){
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Action Failed',
                    timer: 1000,
                    text: this.errors.message
                })
                callback('error');
                this.is_loading = false;
            }

        },
        async changeStatusBrand(){

        },
    }
})
