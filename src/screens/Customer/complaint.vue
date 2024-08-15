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
            <div>
              <h3 class="text-md py-1 text-secondary">
                Mobile number: <span class="font-bold">{{ mobilenumber }}</span>
              </h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-8/12 pt-6">
            <div class="flex flex-row space-x-10 justify-between pb-3 items-start md:items-center">
                <h3 class="text-xl font-semibold text-secondary">Compliants</h3>
                <router-link to="/complaint/add">
                    <button class="text-sm text-white rounded-lg bg-primary px-4 py-2 w-30">Add Compliant</button>
                </router-link>
            </div>
          <MaterialTable
            :tableData="tableData"
            :tableHeader="tableHeader"
            @viewDetails="viewDetails"
            @edit="editComplaint"
            @delete="deleteComplaint"
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
import { complaintStore } from "@/store/complaint";
import { menuStore } from "@/store/menu";
import { useRouter } from "vue-router";
import { notify } from "notiwind";

const cStore = complaintStore();
const mStore = menuStore();
const router = useRouter();

const tableHeader = ref([
  "Complaint Number",
  "Complaint Date",
  "PO Number",
  "Status",
  "Action",
]);
const tableData = ref([]);

onMounted(() => {
  getComplaints();
});

const getComplaints = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const payload = {customer_id: userDetails?.customer_id}

  const action = (userDetails.type === 'A') ? cStore.$getComplaintsAdmin() : cStore.$getComplaints(payload)
  action.then((res) => {
    tableData.value = [];
    res.map((v, index) => {
      const { complaint_no, complaint_date, comp_status, po_number } = v;
      tableData.value.push({
          complaint_no, complaint_date, po_number, project_status: comp_status,
          "complaint_id": complaint_no
      });
    });
  });
};

const viewDetails = (val) => {
  router.push('/complaint/details/'+val.action)
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

const editComplaint = (payload) => {
  router.push("complaint/" + payload.complaint_no);
};

const deleteComplaint = (id) => {
  if (window.confirm("Do you really want to delete?")) {
    cStore.$deleteComplaint(id).then(async (res) => {
      notify(
        {
          group: "success",
          title: "Success",
          text: "Complaint Deleted Successfully",
        },
        2000
      );
      getComplaints();
    });
  }
};
</script>
  