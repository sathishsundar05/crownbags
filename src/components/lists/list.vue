<template>
  <div class="grid grid-cols-2 gap-5 w-full p-6 justify-center font-serif">
    <div
      class="text-secondary two-col-layout rounded-md px-1 py-1 w-full text-black"
      v-for="(list, name, index) in fieldLists"
      :key="index"
    >
      <span v-if="name ==='project_status'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Order Status:
      </span>
      <span v-else-if="name ==='tracking_link'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Sample tracking link:
      </span>
      <span v-else-if="name ==='on_board_date'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed On Board Date:
      </span>
      <span v-else-if="name ==='ETA_transhipment_port_1'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETA Transhipment Port-1:
      </span>
      <span v-else-if="name ==='actual_eta_transhipment_port_1'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETA Transhipment Port-1:
      </span>

      <span v-else-if="name ==='ETD_transhipment_port_1'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETD Transhipment Port-1:
      </span>
      <span v-else-if="name ==='actual_etd_transhipment_port_1'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETD Transhipment Port-1:
      </span>
      <span v-else-if="name ==='ETA_transhipment_port_2'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETA Transhipment Port-2:
      </span>
      <span v-else-if="name ==='actual_eta_transhipment_port_2'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETA Transhipment Port-2:
      </span>
      <span v-else-if="name ==='ETD_transhipment_port_2'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETD Transhipment Port-2:
      </span>
      <span v-else-if="name ==='actual_etd_transhipment_port_2'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETD Transhipment Port-2:
      </span>
      <span v-else-if="name ==='ETA_discharge_port'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETA Discharge Port:
      </span>
      <span v-else-if="name ==='actual_eta_discharge_port'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETA Discharge Port:
      </span>
      <span v-else-if="name ==='ETA_final_destination'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Proposed ETA Final Destination:
      </span>
      <span v-else-if="name ==='actual_eta_final_destination'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Actual ETA Final Destination:
      </span>

      <span v-else class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >{{ name.replaceAll("_", " ") }}:
      </span>

      <span
        v-if="name === 'project_status' && list === 'Completed'"
        class="bg-[green] rounded-2xl text-white px-4 py-2 ml-2 font-smibold font-sans"
      >
        {{ list }}
      </span>
      <span
        v-else-if="name === 'project_status' && list === 'In Progress'"
        class="bg-[orange] rounded-2xl text-white px-4 py-2 ml-2 font-smibold font-sans"
      >
        {{ list }}
      </span>
      <span
        v-else-if="name === 'tracking_link'"
        class="p-2 ml-2 font-smibold font-sans"
      >
        <template v-if="list === ''">Not Applicable</template>
        <template v-else><a :href="list" target="_blank" class="text-primary">View link</a></template>
      </span>
      <span v-else-if="name === 'delivery_address'" class="font-smibold ml-2 font-sans">
        {{ deliveryAddress }}
      </span>
      <span v-else-if="name === 'customer_po'" class="font-smibold ml-2 font-sans">
        <template v-if="list === ''">Not Applicable</template>
        <template v-else><a :href="list" target="_blank" class="text-primary">View Purchase Order</a></template>
      </span>
      <span v-else class="font-smibold font-sans ml-2">
        <template v-if="list === ''">Not Applicable</template>
        <template v-else>{{ list }}</template>
      </span>
    </div>
  </div>
  <div class="flex flex-col w-full p-6">
    <div
      class="text-secondary sample rounded-md px-1 py-4 w-full"
      v-for="(list, name, index) in fileFieldLists"
      :key="index"
    >
      <span v-if="name ==='sample_inspection_report'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Production Sample Inspection Report:
      </span>
      <span v-else-if="name ==='sample_inspection_photos'" class="capitalize font-sans text-[#57658f] text-[16px] font-bold"
        >Production Sample Inspection Photos:
      </span>
      <span v-else class="capitalize font-sans text-[16px] font-bold"
        >{{ name.replaceAll("_", " ") }}:
      </span>
      <div
        v-if="filePreview.includes(name)"
        class="border border-black-light w-full mt-3 rounded grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 place-items-center overflow-x-scroll max-h-[300px]"
        :class="isDocument.includes(name) ? 'grid-cols-8' : 'grid-cols-2'"
      >
      <div class="col-span-1" v-for="(fileSrc, index) in list.split(',')" :key="index">
        <img
          v-if="fileSrc"
          :src="isDocument.includes(name) ? documentImage : fileSrc"
          class="rounded-lg mx-3 cursor-pointer"
          :class="isDocument.includes(name) ? 'w-20' : 'w-32 h-32 object-cover'"
          @click="openDocument(fileSrc)"
        />
        <div v-else>Not Applicable</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { omit, pick, mapKeys, cloneDeep } from "lodash";
import documentImage from "@/assets/images/file/document.png";

const ignoreKeys = ref([
  "order_id",
  "customer_id",
  "delivery_country",
  "delivery_pincode",
])

const fileTypeFields = ref([
  "final_inspection_report",
  "bag_test_report",
  "sample_inspection_report",
  "final_inspection_photos",
  "final_inspection_report",
  "bag_test_report",
  "bag_test_photos",
  "stuffing_photo",
  "sample_inspection_photos",
  "sample_inspection_report",
])

const filePreview = ref([
  "final_inspection_photos",
  "final_inspection_report",
  "bag_test_report",
  "bag_test_photos",
  "stuffing_photo",
  "sample_inspection_photos",
  "sample_inspection_report",
]);

const isDocument = ref([
  "final_inspection_report",
  "bag_test_report",
  "sample_inspection_report",
]);

const deliveryAddress = ref('');

const props = defineProps(["listItems"]);

const ignoredListItems = computed(() => {
  const data = cloneDeep(props.listItems);
  if(data?.delivery_address && data?.delivery_country && data?.delivery_pincode) {
    deliveryAddress.value = data?.delivery_address + ", " + data?.delivery_country + ", " + data?.delivery_pincode;
  }
  return omit(data, ignoreKeys.value);
})

const fieldLists = computed(() => {
  const caseChange = mapKeys(ignoredListItems.value, (value, oldKey) => {
    if (
      oldKey === 'eta_final_destination'
    ) {
      return 'ETA_final_destination';
    } else if(oldKey === 'eta_discharge_port') {
      return 'ETA_discharge_port';
    } else if (oldKey === 'eta_transhipment_port_1') {
      return 'ETA_transhipment_port_1';
    }
    else if (oldKey === 'eta_transhipment_port_2') {
      return 'ETA_transhipment_port_2';
    }
    else if (oldKey === 'etd_transhipment_port_1') {
      return 'ETD_transhipment_port_1';
    }
    else if (oldKey === 'etd_transhipment_port_2') {
      return 'ETD_transhipment_port_2';
    } else if(oldKey === 'po_number') {
      return 'PO_number';
    } else if(oldKey === 'po_date') {
      return 'PO_date';
    } 

    if(oldKey === 'delivery_address') {
      value = deliveryAddress.value
    }
    return oldKey;
  });

  return omit(caseChange, fileTypeFields.value);
})

const fileFieldLists = computed(() => {
  return pick(ignoredListItems.value, fileTypeFields.value);
})

const splice = (object, number, number2) => {
  var newObj = {};

  if (!number2) {
    number2 = 1;
  }
  Object.entries(object).forEach(function([key, item], index) {

    if (index >= number && index - number < number2) {
      newObj[key] = item
    }
  })
  return newObj;
}

const firstGroup = () => {
  returnsplice(fileFieldLists.value, 0, 1);
  return fileFieldLists.value;
}

const openDocument = (src) => {
  window.open(src, "_blank");
}
</script>
