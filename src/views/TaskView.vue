<template>
  <div class="flex justify-center flex-col">
    <h1 class=" text-3xl">Task Page</h1>
    <div>
      <button @click.prevent="saveBtn" :disabled="!authStore.currentUser">Save Tasks</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore'
import { useTaskStore } from '../store/taskStore'

const authStore = useAuthStore()
const taskStore = useTaskStore()

function saveBtn() {
  console.log(taskStore)
  console.log(taskStore.$state)
  console.log(JSON.stringify(taskStore.$state))
}


  
</script>

<style>
  
</style>