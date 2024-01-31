<template>
    <div>
      <div class="px-4 lg:px-32 bg-white shadow-lg">
        <Navbar :menuList="mStore.menuList" />
      </div>
      <div class="px-4 py-2 lg:px-32 lg:py-6">
        <div class="flex justify-between pt-8 pb-3">
          <h3 class="text-xl font-semibold text-secondary">Orders</h3>
          <div class="button-group space-x-4">
          <router-link :to="`/order/${route.params.id}`">
            <button
              class="text-sm text-white rounded-lg bg-primary px-4 py-2"
            >
              Edit Order
            </button>
          </router-link>
          <router-link to="/order">
            <button
              class="text-sm text-white rounded-lg bg-primary px-4 py-2"
            >
              Back
            </button>
          </router-link>
          </div>
        </div>
        <div
          class="flex flex-col rounded-lg bg-white shadow justify-center items-center mt-4"
        >
          <list :listItems="oStore.customerOrder" />
        </div>
      </div>
      <div class="lg:px-32 bg-white">
        <Footer />
      </div>
    </div>
  </template>

<script setup>
import { onMounted } from "vue";
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import list from "@/components/lists/list.vue";
import { menuStore } from "@/store/menu";
import { orderStore } from "@/store/orders";
import { overlayStore } from "../../store/overlay";
import { useRoute } from "vue-router";

const mStore = menuStore();
const oStore = orderStore();
const route = useRoute();
const ovStore = overlayStore();

onMounted(async () => {
  ovStore.$setOverlay(true);
  await oStore.$getCustomerOrders(route.params.id);
  ovStore.$setOverlay(false);
});

</script>