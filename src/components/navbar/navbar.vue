<template>
  <div class="relative">
    <nav class="relative py-4 flex justify-between items-center">
      <a class="text-3xl font-bold leading-none" href="/CRM">
        <img src="../../assets/logo/logo.png" class="w-40" />
      </a>
      <div class="lg:hidden">
        <button class="navbar-burger flex items-center p-3" @click="toggleMenu">
          <svg
            class="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex">
        <ul class="top-1/2 flex lg:space-x-6">
          <li
            class="text-secondary hover:cursor-pointer hover:text-primary px-4 py-2 rounded-lg"
            v-for="(menu, index) in props.menuList"
            :key="index"
          >
          <router-link :to="menu.to">
            <span class="text-md">{{ menu.name }}</span>
          </router-link>
          </li>
        </ul>
        <DropdownMenuRoot v-model:open="dropdownModal">
          <DropdownMenuTrigger class="border-0 outline-none active:border-0">
            <div
              class="flex justify-center items-center pl-3 hover:cursor-pointer"
            >
              <div
                class="rounded-full bg-primary p-2"
              >
                <p class="text-xs text-white">{{ getShortName }}</p>
              </div>
              <div
                class="pl-3 text-secondary text-md hover:text-primary"
              >
                Hi, {{ username }}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-auto outline-none cursor-pointer bg-white rounded-md shadow-lg border border-secondary-light will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            :side-offset="15"
            :align-offset="30"
          >
            <p class="px-6 py-2" @click="doLogout">Logout</p>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
    </nav>
    <div class="navbar-menu relative z-50" :class="menuModal ? '' : 'hidden'">
      <div
        class="navbar-backdrop fixed inset-0 opacity-20 bg-black"
        @click="toggleMenu"
      ></div>
      <nav
        class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white overflow-y-auto"
      >
        <div class="flex items-center mb-8">
          <a class="mr-auto text-3xl font-bold leading-none" href="#">
            <img src="../../assets/logo/logo.png" class="w-40" />
          </a>
          <button class="navbar-close" @click="toggleMenu">
            <svg
              class="h-6 w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col justify-between h-full">
          <ul>
            <li
              class="mb-1 text-secondary hover:cursor-pointer hover:text-primary"
              v-for="(menu, index) in props.menuList"
              :key="index"
            >
              <router-link :to="menu.to">
                <div class="p-4 text-sm font-semibold">{{ menu.name }}</div>
              </router-link>
            </li>
          </ul>
          <p class="p-4 text-sm font-semibold text-secondary" @click="doLogout">Logout</p>
        </div>
        <div class="mt-auto">
          <p class="my-4 text-xs text-center">
            <span>Copyright © 2021</span>
          </p>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "radix-vue";

const props = defineProps(["menuList"])

const menuModal = ref(false);
const dropdownModal = ref(false);

const toggleMenu = () => {
  menuModal.value = !menuModal.value;
};

const toggleDropdown = () => {
  dropdownModal.value = !dropdownModal.value;
};

const username = computed(() => {
  const getData = localStorage.getItem('userDetails');
  return JSON.parse(getData).name
})

const getShortName = computed(() => {
  return username.value.slice(0,2).toUpperCase();
})

const doLogout = () => {
  localStorage.removeItem("userDetails");
  window.location.reload();
}
</script>
