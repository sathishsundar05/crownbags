<template>
  <form class="mt-[25px]">
    <!--- Row 1 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Customer Name</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="customer_id"
          v-model="formData.customer_id"
        >
          <option
            v-for="(option, indexOption) in getOptions('customerList')"
            :key="indexOption"
            :value="option.key"
          >
            {{ option.value }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >PO Number</label
        >
        <input
          v-model="formData.po_number"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="po_number"
          placeholder="PO Number"
        />
      </div>
    </div>
    <!--- Row 2-->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Po Date</label
        >
        <Datepicker
          v-model="formData.po_date"
          type="date"
          :name="po_date"
          placeholder="Po Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>

      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Customer PO</label
        >
        <div class="relative">
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept=".pdf"
          @change="updateFormData($event, 'customers_po_upload')"
        />
        <div class="p-2 bg-gray-200 absolute top-0 right-0 rounded-lg cursor-pointer" v-if="customerPoExists">
          <a :href="oStore.fileUploadData.customers_po_upload[0].url" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            height="25px"
            width="25px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <path
              style="fill: #e2e5e7"
              d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
            />
            <path
              style="fill: #b0b7bd"
              d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
            />
            <polygon style="fill: #cad1d8" points="480,224 384,128 480,128 " />
            <path
              style="fill: #f15642"
              d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16  V416z"
            />
            <g>
              <path
                style="fill: #ffffff"
                d="M101.744,303.152c0-4.224,3.328-8.832,8.688-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48   c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.688-3.184-8.688-8.816V303.152z    M118.624,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504c0-8.944-6.784-16.368-15.36-16.368H118.624z"
              />
              <path
                style="fill: #ffffff"
                d="M196.656,384c-4.224,0-8.832-2.304-8.832-7.92v-72.672c0-4.592,4.608-7.936,8.832-7.936h29.296   c58.464,0,57.184,88.528,1.152,88.528H196.656z M204.72,311.088V368.4h21.232c34.544,0,36.08-57.312,0-57.312H204.72z"
              />
              <path
                style="fill: #ffffff"
                d="M303.872,312.112v20.336h32.624c4.608,0,9.216,4.608,9.216,9.072c0,4.224-4.608,7.68-9.216,7.68   h-32.624v26.864c0,4.48-3.184,7.92-7.664,7.92c-5.632,0-9.072-3.44-9.072-7.92v-72.672c0-4.592,3.456-7.936,9.072-7.936h44.912   c5.632,0,8.96,3.344,8.96,7.936c0,4.096-3.328,8.704-8.96,8.704h-37.248V312.112z"
              />
            </g>
            <path
              style="fill: #cad1d8"
              d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
            />
          </svg>
        </a>
        </div>
        </div>
      </div>
    </div>
    <!--- Row 3 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Extrusion</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="extrusion"
          v-model="formData.extrusion"
        >
          <option
            v-for="(option, indexOption) in genOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Weaving</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="weaving"
          v-model="formData.weaving"
        >
          <option
            v-for="(option, indexOption) in genOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <!--- Row 4 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Lamination</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="lamination"
          v-model="formData.lamination"
        >
          <option
            v-for="(option, indexOption) in genOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Printing</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="printing"
          v-model="formData.printing"
        >
          <option
            v-for="(option, indexOption) in genOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <!-- Row 5 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Stitching</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="stitching"
          v-model="formData.stitching"
        >
          <option
            v-for="(option, indexOption) in genOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Final Quality Inspection Date</label
        >
        <Datepicker
          v-model="formData.final_quality_inspection"
          type="date"
          name="final_quality_inspection"
          placeholder="Final Quality Inspection Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 6 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Cargo Stuffing Date</label
        >
        <Datepicker
          v-model="formData.cargo_stuffing_date"
          type="date"
          name="cargo_stuffing_date"
          placeholder="Cargo Stuffing Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Container No</label
        >
        <input
          v-model="formData.container_number"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="container_number"
          placeholder="Container No"
        />
      </div>
    </div>
    <!-- Row 7 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Shipping Line</label
        >
        <input
          v-model="formData.shipping_line"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="shipping_line"
          placeholder="Shipping Line"
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed On Board Date</label
        >
        <Datepicker
          v-model="formData.on_board_date"
          type="date"
          name="on_board_date"
          placeholder="Proposed On Board Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 8 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual On Board Date</label
        >
        <Datepicker
          v-model="formData.actual_on_board_date"
          type="date"
          name="actual_on_board_date"
          placeholder="Actual On Board Date"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Port of Loading</label
        >
        <input
          v-model="formData.port_of_loading"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="port_of_loading"
          placeholder="Port of Loading"
        />
      </div>
    </div>
    <!-- Row 9 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETA Transhipment Port-1</label
        >
        <Datepicker
          v-model="formData.eta_transhipment_port_1"
          type="date"
          name="eta_transhipment_port_1"
          placeholder="Proposed ETA Transhipment Port-1"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETA Transhipment Port-1</label
        >
        <Datepicker
          v-model="formData.actual_eta_transhipment_port_1"
          type="date"
          name="actual_eta_transhipment_port_1"
          placeholder="Actual ETA Transhipment Port-1"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 10 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETD Transhipment Port-1</label
        >
        <Datepicker
          v-model="formData.etd_transhipment_port_1"
          type="date"
          name="etd_transhipment_port_1"
          placeholder="Proposed ETD Transhipment Port-1"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETD Transhipment Port-1</label
        >
        <Datepicker
          v-model="formData.actual_etd_transhipment_port_1"
          type="date"
          name="actual_etd_transhipment_port_1"
          placeholder="Actual ETD Transhipment Port-1"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 11 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETA Transhipment Port-2</label
        >
        <Datepicker
          v-model="formData.eta_transhipment_port_2"
          type="date"
          name="eta_transhipment_port_2"
          placeholder="Proposed ETA Transhipment Port-2"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETA Transhipment Port-2</label
        >
        <Datepicker
          v-model="formData.actual_eta_transhipment_port_2"
          type="date"
          name="actual_eta_transhipment_port_2"
          placeholder="Actual ETA Transhipment Port-2"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 12 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETD Transhipment Port-2</label
        >
        <Datepicker
          v-model="formData.etd_transhipment_port_2"
          type="date"
          name="etd_transhipment_port_2"
          placeholder="Proposed ETD Transhipment Port-2"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETD Transhipment Port-2</label
        >
        <Datepicker
          v-model="formData.actual_etd_transhipment_port_2"
          type="date"
          name="actual_etd_transhipment_port_2"
          placeholder="Actual ETD Transhipment Port-2"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 13 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Discharge Port</label
        >
        <input
          v-model="formData.discharge_port"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="discharge_port"
          placeholder="Discharge Port"
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETA Discharge Port</label
        >
        <Datepicker
          v-model="formData.eta_discharge_port"
          type="date"
          name="eta_discharge_port"
          placeholder="Actual ETA Discharge Port"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 14 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETA Discharge Port</label
        >
        <Datepicker
          v-model="formData.actual_eta_discharge_port"
          type="date"
          name="actual_eta_discharge_port"
          placeholder="Actual ETA Discharge Port"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Proposed ETA Final Destination</label
        >
        <Datepicker
          v-model="formData.eta_final_destination"
          type="date"
          name="eta_final_destination"
          placeholder="Proposed ETA Final Destination"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
    </div>
    <!-- Row 15 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Actual ETA Final Destination</label
        >
        <Datepicker
          v-model="formData.actual_eta_final_destination"
          type="date"
          name="actual_eta_final_destination"
          placeholder="Actual ETA Final Destination"
          :preview-format="format"
          :format="format"
          :enable-time-picker="false"
          auto-apply
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Total Lead Time</label
        >
        <input
          v-model="calculateDateBetween"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="calculate"
          name="total_lead_time"
          placeholder="Total Lead Time"
        />
      </div>
    </div>
    <!-- Row 16 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Sample Tracking No</label
        >
        <input
          v-model="formData.sample_tracking_number"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="sample_tracking_number"
          placeholder="Sample Tracking No"
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Delivery Address</label
        >
        <input
          v-model="formData.delivery_address"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="delivery_address"
          placeholder="Delivery Address"
        />
      </div>
    </div>
    <!-- Row 17 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Delivery Country</label
        >
        <input
          v-model="formData.delivery_country"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="delivery_country"
          placeholder="Delivery Country"
        />
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Delivery Zipcode</label
        >
        <input
          v-model="formData.delivery_pincode"
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          type="text"
          name="delivery_pincode"
          placeholder="Delivery Zipcode"
        />
      </div>
    </div>
    <!-- Row 18 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Sample Tracking Link</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="tracking_link"
          v-model="formData.tracking_link"
          @change="setTrackingId(formData.tracking_link)"
        >
          <option
            v-for="(option, indexOption) in getOptions('courierList')"
            :key="indexOption"
            :value="option.key"
          >
            {{ option.value }}
          </option>
        </select>
      </div>
    </div>
    <!-- files start -->
    <!-- Row 19 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Final Inspection Photos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          multiple
          @change="updateFormData($event, 'final_inspection_photos')"
        />

        <div
          v-if="showFilePreview('final_inspection_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('final_inspection_photos')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData[
              'final_inspection_photos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('final_inspection_photos')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('final_inspection_photos')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('final_inspection_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 20 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Final Inspection Report</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept=".pdf"
          multiple
          @change="updateFormData($event, 'final_inspection_reports')"
        />

        <div
          v-if="showFilePreview('final_inspection_reports')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('final_inspection_reports')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData[
              'final_inspection_reports'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('final_inspection_reports')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('final_inspection_reports')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('final_inspection_reports', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 21 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Bag Test Report</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          multiple
          @change="updateFormData($event, 'bag_test_reports')"
        />

        <div
          v-if="showFilePreview('bag_test_reports')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('bag_test_reports')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData[
              'bag_test_reports'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('bag_test_reports')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('bag_test_reports')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('bag_test_reports', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 22 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Bag Test Photos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          multiple
          @change="updateFormData($event, 'bag_test_photos')"
        />

        <div
          v-if="showFilePreview('bag_test_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('bag_test_photos')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData['bag_test_photos']"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('bag_test_photos')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('bag_test_photos')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('bag_test_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 23 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Stuffing Photos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          multiple
          @change="updateFormData($event, 'stuffing_photos')"
        />

        <div
          v-if="showFilePreview('stuffing_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('stuffing_photos')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData['stuffing_photos']"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('stuffing_photos')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('stuffing_photos')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('stuffing_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 24 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Production Sample Inspection Photos</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept="image/*"
          multiple
          @change="updateFormData($event, 'sample_inspection_photos')"
        />

        <div
          v-if="showFilePreview('sample_inspection_photos')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('sample_inspection_photos')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData[
              'sample_inspection_photos'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('sample_inspection_photos')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('sample_inspection_photos')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('sample_inspection_photos', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 25 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Production Sample Inspection Report</label
        >
        <input
          class="block text-secondary w-full text-sm text-gray-900 border border-black-light rounded-lg cursor-pointer bg-white"
          type="file"
          accept=".pdf"
          multiple
          @change="updateFormData($event, 'sample_inspection_reports')"
        />

        <div
          v-if="showFilePreview('sample_inspection_reports')"
          class="border border-black-light w-full mt-3 rounded grid gap-3 p-4 place-items-center overflow-x-scroll max-h-[300px]"
          :class="
            isDocument.includes('sample_inspection_reports')
              ? 'grid-cols-8'
              : 'grid-cols-6'
          "
        >
          <div
            v-for="(fileSrc, index) in oStore.fileUploadData[
              'sample_inspection_reports'
            ]"
            :key="index"
            class="relative group"
          >
            <img
              :src="
                isDocument.includes('sample_inspection_reports')
                  ? documentImage
                  : fileSrc.url
              "
              class="rounded-lg mx-3"
              :class="
                isDocument.includes('sample_inspection_reports')
                  ? 'w-20'
                  : 'object-cover w-32 h-32'
              "
              @click="openDocument(fileSrc.url)"
            />
            <span
              class="hidden group-hover:block group-hover:shadow-lg cursor-pointer bg-gray-200 rounded-full absolute top-2 right-4 close-icon"
              @click="removeFile('sample_inspection_reports', index)"
              ><closeIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 26 -->
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6">
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Order Status</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="project_status"
          v-model="formData.project_status"
        >
          <option
            v-for="(option, indexOption) in projectStatusOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-6 lg:mb-0 w-full lg:w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-secondary"
          >Status</label
        >
        <select
          class="shadow-sm bg-white border border-black-light text-secondary focus:outline-none focus:border-primary text-sm rounded-lg block w-full p-2.5"
          name="status"
          v-model="formData.status"
        >
          <option
            v-for="(option, indexOption) in statusOptions"
            :key="indexOption"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex justify-end pt-4">
      <button
        class="text-sm text-white rounded-lg bg-primary px-4 py-2"
        @click="addOrder"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { get, set } from "lodash";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { customerStore } from "../../store/customers";
import { orderStore } from "../../store/orders";
import { courierStore } from "../../store/courier";
import documentImage from "@/assets/images/file/document.png";
import closeIcon from "@/assets/icons/close.vue";
import { cloneDeep } from "lodash";
import { getCurrentDateFormatted } from "@/lib/utils";

const emit = defineEmits(["addOrder", "updateOrder"]);
const props = defineProps(["prefillData"]);
const cStore = customerStore();
const oStore = orderStore();
const coStore = courierStore();
const customerList = ref([]);
const courierList = ref([]);
const isDocument = ref([
  "final_inspection_reports",
  "bag_test_reports",
  "sample_inspection_reports",
]);
const trackinglinkId = ref("");
const formData = ref({});
const genOptions = ref({
  Completed: "Completed",
  "In progress": "In progress",
  "To be Confirmed": "To be Confirmed",
  "Not Applicable": "Not Applicable",
});
const projectStatusOptions = ref({
  "In Progress": "In Progress",
  Completed: "Completed",
});
const statusOptions = ref({
  Active: "Active",
  InActive: "InActive",
});

const format = (dateString) => {
  return getCurrentDateFormatted(dateString);
};

const addOrder = (e) => {
  e.preventDefault();
  let payload = {
    gofor: props.prefillData ? "editorders" : "addorders",
    po_number: formData.value.po_number,
    customer_id: formData.value.customer_id,
    customer_po: oStore.fileUploadData["customers_po_upload"]
      .map((v) => v.url)
      .toLocaleString(),
    po_date: formatDate(formData.value.po_date),
    extrusion: formData.value.extrusion,
    weaving: formData.value.weaving,
    lamination: formData.value.lamination,
    printing: formData.value.printing,
    stitching: formData.value.stitching,
    final_quality_inspection: formatDate(
      formData.value.final_quality_inspection
    ),
    cargo_stuffing_date: formatDate(formData.value.cargo_stuffing_date),
    container_number: formData.value.container_number,
    shipping_line: formData.value.shipping_line,
    on_board_date: formatDate(formData.value.on_board_date),
    actual_on_board_date: formatDate(formData.value.actual_on_board_date),
    port_of_loading: formData.value.port_of_loading,
    eta_transhipment_port_1: formatDate(formData.value.eta_transhipment_port_1),
    actual_eta_transhipment_port_1: formatDate(
      formData.value.actual_eta_transhipment_port_1
    ),
    etd_transhipment_port_1: formatDate(formData.value.etd_transhipment_port_1),
    actual_etd_transhipment_port_1: formatDate(
      formData.value.actual_etd_transhipment_port_1
    ),
    eta_transhipment_port_2: formatDate(formData.value.eta_transhipment_port_2),
    actual_eta_transhipment_port_2: formatDate(
      formData.value.actual_eta_transhipment_port_2
    ),
    etd_transhipment_port_2: formatDate(formData.value.etd_transhipment_port_2),
    actual_etd_transhipment_port_2: formatDate(
      formData.value.actual_etd_transhipment_port_2
    ),
    discharge_port: formData.value.discharge_port,
    eta_discharge_port: formatDate(formData.value.eta_discharge_port),
    actual_eta_discharge_port: formatDate(
      formData.value.actual_eta_discharge_port
    ),
    eta_final_destination: formatDate(formData.value.eta_final_destination),
    actual_eta_final_destination: formatDate(
      formData.value.actual_eta_final_destination
    ),
    total_lead_time: calculateDateBetween.value.split(" days")[0],
    delivery_address: formData.value.delivery_address,
    delivery_pincode: formData.value.delivery_pincode,
    delivery_country: formData.value.delivery_country,
    final_inspection_photos: oStore.fileUploadData["final_inspection_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    final_inspection_report: oStore.fileUploadData["final_inspection_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    bag_test_report: oStore.fileUploadData["bag_test_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    bag_test_photos: oStore.fileUploadData["bag_test_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    stuffing_photo: oStore.fileUploadData["stuffing_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_inspection_photos: oStore.fileUploadData["sample_inspection_photos"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_inspection_report: oStore.fileUploadData["sample_inspection_reports"]
      .map((v) => v.url)
      .toLocaleString(),
    sample_tracking_number: formData.value.sample_tracking_number,
    tracking_link: trackinglinkId.value,
    project_status: formData.value.project_status,
  };

  if (props.prefillData) {
    const statusValue = formData.value.status;
    if (statusValue === "InActive") {
      payload["status"] = 0;
    }
    if (statusValue === "Active") {
      payload["status"] = 1;
    }
    payload["order_id"] = props.prefillData.order_id;
    trackinglinkId.value = props.prefillData.tracking_id;
  }
  emit("addOrder", payload);
};

onMounted(async () => {
  cStore.$getCustomers().then((res) => {
    customerList.value = res;
  });

  coStore.$getCouriers().then((res) => {
    courierList.value = res;
  });

  if (props.prefillData) {
    formData.value.customer_id = props.prefillData?.customer_id;
    formData.value.po_number = props.prefillData?.po_number;
    formData.value.po_date = props.prefillData?.po_date;
    formData.value.extrusion = props.prefillData?.extrusion;
    formData.value.weaving = props.prefillData?.weaving;
    formData.value.lamination = props.prefillData?.lamination;
    formData.value.printing = props.prefillData?.printing;
    formData.value.stitching = props.prefillData?.stitching;
    formData.value.final_quality_inspection =
      props.prefillData?.final_quality_inspection;
    formData.value.cargo_stuffing_date = props.prefillData?.cargo_stuffing_date;
    formData.value.container_number = props.prefillData?.container_number;
    formData.value.shipping_line = props.prefillData?.shipping_line;
    formData.value.on_board_date = props.prefillData?.on_board_date;
    formData.value.actual_on_board_date =
      props.prefillData?.actual_on_board_date;
    formData.value.port_of_loading = props.prefillData?.port_of_loading;
    formData.value.eta_transhipment_port_1 =
      props.prefillData?.eta_transhipment_port_1;
    formData.value.actual_eta_transhipment_port_1 =
      props.prefillData?.actual_eta_transhipment_port_1;
    formData.value.etd_transhipment_port_1 =
      props.prefillData?.etd_transhipment_port_1;
    formData.value.actual_etd_transhipment_port_1 =
      props.prefillData?.actual_etd_transhipment_port_1;
    formData.value.eta_transhipment_port_2 =
      props.prefillData?.eta_transhipment_port_2;
    formData.value.actual_eta_transhipment_port_2 =
      props.prefillData?.actual_eta_transhipment_port_2;
    formData.value.etd_transhipment_port_2 =
      props.prefillData?.etd_transhipment_port_2;
    formData.value.actual_etd_transhipment_port_2 =
      props.prefillData?.actual_etd_transhipment_port_2;
    formData.value.discharge_port = props.prefillData?.discharge_port;
    formData.value.eta_discharge_port = props.prefillData?.eta_discharge_port;
    formData.value.actual_eta_discharge_port =
      props.prefillData?.actual_eta_discharge_port;
    formData.value.eta_final_destination =
      props.prefillData?.eta_final_destination;
    formData.value.actual_eta_final_destination =
      props.prefillData?.actual_eta_final_destination;
    formData.value.total_lead_time = props.prefillData?.total_lead_time;
    formData.value.delivery_address = props.prefillData?.delivery_address;
    formData.value.delivery_pincode = props.prefillData?.delivery_pincode;
    formData.value.delivery_country = props.prefillData?.delivery_country;
    formData.value.sample_tracking_number =
      props.prefillData?.sample_tracking_number;
    formData.value.tracking_link = props.prefillData?.tracking_link;
    formData.value.project_status = props.prefillData?.project_status;
    formData.value.status =
      props.prefillData?.status === 1 ? "Active" : "InActive";

    if (props.prefillData.final_inspection_photos) {
      const fipurls = props.prefillData.final_inspection_photos?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "final_inspection_photos" };
      });
      oStore.fileUploadData["final_inspection_photos"] = fip;
    }

    if (props.prefillData.final_inspection_report) {
      const firurls = props.prefillData.final_inspection_report?.split(",");
      const fir = firurls?.map(function (url) {
        return { url: url.trim(), fieldName: "final_inspection_report" };
      });
      oStore.fileUploadData["final_inspection_reports"] = fir;
    }

    if (props.prefillData.bag_test_report) {
      const btrurls = props.prefillData.bag_test_report?.split(",");
      const btr = btrurls?.map(function (url) {
        return { url: url.trim(), fieldName: "bag_test_reports" };
      });
      oStore.fileUploadData["bag_test_reports"] = btr;
    }

    if (props.prefillData.bag_test_photos) {
      const btpurls = props.prefillData.bag_test_photos?.split(",");
      const btp = btpurls?.map(function (url) {
        return { url: url.trim(), fieldName: "bag_test_photos" };
      });
      oStore.fileUploadData["bag_test_photos"] = btp;
    }

    if (props.prefillData.stuffing_photo) {
      const spurls = props.prefillData.stuffing_photo?.split(",");
      const sp = spurls?.map(function (url) {
        return { url: url.trim(), fieldName: "stuffing_photos" };
      });
      oStore.fileUploadData["stuffing_photos"] = sp;
    }

    if (props.prefillData.sample_inspection_photos) {
      const sipurls = props.prefillData.sample_inspection_photos?.split(",");
      const sip = sipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "sample_inspection_photos" };
      });
      oStore.fileUploadData["sample_inspection_photos"] = sip;
    }

    if (props.prefillData.sample_inspection_report) {
      const sirurls = props.prefillData.sample_inspection_report?.split(",");
      const sir = sirurls?.map(function (url) {
        return { url: url.trim(), fieldName: "sample_inspection_reports" };
      });
      oStore.fileUploadData["sample_inspection_reports"] = sir;
    }
    if (props.prefillData.customer_po) {
      const fipurls = props.prefillData.customer_po?.split(",");
      const fip = fipurls?.map(function (url) {
        return { url: url.trim(), fieldName: "customers_po_upload" };
      });
      oStore.fileUploadData["customers_po_upload"] = fip;
    }
  } else {
    oStore.$resetFileData();
  }
});

const calculateDateBetween = computed(() => {
  if (formData.value.po_date && formData.value.actual_eta_final_destination) {
    const date1 = new Date(formData.value.po_date);
    const date2 = new Date(formData.value.actual_eta_final_destination);
    const differenceInMs = Math.abs(date2 - date1);
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysDifference + " days";
  } else {
    return "";
  }
});

const customerPoExists = computed(() => {
  return oStore.fileUploadData["customers_po_upload"] && oStore.fileUploadData["customers_po_upload"].length > 0
})

const updateFormData = (event, fName) => {
  // oStore.$resetFileData();
  const files = event.target.files;

  Promise.all(Array.from(files).map((file) => readFileAsBase64(file))).then(
    (base64Array) => {
      base64Array.map((v) => {
        const payload = {
          gofor: fName,
          imgname: v,
        };
        oStore.$fileUpload(payload);
      });
    }
  );
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result.split(",")[1]);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

const getOptions = (optionKey) => {
  if (optionKey === "courierList") {
    return courierList.value.map((v) => {
      return {
        key: v.link,
        value: v.name,
      };
    });
  }
  if (optionKey === "customerList") {
    return customerList.value.map((v) => {
      return {
        key: v.customer_id,
        value: v.name,
      };
    });
  }
};

const formatDate = (inputDate) => {
  if (inputDate) {
    return getCurrentDateFormatted(inputDate);
  } else {
    return "";
  }
};

const showFilePreview = (fieldName) => {
  return (
    oStore.fileUploadData[fieldName] &&
    oStore.fileUploadData[fieldName].length > 0
  );
};

const removeFile = (fieldName, indexToRemove) => {
  oStore.fileUploadData[fieldName].splice(indexToRemove, 1);
};

const openDocument = (src) => {
  window.open(src, "_blank");
};

const setTrackingId = (val) => {
  const getNameByLink = courierList.value.find((v) => v.link === val);
  trackinglinkId.value = getNameByLink.courier_id;
};
</script>

<style lang="scss" scoped>
form {
  :deep(.dp__input_wrap .dp__pointer) {
    border-color: rgba(0, 0, 0, 0.2) !important;
    color: #5f6c91;
    font-size: 14px;
    border-radius: 8px !important;
  }
  :deep(.dp__input_wrap .dp__input_focus) {
    border-color: #016302 !important;
  }
}
</style>
