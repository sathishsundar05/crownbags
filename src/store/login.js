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
            axios.get(`${baseUrl}?gofor=login&username=${payload.username}&password=${payload.password}`).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error in login", err);
                reject(err);
            })
        })
    }
  }
})