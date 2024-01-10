import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const customerStore = defineStore('customerStore', {
  state: () => {
    return {
      customers: null
    }
  },
  actions: {
    async $getCustomers() {
        try {
            const response = await axios.get(`${baseUrl}viewcustomers`);
            this.customers = [...response.data];
            return this.customers;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    $addCustomer(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}addcustomers`, payload).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
    },
    async $updateCustomer(payload, id) {
        try {
            const response = axios.post(`${baseUrl}updatecustomers/${id}`, payload);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $deleteCustomer(id) {
        try {
            const response = axios.post(`${baseUrl}deletecustomers/${id}`);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
  }
})