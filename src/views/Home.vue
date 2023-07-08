<template>
  <div class="flex justify-center">
    <h1 class=" text-3xl">Home Page</h1>
  </div>
  <button @click.prevent="logTaskStore" class=" border rounded px-1">Log Task Store</button>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore'
import { tempState } from '../store/tempState'

const taskStore = useTaskStore()

function logTaskStore() {
  console.log(taskStore.$state)
  console.log(tempState.store)
}
  
</script>

<style>
  
</style>