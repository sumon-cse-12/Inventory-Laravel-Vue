<script setup>
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useCategoryStore } from "../../store/category";
import { useRouter } from "vue-router";
import _ from 'lodash';

const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;
const searchKeyword = ref("");

const DeleteCategory = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      categoryStore.deleteCategory(id, (status) => {
        if (status == "success") {
          categoryStore.getCategories(
            categoryStore.pagination.current_page,
            categoryStore.dataLimit
          );
        }
      });
    }
  });
};

onMounted(() => {
  categoryStore.getCategories(
    categoryStore.pagination.current_page,
    categoryStore.dataLimit
  );
});

watch(
    searchKeyword, _.debounce((current, previous) => {
  categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit, current)
},1000)
)

// watch(
//     searchKeyword,
//     _.debounce((current, previous) => {
//         categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit, current);
//     }, 500)
// )
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
              <div class="col-8">
                <strong>Total Count</strong> :
                <em>{{ categoryStore.getTotalCount }}</em>
              </div>
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
              <tr
                v-for="(category, index) in categoryStore.categories"
                :key="category.id"
              >
                <td>
                  {{
                    categoryStore.pagination.current_page *
                      categoryStore.dataLimit -
                    categoryStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>{{ category.name }}</td>
                <td>{{ category.code }}</td>
                <td>
                    <div class="category-img-link">
                        <img :src="category.file" alt="" class="img-fluid category-img">
                    </div>
                </td>
                <td>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch1"
                      @change.prevent="categoryStore.changeStatus(category.id)"
                    />
                    <label
                      class="custom-control-label"
                      for="customSwitch1"
                    ></label>
                  </div>
                  <!-- <div
                    class="form-check form-switch d-flex justify-content-center"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input fs-5"
                      role="switch"
                      id="changeStatus"
                      :checked="category.is_active"
                      @change.prevent="categoryStore.changeStatus(category.id)"
                    />
                  </div> -->
                </td>
                <td>
                  <div>
                    <!-- <router-link :to="{name: 'category-edit', params:{id:category.id}}" class="btn btn-primary btn-lg">Edit</router-link> -->
                    <router-link
                      :to="{
                        name: 'category-edit',
                        params: { id: category.id },
                      }"
                      class="btn btn-info btn-sm"
                      ><i class="fas fa-edit"></i
                    ></router-link>
                    <!-- <router-link :to="{name: 'category-edit', params:{id:category.id}}" class="btn btn-primary btn-sm">Edit</router-link> -->
                    <a
                      @click.prevent="
                        DeleteCategory(category.id, category.name)
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
            v-model="categoryStore.pagination.current_page"
            :pages="categoryStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              categoryStore.getCategories(
                categoryStore.pagination.current_page,
                categoryStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.category-img{
    width: 100px;
    height: 100px;
}
</style>
