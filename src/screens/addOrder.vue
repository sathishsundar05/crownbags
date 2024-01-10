<template>
    <div>
    <div class="lg:px-32 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-32 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
        <router-link to="/order">
        <button
          class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
        >
          Back
        </button>
      </router-link>
      </div>
      <ordersForm @addOrder="addOrders" @updateOrder="" :prefillData="prefillData" />
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/navbar/navbar.vue";
import Footer from "../components/footer/footer.vue";
import ordersForm from '../components/forms/ordersForm.vue';
import { orderStore } from "../store/orders";

const mode = ref("Add")
const oStore = orderStore();

const addOrders = (payload) => {
  if(mode.value === "Edit") {
    oStore.$updateOrders(payload, prefillData.value.customer_id).then((res) => {
      window.location.reload();
    });
  } else {
    oStore.$addOrder(payload).then((res) => {
      window.location.reload();
    });
  }
};
</script>