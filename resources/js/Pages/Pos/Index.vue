
<script setup>
import { ref, reactive, onMounted, inject, watch } from "vue";
import { useBrandStore } from "../../store/brand";
import { useProductStore } from "../../store/product";
import { useCategoryStore } from "../../store/category";
import { useRoute } from "vue-router";

const brandStore = useBrandStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const router = useRoute();
const swal = inject("$swal");

onMounted(() => {
  categoryStore.getAllCategories();
  brandStore.getAllBrands();
  productStore.getProducts(1, productStore.dataLimit);
});
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
        <div class="col-4">
            cart
        </div>
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    <h4>Product List</h4>
                    <div class="row">
                        <div class="col-4">
                            <select name="" class="form-control" id="">Select Product</select>
                        </div>
                        <div class="col-4">
                            <select name="" class="form-control" id="">Select Brand</select>
                        </div>
                        <div class="col-4">
                            <select name="" class="form-control" id="">Select Category</select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
