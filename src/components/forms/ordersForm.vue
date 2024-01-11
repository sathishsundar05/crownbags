<template>
  <form class="mt-[25px]">
    <div
      class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6"
      v-for="(fields, indexFields) in fields"
      :key="indexFields"
    >
      <div
        class="w-full lg:w-1/2 mb-6 lg:mb-0"
        v-for="(field, indexField) in fields.fieldgroup"
        :key="indexField"
      >
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-secondary"
          >{{ field.label }}</label
        >
        <input
          v-if="field.fieldType === 'text'"
          v-model="field.fieldValue"
          class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
          :disabled="field.state === 1"
        />
        <Datepicker
          v-else-if="field.fieldType === 'date'"
          v-model="field.fieldValue"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
        />
        <div v-else-if="field.fieldType === 'select'">
          <select
            v-if="field.optionsSource === 'local'"
            class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
            :name="field.fieldName"
            v-model="field.fieldValue"
          >
            <option
              v-for="(option, indexOption) in field.options"
              :key="indexOption"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <select
            v-else-if="field.optionsSource === 'dynamic'"
            class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
            :name="field.fieldName"
            v-model="field.fieldValue"
          >
            <option
              v-for="(option, indexOption) in customerList"
              :key="indexOption"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <input
          v-if="field.fieldType === 'calculate'"
          v-model="calculateDateBetween"
          class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
          :disabled="field.state === 1"
        />
        <div v-else-if="field.fieldType === 'file'">
          <input
            class="block w-full text-sm text-gray-900 border border-secondary rounded-lg cursor-pointer bg-gray-50"
            type="file"
            :accept="field.accept"
            :multiple="field.allowMultiple"
            @change="updateFormData($event)"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end pt-4">
      <button
        class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
        @click="addOrder"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import OrderFormSchema from "../../schema/orderFormSchema.json";
import { get } from "lodash";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { customerStore } from "../../store/customers";

const emit = defineEmits(["addOrder", "updateOrder"]);
const props = defineProps(["prefillData"]);
const mobilenumber = ref("");
const username = ref("");
const password = ref("");
const name = ref("");
const status = ref("");
const fields = ref("");
const cStore = customerStore();
const customerList = ref([]);

const format = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const addOrder = (e) => {
  e.preventDefault();
  let payload = {
    customer_name: get(fields.value, "0.fieldgroup.0.fieldValue", ""),
    po_number: get(fields.value, "0.fieldgroup.1.fieldValue", ""),
    po_date: get(fields.value, "1.fieldgroup.0.fieldValue", ""),
    extrusion: get(fields.value, "1.fieldgroup.1.fieldValue", ""),
    weaving: get(fields.value, "2.fieldgroup.0.fieldValue", ""),
    lamination: get(fields.value, "2.fieldgroup.1.fieldValue", ""),
    printing: get(fields.value, "3.fieldgroup.0.fieldValue", ""),
    stitching: get(fields.value, "3.fieldgroup.1.fieldValue", ""),
    final_quality_inspection: get(
      fields.value,
      "4.fieldgroup.0.fieldValue",
      ""
    ),
    cargo_stuffing_date: get(fields.value, "4.fieldgroup.1.fieldValue", ""),
    container_number: get(fields.value, "5.fieldgroup.0.fieldValue", ""),
    shipping_line: get(fields.value, "5.fieldgroup.1.fieldValue", ""),
    on_board_date: get(fields.value, "6.fieldgroup.0.fieldValue", ""),
    port_of_loading: get(fields.value, "6.fieldgroup.1.fieldValue", ""),
    eta_transhipment_port_1: get(fields.value, "7.fieldgroup.0.fieldValue", ""),
    etd_transhipment_port_1: get(fields.value, "7.fieldgroup.1.fieldValue", ""),
    eta_transhipment_port_2: get(fields.value, "8.fieldgroup.0.fieldValue", ""),
    etd_transhipment_port_2: get(fields.value, "8.fieldgroup.1.fieldValue", ""),
    eta_discharge_port: get(fields.value, "9.fieldgroup.0.fieldValue", ""),
    eta_final_destination: get(fields.value, "9.fieldgroup.1.fieldValue", ""),
    total_lead_time: calculateDateBetween.value,
    final_inspection_photos: get(
      fields.value,
      "10.fieldgroup.1.fieldValue",
      ""
    ),
    final_inspection_report: get(
      fields.value,
      "11.fieldgroup.0.fieldValue",
      ""
    ),
    bag_test_report: get(fields.value, "11.fieldgroup.1.fieldValue", ""),
    bag_test_photos: get(fields.value, "12.fieldgroup.0.fieldValue", ""),
    stuffing_photo: get(fields.value, "12.fieldgroup.1.fieldValue", ""),
    sample_inspection_photos: get(
      fields.value,
      "13.fieldgroup.0.fieldValue",
      ""
    ),
    sample_inspection_report: get(
      fields.value,
      "13.fieldgroup.1.fieldValue",
      ""
    ),
    sample_tracking_number: get(fields.value, "14.fieldgroup.0.fieldValue", ""),
    tracking_link: get(fields.value, "14.fieldgroup.1.fieldValue", ""),
    project_status: get(fields.value, "15.fieldgroup.0.fieldValue", ""),
    status: get(fields.value, "15.fieldgroup.1.fieldValue", ""),
  };
  emit("addOrder", payload);
};

onMounted(() => {
  cStore.$getCustomers().then((res) => {
    customerList.value = res;
  });

  fields.value = OrderFormSchema;
  if (props.prefillData) {
    mobilenumber.value = props.prefillData.mobilenumber;
    username.value = props.prefillData.username;
    password.value = props.prefillData.password;
    name.value = props.prefillData.name;
    status.value = props.prefillData.status;
  }
});

const calculateDateBetween = computed(() => {
  if (
    fields.value[1].fieldgroup[0].fieldValue &&
    fields.value[1].fieldgroup[0].fieldValue
  ) {
    const date1 = new Date(fields.value[1].fieldgroup[0].fieldValue);
    const date2 = new Date(fields.value[9].fieldgroup[1].fieldValue);
    const differenceInMs = Math.abs(date2 - date1);
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysDifference;
  } else {
    return "";
  }
});

const updateFormData = (event) => {
  const reader = new FileReader();
  const files = event.target.files;

  for (const file of files) {
    readAndLogFile(file);
  }
};

const readAndLogFile = (file) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    const fileBase64 = e.target.result.split(",")[1];
    console.log(fileBase64);
  };

  reader.readAsDataURL(file);
};
</script>

<style lang="scss" scoped>
form {
  :deep(.dp__input_wrap .dp__pointer) {
    border-color: #5f6c91 !important;
    color: #5f6c91;
    font-size: 14px;
    border-radius: 8px !important;
  }
}
</style>
