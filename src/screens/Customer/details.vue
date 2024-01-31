<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div class="flex justify-end">
        <router-link to="/user/customer">
          <button
            class="text-sm text-white rounded-lg bg-primary px-4 py-2"
          >
            Back
          </button>
        </router-link>
      </div>
    </div>
    <div
      class="flex flex-col lg:flex-row px-4 lg:px-32 space-x-0 lg:space-x-4"
    >
      <div class="w-full">
        <div
          class="flex flex-col rounded-lg bg-white shadow justify-center items-center overflow-scroll"
        >
          <list :listItems="oStore.customerOrder" />
        </div>
      </div>
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import list from "@/components/lists/list.vue";
import { orderStore } from "@/store/orders";
import { menuStore } from "@/store/menu";
import { useRoute } from "vue-router";

const oStore = orderStore();
const mStore = menuStore();

const route = useRoute();

const listItems = ref([]);

onMounted(() => {
  oStore.$getCustomerOrders(route.params.id);
});

const username = computed(() => {
  const getData = localStorage.getItem("userDetails");
  return JSON.parse(getData).name;
});

const mobilenumber = computed(() => {
  const getData = localStorage.getItem("userDetails");
  return JSON.parse(getData).mobilenumber;
});

const getShortName = computed(() => {
  return username.value.slice(0, 2).toUpperCase();
});
</script>
