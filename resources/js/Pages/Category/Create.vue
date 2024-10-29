<script setup>
import { ref, reactive, inject } from "vue";
import { useCategoryStore } from "../../store/category";
import { useRouter } from "vue-router";
// import { ErrorMessage } from "vee-validate";

const categoryStore = useCategoryStore();

const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;
const formData = reactive({
  name: null,
  code: null,
  file: null,
});

const schema = reactive({
  name: "required",
  code: "required",
});

const saveCategory = () => {
  console.log("why does not call this function");

  categoryStore.storeCategory(formData);
};
const onChange = (e) => {
  formData.file = e.target.files[0];
  console.log(formData.file);
};
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4>Category Create</h4>
              <router-link
                :to="{ name: 'category-index' }"
                class="btn btn-info btn-sm"
                >Category List</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card p-5">
          <div class="card-body">
            <vee-form
              :validation-schema="schema"
              @submit="saveCategory"
              enctype="multipart/form-data"
            >
              <div class="row">
                <div class="col-6 mb-3">
                  <label class="form-label" for="">Name</label>
                  <vee-field
                    type="text"
                    name="name"
                    v-model="formData.name"
                    class="form-control"
                    placeholder="Enter Category Name"
                  />
                  <ErrorMessage class="text-danger" name="name" />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label" for="">Code</label>
                  <vee-field
                    type="text"
                    name="code"
                    v-model="formData.code"
                    class="form-control"
                    placeholder="Enter Category Code"
                  />
                  <ErrorMessage class="text-danger" name="code" />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label" for="">Image</label>
                  <vee-field
                    type="file"
                    @change="onChange"
                    name="file"
                    class="form-control"
                    accept="image/*"
                  />
                  <ErrorMessage class="text-danger" name="file" />
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary fw-bold">
                    Submit
                  </button>
                </div>
              </div>
            </vee-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
