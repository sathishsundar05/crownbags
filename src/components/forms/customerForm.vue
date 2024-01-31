<template>
  <div class="mt-[25px]">
    <div class="mb-5">
      <label for="name" class="block mb-2 text-sm font-medium text-secondary"
        >Customer Name</label
      >
      <input
        v-model="name"
        type="text"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        required
        placeholder="Customer Name"
      />
    </div>
    <div class="mb-5">
      <label
        for="mobilenumber"
        class="block mb-2 text-sm font-medium text-secondary"
        >Contact Number</label
      >
      <input
        v-model="mobilenumber"
        type="text"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        placeholder="Contact Number"
        required
      />
    </div>
    <div class="mb-5">
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-secondary"
        >User Name</label
      >
      <input
        v-model="username"
        type="text"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        required
        placeholder="User Name"
      />
    </div>
    <div class="mb-5">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-secondary"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
        required
        placeholder="Password"
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
        @click="addCustomer"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(["addCustomers", "updateCustomers"]);
const props = defineProps(["prefillData"])
const mobilenumber = ref("")
const username = ref("")
const password = ref("")
const name = ref("")
const status = ref("")

const addCustomer = () => {
  let payload = {
    "gofor": props.prefillData ? "editcustomers" : "addcustomers",
    "mobilenumber": mobilenumber.value,
    "username": username.value,
    "password": password.value,
    "name": name.value,
    "status": status.value,
  }

  if(props.prefillData) {
    payload['customer_id'] = props.prefillData.customer_id;
  }

  emit("addCustomers", payload);
};

onMounted(() => {
  if(props.prefillData) {
    mobilenumber.value = props.prefillData.mobilenumber;
    username.value = props.prefillData.username;
    password.value = props.prefillData.password;
    name.value = props.prefillData.name;
    status.value = props.prefillData.status;
  }
})
</script>
