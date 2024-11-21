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
    salaryStore.getSalarys(salaryStore.pagination.current_page, salaryStore.dataLimit);
})

watch(
    searchKeyWord,
    _.debounce((current, previous) => {
        salaryStore.getSalarys(salaryStore.pagination.current_page, salaryStore.dataLimit, current);
    }, 500)
)

</script>

<template>
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <!-- Header Part -->
                <div class="col-md-12">
                    <div class="card border-primary">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="card-title text-primary fw-bold">Salary Index</h4>
                                <router-link :to="{ name: 'salary-create' }" class="btn btn-success text-white fw-bold">
                                    <i class="fas fa-plus-circle"></i> Create New</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Statistics Part -->
                <div class="col-md-12">
                    <div class="card border-primary">
                        <div class="card-body">
                            <!-- Search Bar & Count -->
                            <div class="row">
                                <div class="col-md-8">
                                    Total Count: <span class="text-primary fw-bold">{{ salaryStore.getTotalCount }}</span>
                                </div>
                                <div class="col-md-4">
                                    <input type="search" name="" class="form-control" placeholder="Search ..."
                                        v-model="searchKeyWord">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Table -->
                <div class="row my-4">
                    <div class="col-md-12">
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
                                    <tr v-for="(salary,index) in salaryStore.salaries" :key="salary.id">
                                        <th scope="row">{{ (salaryStore.pagination.current_page*salaryStore.dataLimit) - salaryStore.dataLimit+index+1 }}</th>
                                        <td>{{ new Date(salary.date).toDateString() }}</td>
                                        <td>{{ salary.month }} / {{ salary.year }}</td>
                                        <td>{{ salary.staff?.name }}</td>
                                        <td>{{ salary.type }}</td>
                                        <td>{{ salary.amount }}</td>
                                        <td>
                                            <router-link :to="{name: 'salary-edit', params: {id: salary.id }}" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <v-pagination
                        v-model="salaryStore.pagination.current_page"
                        :pages="salaryStore.pagination.last_page"
                        :range-size="1"
                        active-color ="#776acF"
                        @update:modelValue="salaryStore.getSalarys(salaryStore.pagination.current_page, salaryStore.dataLimit)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
