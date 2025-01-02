<script setup>
/* All Imports */
import {ref, onMounted, inject } from 'vue';
import { useDashboardStore } from '../store/dashboard';
import { useRouter } from 'vue-router';

/* All Instance */
const dashboardStore = useDashboardStore();
const swal = inject('$swal');
const router = useRouter();

dashboardStore.swal = swal;
/* All variables */
/* All methods */

/* Hooks and Computed */
onMounted(() => {
    dashboardStore.getDashboardInfo();
})

</script>
<template>
    <h1>Dashboard</h1>
    <div class="row">
                <div class="col-xl-12">
                    <div class="card dash-header-box shadow-none border-0">
                        <div class="card-body p-0">
                            <div class="row row-cols-xxl-6 row-cols-md-3 row-cols-1 g-0">
                                <div class="col">
                                    <div class="mt-md-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Brands </p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.brand_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                                <div class="col">
                                    <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Categories</p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.category_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                                <div class="col">
                                    <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Products</p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.product_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                                <div class="col">
                                    <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Sales</p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.sales_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                                <div class="col">
                                    <div class="mt-3 mt-lg-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Customers</p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.customer_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                                <div class="col">
                                    <div class="mt-3 mt-lg-0 py-3 px-4 mx-2">
                                        <p class="text-muted-50 mb-2 text-truncate">Suppliers</p>
                                        <h3 class="text-muted mb-0">{{ dashboardStore.dashboardInfo.supplier_count }}</h3>
                                    </div>
                                </div><!-- end col -->

                            </div><!-- end row -->
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div><!-- end col -->
            </div>
</template>
