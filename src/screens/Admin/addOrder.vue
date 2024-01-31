<template>
    <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
        <router-link to="/order">
        <button
          class="text-sm text-white rounded-lg bg-primary px-4 py-2"
        >
          Back
        </button>
      </router-link>
      </div>
      <ordersForm @addOrder="addOrders" :prefillData="prefillData" v-if="prefillData" />
      <ordersForm v-if="route.params.id == 'add'" @addOrder="addOrders" />
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import ordersForm from '@/components/forms/ordersForm.vue';
import { orderStore } from "@/store/orders";
import { menuStore } from "@/store/menu";
import { overlayStore } from "../../store/overlay";
import { useRoute, useRouter } from "vue-router";
import { notify } from "notiwind";

const mode = ref("Add")
const oStore = orderStore();
const mStore = menuStore();
const ovStore = overlayStore();
const prefillData = ref("");
const route = useRoute();
const router = useRouter();

onMounted(() => {
  prefillData.value = ""
  if(route.params.id !== 'add') {
    oStore.$getOrder(route.params.id).then(v => {
      prefillData.value = v;
    })
  }
})

const addOrders = (payload) => {
  if(mode.value === "Edit") {
    ovStore.$setOverlay(true);
    oStore.$updateOrders(payload, prefillData.value.customer_id).then((res) => {
      router.push('/order')
      ovStore.$setOverlay(false);
      notify(
        {
          group: "success",
          title: "Success",
          text: "Order Updated Successfully",
        },
        2000
      );
    });
  } else {
    oStore.$addOrder(payload).then((res) => {
      router.push('/order')
      notify(
        {
          group: "success",
          title: "Success",
          text: "Order Added Successfully",
        },
        2000
      );
    });
  }
};

onUnmounted(() => {
  oStore.$reset()
})
</script>