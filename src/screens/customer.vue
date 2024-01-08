<template>
  <div>
    <div class="lg:px-32 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-32 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Customers</h3>

        <button
          class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
          @click="openForm = !openForm"
        >
          Add Customer
        </button>

        <DialogRoot :open="openForm">
          <DialogPortal>
            <DialogOverlay
              class="bg-black bg-opacity-40 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
            />
            <DialogContent
              class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
            >
              <DialogTitle class="m-0 text-secondary font-semibold">
                Add Customer
              </DialogTitle>

              <customerForm @addCustomers="addCustomers" @updateCustomers="updateCustomers" :prefillData="prefillData" />

              <DialogClose
                class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                @click="openForm = !openForm"
              >
                <closeIcon></closeIcon>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
      <Table
        :tableData="tableData"
        :tableHeader="tableHeader"
        @editCustomer="editCustomer"
        @deleteCustomer="deleteCustomer"
      />
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/navbar/navbar.vue";
import Footer from "../components/footer/footer.vue";
import Table from "../components/table/table.vue";
import customerForm from "../components/forms/customerForm.vue";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { customerStore } from "../store/customers";
import closeIcon from "../assets/icons/close.vue";

const cStore = customerStore();
const tableHeader = ref([
  "Customer Name",
  "Contact Number",
  "User Name",
  "Password",
  "Action",
]);
const tableData = ref([]);
const openForm = ref(false);
const prefillData = ref('');

onMounted(() => {
  getCustomers();
});

const getCustomers = () => {
  cStore.$getCustomers().then((res) => {
    res.map((v) => {
      const { name, mobilenumber, username, password, customer_id } = v;
      tableData.value.push({
        name,
        mobilenumber,
        username,
        password,
        customer_id,
      });
    });
  });
};

const addCustomers = (payload) => {
  cStore.$addCustomer(payload).then((res) => {
    openForm.value = false;
    // getCustomers();
    window.location.reload();
  });
};

const editCustomer = (payload) => {
  prefillData.value = payload;
  openForm.value = true;
};

const updateCustomers = (payload) => {
  cStore.$updateCustomer(payload).then((res) => {});
}

const deleteCustomer = (id) => {
  cStore.$deleteCustomer(id).then((res) => {
    // getCustomers();
    window.location.reload();
  });
};
</script>
