import { defineStore } from 'pinia'

export const menuStore = defineStore('menuStore', {
  state: () => {
    return {
      menuList: []
    }
  },
  actions: {
    $updateMenu(payload) {
        this.menuList = payload
    }
  }
})