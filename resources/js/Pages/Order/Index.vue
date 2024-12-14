
<script setup>
import { ref, reactive, inject, onMounted, watch } from "vue";

import { useOrderStore } from "../../store/order";
import { useRouter } from "vue-router";
import _ from "lodash";

const orderStore = useOrderStore();
const router = useRouter();
const swal = inject("$swal");
orderStore.swal = swal;
orderStore.router = router;
const searchKeyword = ref("");

onMounted(() => {
  orderStore.getOrders(
    orderStore.pagination.current_page,
    orderStore.dataLimit
  );
});
watch(
  searchKeyword,
  _.debounce((current, previous) => {
    orderStore.getOrders(
      orderStore.pagination.current_page,
      orderStore.dataLimit,
      current
    );
  }, 1000)
);
</script>
<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="brand-card-title d-flex justify-content-between">
              <div class="brand-title">Orders</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="total-orders-sec d-flex justify-content-between">
              <div class="total-brands">
                Total : {{ orderStore.getTotalCount }}
              </div>
              <div class="search-orders">
                <input
                  class="form-control"
                  type="search"
                  name=""
                  v-model="searchKeyword"
                  placeholder="Search Any Order"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Transaction Number</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(order,index) in orderStore.orders" :key="order.id">
                                        <th scope="row">{{ (orderStore.pagination.current_page*orderStore.dataLimit) - orderStore.dataLimit+index+1 }}</th>
                                        <td>{{ order.transaction_number ?? '---' }}</td>
                                        <td>{{ order.customer?.name }}</td>
                                        <td>{{ order.pay_amount }}</td>
                                        <td>{{ order.subtotal }}</td>
                                        <td>{{ order.discount }}</td>
                                        <td>{{ order.total }}</td>
                                        <td>{{ order.payment_method }}</td>
                                    </tr>
                </tbody>
              </table>
            </div>
            <div class="brand-pagination d-flex justify-content-end">
                <v-pagination
                        v-model="orderStore.pagination.current_page"
                        :pages="orderStore.pagination.last_page"
                        :range-size="1"
                        active-color ="#776acF"
                        @update:modelValue="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit)"
                    />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
.orders-img {
  width: 100px;
  height: 100px;
}
</style>

