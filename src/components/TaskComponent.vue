<template>
  <div @click.prevent="() => { showEditModal = true}" class="rounded hover:cursor-pointer border flex flex-row justify-start ml-4 my-2 overflow-hidden h-16 w-60">
    <div class="text-sm w-6 " :style="{ 'background-color': taskStore.projects[task.project].colour}"></div>
    <div class="relative grow">
      <div class="absolute top-0 left-0 mx-1">{{task.name}}</div>
      <div v-if="task.dueDate" class="absolute bottom-0 right-0 mx-1 ">Due: {{task.dueDate}}</div>
    </div>
    <!-- <button @click.prevent="() => { taskToDel = key }">Del</button> -->
  </div>
  <base-modal v-if="showEditModal" id="editTaskModal">
    <form @submit.prevent="updateTask" class="flex flex-grow flex-col justfiy-start">
      <input v-model="edit$.name.$model" type="text" class="text-black m-1 rounded" placeholder="Task Name">
      <div class=" text-sm mb-1">
        <div v-if="edit$.name.$error" class=" text-red-500 font-bold">{{ edit$.name.$errors[0].$message }}</div>
      </div>
      <textarea v-model="edit$.description.$model" class="text-black m-1 rounded" cols="30" rows="5" placeholder="Task Description"></textarea>
      <div class="flex flex-row justify-between">
        <div >
          <label for="Project">Project: </label>
          <select v-model="edit$.project.$model" class="rounded bg-transparent border" id="Project">
            <option class=" text-black" v-for="(project, key) in taskStore.projects" :value="key" :key="key">{{ project.name }}</option>
          </select>
          <div class=" text-sm mb-1">
            <div v-if="edit$.project.$error" class=" text-red-500 font-bold">{{ edit$.project.$errors[0].$message }}</div>
          </div>
        </div>
        <div>
          <label for="priority">Priority: </label>
          <select id="priority" class="rounded bg-transparent border" v-model="edit$.priority.$model" >
            <option class="text-black" value="High">High</option>
            <option class="text-black" value="Medium">Medium</option>
            <option class="text-black" value="Low">Low</option>
          </select>
        </div>
      </div>
      <div>
        <label for="date">Due Date:</label>
        <input type="date" id="date" class="bg-transparent" v-model="edit$.dueDate.$model">
      </div>
      <div class="flex justify-between m-1 ">
        <button type="submit">Submit</button>
        <button @click.prevent="cancelEditModal">Cancel</button>
      </div>
    </form>
  </base-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useTaskStore } from '../store/taskStore'
import BaseModal from './BaseModal.vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'


const taskStore = useTaskStore()

const props = defineProps({
  taskKey: {
    type: String,
    required: true
  }
})

const task = reactive({
  name: taskStore.tasks[props.taskKey].name,
  description: taskStore.tasks[props.taskKey].description,
  project: taskStore.tasks[props.taskKey].project,
  priority: taskStore.tasks[props.taskKey].priority,
  dueDate: taskStore.tasks[props.taskKey].dueDate
})

//#region Edit Modal

const showEditModal = ref(false)

const editRules = {
  name: {required, maxLength: maxLength(20)},
  description: {},
  project: {required},
  priority: {required},
  dueDate: {}
}

const edit$ = useVuelidate(editRules, task)

async function updateTask() {
  
  const isFormValid = await edit$.value.$validate()
  
  if(isFormValid) {
    console.log('Updating Task')

    taskStore.tasks[props.taskKey].name = task.name
    taskStore.tasks[props.taskKey].description = task.description
    taskStore.tasks[props.taskKey].project = task.project
    taskStore.tasks[props.taskKey].priority = task.priority
    taskStore.tasks[props.taskKey].dueDate = task.dueDate

    showEditModal.value = false
  }
}

function cancelEditModal() {
  task.name = taskStore.tasks[props.taskKey].name,
  task.description = taskStore.tasks[props.taskKey].description,
  task.project = taskStore.tasks[props.taskKey].project,
  task.priority = taskStore.tasks[props.taskKey].priority,
  task.dueDate = taskStore.tasks[props.taskKey].dueDate

  showEditModal.value = false
}

//#endregion Edit Modal
  
</script>

<style>
  
</style>