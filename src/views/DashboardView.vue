<template>
  <div class="h-screen flex flex-nowrap justify-center">
    <div class=" w-64 grow-0 shrink-0 border rounded m-2">
      <div class=" border-b mx-1">In Progress</div>

      </div>
    <div class=" w-64 grow-0 shrink-0 border rounded m-2">
      <div class="border-b mx-1">Do Now!</div>

    </div>
    <div class=" w-64 grow-0 shrink-0 border rounded m-2">
      <div class="border-b mx-1">Got a Minute</div>

    </div>
    <div class=" w-64 grow-0 shrink-0 border rounded m-2">
      <div class="border-b mx-1">Whenever</div>
      
    </div>

  </div>
  



</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../store/taskStore'
import TaskComponent from '../components/TaskComponent.vue'

const taskStore = useTaskStore()



</script>

<style>
  
</style>