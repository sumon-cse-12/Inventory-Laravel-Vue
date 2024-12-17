<script setup>
/* All Imports */
import {ref, onMounted, inject } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
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
</template>
