import { defineStore } from "pinia";
import { baseUrl } from "../const/index";
import axios from "axios";

export const orderStore = defineStore("orderStore", {
  state: () => {
    return {
      orders: null,
      fileUploadData: {
        final_inspection_photos: [],
        final_inspection_reports: [],
        bag_test_reports: [],
        bag_test_photos: [],
        stuffing_photos: [],
        sample_inspection_photos: [],
        sample_inspection_reports: [],
        customers_po_upload: [],
      },
      userCustomers: [],
      customerOrder: []
    };
  },
  actions: {
    async $getOrders(state) {
      try {
        const response = await axios.get(`${baseUrl}?gofor=orderslist${state ? '&project_status='+state : ''}`);
        this.orders = [...response.data];
        return this.orders;
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      }
    },
    async $searchOrders(payload) {
      try {
        const response = await axios.get(`${baseUrl}?gofor=searchorders&searchtext=${payload}`);
        this.orders = [...response.data];
        return this.orders;
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      }
    },
    async $getUserCustomers(id) {
      try {
          const response = await axios.get(`${baseUrl}?gofor=cusorderslist&customer_id=${id}`);
          this.userCustomers = response.data;
          return this.userCustomers;
      } catch (err) {
          console.error("Error: ", err);
          throw err;
      }
    },
    async $getOrder(id) {
      try {
          const response = await axios.get(`${baseUrl}?gofor=getorder&order_id=${id}`);
          this.customerOrder = response.data;
          return this.customerOrder;
      } catch (err) {
          console.error("Error: ", err);
          throw err;
      }
    },
    async $getCustomerOrders(id) {
      try {
          const response = await axios.get(`${baseUrl}?gofor=getorder&order_id=${id}`);
          const keysToRemove = ['status', 'created_date', 'modified_date'];
          const modifiedObject = Object.fromEntries(
            Object.entries(response.data).filter(([key]) => !keysToRemove.includes(key))
          );
          modifiedObject['total_lead_time'] = modifiedObject['total_lead_time'] + ' days';
          this.customerOrder = modifiedObject;
          return this.customerOrder;
      } catch (err) {
          console.error("Error: ", err);
          throw err;
      }
    },
    async $addOrder(payload) {
      try {
        const response = await axios.post(`${baseUrl}`, payload);
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      }
    },
    async $deleteCustomer(id) {
      try {
        const response = axios.get(
          `${baseUrl}?gofor=ordersdelete&order_id=${id}`
        );
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
          if (!this.fileUploadData[payload.gofor].includes(response.data)) {
            if(payload.gofor === 'customers_po_upload') {
              this.fileUploadData[payload.gofor] = [{
                url: response.data,
                fieldName: payload.gofor,
              }];
            } else {
              this.fileUploadData[payload.gofor].push({
                url: response.data,
                fieldName: payload.gofor,
              });
            }
          }
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
        final_inspection_photos: [],
        final_inspection_reports: [],
        bag_test_reports: [],
        bag_test_photos: [],
        stuffing_photos: [],
        sample_inspection_photos: [],
        sample_inspection_reports: [],
        customers_po_upload: [],
      };
    },
  },
});
