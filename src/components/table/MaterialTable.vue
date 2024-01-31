<template>
  <section>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
          <div
            class="overflow-hidden border border-gray-200 md:rounded-lg bg-white"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-secondary"
                    v-for="(header, index) in tableHeader"
                    :key="index"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 text-secondary">
                <tr
                  v-for="(data, tableIndex) in filteredTableData()"
                  :key="tableIndex"
                >
                  <td
                    class="py-3.5 px-4 text-sm text-left rtl:text-right text-secondary font-light whitespace-nowrap"
                    v-for="(columnValue, columnKey, colIndex) in data"
                    :key="colIndex"
                  >
                    <div
                      v-if="
                        columnKey === 'customer_id' ||
                        columnKey === 'courier_id'
                      "
                      class="flex space-x-2"
                    >
                      <editIcon @click="onEdit(data)" class="text-primary cursor-pointer" />
                      <deleteIcon @click="onDelete(data)" class="text-red cursor-pointer" />
                    </div>
                    <div
                      v-else-if="
                        columnKey === 'order_id'
                      "
                      class="flex space-x-2"
                    >
                      <editIcon @click="onEdit(data)" class="text-primary cursor-pointer" />
                      <deleteIcon @click="onDelete(data)" class="text-red cursor-pointer" />
                      <navigateIcon @click="navigateTo(data)"></navigateIcon>
                    </div>
                    <div v-else-if="columnKey === 'action'" class="flex space-x-2">
                      <button
                        class="text-sm text-white rounded-lg bg-primary px-2 py-1"
                        @click="onviewDetails(data)"
                      >
                        View
                      </button>
                    </div>
                    <div v-else-if="columnKey === 'project_status'">
                      <span
                        v-if="columnValue === 'Completed'"
                        class="border border-[green] rounded-2xl text-[green] px-4 py-1 font-smibold"
                      >
                        {{ columnValue }}
                      </span>
                      <span
                        v-if="columnValue === 'In Progress'"
                        class="border border-[orange] rounded-2xl text-[orange] px-4 py-1 font-smibold"
                      >
                        {{ columnValue }}
                      </span>
                    </div>
                    <div
                      class="flex items-center"
                      v-else-if="columnKey !== 'status'"
                    >
                      <div>
                        <p class="text-secondary whitespace-no-wrap">
                          {{ columnValue }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 sm:flex sm:items-center sm:justify-between">
      <div class="text-sm text-secondary font-medium">
        Showing
        <span class="font-medium text-gray-700"
          >{{ itemFrom() + 1 }} - {{ itemTo() }} of {{ tableData.length }}</span
        >
      </div>

      <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-secondary capitalize transition-colors duration-200 border rounded-md sm:w-auto gap-x-2"
          @click="loadPrevItems"
          :disabled="diablePrev"
          :class="diablePrev ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span> previous </span>
        </button>

        <button
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-secondary capitalize transition-colors duration-200 border rounded-md sm:w-auto gap-x-2"
          @click="loadNextItems"
          :disabled="diableNext"
          :class="diableNext ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'"
        >
          <span> Next </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import editIcon from "../../assets/icons/edit.vue";
import deleteIcon from "../../assets/icons/delete.vue";
import navigateIcon from "../../assets/icons/navigateIcon.vue";

const props = defineProps(["tableHeader", "tableData"]);
const emit = defineEmits(["edit", "delete", "viewDetails"]);

const currentPage = ref(0);
const itemsPerPage = ref(10);
const searchedText = ref("");

const router = useRouter();

const onEdit = (val) => {
  emit("edit", val);
};

const onDelete = (val) => {
  emit("delete", val.customer_id || val.order_id || val.courier_id);
};

const onviewDetails = (val) => {
  emit("viewDetails", val);
};

const diablePrev = computed(() => {
  return currentPage.value === 0;
});

const diableNext = computed(() => {
  const tableDataLength = [...props.tableData];
  return itemFrom() + itemsPerPage.value > tableDataLength.length;
});

const itemFrom = () => {
  let itemFrom = 0;
  if (currentPage.value !== 0) {
    itemFrom = currentPage.value * itemsPerPage.value;
  }
  return itemFrom;
};

const itemTo = () => {
  const tableDataLength = [...props.tableData];
  if (itemFrom() + itemsPerPage.value > tableDataLength.length) {
    return tableDataLength.length;
  } else {
    return (currentPage.value + 1) * itemsPerPage.value;
  }
};

const filteredTableData = () => {
  const tData = [...props.tableData];
  //refactor this later
  //   if (searchedText.value.length > 0) {
  //     const filterBySearchText = tData.filter((object) =>
  //       Object.values(object).some(
  //         (value) =>
  //           typeof value === "string" &&
  //           value
  //             .toLocaleLowerCase()
  //             .includes(searchedText.value.toLocaleLowerCase())
  //       )
  //     );
  //     return filterBySearchText.splice(itemFrom(), itemsPerPage.value);
  //   } else {
  return tData.splice(itemFrom(), itemsPerPage.value);
  //   }
};

const loadPrevItems = () => {
  currentPage.value = currentPage.value - 1;
};

const loadNextItems = () => {
  currentPage.value = currentPage.value + 1;
};

const navigateTo = (data) => {
  console.log(data?.order_id);
  router.push("/order/view/"+data?.order_id);
}
</script>
