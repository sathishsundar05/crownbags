<script setup>
import { onMounted } from "vue";
import OrderFormSchema from "../../schema/orderFormSchema.json";
// import imageUpload from "./imageUpload.vue";
</script>

<template>
  <form class="mt-[25px]">
    <div
      class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mb-0 lg:mb-6"
      v-for="(fields, indexFields) in OrderFormSchema"
      :key="indexFields"
    >
      <div
        class="w-full lg:w-1/2 mb-6 lg:mb-0"
        v-for="(field, indexField) in fields.fieldgroup"
        :key="indexField"
      >
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-secondary"
          >{{ field.label }}</label
        >
        <input
          v-if="field.fieldType === 'text'"
          class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
        />
        <input
          v-else-if="field.fieldType === 'date'"
          class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
          :type="field.fieldType"
          :name="field.fieldName"
          :placeholder="field.label"
        />
        <select
          v-else-if="field.fieldType === 'select'"
          class="shadow-sm bg-gray-50 border border-secondary text-secondary focus:outline-primary text-sm rounded-lg block w-full p-2.5"
          :name="field.fieldName"
        >
          <option
            v-for="(option, indexOption) in field.options"
            :key="indexOption"
          >
            {{ option }}
          </option>
        </select>
        <div v-else-if="field.fieldType === 'file'">
          <input
            class="block w-full text-sm text-gray-900 border border-secondary rounded-lg cursor-pointer bg-gray-50"
            type="file"
          />
        </div>
      </div>
    </div>
  </form>
</template>
