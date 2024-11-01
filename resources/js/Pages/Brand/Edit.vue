<script setup>
import { ref, reactive,inject, onMounted } from 'vue';
import {useBrandStore} from '../../store/brand';
import { useRoute, useRouter } from 'vue-router';
import { ErrorMessage } from 'vee-validate';
const brandStore = useBrandStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal');
brandStore.swal = swal;
brandStore.router = router;

const formData = reactive({

})

const schema = reactive({
    name: 'required'
})
const onChange = (e) => {
    brandStore.editBrandData.file = e.target.files[0];
}
const updateBrand = () => {
    brandStore.updateBrand(brandStore.editBrandData,route.params.id);
}

onMounted( () => {
    brandStore.getBrand(route.params.id)
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
                            Brand Edit
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
                    <vee-form :validation-schema="schema" @submit="updateBrand" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-6">
                                <label for="">Name</label>
                                <vee-field type="text" name="name" v-model="brandStore.editBrandData.name" class="form-control" placeholder="Enter Brand Name"/>
                                <ErrorMessage class="text-danger" name="name"/>
                            </div>
                            <div class="col-6">
                                <label for="">Code</label>
                                <vee-field type="text" name="code" v-model="brandStore.editBrandData.code" class="form-control" placeholder="Enter Brand Code"/>
                                <ErrorMessage class="text-danger" name="code"/>
                            </div>
                            <div class="col-12 mt-2">
                                <label for="">Brand Image</label>
                                <vee-field type="file" @change="onChange" name="file" class="form-control"/>
                                <ErrorMessage class="text-danger" name="file" accept="image/*"/>
                            </div>
                            <div class="col-12 mt-5">
                                <button  type="submit" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </vee-form>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>
