import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const loginStore = defineStore('loginStore', {
  state: () => {
    return {
      userDetails: null
    }
  },
  actions: {
    $doLogin(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}login`, payload).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("Error in login", err);
                reject(err);
            })
        })
    }
  }
})