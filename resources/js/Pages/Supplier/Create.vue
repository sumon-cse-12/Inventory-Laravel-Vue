<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useSupplierStore } from "../../store/supplier";
import { useRouter } from "vue-router";

const supplierStore = useSupplierStore();
const router = useRouter();
const swal = inject("$swal");
supplierStore.swal = swal;
supplierStore.router = router;

const formData = reactive({
  name: null,
  email: null,
  phone: null,
  nid: null,
  company_name: null,
  address: null,
  file: null,
});

const schema = reactive({
  name: "required",
  email: "required|email",
  phone: "required|min:11|max:15",
  nid: "required",
  company_name: "required",
  address: "required",
});

const saveSupplierData = () => {
  supplierStore.storeSupplier(formData);
};

const onChange = (e) => {
  formData.file = e.target.files[0];
};
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
              @submit="saveSupplierData"
              enctype="multipart/form-data"
            >
              <div class="row">
                <div class="col-6 mb-3">
                  <label for="">Name</label>
                  <vee-field
                    type="text"
                    name="name"
                    v-model="formData.name"
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
                    v-model="formData.email"
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
                    v-model="formData.phone"
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
                    v-model="formData.nid"
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
                    v-model="formData.company_name"
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
                    v-model="formData.address"
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
                  <Button type="submit" class="btn btn-primary">Submit</Button>
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
