<template>
  <header class=" rounded m-1 bg-slate-400 dark:bg-slate-600 sticky top-0 z-10">
    <section class=" max-w-5xl mx-auto py-2 flex justify-between items-end">
      <router-link to="/" class=" flex justify-start items-end mx-2">
        <img class=" my-1 md:m-0 h-6 md:h-10" src="../../coffee-cup_icon-icons.com_69402.ico" title="Task Bruwer" alt="Task Bruwer">
        <h1 class=" px-2 text-3xl md:text-5xl font-medium ">Task Bruwer</h1>
      </router-link>
      <button id="hamburger-button" class="text-3xl md:hidden focust:outline-none mx-2" @click="() => {showMobileMenu = true}">&#9776</button>
      <nav class="items-end hidden md:inline md:ms-8 " aria-label="main">
        <router-link to="/dashboard" class="mx-2 text-lg hidden md:inline hover:opacity-75 " href="#">Dasboard</router-link>
        <a class="mx-2 text-lg hidden md:inline hover:opacity-75 " href="#">Tasks</a>
        <a class="mx-2 text-lg hidden md:inline hover:opacity-75 " href="#">Projects</a>
      </nav>
      <nav class="items-end hidden md:inline md:ms-8 " aria-label="login register">
        <a class="mx-2 text-lg hidden md:inline hover:opacity-75 " href="#">Log In</a>
        <a class="mx-2 text-lg hidden md:inline hover:opacity-75 " href="#">Register</a>
      </nav>
    </section>
    <section id="mobile-menu" class="rounded absolute top-0 bg-black w-full text-5xl flex-col justify-center" :class="[showMobileMenu ? 'flex' : 'hidden']">
      <button class="text-8xl self-end px-6" @click="() => {showMobileMenu = false}">&times;</button>
      <nav class="flex flex-col min-h-screen items-center py-8" aria-label="mobile">
        <router-link to="/dashboard" class="width-full text-center py-6 hover:opacity-75" @click="() => {showMobileMenu = false}">Dasboard</router-link>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Tasks</a>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Projects</a>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Log In</a>
        <a class="width-full text-center py-6 hover:opacity-75" href="#">Register</a>
      </nav>
    </section>
  </header>
</template>

<script setup>
import {ref} from 'vue'

let showMobileMenu = ref(false)




</script>

<style>
  
</style>