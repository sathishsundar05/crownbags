<template>
  <form class="mt-[25px]">
    <!--- Row 1 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >PO Number</label
        >
        <input
          v-model="formData.po_number"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="po_number"
          placeholder="PO Number"
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Total Quantity</label
        >
        <input
          v-model="formData.total_quantity"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="number"
          name="total_quantity"
          placeholder="Total Quantity"
        />
      </div>
    </div>
    <!--- Row 2-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Defective Quantity</label
        >
        <input
          v-model="formData.defective_quantity"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="number"
          name="defective_quantity"
          placeholder="Defective Quantity"
        />
      </div>

      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary">
          Definition of Defect
        </label>
        <textarea
          v-model="formData.def_of_defect"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          rows="3"
          name="def_of_defect"
          placeholder="Definition of Defect"
        ></textarea>
      </div>
    </div>

    <!--- Row 3-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Defect Photos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          @change="updateFormData($event, 'defect_photos')"
        />

        <div
          v-if="showFilePreview('defect_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px] grid-cols-6"
        >
          <div
            v-for="(fileSrc, index) in cStore.fileUploadData[
              'defect_photos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="fileSrc.url"
              class="rounded-lg mx-3 w-20"
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('defect_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>

      <div class="mb-6 lg:mb-0 w-full lg:w-1/2" v-if="userType === 'A'">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Reference Images</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          @change="updateFormData($event, 'ref_photos')"
        />
        
        <div
          v-if="showFilePreview('ref_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px] grid-cols-8"
        >
          <div
            v-for="(fileSrc, index) in cStore.fileUploadData[
              'ref_photos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="fileSrc.url"
              class="rounded-lg mx-3 w-20"
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('ref_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>

      <!-- <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Defect Videos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="video/*"
          @change="updateFormData($event, 'defect_videos')"
        />

        <div
          v-if="showFilePreview('defect_videos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px] grid-cols-8"
        >
          <div
            v-for="(fileSrc, index) in cStore.fileUploadData[
              'defect_videos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="fileSrc.url"
              class="rounded-lg mx-3 w-20"
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('defect_videos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div> -->
    </div>

    <!--- Row 4-->
    <!-- <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6" v-if="userType === 'A'">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Reference Video</label
        >
        <div class="relative">
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="video/*"
          @change="updateFormData($event, 'ref_videos')"
        />
        
        <div
          v-if="showFilePreview('ref_videos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px] grid-cols-8"
        >
          <div
            v-for="(fileSrc, index) in cStore.fileUploadData[
              'ref_videos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="fileSrc.url"
              class="rounded-lg mx-3 w-20"
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('ref_videos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
        </div>
      </div>
    </div> -->

    <!--- Row 5-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6" v-if="userType === 'A'">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary">
          Add Root Cause Analysis
        </label>
        <textarea
          v-model="formData.rca"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          rows="3"
          name="rca"
          placeholder="Add Root Cause Analysis"
        ></textarea>
      </div>
      
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary">
          Add Corrective Action
        </label>
        <textarea
          v-model="formData.corrective_action"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          rows="3"
          name="corrective_action"
          placeholder="Add Corrective Action"
        ></textarea>
      </div>
    </div>

    <!--- Row 6-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6" v-if="userType === 'A'">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Complaint Research Team</label
        >
        <input
          v-model="formData.crteam"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="crteam"
          placeholder="Complaint Research Team"
        />
      </div>

      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Prepared by</label
        >
        <input
          v-model="formData.prepared_by"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="prepared_by"
          placeholder="Prepared by"
        />
      </div>
    </div>

    <!--- Row 7-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6" v-if="userType === 'A'">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Start Date</label
        >
        <Datepicker
          v-model="formData.start_date"
          type="date"
          :name="start_date"
          placeholder="Start Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>

      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >End Date</label
        >
        <Datepicker
          v-model="formData.end_date"
          type="date"
          :name="end_date"
          placeholder="End Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>

    <!--- Row 8-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Complaint Status</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="comp_status"
          v-model="formData.comp_status"
        >
          <option
            v-for="(option, indexOption) in complaintStatusOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2" v-if="userType === 'A'">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Customer Name</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="customer_id"
          v-model="formData.customer_id"
        >
          <option
            v-for="(option, indexOption) in customersList"
            :key="indexOption"
            :value="option.key"
          >
            {{ option.value }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button
        class="text-sm text-white rounded-lg bg-primary px-4 py-2"
        @click="addComplaint"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { complaintStore } from "../../store/complaint";
import { customerStore } from "../../store/customers";
import { getCurrentDateFormatted } from "@/lib/utils";
import documentImage from "@/assets/images/file/document.png";

const userDetails = localStorage.getItem('userDetails');
const userType = userDetails ? JSON.parse(userDetails).type : null;
const customerId = userDetails ? JSON.parse(userDetails).customer_id : null;

const emit = defineEmits(["addComplaint", "updateComplaint"]);
const props = defineProps(["prefillData"]);
const cStore = complaintStore();
const csStore = customerStore();

const formData = ref({});
const complaintStatusOptions = ref({
  Active: "In Progress",
  InActive: "Completed",
});
const customersList = ref([]);

const addComplaint = (e) => {
  e.preventDefault();
  let payload = {
    gofor: props.prefillData ? "editcomplaint" : "addcomplaint",
    po_number: formData.value.po_number || "",
    total_quantity: formData.value.total_quantity || "",
    defective_quantity: formData.value.defective_quantity || "",
    def_of_defect: formData.value.def_of_defect || "",
    defect_photos: cStore.fileUploadData["defect_photos"]
      .map((v) => v.url)
      .toLocaleString() || "",
    defect_videos: cStore.fileUploadData["defect_videos"]
      .map((v) => v.url)
      .toLocaleString() || "",
    rca: formData.value.rca || "",
    corrective_action: formData.value.corrective_action || "",
    crteam: formData.value.crteam || "",
    ref_photos: cStore.fileUploadData["ref_photos"]
      .map((v) => v.url)
      .toLocaleString() || "",
    ref_videos: cStore.fileUploadData["ref_videos"]
      .map((v) => v.url)
      .toLocaleString() || "",
    start_date: formatDate(formData.value.start_date) || "",
    end_date: formatDate(formData.value.end_date) || "",
    prepared_by: formData.value.prepared_by || "",
    comp_status: formData.value.comp_status || "",
    customer_id: userType === 'A' ? formData.value.customer_id : customerId
  };

  if (props.prefillData) {
    payload["status"] = 1;
    payload["complaint_no"] = props.prefillData.complaint_no;
    payload["complaint_date"] = props.prefillData.complaint_date;
  }
  emit("addComplaint", payload);
};

onMounted(async () => {
  if (props.prefillData) {
    formData.value.po_number = props.prefillData.po_number,
    formData.value.total_quantity= props.prefillData.total_quantity,
    formData.value.defective_quantity= props.prefillData.defective_quantity,
    formData.value.def_of_defect= props.prefillData.def_of_defect,
    formData.value.rca= props.prefillData.rca,
    formData.value.corrective_action= props.prefillData.corrective_action,
    formData.value.crteam= props.prefillData.crteam,
    formData.value.start_date= props.prefillData.start_date,
    formData.value.end_date= props.prefillData.end_date,
    formData.value.prepared_by= props.prefillData.prepared_by,
    formData.value.comp_status= props.prefillData.comp_status,
    formData.value.customer_id= props.prefillData.customer_id;
      
    if (props.prefillData.defect_photos) {
      const fipurls = props.prefillData.defect_photos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "defect_photos" };
      });
      cStore.fileUploadData["defect_photos"] = fip;
    }
    if (props.prefillData.defect_videos) {
      const fipurls = props.prefillData.defect_videos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "defect_videos" };
      });
      cStore.fileUploadData["defect_videos"] = fip;
    }
    if (props.prefillData.ref_photos) {
      const fipurls = props.prefillData.ref_photos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "ref_photos" };
      });
      cStore.fileUploadData["ref_photos"] = fip;
    }
    if (props.prefillData.ref_videos) {
      const fipurls = props.prefillData.ref_videos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "ref_videos" };
      });
      cStore.fileUploadData["ref_videos"] = fip;
    }
  } else {
    cStore.$resetFileData();
    formData.value.comp_status = 'In Progress'
  }

  if(userType === 'A') {
    getCustomers();
  }
});

const getCustomers = () => {
  csStore.$getCustomers().then((res) => {
    res.map((v) => {
      const { name, customer_id } = v;
      customersList.value.push({
        key: customer_id,
        value: name
      });
    });
  });
};

const format = (dateString) => {
  return getCurrentDateFormatted(dateString);
};

const showFilePreview = (fieldName) => {
  return (
    cStore.fileUploadData[fieldName] &&
    cStore.fileUploadData[fieldName].length > 0
  );
};

const removeFile = (fieldName, indexToRemove) => {
  cStore.fileUploadData[fieldName].splice(indexToRemove, 1);
};

const openDocument = (src) => {
  window.open(src, "_blank");
};

const formatDate = (inputDate) => {
  if (inputDate) {
    return getCurrentDateFormatted(inputDate);
  } else {
    return "";
  }
};

const updateFormData = (event, fName) => {
  // cStore.$resetFileData();
  const files = event.target.files;

  Promise.all(Array.from(files).map((file) => readFileAsBase64(file))).then(
    (base64Array) => {
      base64Array.map((v) => {
        const payload = {
          gofor: fName,
          imgname: v,
        };
        cStore.$fileUpload(payload);
      });
    }
  );
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result.split(",")[1]);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
</script>

<style lang="scss" scoped>
form {
  :deep(.dp__input_wrap .dp__pointer) {
    border-color: rgba(0, 0, 0, 0.2) !important;
    color: #5f6c91;
    font-size: 14px;
    border-radius: 8px !important;
  }
  :deep(.dp__input_wrap .dp__input_focus) {
    border-color: #016302 !important;
  }
}
</style>
