<template>
  <div class="flex justify-center">
    <h1 class=" text-3xl">Dashboard Page</h1>
  </div>
  <h1 class="text-2xl">Tasks:</h1>
  <ul>
    <li v-for="(task, key) in taskStore.tasks" :key="key" >{{ task.name }}</li>
  </ul>
  <h1 class="text-2xl">Projects:</h1>
  <ul>
    <li v-for="(project, key) in taskStore.projects" :key="key" >{{ project.name }}</li>
  </ul>
  <button @click.prevent="showModal">Open Dialogue</button>
  <dialog ref="myModal">
    <form >
      <input type="text">
      <button @click.prevent="closeModal">Close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/taskStore'

const taskStore = useTaskStore()

const myModal = ref()

function showModal() {
  myModal.value.showModal()
}

function closeModal() {
  myModal.value.close()
}

</script>

<style>
  
</style>