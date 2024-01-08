<script setup>
    import Navbar from "../components/navbar/navbar.vue";
    import Footer from "../components/footer/footer.vue";
    import ordersForm from '../components/forms/ordersForm.vue';
</script>

<template>
    <div>
    <div class="lg:px-32 bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="px-3 lg:px-32 py-6">
      <div class="flex justify-between pt-8 pb-3">
        <h3 class="text-xl font-semibold text-secondary">Orders</h3>
        <router-link to="/order">
        <button
          class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
        >
          Back
        </button>
      </router-link>
      </div>
      <ordersForm />
      <div class="flex justify-end pt-4">
        <button
            class="text-sm text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark px-4 py-2"
          >
            Submit
          </button>
      </div>
    </div>
    <div class="lg:px-32 bg-white">
      <Footer />
    </div>
  </div>
</template>