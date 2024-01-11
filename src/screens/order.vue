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
      <MaterialTable
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
import MaterialTable from "../components/table/MaterialTable.vue";
import { orderStore } from "../store/orders";
import { useRouter } from "vue-router";

const oStore = orderStore();
const tableHeader = ref([
  "S.No",
  "Customer Name",
  "PO Number",
  "PO Date",
  "Project Status",
  "Action"
]);
const tableData = ref([]);
const router = useRouter();

onMounted(() => {
  getCustomers();
});

const getCustomers = () => {
  oStore.$getOrders().then((res) => {
    res.map((v, index) => {
      const { po_number, po_date, project_status, lamination, order_id, status } = v;
      const sno =  (index+1);
      tableData.value.push({
        sno,
        'customer_name': 'Customer_name',
        po_number,
        po_date: formatDate(po_date),
        project_status,
        order_id,
      });
    });
  });
};

const editOrder = (payload) => {
  router.push("editorder?id=" + payload.order_id);
};

const deleteOrder = (id) => {
  oStore.$deleteCustomer(id).then(async (res) => {
    window.location.reload();
  });
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return dateObject.toLocaleString('en-US', options);
}
</script>
