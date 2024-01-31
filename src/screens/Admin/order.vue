<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div
        class="flex flex-row space-x-10 justify-between pt-8 pb-3 items-start md:items-center"
      >
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
      </div>
      <div class="mt-6 pb-2 space-y-3 lg:space-y-0 md:flex md:items-center md:justify-between">
        <div
          class="inline-flex overflow-hidden bg-white rounded-lg"
        >
          <button
            class="px-5 py-2 text-[14px] font-medium text-secondary transition-colors duration-200"
            :class="!activeTab ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'"
            @click="getCustomers()"
          >
            All
          </button>

          <button
            class="px-5 py-2 text-[14px] font-medium text-secondary transition-colors duration-200"
            :class="activeTab === 'In Progress' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'"
            @click="getCustomers('In Progress')"
          >
            In Progress
          </button>

          <button
            class="px-5 py-2 text-[14px] font-medium text-secondary transition-colors duration-200"
            :class="activeTab === 'Completed' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'"
            @click="getCustomers('Completed')"
          >
            Completed
          </button>
        </div>
        <div class="flex justify-end lg:justify-normal">
          <input type="search" v-model="searchText" @keyup.enter="searchOrder()" placeholder="Search..." class="px-4 py-2 mr-3 text-sm text-secondary border rounded-lg outline-none focus:drop-shadow-xl" />
          <router-link to="/order/add" class="">
            <button
              class="text-sm text-white rounded-lg bg-primary px-4 py-2 w-30"
              @click="openAddForm"
            >
              Add Orders
            </button>
          </router-link>
        </div>
      </div>
      <MaterialTable
        :tableData="tableData"
        :tableHeader="tableHeader"
        :searchedText="searchInputValue"
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
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import MaterialTable from "@/components/table/MaterialTable.vue";
import { orderStore } from "@/store/orders";
import { menuStore } from "@/store/menu";
import { overlayStore } from "../../store/overlay";
import { useRouter } from "vue-router";
import { notify } from "notiwind";
import { getCurrentDateFormatted } from "@/lib/utils";

const oStore = orderStore();
const mStore = menuStore();
const ovStore = overlayStore();

const tableHeader = ref([
  "S.No",
  "Customer Name",
  "PO Number",
  "PO Date",
  "Order Status",
  "Action",
]);
const tableData = ref([]);
const activeTab = ref(null);
const searchText = ref('');

const router = useRouter();

onMounted(() => {
  ovStore.$setOverlay(true);
  getCustomers();
});

const getCustomers = (state) => {
  activeTab.value = state
  oStore
    .$getOrders(state)
    .then((res) => {
      ovStore.$setOverlay(false);
      tableData.value = [];
      res.map((v, index) => {
        const { po_number, po_date, project_status, order_id, customer_name } =
          v;
        const sno = index + 1;
        tableData.value.push({
          sno,
          customer_name: customer_name,
          po_number,
          po_date: formatDate(po_date),
          project_status,
          order_id,
        });
      });
    })
    .catch((err) => {
      ovStore.$setOverlay(false);
    });
};

const editOrder = (payload) => {
  router.push("order/" + payload.order_id);
};

const deleteOrder = (id) => {
  if (window.confirm("Do you really want to delete?")) {
    oStore.$deleteCustomer(id).then(async (res) => {
      notify(
        {
          group: "success",
          title: "Success",
          text: "Order Deleted Successfully",
        },
        2000
      );
      getCustomers();
    });
  }
};

const formatDate = (dateString) => {
  return getCurrentDateFormatted(dateString);
};

const searchOrder = () => {
  oStore
    .$searchOrders(searchText.value)
    .then((res) => {
      ovStore.$setOverlay(false);
      tableData.value = [];
      res.map((v, index) => {
        const { po_number, po_date, project_status, order_id, customer_name } =
          v;
        const sno = index + 1;
        tableData.value.push({
          sno,
          customer_name: customer_name,
          po_number,
          po_date: formatDate(po_date),
          project_status,
          order_id,
        });
      });
    })
    .catch((err) => {
      ovStore.$setOverlay(false);
    });
}
</script>
