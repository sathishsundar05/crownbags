<template>
  <div
    class="h-screen w-full flex flex-col justify-center items-center px-4 py-2 lg:px-32 lg:py-6"
  >
    <h1 class="text-9xl font-extrabold text-secondary tracking-widest">404</h1>
    <div
      class="bg-white px-2 text-sm rounded rotate-12 absolute text-secondary"
    >
      Page Not Found
    </div>
    <button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-primary group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <router-link to="/">
          <span
            class="relative block px-8 py-3 bg-secondary text-white border border-current"
          >
            Go Home
          </span>
        </router-link>
      </a>
    </button>
  </div>
</template>
