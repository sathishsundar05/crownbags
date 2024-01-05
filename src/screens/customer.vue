<script setup>
import Navbar from "../components/navbar/navbar.vue";
import Footer from "../components/footer/footer.vue";
import Table from "../components/table/table.vue";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
</script>

<template>
  <div>
    <div class="lg:px-64 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-64 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Customers</h3>

        <DialogRoot>
          <DialogTrigger
            class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
          >
            Add Customer
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay
              class="bg-black bg-opacity-40 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
            />
            <DialogContent
              class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
            >
              <DialogTitle class="m-0 text-secondary font-semibold">
                Edit profile
              </DialogTitle>
              
              <div class="mt-[25px] flex justify-end">
                <DialogClose as-child>
                  <button
                    class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
                  >
                    Save changes
                  </button>
                </DialogClose>
              </div>
              <DialogClose
                class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
      <Table />
    </div>
    <div class="lg:px-64 bg-white">
      <Footer />
    </div>
  </div>
</template>
