<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useSalaryStore } from "../../store/salary";
import { useStaffStore } from "../../store/staff";
import { useRouter } from 'vue-router';
import _ from 'lodash';

const salaryStore = useSalaryStore();
const router = useRouter();
const swal = inject('$swal');

salaryStore.swal = swal;
salaryStore.router = router;

/* All Variables */
const searchKeyWord = ref('');

/* All Methods */
/* Hooks and Computed */
onMounted(() => {
    salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit);
})

watch(
    searchKeyWord,
    _.debounce((current, previous) => {
        salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, current);
    }, 500)
)

</script>

<template>

<div class="container-fluid p-4">
  <div class="row">
    <!-- Header -->
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4>Salary Index</h4>
            <router-link :to="{ name: 'salary-create' }" class="btn btn-info btn-sm">
              <i class="fas fa-plus-circle"></i> Create New
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <strong>Total Count</strong>: <em>{{ salaryStore.getTotalCount }}</em>
            </div>
            <div class="col-4">
              <input
                type="search"
                class="form-control"
                placeholder="Search By Name"
                v-model="searchKeyWord"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="row">
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Month/Year</th>
              <th scope="col">Staff Name</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(salary, index) in salaryStore.salaries" :key="salary.id">
              <td>
                {{
                  salaryStore.pagination.current_page * salaryStore.dataLimit -
                    salaryStore.dataLimit +
                    index +
                    1
                }}
              </td>
              <td>{{ new Date(salary.date).toDateString() }}</td>
              <td>{{ salary.month }} / {{ salary.year }}</td>
              <td>{{ salary.staff?.name }}</td>
              <td>{{ salary.type }}</td>
              <td>{{ salary.amount }}</td>
              <td>
                <router-link
                  :to="{ name: 'salary-edit', params: { id: salary.id } }"
                  class="btn btn-info btn-sm"
                  ><i class="fas fa-edit"></i
                ></router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="d-flex justify-content-end">
    <v-pagination
      v-model="salaryStore.pagination.current_page"
      :pages="salaryStore.pagination.last_page"
      :range="1"
      active-color="#776acF"
      @update:modelValue="salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit)"
    />
  </div>
</div>

</template>
