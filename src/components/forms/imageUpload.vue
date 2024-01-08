<template>
  <div class="flex h-[150px] relative overflow-scroll">
    <MultipleFileUpload
      :removeBtnText="'remove'"
      :uploadBtnText="'Save'"
      :progressBtnText="'Saving...'"
      :uploadedFiles="uploadedFiles"
      :callback="handleMultipleFileUpload"
    >
      <template v-slot="file">
        <div
          class="h-[50px] w-[50px] cursor-pointer mx-5 bg-[#e7e7e7] rounded-2xl"
          :class="!file.file ? 'my-10' : 'mt-10 mb-20'"
        >
          <div class="flex h-full w-full relative">
            <div class="h-full w-full">
              <img
                v-if="file.file ? file.file.previewType != 'video' : true"
                class="h-full w-full"
                :class="
                  file.file ? 'object-cover rounded-2xl' : 'object-contain'
                "
                :src="file.file ? file.file.previewUrl : placeHolderImage"
                alt=""
              />
            </div>
            <div
              v-if="file.file"
              :class="{
                'absolute h-full w-full flex rounded-2xl bg-[#00000099]':
                  file.file.isDragging,
                'items-center justify-center': file.file.isLoading,
              }"
            >
              <img
                v-if="file.file.isLoading"
                src="../assets/loader.png"
                alt="Loading..."
                class="h-16 animate-spin"
              />
            </div>
          </div>
          <!-- <p v-if="file.file" class="text-center break-words">
            {{ file.file.previewName }}
          </p> -->
        </div>
      </template>
    </MultipleFileUpload>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MultipleFileUpload } from "@canopassoftware/vue-file-upload";
import placeholder from "../../assets/placeholder.png";
const placeHolderImage = placeholder;
const uploadedFiles = ref([]);

const handleMultipleFileUpload = (files) => {
  uploadedFiles = [];

  // add your fileuploading logic to server and set data to the uploadedFiles
  for (var i = 0; i < files.length; i++) {
    this.uploadedFiles.push({
      fileType: "image",
      fileUrl: "https://picsum.photos/300/224",
      fileName: "example-image.jpg",
    });
  }
};
</script>

<style>
.remove-btn {
  position: relative;
  visibility: hidden;
  width: 30px;
  height: 30px;
}

.remove-btn::after {
  content: "X";
  visibility: visible;
  position: absolute;
  right: 30px;
  top: 25px;
  background: #ececec;
  border-radius: 50px;
  width: 20px;
  height: 20px;
  line-height: 1.6;
  color: #5f6c91;
  font-size: 12px;
}
</style>
