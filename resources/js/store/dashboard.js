import { defineStore } from "pinia";
import { inventoryAxiosClient } from "../utils/system_axios";
export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        rawData: [],
        dashboardInfo: [],
        months: [],
        sales: [],
        expense: [],
        salary: [],
        revenue: [],
        notifications: [],
        errors: [],
        is_loading: false,
        swal: null,
        router: null,
    }),
    getters: {
        getUnReadNotificationCount(state){
            return state.notifications.length;
        }
    },

    actions: {
        async getDashboardInfo(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/dashboard-info");
                console.log(data);
                this.rawData = data;
                this.dashboardInfo = data.data;
                this.dashboardInfo.stats.map((item) => {
                    this.months.push(item.month);
                    this.sales.push(item.sales);
                    this.expense.push(item.expense);
                    this.salary.push(item.salary);
                    let revenueAmount = parseFloat(item.sales) - (parseFloat(item.salary)+parseFloat(item.expense));
                    this.revenue.push(revenueAmount)
                })
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
        async getNotifications(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/get-notifications");
                console.log(data);
                this.rawData = data;
                this.notifications = data.data;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
        async markAsReadAll(){
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get("/mark-as-readall");
                console.log(data);
                this.rawData = data;
                this.notifications = data.data;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
    }


});
