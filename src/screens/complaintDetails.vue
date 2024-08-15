<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div class="flex justify-end">
        <router-link to="/complaint">
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
          <list :listItems="cStore.complaint" />
        </div>
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
import { complaintStore } from "@/store/complaint";
import { menuStore } from "@/store/menu";
import { useRoute } from "vue-router";

const cStore = complaintStore();
const mStore = menuStore();

const route = useRoute();

onMounted(() => {
  cStore.$getComplaint({complaint_no: route.params.id});
});
</script>
