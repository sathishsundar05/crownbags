<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div class="flex justify-end">
        <router-link to="/complaint">
          <button class="text-sm text-white rounded-lg bg-primary px-4 py-2">
            Back
          </button>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row px-4 lg:px-32 space-x-0 lg:space-x-4">
      <div class="w-full">
        <div class="flex flex-col rounded-lg bg-white shadow justify-center items-center overflow-scroll">
          <!-- <list :listItems="cStore.complaint" /> -->
          <div class="grid grid-cols-2 gap-5 w-full p-6 justify-center font-serif">
            <div class="text-secondary two-col-layout rounded-md px-1 py-1 w-full" v-for="(list, index) in firstGroup"
              :key="index">
              <span class="capitalize font-sans text-[#57658f] text-[16px] font-bold">
                <!-- Iterating through the key-value pairs within the object -->
                <span v-for="(value, key) in list" :key="key">
                  {{ key }}:
                </span>
                <span class="font-sans pl-4 font-normal" v-for="(value, key) in list" :key="key">
                  <div class="border border-black-light w-full mt-3 rounded grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 place-items-center overflow-x-scroll max-h-[300px]" v-if="key === 'Defect Photos' && value !== 'NA'">
                    <img :src="val"
                      class="rounded-lg mx-3 cursor-pointer w-32 h-32 object-cover" v-for="val in value" @click="openDocument(val)" />
                  </div>
                  <span v-else>{{ value }}</span>
                </span>
              </span>
            </div>

          </div>

          <div class="border w-full"></div>

          <div class="grid grid-cols-2 gap-5 w-full p-6 justify-center font-serif">
            <div class="text-secondary two-col-layout rounded-md px-1 py-1 w-full" v-for="(list, index) in secondGroup"
              :key="index">
              <span class="capitalize font-sans text-[#57658f] text-[16px] font-bold">
                <!-- Iterating through the key-value pairs within the object -->
                <span v-for="(value, key) in list" :key="key">
                  {{ key }}:
                </span>
                <span class="font-sans pl-4 font-normal" v-for="(value, key) in list" :key="key">
                  <span v-if="key === 'Complaint Status' && value === 'Completed'"
                    class="bg-[green] rounded-2xl text-white px-4 py-2 ml-2 font-sans">
                    {{ value }}
                  </span>
                  <span v-else-if="key === 'Complaint Status' && value === 'In Progress'"
                    class="bg-[orange] rounded-2xl text-white px-4 py-2 ml-2 font-sans">
                    {{ value }}
                  </span>
                  <span v-else-if="key === 'Complaint Status' && value === 'Complaint Raised'"
                    class="bg-[grey] rounded-2xl text-white px-4 py-2 ml-2 font-sans">
                    {{ value }}
                  </span>
                  <div class="border border-black-light w-full mt-3 rounded grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 place-items-center overflow-x-scroll max-h-[300px]" v-else-if="key === 'Reference Images' && value !== 'NA'">
                    <img :src="val"
                      class="rounded-lg mx-3 cursor-pointer w-32 h-32 object-cover" v-for="val in value" @click="openDocument(val)" />
                  </div>
                  <span v-else>{{ value }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
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
import { complaintStore } from "@/store/complaint";
import { customerStore } from "@/store/customers";
import { menuStore } from "@/store/menu";
import { useRoute } from "vue-router";

const cStore = complaintStore();
const csStore = customerStore();
const mStore = menuStore();

const route = useRoute();

const firstGroup = ref([]);
const secondGroup = ref([]);

const userDetails = localStorage.getItem('userDetails');
const userType = userDetails ? JSON.parse(userDetails).type : null;
const customersList = ref([]);

onMounted(async () => {
  if(userType === 'A') {
    await getCustomers();
  }
  await cStore.$getComplaint({ complaint_no: route.params.id });
  firstGroup.value = [
    { "Complaint No": cStore.complaint.complaint_no ? 'CCR-' + cStore.complaint.complaint_no : 'NA' },
    { "Complaint Date": cStore.complaint.complaint_date || 'NA' },
    { "PO Number": cStore.complaint.po_number || 'NA' },
    { "Total Quantity": cStore.complaint.total_quantity || 'NA' },
    { "Defective Quantity": cStore.complaint.defective_quantity || 'NA' },
    { "Definition of Defect": cStore.complaint.def_of_defect || 'NA' },
    { "Defect Photos": cStore.complaint.defect_photos ? cStore.complaint.defect_photos.split(',') : 'NA' },
  ]

  secondGroup.value = [
    { "Reference Images": cStore.complaint.ref_photos ? cStore.complaint.ref_photos.split(',') : 'NA' },
    { "Root Cause Analysis": cStore.complaint.rca || 'NA' },
    { "Corrective Action": cStore.complaint.corrective_action || 'NA' },
    { "Complaint Research Team": cStore.complaint.crteam || 'NA' },
    { "Prepared by": cStore.complaint.prepared_by || 'NA' },
    { "Start Date": cStore.complaint.start_date || 'NA' },
    { "End Date": cStore.complaint.end_date || 'NA' },
    { "Complaint Status": cStore.complaint.comp_status || 'NA' },
  ]

    if(userType === 'A') { secondGroup.value.push({ "Customer Name": customersList?.value?.find(cs => cs.key === cStore.complaint.customer_id).value}) }
});


const getCustomers = () => {
  return csStore.$getCustomers().then((res) => {
    res.map((v) => {
      const { name, customer_id } = v;
      customersList.value.push({
        key: customer_id,
        value: name
      });
    });
  });
};

const openDocument = (src) => {
  window.open(src, "_blank");
};
</script>
