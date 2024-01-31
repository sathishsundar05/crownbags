<template>
  <div class="mt-[25px]">
    <div class="mb-5">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-secondary"
        >Name</label
      >
      <input
        v-model="name"
        type="text"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        placeholder="Name"
        required
      />
    </div>
    <div class="mb-5">
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-secondary"
        >Link</label
      >
      <input
        v-model="link"
        type="text"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        required
        placeholder="Link"
      />
    </div>
    <div class="mb-5">
      <label for="status" class="block mb-2 text-sm font-medium text-secondary"
        >Status</label
      >
      <select
        v-model="status"
        id="status"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
      >
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
    <div class="flex justify-end">
      <button
        class="text-sm text-white rounded-lg mt-2 bg-primary px-4 py-2"
        @click="addCourier"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(["addCourier", "updateCouriers"]);
const props = defineProps(["prefillData"])
const name = ref("")
const link = ref("")
const status = ref("")

const addCourier = () => {
  let payload = {
    "gofor": "addcouriers",
    "name": name.value,
    "link": link.value,
    "status": status.value
  };

  emit("addCourier", payload);
};

onMounted(() => {
  if(props.prefillData) {
    name.value = props.prefillData.name,
    link.value = props.prefillData.link,
    status.value = props.prefillData.status
  }
})
</script>
