import { defineStore } from 'pinia'
import { baseUrl } from "../const/index"
import axios from "axios";

export const complaintStore = defineStore('complaintStore', {
  state: () => {
    return {
      complaints: null,
      complaint: null,
      fileUploadData: {
        defect_photos: [],
        defect_videos: [],
        ref_photos: [],
        ref_videos: [],
      }
    }
  },
  actions: {
    async $getComplaintsAdmin(payload) {
        try {
            const response = await axios.get(`${baseUrl}?gofor=complaintlist`);
            this.complaints = [...response.data];
            return this.complaints;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $getComplaints(payload) {
        try {
            const response = await axios.get(`${baseUrl}?gofor=custcomplaintlist&customer_id=${payload.customer_id}`);
            this.complaints = [...response.data];
            return this.complaints;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $getComplaint(payload) {
        try {
            const response = await axios.get(`${baseUrl}?gofor=getcomplaint&complaint_no=${payload.complaint_no}`);
            this.complaint = response.data;
            return this.complaint;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    $addComplaint(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}`, payload).then(response => {
                resolve(response.data);
            }).catch(err => {
                console.log("Error: ", err);
                reject(err);
            })
        })
    },
    async $updateComplaint(payload) {
        try {
            const response = axios.post(`${baseUrl}`, payload);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $deleteComplaint(id) {
        try {
            const response = axios.get(`${baseUrl}?gofor=complaintdelete&complaint_no=${id}`);
            return response.data;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    },
    async $fileUpload(payload) {
        try {
          const response = await axios.post(`${baseUrl}`, payload);
          if (response.data && response.data.trim().length > 0) {
            this.fileUploadData[payload.gofor].push({
                url: response.data,
                fieldName: payload.gofor,
            });
          } else {
            console.log("Error uploading the image");
          }
        } catch (err) {
          console.error("Error: ", err);
          throw err;
        }
    },
    $resetFileData() {
        this.fileUploadData = {
            defect_photos: [],
            defect_videos: [],
            ref_photos: [],
            ref_videos: [],
        };
      },
  }
})