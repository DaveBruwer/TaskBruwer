<template>
  <div class="flex justify-center flex-col">
    <h1 class=" text-3xl">Task Page</h1>
    <div>
      <button @click.prevent="saveBtn" :disabled="!authStore.currentUser">Save Tasks</button>
    </div>
  </div>
  <h1 class="text-2xl">Tasks:</h1>
  <ul>
    <li v-for="task in taskStore.tasks" >{{ task.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/taskStore'
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore()

const taskStore = useTaskStore()

const counter = ref(1)

function saveBtn() {
  console.log(counter.value)

  taskStore.tasks[`Task${counter.value}`] = {
    description: `Task ${counter.value} description`,
    name: `Task ${counter.value} name`
  }

  counter.value++

}


  
</script>

<style>
  
</style>