<template>
  <div class="flex justify-center">
    <h1 class=" text-3xl">Home Page</h1>
  </div>
  <button @click.prevent="logTaskStore" class=" border rounded px-1">Log Task Store</button>
</template>

<script setup>
import { useAuthStore } from '../store/authStore'
import { useTaskStore } from '../store/taskStore'

const taskStore = useTaskStore()
const authStore = useAuthStore()

function logTaskStore() {
  console.log(taskStore.$state)
}
  
</script>

<style>
  
</style>