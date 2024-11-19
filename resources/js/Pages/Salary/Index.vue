
<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useStaffStore } from "../../store/staff";
import { useRouter } from "vue-router";

const staffStore = useStaffStore();
const router = useRouter();
const swal = inject("$swal");
staffStore.swal = swal;
staffStore.router = router;
const searchKeyword = ref("");
const DeleteStaff = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      staffStore.deleteStaff(id, (status) => {
        if (status == "success") {
          staffStore.getStaffs(
            staffStore.pagination.current_page,
            staffStore.dataLimit
          );
        }
      });
    }
  });
};
onMounted(() => {
  staffStore.getStaffs(
    staffStore.pagination.current_page,
    staffStore.dataLimit
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
              <h4>staff List</h4>
              <router-link
                to="/admin/staff/create"
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
                <em>{{ staffStore.getTotalCount }}</em>
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
              <tr
                v-for="(staff, index) in staffStore.staffs"
                :key="staff.id"
              >
                <td>
                  {{
                    staffStore.pagination.current_page *
                      staffStore.dataLimit -
                    staffStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>{{ staff.name }}</td>
                <td>{{ staff.phone }}</td>
                <td>{{ staff.email }}</td>
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
                        name: 'staff-edit',
                        params: { id: staff.id },
                      }"
                      class="btn btn-info btn-sm"
                      ><i class="fas fa-edit"></i
                    ></router-link>
                    <a
                      @click.prevent="
                        DeleteStaff(staff.id, staff.name)
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
            v-model="staffStore.pagination.current_page"
            :pages="staffStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              staffStore.getStaffs(
                staffStore.pagination.current_page,
                staffStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
.staff-img {
  width: 100px;
  height: 100px;
}
</style>

