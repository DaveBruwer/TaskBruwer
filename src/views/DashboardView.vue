<template>
  <div class="flex justify-center">
    <h1 class=" text-3xl">Dashboard Page</h1>
  </div>
  <h1 class="text-2xl">Tasks:</h1>
  <ul>
    <li v-for="task in taskStore.tasks" >{{ task.name }}</li>
  </ul>
  <h1 class="text-2xl">Projects:</h1>
  <ul>
    <li v-for="project in taskStore.projects" >{{ project.name }}</li>
  </ul>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';

const taskStore = useTaskStore()
  
</script>

<style>
  
</style>