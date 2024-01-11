<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
    :style="{ backgroundImage: `url(${loginbg})` }"
    
  >
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div
      class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10"
    >
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h2 class="font-semibold text-xl mr-auto">Login</h2>
            <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
          <div class="mt-5">
            <div class="form">
              <div class="md:flex flex-col w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-2"
                    >Email
                    <abbr class="no-underline" title="required">*</abbr></label
                  >
                  <input
                    placeholder="Enter your email"
                    class="appearance-none block w-full text-grey-darker border border-secondary focus:outline-0 rounded-lg h-10 px-4"
                    type="text"
                    v-model="email"
                  />
                  <p class="text-red text-xs hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-2"
                    >Password
                    <abbr class="no-underline" title="required">*</abbr></label
                  >
                  <input
                    placeholder="Enter your password"
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-secondary focus:outline-0 rounded-lg h-10 px-4"
                    required="required"
                    type="password"
                    v-model="pass"
                    @keyup.enter="doLogin"
                  />
                  <p class="text-red text-xs hidden">
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div
                class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse"
              >
                <button
                  @click="doLogin"
                  class="mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium text-white rounded-full hover:shadow-lg text-white rounded-lg bg-gradient-to-b from-primary-light to-primary-dark"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { loginStore } from "../store/login";
import loginbg from '@/assets/images/login/loginbg.jpeg'


const router = useRouter();
const lStore = loginStore();

const email = ref("");
const pass = ref("");

const doLogin = () => {
  lStore.$doLogin({
    username: email.value,
    password: pass.value,
  }).then(res => {
    if(res.data !== "No User Found") {
      localStorage.setItem('userDetails', res)
      router.push("dashboard");
    } else {
      localStorage.removeItem('userDetails');
      alert('Invalid Credentials')
    }
  }).catch(err => {
    alert('Invalid Credentials')
    localStorage.removeItem('userDetails');
  })
};
</script>
