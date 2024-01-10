<template>
    <div class="py-2">
      <div class="overflow-x-auto">
        <div class="overflow-y-auto h-[calc(100vh-300px)]">
          <table class="table-auto min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-5  bg-gray-100 text-left text-sm font-bold text-secondary uppercase tracking-wider"
                  v-for="header, index in tableHeader"
                  :key="index"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-secondary border-opacity-20" v-for="data, tableIndex in tableData" :key="tableIndex">
                <td class="px-5 py-5 bg-white text-sm" v-for="columnValue, columnKey, colIndex in data" :key="colIndex">
                  <div v-if="columnKey === 'customer_id' || columnKey === 'order_id'" class="flex space-x-2">
                    <editIcon @click="onEdit(data)" />
                    <deleteIcon @click="onDelete(data)" />
                  </div>
                  <div class="flex items-center" v-else-if="columnKey !== 'status'">
                    <div class="ml-3">
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
</template>

<script setup>
import editIcon from '../../assets/icons/edit.vue';
import deleteIcon from '../../assets/icons/delete.vue';

const props = defineProps(["tableHeader", "tableData"]);
const emit = defineEmits(["edit", "delete"])

const onEdit = (val) => {
  emit("edit", val);
}

const onDelete = (val) => {
  emit("delete", val.customer_id || val.order_id);
}
</script>