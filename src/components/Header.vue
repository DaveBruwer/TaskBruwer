<template>
  <header class="rounded bg-slate-400 dark:bg-slate-600 sticky top-0 z-10">
    <section class=" max-w-5xl mx-auto py-2 flex justify-between items-end">
      <router-link to="/" class=" flex justify-start items-end mx-2">
        <img class=" my-1 md:m-0 h-6 md:h-10" src="../../coffee-cup_icon-icons.com_69402.ico" title="Task Bruwer" alt="Task Bruwer">
        <h1 class=" px-2 text-2xl md:text-3xl lg:text-5xl font-medium ">Task Bruwer</h1>
      </router-link>
      <button id="hamburger-button" class="text-3xl md:hidden focust:outline-none mx-2" @click="() => {showMobileMenu = true}">&#9776</button>
      <nav class="items-end hidden md:inline md:ms-8 text-md lg:text-lg" aria-label="main">
        <router-link to="/dashboard" class="mx-2 hidden md:inline hover:opacity-75 ">Dasboard</router-link>
        <a class="mx-2 hidden md:inline hover:opacity-75 " href="#">Tasks</a>
        <a class="mx-2 hidden md:inline hover:opacity-75 " href="#">Projects</a>
      </nav>
      <nav class="items-end hidden md:inline md:ms-8 text-md lg:text-lg" aria-label="login register">
        <router-link to="/login" class="mx-2 hidden md:inline hover:opacity-75 ">Log In</router-link>
        <router-link to="/register" class="mx-2 hidden md:inline hover:opacity-75 ">Register</router-link>
      </nav>
    </section>
    <section id="mobile-menu" class="rounded absolute top-0 bg-black w-full text-4xl flex-col justify-center" :class="[showMobileMenu ? 'flex' : 'hidden']">
      <button class="text-8xl self-end px-6" @click="() => {showMobileMenu = false}">&times;</button>
      <nav class="flex flex-col min-h-screen items-center py-8" aria-label="mobile">
        <router-link to="/" class="width-full text-center py-6 hover:opacity-75" @click="() => {showMobileMenu = false}">Home</router-link>
        <router-link to="/dashboard" class="width-full text-center py-6 hover:opacity-75" @click="() => {showMobileMenu = false}">Dasboard</router-link>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Tasks</a>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Projects</a>
        <router-link to="/login" class="width-full text-center py-6 hover:opacity-75" @click="() => {showMobileMenu = false}">Log In</router-link>
        <router-link to="/register" class="width-full text-center py-6 hover:opacity-75" @click="() => {showMobileMenu = false}">Register</router-link>
      </nav>
    </section>
  </header>
</template>

<script setup>
import {ref} from 'vue'

//#region Code for toggling mobile menu visibility

const showMobileMenu = ref(false) // Boolean variable used to toggle mobile menu.

function viewportWidthChanged() {
  requestAnimationFrame(() => {
    if(window.innerWidth > 768 && showMobileMenu) {
      showMobileMenu.value = false
    }
  })
}

window.addEventListener("resize", viewportWidthChanged)

//#endregion Code for toggling mobile menu visibility





</script>

<style>
  
</style>