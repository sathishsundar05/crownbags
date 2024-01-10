<template>
  <div>
    <div class="lg:px-32 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-32 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
        <router-link to="/addorder">
          <button
            class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
          >
            Add Orders
          </button>
        </router-link>
      </div>
      <Table 
        :tableData="tableData"
        :tableHeader="tableHeader"
        @edit="editOrder"
        @delete="deleteOrder"
      />
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
import Table from "../components/table/table.vue";
import { orderStore } from "../store/orders";
import { useRouter } from "vue-router";

const oStore = orderStore();
const tableHeader = ref([
  "PO Number",
  "Extrusion",
  "Weaving",
  "Lamination",
  "Action",
]);
const tableData = ref([]);
const router = useRouter();

onMounted(() => {
  getCustomers();
});

const getCustomers = () => {
  oStore.$getOrders().then((res) => {
    res.map((v) => {
      const { po_number, extrusion, weaving, lamination, order_id, status } = v;
      tableData.value.push({
        po_number,
        extrusion,
        weaving,
        lamination,
        order_id,
        status
      });
    });
  });
};

const editOrder = (payload) => {
  router.push("editorder?id="+payload.order_id);
};

const deleteOrder = (id) => {
  oStore.$deleteCustomer(id).then(async (res) => {
    window.location.reload();
  });
};
</script>
