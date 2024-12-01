
<script setup>
import { ref, reactive, onMounted, inject, watch } from "vue";
import { useBrandStore } from "../../store/brand";
import { useProductStore } from "../../store/product";
import { useCategoryStore } from "../../store/category";
import { useCartStore } from "../../store/cart";
import { useCustomerStore } from "../../store/customer";
import { useOrderStore } from "../../store/order";
// import { Modal} from "boostrap";
import _ from "lodash";
import { useRoute, useRouter } from "vue-router";

const brandStore = useBrandStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const customerStore = useCustomerStore();

const router = useRouter();
const swal = inject("$swal");

cartStore.swal = swal;
cartStore.router = router;

const cartFormData = reactive({
  product_id: "",
  product_name: "",
  qty: 1,
  price: 0,
  subtotal: 0,
});
const searchKeyword = ref("");

const filterFormData = reactive({
  category_id: "",
  brand_id: "",
});

const openCartModal = (product) => {
  productStore.product = product;
  console.log(product);

  cartModalObj.show();

  cartFormData.product_id = product.id;
  cartFormData.product_name = product.name;
  cartFormData.price = product.sell_price;
  cartFormData.subtotal = product.sell_price * cartFormData.qty;
};

const resetOrderFormData = () => {
  orderFormData.customer_mobile = null;
  orderFormData.customer_name = null;
  orderFormData.transaction_number = null;
  orderFormData.discount = 0;
  orderFormData.pay_amount = 0;
  orderFormData.due_amount = 0;
  orderFormData.subtotal = 0;
  orderFormData.total = 0;
  orderFormData.total = 0;
  orderFormData.payment_method = "cash";
};

const increaseQty = () => {
  cartFormData.subtotal = cartFormData.price * cartFormData.qty;
};

const AddToCart = (cartData) => {
  console.log(cartData);
  cartStore.storeCart(cartData);
  cartModalObj.hide();

  resetCartFormData();
  cartStore.getCartItems();
};

let cartModal = ref(null);
let cartModalObj = null;

onMounted(() => {
  //   cartModalObj = new Modal(cartModal.value)
  cartModalObj = new bootstrap.Modal(cartModal.value);
  categoryStore.getAllCategories();
  brandStore.getAllBrands();
  productStore.getProducts(1, productStore.dataLimit);
  customerStore.getAllCustomers();
  cartStore.getCartItems();
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
      <div class="col-4">
        <div class="row">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"><i class="fas fa-edit"></i></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(cart, index) in cartStore.carts" :key="cart.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ cart.product?.name }}</td>
                    <td>{{ cart.product?.code }}</td>
                    <td>{{ cart.product?.sell_price }}</td>
                    <td style="width: 120px">
                      <span class="btn btn-sm btn-danger fw-bold">
                        <i
                          class="fas fa-minus"
                          @click.prevent="cartStore.decreaseItemQty(cart.id)"
                        ></i>
                      </span>
                      {{ cart.qty }}
                      <span class="btn btn-sm btn-success fw-bold">
                        <i
                          class="fas fa-plus"
                          @click.prevent="cartStore.increaseItemQty(cart.id)"
                        ></i>
                      </span>
                    </td>
                    <td>{{ cart.subtotal }}</td>
                    <td>
                      <a
                        href=""
                        class="btn btn-sm"
                        @click.prevent="DeleteFromCart(cart.id)"
                        ><i class="fas fa-trash text-danger"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
            <a
              href=""
              class="btn btn-sm"
              @click.prevent="openCartModal(product)"
            >
              <div class="card">
                <div class="card-content">
                  <img
                    :src="product.file"
                    alt=""
                    class="card-img-top img-fluid"
                    style="width: 50%; height: 50%"
                  />
                  <div class="card-body text-center">
                    <h4 class="card-title">{{ product.name }}</h4>
                    <span
                      class="badge"
                      :class="product.stock > 0 ? 'bg-success' : 'bg-danger'"
                    >
                      <span v-if="product.stock > 0">Available</span>
                      <span v-else>Out of Stock</span>
                      : {{ product.stock }}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
  class="modal fade"
  id="addToCartModal"
  tabindex="-1"
  aria-labelledby="addToCartModalLabel"
  aria-hidden="true"
  ref="cartModal"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 v-if="productStore.product" class="modal-title" id="addToCartModalLabel">
          {{ productStore.product.name }}
        </h5>
        <h5 v-else class="modal-title text-danger">
          Product details not available.
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="col-md-4">
                <img
                  :src="productStore.product?.file"
                  alt=""
                  class="card-img-top img-fluid"
                />
              </div>
              <div class="col-md-8">
                <div class="row py-1">
                  <div class="col-md-6">
                    <label for="sell_price" class="form-label">Sell Price: (BDT)</label>
                    <input
                      type="number"
                      disabled
                      class="form-control"
                      :value="productStore.product?.sell_price"
                      name="sell_price"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="original_price" class="form-label">Original Price: (BDT)</label>
                    <input
                      type="number"
                      disabled
                      class="form-control"
                      :value="productStore.product?.original_price"
                      name="original_price"
                    />
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-md-6">
                    <label for="qty" class="form-label">Purchase Qty:</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="cartFormData.qty"
                      :max="productStore.product?.stock"
                      min="0"
                      name="qty"
                      @change="increaseQty()"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="stock" class="form-label">Stock: </label>
                    <input
                      type="number"
                      disabled
                      class="form-control"
                      :value="productStore.product?.stock"
                      name="stock"
                    />
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-md-6">
                    <p class="form-label text-primary">BarCode</p>
                    <img
                      :src="productStore.product?.barcode"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  <div class="col-md-6">
                    <p class="form-label text-primary">Subtotal</p>
                    <input
                      type="number"
                      disabled
                      class="form-control"
                      :value="cartFormData.subtotal"
                      name="subtotal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="AddToCart(cartFormData)"
          :disabled="productStore.product?.stock == 0"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</div>

</template>
