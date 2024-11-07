
<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useSupplierStore } from "../../store/supplier";
import { useRouter } from "vue-router";

const supplierStore = useSupplierStore();
const router = useRouter();
const swal = inject("$swal");
supplierStore.swal = swal;
supplierStore.router = router;
const searchKeyword = ref("");
const DeleteSupplier = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      supplierStore.deleteSupplier(id, (status) => {
        if (status == "success") {
          supplierStore.getSuppliers(
            supplierStore.pagination.current_page,
            supplierStore.dataLimit
          );
        }
      });
    }
  });
};
onMounted(() => {
  supplierStore.getSuppliers(
    supplierStore.pagination.current_page,
    supplierStore.dataLimit
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
              <h4>Supplier List</h4>
              <router-link
                to="/admin/supplier/create"
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
                <em>12</em>
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
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Company Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(supplier, index) in supplierStore.suppliers"
                :key="supplier.id"
              >
                <td>
                  {{
                    supplierStore.pagination.current_page *
                      supplierStore.dataLimit -
                    supplierStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.phone }}</td>
                <td>{{ supplier.email }}</td>
                <td>
                  {{ supplier.company_name }}
                </td>
                <td>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch1"
                    />
                    <label
                      class="custom-control-label"
                      for="customSwitch1"
                    ></label>
                  </div>
                </td>
                <td>
                  <div>
                    <router-link
                      :to="{
                        name: 'supplier-edit',
                        params: { id: supplier.id },
                      }"
                      class="btn btn-info btn-sm"
                      ><i class="fas fa-edit"></i
                    ></router-link>
                    <a
                      @click.prevent="
                        DeleteSupplier(supplier.id, supplier.name)
                      "
                      class="btn btn-danger btn-sm ms-2"
                      ><i class="fas fa-trash"></i
                    ></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end">
          <v-pagination
            v-model="supplierStore.pagination.current_page"
            :pages="supplierStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              supplierStore.getSuppliers(
                supplierStore.pagination.current_page,
                supplierStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
.supplier-img {
  width: 100px;
  height: 100px;
}
</style>

