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
    $getCustomers() {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}viewcustomers`).then(response => {
                this.customers = response.data
                resolve(this.customers);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
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
    $updateCustomer(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}addcustomers`, payload).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
    },
    $deleteCustomer(id) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}deletecustomers/${id}`).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
    }
  }
})