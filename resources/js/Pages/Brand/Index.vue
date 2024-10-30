
<script setup>
import { ref, reactive, inject, onMounted } from 'vue';

import {useBrandStore} from '../../store/brand';
import { useRouter } from 'vue-router';

const brandStore = useBrandStore();
const router = useRouter();
const swal = inject('$swal');
brandStore.swal = swal;
brandStore.router = router;
const searchKeyword = ref('');
const delete_brand = (id,name) =>{
    swal({
        title: `Do you want to delete this data ${name} ?`,
        showCancelButton: false,
        confirmButtonText : 'Yes, Delete it'
    }).then( (result) => {
        if(result.isConfirmed) {
            brandStore.deleteBrand(id, (status) => {
                if(status == 'success'){
                    brandStore.getBrands(1,5, '')
                }
            })
        }
    })
}
onMounted( () => {
    brandStore.getBrands(1,5,"");
})
</script>
<template>
   <div class="container-fluid p-4">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="brand-card-title d-flex justify-content-between">
                        <div class="brand-title">
                            Brands
                        </div>
                        <div class="create-brand">
                            <router-link  class="btn btn-success btn-sm" :to="{name: 'brand-create'}">Create New</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="total-brand-sec d-flex justify-content-between">
                        <div class="total-brands">
                            Total : {{ brandStore.getTotalCount }}
                        </div>
                        <div class="search-brand">
                            <input class="form-control" type="search" name="" placeholder="Search Any Brand">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Image</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                             <tbody>
                                <tr v-for="(brand,index) in brandStore.brands" :key = "brand.id">
                                    <!-- <tr v-for="(brand,index) in brandStore.brands" :key="brand.id"> -->
                                    <td scop="row">{{ index }}</td>
                                    <td>{{ brand.name }}</td>
                                    <td>{{ brand.code }}</td>
                                    <td>Image</td>
                                    <td>Active</td>
                                    <td>
                                      <router-link :to="{name: 'brand-edit',params:{id: brand.id}}" class="btn btn-info btn-sm">
                                        Edit
                                      </router-link>
                                      <a @click.prevent="delete_brand(brand.id,brand.name)" class="btn btn-info btn-sm">
                                        Delete
                                      </a>
                                    </td>
                                </tr>
                             </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>
