<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useSupplierStore } from "../../store/supplier";
import { useRoute, useRouter } from "vue-router";

const supplierStore = useSupplierStore();
const router = useRouter();
const swal = inject("$swal");
supplierStore.swal = swal;
supplierStore.router = router;
const route  = useRoute();

const schema = reactive({
  name: "required",
  email: "required|email",
  phone: "required|min:11|max:15",
  nid: "required",
  company_name: "required",
  address: "required",
});

const updateSupplierData = () => {
  supplierStore.updateSupplier(supplierStore.editFormData,route.params.id);
};


const onChange = (e) => {
    formData.file = e.target.files[0];
}
onMounted( () => {
    supplierStore.getSupplier(route.params.id)
})
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4>Supplier Edit</h4>
              <router-link
                to="/admin/supplier/index"
                class="btn btn-info btn-sm"
                >Back</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <vee-form
            :validation-schema="schema"
              @submit="updateSupplierData"
              enctype="multipart/form-data"
            >
              <div class="row">
                <div class="col-6 mb-3">
                  <label for="">Name</label>
                  <vee-field
                    type="text"
                    name="name"
                    v-model="supplierStore.editFormData.name"
                    class="form-control"
                    placeholder="Enter Supplier Name"
                  />
                  <ErrorMessage class="text-danger" name="name" />
                </div>
                <div class="col-6 mb-3">
                  <label for="">Email</label>
                  <vee-field
                    type="email"
                    name="email"
                    v-model="supplierStore.editFormData.email"
                    class="form-control"
                    placeholder="Enter Supplier Email"
                  />
                  <ErrorMessage class="text-danger" name="email" />
                </div>
                <div class="col-6 mb-3">
                  <label for="">Phone</label>
                  <vee-field
                    type="text"
                    name="phone"
                    v-model="supplierStore.editFormData.phone"
                    class="form-control"
                    placeholder="Enter Supplier Phone"
                  />
                  <ErrorMessage class="text-danger" name="phone" />
                </div>
                <div class="col-6 mb-3">
                  <label for="">NID</label>
                  <vee-field
                    type="text"
                    name="nid"
                    v-model="supplierStore.editFormData.nid"
                    class="form-control"
                    placeholder="Enter Supplier NID"
                  />
                  <ErrorMessage class="text-danger" name="nid" />
                </div>
                <div class="col-6 mb-3">
                  <label for="">Company Name</label>
                  <vee-field
                    type="text"
                    name="company_name"
                    v-model="supplierStore.editFormData.company_name"
                    class="form-control"
                    placeholder="Enter Supplier Company Name"
                  />
                  <ErrorMessage class="text-danger" name="company_name" />
                </div>
                <div class="col-6 mb-3">
                  <label for="">Address</label>
                  <vee-field
                    type="text"
                    name="address"
                    v-model="supplierStore.editFormData.address"
                    class="form-control"
                    placeholder="Enter Supplier Address"
                  />
                  <ErrorMessage class="text-danger" name="address" />
                </div>
                <div class="col-12 mb-3">
                  <label for="">Upload Image</label>
                  <vee-field
                    type="file"
                    @change="onChange"
                    name="file"
                    class="form-control"
                    accept="image/*"
                  />
                </div>
                <div class="col-sm-12">
                  <Button type="submit" class="btn btn-primary">Update</Button>
                </div>
              </div>
            </vee-form>
          </div>
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
