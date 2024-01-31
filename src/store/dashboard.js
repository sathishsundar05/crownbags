import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const dashboardStore = defineStore('dashboardStore', {
  state: () => {
    return {
      dashboardDetails: {}
    }
  },
  actions: {
    $getDashboardDetails() {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}?gofor=dashboard`).then(response => {
              this.dashboardDetails = response.data;
                resolve(response.data);
            }).catch(err => {
                console.log("Error getting details", err);
                reject(err);
            })
        })
    }
  }
})