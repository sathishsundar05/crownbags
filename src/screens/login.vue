<template>
  <div class="h-screen flex w-full">
    <div class="hidden lg:block lg:w-8/12">
      <div
        class="w-full h-screen object-cover bg-cover"
        :style="{ backgroundImage: `url(${loginbg})` }"
      ></div>
    </div>
    <div class="w-full flex flex-col lg:w-4/12 justify-center px-8 bg-white">
      <div class="flex mx-auto items-center">
        <img src="../assets/logo/logo.png" class="w-[250px]" />
      </div>
      <div class="flex flex-col">
        <h1 class="pt-4 font-bold text-[28px]">Sign In</h1>
        <p class="text-secondary text-[14px] py-3">
          Welcome back, please login to your account.
        </p>
      </div>
      <div class="flex flex-col form pt-6">
        <div class="w-full">
          <div class="relative flex justify-end items-center">
            <input
              placeholder="Username"
              class="appearance-none text-sm block w-full text-grey-darker focus:outline-0 border border-black-light rounded h-10 px-10 py-4 bg-secondary-light text-black-dark"
              type="text"
              v-model="email"
            />
            <span class="icon absolute left-2 text-black-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
          </div>

          <div class="relative flex justify-end items-center pt-4">
            <input
              placeholder="Password"
              class="appearance-none text-sm block w-full text-grey-darker focus:outline-0 border border-black-light rounded h-10 px-10 py-4 bg-secondary-light text-black-dark"
              required="required"
              type="password"
              v-model="pass"
              @keyup.enter="doLogin"
            />
            <span class="icon absolute left-2 text-black-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="mt-5 text-center flex w-full">
          <button
            @click="doLogin"
            class="w-full px-4 py-3 text-[14px] shadow-sm font-medium text-white rounded-md hover:shadow-lg bg-primary"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { loginStore } from "../store/login";
import loginbg from "@/assets/images/login/loginbg.jpeg";

const router = useRouter();
const lStore = loginStore();

const email = ref("");
const pass = ref("");

const doLogin = () => {
  lStore
    .$doLogin({
      username: email.value,
      password: pass.value,
    })
    .then((res) => {
      if (res.status !== "Incorrect Mobile Number or Password") {
        localStorage.setItem("userDetails", JSON.stringify(res));
        if (res?.type === "A") {
          router.push("dashboard");
        } else if (res?.type === "C") {
          router.push("/user/customer");
        }
      } else {
        localStorage.removeItem("userDetails");
        alert("Invalid Credentials");
      }
    })
    .catch((err) => {
      alert("Invalid Credentials");
      localStorage.removeItem("userDetails");
    });
};
</script>
