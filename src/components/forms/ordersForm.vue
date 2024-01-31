<template>
  <form class="mt-[25px]">
    <div
      class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6"
      v-for="(fields, indexFields) in fields"
      :key="indexFields"
    >
      <div
        class="mb-6 lg:mb-0"
        v-for="(field, indexField) in fields.fieldgroup"
        :key="indexField"
        :class="field.width"
      >
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-secondary"
          >{{ field.label }}</label
        >
        <input
          v-if="field.fieldType === 'text'"
          v-model="field.fieldValue"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
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
          auto-apply
        />
        <div v-else-if="field.fieldType === 'select'">
          <select
            v-if="field.optionsSource === 'local'"
            class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
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
          <div v-else-if="field.optionsSource === 'dynamic'">
            <select
              v-if="field.fieldName == 'tracking_link'"
              class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
              :name="field.fieldName"
              v-model="field.fieldValue"
              @change="setTrackingId(field.fieldValue)"
            >
              <option
                v-for="(option, indexOption) in getOptions(
                  field.optionsSourceKey
                )"
                :key="indexOption"
                :value="option.key"
              >
                {{ option.value }}
              </option>
            </select>
            <select
              v-else
              class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
              :name="field.fieldName"
              v-model="field.fieldValue"
            >
              <option
                v-for="(option, indexOption) in getOptions(
                  field.optionsSourceKey
                )"
                :key="indexOption"
                :value="option.key"
              >
                {{ option.value }}
              </option>
            </select>
          </div>
        </div>
        <input
          v-if="field.fieldType === 'calculate'"
          v-model="calculateDateBetween"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
          :disabled="field.state === 1"
        />
        <div v-else-if="field.fieldType === 'file'">
          <input
            class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
            type="file"
            :accept="field.accept"
            :multiple="field.allowMultiple"
            @change="updateFormData($event, field.fieldName)"
          />
          <div
            v-if="showFilePreview(field.fieldName)"
            class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
            :class="
              isDocument.includes(field.fieldName)
                ? 'grid-cols-8'
                : 'grid-cols-6'
            "
          >
            <div
              v-for="(fileSrc, index) in oStore.fileUploadData[field.fieldName]"
              :key="index"
              class="relative group"
            >
              <img
                :src="
                  isDocument.includes(field.fieldName)
                    ? documentImage
                    : fileSrc.url
                "
                class="rounded-lg mx-3"
                :class="
                  isDocument.includes(field.fieldName)
                    ? 'w-20'
                    : 'object-cover w-32 h-32'
                "
                @click="openDocument(fileSrc.url)"
              />
              <span
                class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
                @click="removeFile(field.fieldName, index)"
                ><closeIcon
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end pt-4">
      <button
        class="text-sm text-white rounded-lg bg-primary px-4 py-2"
        @click="addOrder"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { get, set } from "lodash";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { customerStore } from "../../store/customers";
import { orderStore } from "../../store/orders";
import { courierStore } from "../../store/courier";
import documentImage from "@/assets/images/file/document.png";
import closeIcon from "@/assets/icons/close.vue";
import { cloneDeep } from "lodash";
import { getCurrentDateFormatted } from "@/lib/utils";

const emit = defineEmits(["addOrder", "updateOrder"]);
const props = defineProps(["prefillData"]);
const fields = ref("");
const cStore = customerStore();
const oStore = orderStore();
const coStore = courierStore();
const customerList = ref([]);
const courierList = ref([]);
const isDocument = ref([
  "final_inspection_reports",
  "bag_test_reports",
  "sample_inspection_reports",
]);
const trackinglinkId = ref('');

const format = (dateString) => {
  return getCurrentDateFormatted(dateString);
};

const addOrder = (e) => {
  e.preventDefault();
  let payload = {
    gofor: props.prefillData ? "editorders" : "addorders",
    po_number: get(fields.value, "0.fieldgroup.1.fieldValue", ""),
    customer_id: get(fields.value, "0.fieldgroup.0.fieldValue", ""),
    po_date: formatDate(get(fields.value, "1.fieldgroup.0.fieldValue", "")),
    extrusion: get(fields.value, "1.fieldgroup.1.fieldValue", ""),
    weaving: get(fields.value, "2.fieldgroup.0.fieldValue", ""),
    lamination: get(fields.value, "2.fieldgroup.1.fieldValue", ""),
    printing: get(fields.value, "3.fieldgroup.0.fieldValue", ""),
    stitching: get(fields.value, "3.fieldgroup.1.fieldValue", ""),
    final_quality_inspection: formatDate(
      get(fields.value, "4.fieldgroup.0.fieldValue", "")
    ),
    cargo_stuffing_date: formatDate(
      get(fields.value, "4.fieldgroup.1.fieldValue", "")
    ),
    container_number: get(fields.value, "5.fieldgroup.0.fieldValue", ""),
    shipping_line: get(fields.value, "5.fieldgroup.1.fieldValue", ""),
    on_board_date: formatDate(
      get(fields.value, "6.fieldgroup.0.fieldValue", "")
    ),
    port_of_loading: get(fields.value, "6.fieldgroup.1.fieldValue", ""),
    eta_transhipment_port_1: formatDate(
      get(fields.value, "7.fieldgroup.0.fieldValue", "")
    ),
    etd_transhipment_port_1: formatDate(
      get(fields.value, "7.fieldgroup.1.fieldValue", "")
    ),
    eta_transhipment_port_2: formatDate(
      get(fields.value, "8.fieldgroup.0.fieldValue", "")
    ),
    etd_transhipment_port_2: formatDate(
      get(fields.value, "8.fieldgroup.1.fieldValue", "")
    ),
    discharge_port: get(fields.value, "9.fieldgroup.0.fieldValue", ""),
    eta_discharge_port: formatDate(
      get(fields.value, "9.fieldgroup.1.fieldValue", "")
    ),
    eta_final_destination: formatDate(
      get(fields.value, "10.fieldgroup.0.fieldValue", "")
    ),
    total_lead_time: calculateDateBetween.value.split(" days")[0],
    final_inspection_photos: oStore.fileUploadData["final_inspection_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    final_inspection_report: oStore.fileUploadData["final_inspection_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    bag_test_report: oStore.fileUploadData["bag_test_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    bag_test_photos: oStore.fileUploadData["bag_test_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    stuffing_photo: oStore.fileUploadData["stuffing_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_inspection_photos: oStore.fileUploadData["sample_inspection_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_inspection_report: oStore.fileUploadData["sample_inspection_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_tracking_number: get(fields.value, "11.fieldgroup.0.fieldValue", ""),
    tracking_link: get(fields.value, "13.fieldgroup.0.fieldValue", ""),
    project_status: get(fields.value, "21.fieldgroup.0.fieldValue", ""),
    delivery_address: get(fields.value, "11.fieldgroup.1.fieldValue", ""),
    delivery_country: get(fields.value, "12.fieldgroup.0.fieldValue", ""),
    delivery_pincode: get(fields.value, "12.fieldgroup.1.fieldValue", ""),
    tracking_id: trackinglinkId.value,
  };
  if (props.prefillData) {
    const statusValue = get(fields.value, "21.fieldgroup.1.fieldValue", "");
    if (statusValue === "InActive") {
      payload["status"] = 0;
    }
    if (statusValue === "Active") {
      payload["status"] = 1;
    }
    payload["order_id"] = props.prefillData.order_id;
    trackinglinkId.value = props.prefillData.tracking_id;
  }
  emit("addOrder", payload);
};

onMounted(async () => {
  const module = await import("../../schema/orderFormSchema.json");
  fields.value = cloneDeep(module.default);
  cStore.$getCustomers().then((res) => {
    customerList.value = res;
  });

  coStore.$getCouriers().then((res) => {
    courierList.value = res;
  });

  if (props.prefillData) {
    set(fields.value, "0.fieldgroup.1.fieldValue", props.prefillData.po_number);
    set(
      fields.value,
      "0.fieldgroup.0.fieldValue",
      props.prefillData.customer_id
    );
    formatDate(
      set(fields.value, "1.fieldgroup.0.fieldValue", props.prefillData.po_date)
    );
    set(fields.value, "1.fieldgroup.1.fieldValue", props.prefillData.extrusion);
    set(fields.value, "2.fieldgroup.0.fieldValue", props.prefillData.weaving);
    set(
      fields.value,
      "2.fieldgroup.1.fieldValue",
      props.prefillData.lamination
    );
    set(fields.value, "3.fieldgroup.0.fieldValue", props.prefillData.printing);
    set(fields.value, "3.fieldgroup.1.fieldValue", props.prefillData.stitching);
    formatDate(
      set(
        fields.value,
        "4.fieldgroup.0.fieldValue",
        props.prefillData.final_quality_inspection
      )
    );
    formatDate(
      set(
        fields.value,
        "4.fieldgroup.1.fieldValue",
        props.prefillData.cargo_stuffing_date
      )
    );
    set(
      fields.value,
      "5.fieldgroup.0.fieldValue",
      props.prefillData.container_number
    );
    set(
      fields.value,
      "5.fieldgroup.1.fieldValue",
      props.prefillData.shipping_line
    );
    formatDate(
      set(
        fields.value,
        "6.fieldgroup.0.fieldValue",
        props.prefillData.on_board_date
      )
    );
    set(
      fields.value,
      "6.fieldgroup.1.fieldValue",
      props.prefillData.port_of_loading
    );
    formatDate(
      set(
        fields.value,
        "7.fieldgroup.0.fieldValue",
        props.prefillData.eta_transhipment_port_1
      )
    );
    formatDate(
      set(
        fields.value,
        "7.fieldgroup.1.fieldValue",
        props.prefillData.etd_transhipment_port_1
      )
    );
    formatDate(
      set(
        fields.value,
        "8.fieldgroup.0.fieldValue",
        props.prefillData.eta_transhipment_port_2
      )
    );
    formatDate(
      set(
        fields.value,
        "8.fieldgroup.1.fieldValue",
        props.prefillData.etd_transhipment_port_2
      )
    );
    set(
      fields.value,
      "9.fieldgroup.0.fieldValue",
      props.prefillData.discharge_port
    );
    set(
      fields.value,
      "9.fieldgroup.1.fieldValue",
      props.prefillData.eta_discharge_port
    );
    formatDate(
      set(
        fields.value,
        "10.fieldgroup.0.fieldValue",
        props.prefillData.eta_final_destination
      )
    );
    set(
      fields.value,
      "10.fieldgroup.1.fieldValue",
      props.prefillData.total_lead_time
    );
    set(
      fields.value,
      "11.fieldgroup.0.fieldValue",
      props.prefillData.sample_tracking_number
    );
    set(
      fields.value,
      "13.fieldgroup.0.fieldValue",
      props.prefillData.tracking_link
    );
    set(
      fields.value,
      "21.fieldgroup.0.fieldValue",
      props.prefillData.project_status
    );

    set(
      fields.value,
      "11.fieldgroup.1.fieldValue",
      props.prefillData.delivery_address
    );

    set(
      fields.value,
      "12.fieldgroup.0.fieldValue",
      props.prefillData.delivery_country
    );

    set(
      fields.value,
      "12.fieldgroup.1.fieldValue",
      props.prefillData.delivery_pincode
    );

    if (props.prefillData.status === 0) {
      set(fields.value, "21.fieldgroup.1.fieldValue", "InActive");
    }
    if (props.prefillData.status === 1) {
      set(fields.value, "21.fieldgroup.1.fieldValue", "Active");
    }

    if (props.prefillData.final_inspection_photos) {
      const fipurls = props.prefillData.final_inspection_photos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "final_inspection_photos" };
      });
      oStore.fileUploadData["final_inspection_photos"] = fip;
    }

    if (props.prefillData.final_inspection_report) {
      const firurls = props.prefillData.final_inspection_report?.split(",");
      const fir = firurls?.map(function (url) {
        return { url: url.trim(), fieldName: "final_inspection_report" };
      });
      oStore.fileUploadData["final_inspection_reports"] = fir;
    }

    if (props.prefillData.bag_test_report) {
      const btrurls = props.prefillData.bag_test_report?.split(",");
      const btr = btrurls?.map(function (url) {
        return { url: url.trim(), fieldName: "bag_test_reports" };
      });
      oStore.fileUploadData["bag_test_reports"] = btr;
    }

    if (props.prefillData.bag_test_photos) {
      const btpurls = props.prefillData.bag_test_photos?.split(",");
      const btp = btpurls?.map(function (url) {
        return { url: url.trim(), fieldName: "bag_test_photos" };
      });
      oStore.fileUploadData["bag_test_photos"] = btp;
    }

    if (props.prefillData.stuffing_photo) {
      const spurls = props.prefillData.stuffing_photo?.split(",");
      const sp = spurls?.map(function (url) {
        return { url: url.trim(), fieldName: "stuffing_photos" };
      });
      oStore.fileUploadData["stuffing_photos"] = sp;
    }

    if (props.prefillData.sample_inspection_photos) {
      const sipurls = props.prefillData.sample_inspection_photos?.split(",");
      const sip = sipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "sample_inspection_photos" };
      });
      oStore.fileUploadData["sample_inspection_photos"] = sip;
    }

    if (props.prefillData.sample_inspection_report) {
      const sirurls = props.prefillData.sample_inspection_report?.split(",");
      const sir = sirurls?.map(function (url) {
        return { url: url.trim(), fieldName: "sample_inspection_reports" };
      });
      oStore.fileUploadData["sample_inspection_reports"] = sir;
    }
  } else {
    oStore.$resetFileData();
  }
});

const calculateDateBetween = computed(() => {
  if (
    fields.value[1].fieldgroup[0].fieldValue &&
    fields.value[10].fieldgroup[0].fieldValue
  ) {
    const date1 = new Date(fields.value[1].fieldgroup[0].fieldValue);
    const date2 = new Date(fields.value[10].fieldgroup[0].fieldValue);
    const differenceInMs = Math.abs(date2 - date1);
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysDifference + " days";
  } else {
    return "";
  }
});

const updateFormData = (event, fName) => {
  // oStore.$resetFileData();
  const files = event.target.files;

  Promise.all(Array.from(files).map((file) => readFileAsBase64(file))).then(
    (base64Array) => {
      base64Array.map((v) => {
        const payload = {
          gofor: fName,
          imgname: v,
        };
        oStore.$fileUpload(payload);
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

const getOptions = (optionKey) => {
  if (optionKey === "courierList") {
    return courierList.value.map((v) => {
      return {
        key: v.link,
        value: v.name,
      };
    });
  }
  if (optionKey === "customerList") {
    return customerList.value.map((v) => {
      return {
        key: v.customer_id,
        value: v.name,
      };
    });
  }
};

const formatDate = (inputDate) => {
  if (inputDate) {
    return getCurrentDateFormatted(inputDate);
  } else {
    return "";
  }
};

const showFilePreview = (fieldName) => {
  return (
    oStore.fileUploadData[fieldName] &&
    oStore.fileUploadData[fieldName].length > 0
  );
};

const removeFile = (fieldName, indexToRemove) => {
  oStore.fileUploadData[fieldName].splice(indexToRemove, 1);
};

const openDocument = (src) => {
  window.open(src, "_blank");
}

const setTrackingId = (val) => {
  const getNameByLink = courierList.value.find((v) => v.link === val);
  trackinglinkId.value = getNameByLink.courier_id;
}
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
