
<script setup>
import { ref, reactive, onMounted, inject, watch } from "vue";
import { useBrandStore } from "../../store/brand";
import { useProductStore } from "../../store/product";
import { useCategoryStore } from "../../store/category";
import { Modal} from "boostrap";
import _ from "lodash";
import { useRoute } from "vue-router";

const brandStore = useBrandStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const router = useRoute();
const swal = inject("$swal");

const searchKeyword = ref("");

const filterFormData = reactive({
  category_id: "",
  brand_id: "",
});

let cartModal = ref(null);
let cartModalObj = null;

onMounted(() => {
  cartModalObj = new modal
  categoryStore.getAllCategories();
  brandStore.getAllBrands();
  productStore.getProducts(1, productStore.dataLimit);
});

watch(
  searchKeyword,
  _.debounce((current, previous) => {
    productStore.getProducts(
      productStore.pagination.current_page,
      productStore.dataLimit,
      current,
      filterFormData
    );
  }, 500)
);
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-4">cart</div>
      <div class="col-8">
        <div class="card">
          <div class="card-header">
            <h4>Product List</h4>
            <div class="row">
              <div class="col-4">
                <select
                  name="category"
                  class="form-control"
                  id="selectCategory"
                  @change="
                    productStore.getProducts(
                      productStore.pagination.current_page,
                      productStore.dataLimit,
                      searchKeyword,
                      filterFormData
                    )
                  "
                >
                  <option value="" disabled selected>Select Category</option>
                  <option
                    :value="category.category_id"
                    v-for="(category, index) in categoryStore.categories"
                    :key="category.category_id"
                  >
                    {{ index + 1 }}. {{ category.category_name }}
                  </option>
                </select>
              </div>
              <div class="col-4">
                <select
                  name="brand"
                  class="form-control"
                  id="selectBrand"
                  @change="
                    productStore.getProducts(
                      productStore.pagination.current_page,
                      productStore.dataLimit,
                      searchKeyword,
                      filterFormData
                    )
                  "
                >
                  <option value="" disabled selected>Select Brand</option>
                  <option
                    :value="brand.brand_id"
                    v-for="(brand, index) in brandStore.brands"
                    :key="brand.brand_id"
                  >
                    {{ index + 1 }}. {{ brand.brand_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search Product ..."
                  v-model="searchKeyword"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
  <div
    class="col-md-4"
    v-for="(product, index) in productStore.products"
    :key="product.id"
  >
    <div class="card">
      <div class="card-content">
        <img
          :src="product.file"
          alt="Product Image"
          class="card-img-top img-fluid product-image"
        />
        <div class="card-body text-center">
          <h4 class="card-title">{{ product.name }}</h4>
          <span
            class="badge"
            :class="{
              'bg-success': product.stock > 0,
              'bg-danger': product.stock <= 0,
            }"
          >
            {{ product.stock > 0 ? 'Available' : 'Out of Stock' }}: {{ product.stock }}
          </span>
        </div>
      </div>
      <button
        class="btn btn-sm btn-primary"
        @click.prevent="openCartModal(product)"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
  <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addToCartModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="addToCartModal" tabindex="-1" aria-labelledby="addToCartModalLabel" aria-hidden="true" ref="cartModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addToCartModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
