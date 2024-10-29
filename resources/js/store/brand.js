import  {defineStore} from 'pinia'
import { inventoryAxiosClient } from '../utils/system_axios';
import config from '../utils/config';

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
        async getBrand(){

        },
        async storeBrand(){

        },
        async updateBrand(){

        },
        async deleteBrand(){

        },
        async changeStatusBrand(){

        },
    }
})
