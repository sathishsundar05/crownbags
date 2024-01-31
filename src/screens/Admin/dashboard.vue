<template>
  <div class="px-4 lg:px-32 bg-white shadow-lg">
    <Navbar :menuList="mStore.menuList" />
  </div>
  <div class="px-4 py-2 lg:px-32 lg:py-6">
    <h3 class="text-xl font-semibold text-secondary py-8">Dashboard</h3>
    <div
      class="flex flex-col lg:flex-row space-x-0 space-y-6 lg:space-y-0 lg:space-x-6"
    >
      <analyticsCard
        :analytics="{
          count: dStore.dashboardDetails.customerscount,
          info: 'Total customers',
        }"
      >
        <arrow></arrow>
      </analyticsCard>
      <analyticsCard
        :analytics="{
          count: dStore.dashboardDetails.orderscount,
          info: 'Total orders',
        }"
        ><arrow></arrow
      ></analyticsCard>
      <analyticsCard
        :analytics="{
          count: dStore.dashboardDetails.pendingorderscount,
          info: 'Pending orders',
        }"
        ><arrow></arrow
      ></analyticsCard>
      <analyticsCard
        :analytics="{
          count: dStore.dashboardDetails.courierscount,
          info: 'Total couriers',
        }"
        ><arrow></arrow
      ></analyticsCard>
    </div>
    <div class="flex flex-col space-y-4">
      <h2 class="text-xl font-semibold text-secondary pt-8 pb-4">
        Pending orders
      </h2>
      <div v-for="(penOrders, index) in pendingordersList" :key="index">
        <RouterLink
            :to="`/order/view/${penOrders.order_id}`"
            
          >
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center uppercase"
          >
            {{ customerNameShort(penOrders?.customer_name) }}
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary capitalize">
              {{ penOrders.customer_name }}
            </div>
            <div class="text-sm text-secondary pt-1">
              <span class="font-semibold">PO Number: </span
              ><span>{{ penOrders.po_number }}</span>
              <span class="pl-4 font-semibold">PO Date: </span
              ><span>{{ formatDate(penOrders.po_date) }}</span>
              <span class="pl-4 font-semibold">Total Lead Time: </span
              ><span>{{ penOrders.total_lead_time }} days</span>
            </div>
          </div>
          
          <div class="flex flex-auto m-auto justify-end items-end">
            <arrowRight class=" text-secondary" />
          </div>
          
        </div>
      </RouterLink>
      </div>
    </div>
  </div>
  <div class="px-32 bg-white">
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import analyticsCard from "@/components/card/analyticsCard.vue";
import arrow from "@/assets/cards/analytics/arrow.vue";
import arrowRight from "@/assets/icons/rightArrow.vue";
import { menuStore } from "@/store/menu";
import { dashboardStore } from "../../store/dashboard";
import { customerStore } from "../../store/customers";
import { overlayStore } from "../../store/overlay";
import { getCurrentDateFormatted } from "@/lib/utils";

const mStore = menuStore();
const dStore = dashboardStore();
const cStore = customerStore();
const ovStore = overlayStore();

const customerList = ref([]);

onMounted(async () => {
  ovStore.$setOverlay(true);
  await dStore.$getDashboardDetails();
  cStore.$getCustomers().then((res) => {
    customerList.value = res;
    ovStore.$setOverlay(false);
  }).catch(err => {
    ovStore.$setOverlay(false);
  })
});

const pendingordersList = computed(() => {
  if (dStore.dashboardDetails.pendingorders) {
    return dStore.dashboardDetails.pendingorders.map((v) => {
      const getCustomerName = customerList.value.find(
        (c) => c.customer_id === v.customer_id
      );
      v.customer_name = getCustomerName?.name;
      return v;
    });
  }
  return "";
});

const customerNameShort = (name) => {
  return name?.substr(0, 2)
};

const formatDate = (dateString) => {
  return getCurrentDateFormatted(dateString);
};
</script>
