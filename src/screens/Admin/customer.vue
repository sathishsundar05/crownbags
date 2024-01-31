<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div
        class="flex flex-row space-x-10 justify-between pt-8 pb-3 items-start md:items-center"
      >
        <h3 class="text-xl font-semibold text-secondary">Customers</h3>
        <button
          class="text-sm text-white rounded-lg bg-primary px-4 py-2 w-30"
          @click="openAddForm"
        >
          Add Customer
        </button>

        <DialogRoot :open="openForm">
          <DialogPortal>
            <DialogOverlay
              class="bg-black bg-opacity-40 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
            />
            <DialogContent
              class="overflow-scroll data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
            >
              <DialogTitle class="m-0 text-secondary font-semibold">
                {{ mode }} Customer
              </DialogTitle>

              <customerForm
                @addCustomers="addCustomers"
                :prefillData="prefillData"
              />

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
      <MaterialTable
        :tableData="tableData"
        :tableHeader="tableHeader"
        @edit="editCustomer"
        @delete="deleteCustomer"
      />
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
import MaterialTable from "@/components/table/MaterialTable.vue";
import customerForm from "@/components/forms/customerForm.vue";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { customerStore } from "@/store/customers";
import { menuStore } from "@/store/menu";
import { overlayStore } from "../../store/overlay";
import closeIcon from "@/assets/icons/close.vue";
import searchInput from "@/components/inputs/searchInput.vue";
import { notify } from "notiwind";

const cStore = customerStore();
const mStore = menuStore();
const oStore = overlayStore();
const tableHeader = ref([
  "S.No",
  "Customer Name",
  "Contact Number",
  "User Name",
  "Password",
  "Action",
]);
const tableData = ref([]);
const openForm = ref(false);
const prefillData = ref("");
const mode = ref("Add");

onMounted(() => {
  oStore.$setOverlay(true);
  getCustomers();
});

const getCustomers = () => {
  cStore
    .$getCustomers()
    .then((res) => {
      oStore.$setOverlay(false);
      tableData.value = [];
      res.map((v, index) => {
        const { name, mobilenumber, username, password, customer_id } = v;
        const sno = index + 1;
        tableData.value.push({
          sno,
          name,
          mobilenumber,
          username,
          password,
          customer_id,
        });
      });
    })
    .catch((e) => {
      oStore.$setOverlay(false);
    });
};

const openAddForm = () => {
  openForm.value = true;
  mode.value = "Add";
};

const addCustomers = (payload) => {
  if (mode.value === "Edit") {
    cStore.$updateCustomer(payload).then((res) => {
      openForm.value = false;
      notify(
        {
          group: "success",
          title: "Success",
          text: "Customer Updated Successfully",
        },
        2000
      );
      getCustomers();
    });
  } else {
    cStore.$addCustomer(payload).then((res) => {
      openForm.value = false;
      notify(
        {
          group: "success",
          title: "Success",
          text: "Customer Added Successfully",
        },
        2000
      );
      getCustomers();
    });
  }
};

const editCustomer = (payload) => {
  prefillData.value = payload;
  mode.value = "Edit";
  openForm.value = true;
};

const deleteCustomer = (id) => {
  if (window.confirm("Do you really want to delete?")) {
    cStore.$deleteCustomer(id).then(async (res) => {
      openForm.value = false;
      notify(
        {
          group: "success",
          title: "Success",
          text: "Customer Deleted Successfully",
        },
        2000
      );
      getCustomers();
    });
  }
};
</script>
