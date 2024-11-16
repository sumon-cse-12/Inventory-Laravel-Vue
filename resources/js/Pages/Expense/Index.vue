
<script setup>
import { ref, reactive, watch, onMounted, inject } from "vue";
import { useExpenseStore } from "../../store/expense";
import { useRouter } from "vue-router";

const expenseStore = useExpenseStore();
const router = useRouter();
const swal = inject("$swal");
expenseStore.swal = swal;
expenseStore.router = router;
const searchKeyword = ref("");
const DeleteExpense = (id, name) => {
  swal({
    title: `Do you want to delete this data: ${name} ${id}`,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      expenseStore.deleteExpense(id, (status) => {
        if (status == "success") {
          expenseStore.getExpenses(
            expenseStore.pagination.current_page,
            expenseStore.dataLimit
          );
        }
      });
    }
  });
};
onMounted(() => {
  expenseStore.getExpenses(
    expenseStore.pagination.current_page,
    expenseStore.dataLimit
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
              <h4>Expense List</h4>
              <router-link
                to="/admin/expense/create"
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
                <em>{{ expenseStore.getTotalCount }}</em>
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
                <th scope="col">Date</th>
                <th scope="col">Staff Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Expense Category</th>
                <th scope="col">Ref</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(expense, index) in expenseStore.expenses"
                :key="expense.id"
              >
                <td>
                  {{
                    expenseStore.pagination.current_page *
                      expenseStore.dataLimit -
                    expenseStore.dataLimit +
                    index +
                    1
                  }}
                </td>
                <td>{{ new Date(expense.created_at).toDateString() }}</td>

                <td>{{ expense.staff?.name }} / {{ expense.staff?.phone }}</td>
                <td>{{ expense.amount }}</td>
                <td>{{ expense.category?.name }}</td>
                <td>
                  <div class="" v-if="expense.file">
                    <a :href="expense.file" class="">
                      <i class="fas fa-download"></i
                    ></a>
                  </div>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'expense-edit', params: { id: expense.id } }"
                    class="btn btn-info btn-sm"
                    ><i class="fas fa-edit"></i
                  ></router-link>
                  <a
                    @click.prevent="DeleteExpense(expense.id, expense.name)"
                    class="btn btn-danger btn-sm ms-2"
                    ><i class="fas fa-trash"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end">
          <v-pagination
            v-model="expenseStore.pagination.current_page"
            :pages="expenseStore.pagination.last_page"
            :range="1"
            active-color="#fff"
            @update:modelValue="
              expenseStore.getexpenses(
                expenseStore.pagination.current_page,
                expenseStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
.expense-img {
  width: 100px;
  height: 100px;
}
</style>

