import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const orderStore = defineStore('orderStore', {
  state: () => {
    return {
      orders: null
    }
  },
  actions: {
    async $getOrders() {
        try {
            const response = await axios.get(`${baseUrl}vieworders`);
            this.orders = [...response.data];
            return this.orders;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $addOrder(payload) {
      try {
          const response = await axios.post(`${baseUrl}addorders`, payload);
          this.orders = [...response.data];
          return this.orders;
      } catch (err) {
          console.error("Error: ", err);
          throw err;
      }
  },
  }
})