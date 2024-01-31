import { defineStore } from "pinia";

export const overlayStore = defineStore("overlayStore", {
  state: () => {
    return {
      showOverlay: false
    };
  },
  getters: {
    getShowOverlay: (state) => state.showOverlay
  },
  actions: {
    $setOverlay(payload) {
      this.showOverlay = payload;
    }
  }
});
