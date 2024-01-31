<template>
  <div>
    <div class="px-4 lg:px-32 bg-white shadow-lg">
      <Navbar :menuList="mStore.menuList" />
    </div>
    <div class="px-4 py-2 lg:px-32 lg:py-6">
      <div
        class="flex space-x-10 justify-between pt-8 pb-3 items-start md:items-center"
      >
        <h3 class="text-xl font-semibold text-secondary">Couriers</h3>
        <button
          class="text-sm text-white rounded-lg bg-primary px-4 py-2 w-30"
          @click="openAddForm"
        >
          Add Courier
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
                {{ mode }} Courier
              </DialogTitle>

              <courierForm
                @addCourier="addCouriers"
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
        @edit="editCourier"
        @delete="deleteCourier"
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
import courierForm from "@/components/forms/courierForm.vue";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "radix-vue";
import { courierStore } from "@/store/courier";
import { menuStore } from "@/store/menu";
import { overlayStore } from "../../store/overlay";
import closeIcon from "@/assets/icons/close.vue";
import searchInput from "@/components/inputs/searchInput.vue";
import { notify } from "notiwind";

const cStore = courierStore();
const mStore = menuStore();
const ovStore = overlayStore();
const tableHeader = ref(["S.No", "Name", "Link", "Action"]);
const tableData = ref([]);
const openForm = ref(false);
const prefillData = ref("");
const mode = ref("Add");

onMounted(() => {
  ovStore.$setOverlay(true);
  getCouriers();
});

const getCouriers = () => {
  cStore
    .$getCouriers()
    .then((res) => {
      ovStore.$setOverlay(false);
      tableData.value = [];
      res.map((v, index) => {
        const { courier_id, name, link } = v;
        const sno = index + 1;
        tableData.value.push({
          sno,
          name,
          link,
          courier_id,
        });
      });
    })
    .catch((err) => {
      ovStore.$setOverlay(false);
    });
};

const openAddForm = () => {
  openForm.value = true;
  mode.value = "Add";
};

const addCouriers = (payload) => {
  if (mode.value === "Edit") {
    cStore
      .$updateCourier(payload, prefillData.value.customer_id)
      .then((res) => {
        openForm.value = false;
        notify(
          {
            group: "success",
            title: "Success",
            text: "Courier Updated Successfully",
          },
          2000
        );
        getCouriers();
        getCouriers();
      });
  } else {
    cStore.$addCourier(payload).then((res) => {
      openForm.value = false;
      notify(
        {
          group: "success",
          title: "Success",
          text: "Courier Added Successfully",
        },
        2000
      );
      getCouriers();
    });
  }
};

const editCourier = (payload) => {
  prefillData.value = payload;
  mode.value = "Edit";
  openForm.value = true;
};

const deleteCourier = (id) => {
  if (window.confirm("Do you really want to delete?")) {
    cStore.$deleteCourier(id).then(async (res) => {
      openForm.value = false;
      notify(
        {
          group: "success",
          title: "Success",
          text: "Courier Deleted Successfully",
        },
        2000
      );
      getCouriers();
    });
  }
};
</script>
