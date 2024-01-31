<script setup>
import snackbar from "./components/snackbar/snackbar.vue";
import overlay from "./components/overlays/overlay.vue";
import { overlayStore } from "./store/overlay";

const OStore = overlayStore();
</script>

<template>
  <div class="bg-secondary-light relative">
    <router-view />
    <snackbar />
    <overlay v-if="OStore.getShowOverlay" />
  </div>
</template>

<style scoped></style>
