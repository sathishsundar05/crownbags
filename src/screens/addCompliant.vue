<template>
    <div>
      <div class="px-4 lg:px-32 bg-white shadow-lg">
        <Navbar :menuList="mStore.menuList" />
      </div>
      <div class="px-3 lg:px-32 py-6">
        <div class="flex justify-between pt-8 pb-3">
          <h3 class="text-xl font-semibold text-secondary">Add Compliant</h3>
          <router-link to="/complaint">
          <button
            class="text-sm text-white rounded-lg bg-primary px-4 py-2 w-30"
          >
            Back
          </button>
        </router-link>
        </div>
        <compliantForm @addComplaint="addComplaint" :prefillData="prefillData" v-if="prefillData" />
        <compliantForm v-if="route.params.id == 'add'" @addComplaint="addComplaint" />
      </div>
      <div class="lg:px-32 bg-white">
        <Footer />
      </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import Navbar from "../components/navbar/navbar.vue";
import Footer from "../components/footer/footer.vue";
import compliantForm from '../components/forms/compliantForm.vue';
import { complaintStore } from "../store/complaint";
import { menuStore } from "@/store/menu";
import { useRoute, useRouter } from "vue-router";

const mode = ref("Add")
const cStore = complaintStore();
const mStore = menuStore();
const prefillData = ref("");
const route = useRoute();
const router = useRouter();

onMounted(() => {
  prefillData.value = ""
  if(route.params.id !== 'add') {
    cStore.$getComplaint({complaint_no: route.params.id}).then(v => {
      prefillData.value = v;
    })
  }
})

const addComplaint = (payload) => {
  if(mode.value === "Edit") {
    cStore.$updateComplaint(payload, prefillData.value.customer_id).then((res) => {
      router.push('/complaint')
    });
  } else {
    cStore.$addComplaint(payload).then((res) => {
      router.push('/complaint')
    });
  }
};
</script>