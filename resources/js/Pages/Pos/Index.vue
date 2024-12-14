
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
const orderStore = useOrderStore();
const router = useRouter();
const swal = inject("$swal");

cartStore.swal = swal;
cartStore.router = router;

orderStore.swal =swal;
orderStore.router =router;

const cartFormData = reactive({
  product_id: "",
  product_name: "",
  qty: 1,
  price: 0,
  subtotal: 0,
});

const orderFormData = reactive({
    customer_name: null,
    customer_mobile: null,
    payment_method: 'cash',
    transaction_number: null,
    due_amount: 0,
    pay_amount: 0,
    subtotal: 0,
    discount: 0,
    total: 0
});
const schema = reactive({
    customer_name: 'required',
    customer_mobile: 'required|min:11|max:14',
    payment_method: 'required',
    due_amount: 'required',
    pay_amount: 'required',
    subtotal: 'required',
    discount: 'required',
    total: 'required'
})
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
let orderModal = ref(null);
let orderModalObj = null;
const DeleteFromCart = (cart_id) => {
  console.log(cart_id);
  cartStore.removeCart(cart_id);
};

const openConfirmOrderModal = () => {
    orderModalObj.show();
    orderFormData.subtotal = parseFloat(cartStore.subtotal);
    orderFormData.due_amount = parseFloat(cartStore.subtotal);
    orderFormData.pay_amount = parseFloat(cartStore.subtotal);
    orderFormData.total = parseFloat(cartStore.subtotal);
}

const confirmOrder = () => {
    console.log(orderFormData);
    orderStore.storeOrder(orderFormData);
    orderModalObj.hide();
    resetOrderFormData();
    productStore.getProducts(1, productStore.dataLimit+2);
    cartStore.getCartItems();
}
onMounted(() => {
  //   cartModalObj = new Modal(cartModal.value)
  cartModalObj = new bootstrap.Modal(cartModal.value);
  orderModalObj = new bootstrap.Modal(orderModal.value);

  categoryStore.getAllCategories();
  customerStore.getAllCustomers();
  brandStore.getAllBrands();
  productStore.getProducts(1, productStore.dataLimit + 2);
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
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">Subtotal</div>
                  <div class="col-md-6 text-end">
                    {{ cartStore.subtotal }} BDT
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">Discount</div>
                  <div class="col-md-6 text-end">0 BDT</div>
                </div>
                <div class="row">
                  <div class="col-md-6">Tax</div>
                  <div class="col-md-6 text-end">0 BDT</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-6">Grand Total</div>
                  <div class="col-md-6 text-end text-danger fw-bold">
                    {{ cartStore.subtotal }} /- BDT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-center align-items-center">
            <button
              class="btn btn-primary"
              @click.prevent="openConfirmOrderModal"
            >
              Confirm Order
            </button>
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
          <h5
            v-if="productStore.product"
            class="modal-title"
            id="addToCartModalLabel"
          >
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
                      <label for="sell_price" class="form-label"
                        >Sell Price: (BDT)</label
                      >
                      <input
                        type="number"
                        disabled
                        class="form-control"
                        :value="productStore.product?.sell_price"
                        name="sell_price"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="original_price" class="form-label"
                        >Original Price: (BDT)</label
                      >
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
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

  <!-- Order Confirm Modal -->
<div class="modal fade" id="confirmOrderModal" tabindex="-1" aria-labelledby="confirmOrderModalLabel" aria-hidden="true"
ref="orderModal">
  <div class="modal-dialog modal-lg model-dialog-centered">
    <div class="modal-content">

    <vee-form :validation-schema="schema" @submit="confirmOrder" class="mt-2">

      <div class="modal-header">
        <h1 class="modal-title fs-5" id="confirmOrderModalLabel">Order Confirmation</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-12 mb-3">
                <label for="customer-mobile" class="form-label"> Customer Name</label>
                <vee-field type="tel" name="customer_name" v-model="orderFormData.customer_name" class="form-control"
                placeholder="Please enter customer name"
                />
                <ErrorMessage class="text-danger" name="customer_name" />
            </div>
            <div class="col-md-12 mb-3">
                <label for="customer-mobile" class="form-label"> Customer Mobile</label>
                <vee-field type="tel" name="customer_mobile" v-model="orderFormData.customer_mobile" class="form-control"
                placeholder="Please enter customer mobile number"
                />
                <ErrorMessage class="text-danger" name="customer_mobile" />
            </div>
            <div class="col-md-12 mb-3">
                <label for="payment_method" class="form-label">Payment Method</label>
                <vee-field as="select" name="payment_method" v-model="orderFormData.payment_method" class="form-control">
                    <option value="">Select Payment Method</option>
                    <option :value="method" v-for="(method,index) in orderStore.payment_method" :key="index">{{ method }}</option>
                </vee-field>
                <ErrorMessage class="text-danger" name="payment_method" />
            </div>

            <div class="col-md-12 mb-3" v-if="orderFormData.payment_method !='cash'">
                <label for="transaction_number" class="form-label">Transaction Number</label>
                <vee-field type="text" name="transaction_number" v-model="orderFormData.transaction_number" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="transaction_number" />
            </div>

            <div class="col-md-6 mb-3">
                <label for="pay_amount" class="form-label">Pay Amount (BDT)</label>
                <vee-field type="number" name="pay_amount" v-model="orderFormData.pay_amount" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="pay_amount" />
            </div>
            <div class="col-md-6 mb-3">
                <label for="due_amount" class="form-label">Due Amount (BDT)</label>
                <vee-field type="number" name="due_amount" v-model="orderFormData.due_amount" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="due_amount" />
            </div>

            <div class="col-md-6 mb-3">
                <label for="subtotal" class="form-label">Subtoal (BDT)</label>
                <vee-field type="number" name="subtotal" v-model="orderFormData.subtotal" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="subtotal" />
            </div>
            <div class="col-md-6 mb-3">
                <label for="discount" class="form-label">Discount (BDT)</label>
                <vee-field type="number" name="discount" v-model="orderFormData.discount" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="discount" />
            </div>

            <hr>
            <div class="col-md-12">
                <label for="total" class="form-label">Grand Total (BDT)</label>
                <vee-field type="number" name="total" v-model="orderFormData.total" class="form-control" min="0"/>
                <ErrorMessage class="text-danger" name="total" />
            </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Confirm Order</button>
      </div>

    </vee-form>

    </div>
  </div>
</div>
</template>
