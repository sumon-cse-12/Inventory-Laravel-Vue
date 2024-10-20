<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useCategoryStore } from "../../store/category";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;
const searchKeyWord = ref('');

onMounted(() =>{
  categoryStore.getCategories();
})
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4>Category List</h4>
              <router-link
                to="/admin/category/create"
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
              <div class="col-8"> <strong>Total Count</strong> : <em>{{categoryStore.getTotalCount}}</em></div>
              <div class="col-4">
                <input
                  type="search"
                  class="form-control"
                  v-model="searchKeyword"
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
                <th scope="col">Code</th>
                <th scope="col">Image</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(category,index) in categoryStore.categories" :key="category.id">
                <td>{{ index+1 }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.name }}</td>
                <td>
                    <div>
                        <a href="#" class="btn btn-primary btn-sm">Edit</a>
                        <a href="#" class="btn btn-danger btn-sm">Delete</a>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
