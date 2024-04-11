<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="flex flex-col lg:flex-row px-4 lg:px-32 space-x-0 lg:space-x-4">
      <div class="w-full lg:w-4/12 my-6 py-2">
        <div class="flex flex-col rounded-lg bg-white shadow justify-center items-center py-14">
          <div
            class="flex justify-center items-center rounded-full bg-primary p-2 w-32 h-32"
          >
            <p class="text-3xl text-white">{{ getShortName }}</p>
          </div>
          <div class="flex">
            <h2 class="text-3xl py-6 text-secondary">
              {{ username }}
            </h2>
          </div>
          <div v-if="mobilenumber">
            <h3 class="text-md py-1 text-secondary">
              Mobile number: <span class="font-bold">{{ mobilenumber }}</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-8/12 pt-6">
        <MaterialTable
          :tableData="tableData"
          :tableHeader="tableHeader"
          @viewDetails="viewDetails"
        />
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
import MaterialTable from "@/components/table/MaterialTable.vue";
import { orderStore } from "@/store/orders";
import { menuStore } from "@/store/menu";
import { useRouter } from "vue-router";

const oStore = orderStore();
const mStore = menuStore();
const router = useRouter();

const tableHeader = ref([
  "S.NO",
  "PO Date",
  "Po Number",
  "Total Lead Time",
  "Order Status",
  "ETA",
  "ETD",
  "Action",
]);
const tableData = ref([]);

onMounted(() => {
  getUserCustomers();
});

const getUserCustomers = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  oStore.$getUserCustomers(userDetails?.customer_id).then((res) => {
    res.map((v, index) => {
      const { po_date, total_lead_time, project_status, order_id, po_number, actual_eta_discharge_port, actual_on_board_date } = v;
      const toDays = total_lead_time ? `${total_lead_time} days` : 'NA'
      tableData.value.push({
        "s.no": (index + 1),
        po_date,
        po_number,
        toDays,
        project_status,
        actual_eta_discharge_port,
        actual_on_board_date,
        "action": order_id
      });
    });
  });
};

const viewDetails = (val) => {
  router.push('/user/customer/details/'+val.action)
}

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
