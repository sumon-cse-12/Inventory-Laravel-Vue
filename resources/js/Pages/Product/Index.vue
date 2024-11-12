
<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useProductStore } from "../../store/product";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const router = useRouter();
const swal = inject("$swal");
productStore.swal = swal;
productStore.router = router;
const searchKeyword = ref("");
const DeleteProduct = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      productStore.deleteProduct(id, (status) => {
        if (status == "success") {
          productStore.getproducts(
            productStore.pagination.current_page,
            productStore.dataLimit
          );
        }
      });
    }
  });
};
onMounted(() => {
  productStore.getProducts(
    productStore.pagination.current_page,
    productStore.dataLimit
  );
});
</script>

<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4>Product List</h4>
              <router-link
                to="/admin/product/create"
                class="btn btn-info btn-sm"
                >Create New</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-8">
                <strong>Total Count</strong> :
                <em>{{ productStore.getTotalCount }}</em>
              </div>
              <div class="col-4">
                <input
                  type="search"
                  class="form-control"
                  name=""
                  placeholder="Search By Name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">BarCode</th>
                <th scope="col">QrCode</th>
                <th scope="col">Name</th>
                <th scope="col">Code</th>
                <th scope="col">Original Price</th>
                <th scope="col">Sell Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(product, index) in productStore.products"
                :key="product.id"
              >
                <td>
                  {{
                    productStore.pagination.current_page *
                      productStore.dataLimit -
                    productStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>
                  <div class="" v-if="product.file">
                    <img
                      :src="product.file"
                      alt=""
                      class="img-fluid"
                      style="width: 80px; height: 80px"
                    />
                  </div>
                </td>
                <td>
                  <div class="" v-if="product.barcode">
                    <img
                      :src="product.barcode"
                      alt=""
                      class="img-fluid"
                      style="width: 80px; height: 80px"
                    />
                  </div>
                </td>
                <td>
                  <div class="" v-if="product.qrcode">
                    <img
                      :src="product.qrcode"
                      alt=""
                      class="img-fluid"
                      style="width: 80px; height: 80px"
                    />
                  </div>
                </td>
                <td>{{ product.name }}</td>
                <td>{{ product.code }}</td>
                <td>{{ product.original_price }}</td>
                <td>{{ product.sell_price }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <div
                    class="form-check form-switch d-flex justify-content-center"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input fs-5"
                      role="switch"
                      id="changeStatus"
                      :checked="product.is_active"
                      @change.prevent="productStore.changeStatus(product.id)"
                    />
                  </div>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'product-edit', params: { id: product.id } }"
                    class="btn btn-info btn-sm"
                    ><i class="fas fa-edit"></i
                  ></router-link>
                  <a
                    @click.prevent="DeleteProduct(product.id, product.name)"
                    class="btn btn-danger btn-sm ms-2"
                    ><i class="fas fa-trash"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end">
          <v-pagination
            v-model="productStore.pagination.current_page"
            :pages="productStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              productStore.getproducts(
                productStore.pagination.current_page,
                productStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
.product-img {
  width: 100px;
  height: 100px;
}
</style>

