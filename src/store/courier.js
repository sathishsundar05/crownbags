import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const courierStore = defineStore('courierStore', {
  state: () => {
    return {
      couriers: null
    }
  },
  actions: {
    async $getCouriers() {
        try {
            const response = await axios.get(`${baseUrl}?gofor=courierslist`);
            this.couriers = [...response.data];
            return this.couriers;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    $addCourier(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}`, payload).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
    },
    async $updateCourier(payload, id) {
        try {
            const response = axios.post(`${baseUrl}updatecouriers/${id}`, payload);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $deleteCourier(id) {
        try {
            const response = axios.post(`${baseUrl}?gofor=couriersdelete&courier_id=${id}`);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
  }
})