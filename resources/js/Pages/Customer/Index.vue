
<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useCustomerStore } from "../../store/customer";
import { useRouter } from "vue-router";

const customerStore = useCustomerStore();

const router = useRouter();
const swal = inject("$swal");
customerStore.swal = swal;
customerStore.router = router;
const searchKeyword = ref("");
const DeleteCustomer = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      customerStore.deleteCustomer(id, (status) => {
        if (status == "success") {
          customerStore.getCustomers(
            customerStore.pagination.current_page,
            customerStore.dataLimit
          );
        }
      });
    }
  });
};
onMounted(() => {
  customerStore.getCustomers(
    customerStore.pagination.current_page,
    customerStore.dataLimit
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
              <h4>Customer List</h4>
              <router-link
                to="/admin/customer/create"
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
                <em>{{customerStore.getTotalCount  }}</em>
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
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
                <tr v-for="(customer,index) in customerStore.customers" :key="customer.id">
                <td>
                  {{
                    customerStore.pagination.current_page *
                      customerStore.dataLimit -
                    customerStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.email }}</td>
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
                        name: 'customer-edit',
                        params: { id: customer.id },
                      }"
                      class="btn btn-info btn-sm"
                      ><i class="fas fa-edit"></i
                    ></router-link>
                    <a
                      @click.prevent="
                        DeleteCustomer(customer.id, customer.name)
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
            v-model="customerStore.pagination.current_page"
            :pages="customerStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              customerStore.getCustomers(
                customerStore.pagination.current_page,
                customerStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
.customer-img {
  width: 100px;
  height: 100px;
}
</style>

