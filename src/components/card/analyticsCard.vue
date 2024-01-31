<template>
  <div class="flex items-center bg-white p-8 shadow-md rounded-2xl w-full lg:w-1/4">
    <div
      class="rounded-full p-2 text-white shadow bg-green w-14 h-14 flex justify-center items-center"
    >
      <slot></slot>
    </div>
    <div class="pl-4">
      <div class="font-bold text-2xl text-secondary">{{ analytics.count }}</div>
      <h6 class="text-sm text-secondary">{{ analytics.info }}</h6>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["analytics"]);
</script>
