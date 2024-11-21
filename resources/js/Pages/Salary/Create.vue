<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useSalaryStore } from "../../store/salary";
import { useStaffStore } from "../../store/staff";
import { useRouter } from "vue-router";
import { getYears, getMonths } from "../../helper/helper"
const salaryStore = useSalaryStore();
const staffStore = useStaffStore();

const swal = inject("$swal");
const router = useRouter();

salaryStore.swal = swal;
salaryStore.router = router;

staffStore.swal = swal;
staffStore.router = router;

/* All Variables and Constants */
const formData = reactive({
  staff_id: '',
  amount: 0,
  month: '',
  year: '',
  type: '',
  date: '',
});

const schema = reactive({
  month: 'required',
  year: 'required',
  date: 'required',
  type: 'required',
  staff_id: 'required',
  amount: 'required',
});

/* All Methods */
const saveSalary = () => {
  salaryStore.storeSalary(formData);
}

/* Hooks and OnMounted */
onMounted(() => {
  staffStore.getAllStaffs();
})

</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-md-12">
          <div class="card border-primary">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title text-primary fw-bold">Salary Create</h4>
                <router-link :to="{ name: 'salary-index' }" class="btn btn-primary text-white fw-bold">
                  <i class="fas fa-arrow-left"></i> Salary List</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card border-primary">
            <div class="card-body">
              <vee-form :validation-schema="schema" @submit="saveSalary" class="mt-4 pt-2" enctype="multipart/form-data">

                <div class="row">

                  <!-- salary date -->
                  <div class="col-md-4 mb-4">
                   <label for="salary-original_price">Salary Date</label>
                    <vee-field type="date" class="form-control" name="date" v-model="formData.date" placeholder="Enter salary date"
                    min="0"/>
                    <ErrorMessage class="text-danger" name="date" />
                  </div>
                  <!-- salary amount -->

                  <!-- salary Month -->
                  <div class="col-md-4 mb-4">
                   <label for="salary-original_price">Salary Month</label>
                    <vee-field as="select" class="form-control" name="month" v-model="formData.month">
                      <option value="">Select Month</option>
                      <option :value="month" v-for="(month,index) in getMonths()" :key="index">{{ index+1 }}. {{ month }}</option>
                    </vee-field>
                    <ErrorMessage class="text-danger" name="month" />
                  </div>
                  <!-- salary month -->

                  <!-- salary year -->
                  <div class="col-md-4 mb-4">
                   <label for="salary-original_price">Salary Year</label>
                    <vee-field as="select" class="form-control" name="year" v-model="formData.year">
                      <option value="">Select Year</option>
                      <option :value="year" v-for="(year,index) in getYears(2010)" :key="index">{{ year }}</option>
                    </vee-field>
                    <ErrorMessage class="text-danger" name="year" />
                  </div>
                  <!-- salary year -->

                  <!-- staff Name -->
                  <div class="col-md-6 mb-4">
                   <label for="staff-name" class="form-label">Staff Name</label>
                    <vee-field as="select" class="form-control" name="staff_id" v-model="formData.staff_id">
                      <option value="">Select Staff Name</option>
                      <option :value="staff.id" v-for="(staff,index) in staffStore.staffs" :key="staff.id">{{ index+1 }}. {{ staff.name }}</option>
                    </vee-field>
                    <ErrorMessage class="text-danger" name="staff_id" />
                  </div>
                  <!-- staff Name -->

                  <!-- salary amount -->
                  <div class="col-md-6 mb-4">
                   <label for="salary-amount">Salary Amount</label>
                    <vee-field type="number" class="form-control" name="amount" v-model="formData.amount"
                    placeholder="Enter salary amount" min="0"/>
                    <ErrorMessage class="text-danger" name="amount" />
                  </div>
                  <!-- salary amount -->

                   <!-- salary type -->
                   <div class="col-md-12 mb-4">
                   <label for="salary-original_price">Salary type</label>
                    <vee-field as="select" class="form-control" name="type" v-model="formData.type">
                      <option value="">Select type</option>
                      <option :value="type" v-for="(type, index) in salaryStore.salary_types" :key="index">{{ type }}</option>
                    </vee-field>
                    <ErrorMessage class="text-danger" name="type" />
                  </div>
                  <!-- salary type -->
                </div>

                <div class="d-flex justify-content-center align-items-center mt-3">
                  <button type="submit" class="btn btn-primary fw-bold">Submit</button>
                </div>
              </vee-form>

            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
