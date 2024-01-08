<script setup>
import { ref } from "vue";
import Navbar from "../components/navbar/navbar.vue";
import Footer from "../components/footer/footer.vue";
import analyticsCard from "../components/card/analyticsCard.vue";
import arrow from "../assets/cards/analytics/arrow.vue";
</script>

<template>
  <div class="lg:px-32 bg-white shadow-lg">
    <Navbar />
  </div>
  <div class="px-32 py-6">
    <h3 class="text-xl font-semibold text-secondary py-8">Dashboard</h3>
    <div class="flex space-x-6">
      <analyticsCard
        :analytics="{
          count: '133',
          info: 'Total customers',
        }"
      >
        <arrow></arrow>
      </analyticsCard>
      <analyticsCard
        :analytics="{
          count: '399',
          info: 'Total orders',
        }"
        ><arrow></arrow
      ></analyticsCard>
      <analyticsCard
        :analytics="{
          count: '863',
          info: 'Pending orders',
        }"
        ><arrow></arrow
      ></analyticsCard>
      <analyticsCard
        :analytics="{
          count: '405',
          info: 'Total couriers',
        }"
        ><arrow></arrow
      ></analyticsCard>
    </div>
    <div class="flex flex-col space-y-4">
      <h2 class="text-xl font-semibold text-secondary pt-8 pb-4">Pending orders</h2>
      <div>
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center"
          >
            U
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary">sample</div>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center"
          >
            U
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary">sample</div>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center"
          >
            U
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary">sample</div>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center"
          >
            U
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary">sample</div>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center bg-white p-4 shadow-md rounded-2xl">
          <div
            class="rounded-2xl p-2 text-secondary shadow border w-14 h-14 flex justify-center items-center"
          >
            U
          </div>
          <div class="pl-4">
            <div class="font-bold text-lg text-secondary">sample</div>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
            <h6 class="text-sm text-secondary">https://www.gogole.com</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="px-32 bg-white">
    <Footer />
  </div>
</template>
