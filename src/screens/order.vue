<script setup>
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
</script>

<template>
  <div>
    <div class="lg:px-32 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-32 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
        <router-link to="/addorder">
          <button
            class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
          >
            Add Orders
          </button>
        </router-link>
      </div>
      <Table />
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>
