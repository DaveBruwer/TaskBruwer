<template>
  <div class="flex justify-center flex-col">
    <h1 class=" text-3xl">Task Page</h1>
    <div>
      <button @click.prevent="showNewModal.showModal()" :disabled="!authStore.currentUser">New Task</button>
    </div>
  </div>
  <h1 class="text-2xl">Tasks:</h1>
  <div>
    <TaskComponent v-for="(task, key) in taskStore.tasks" :task-key="key" :key="key" />
  </div>
  <dialog ref="showNewModal" id="newTaskModal" class="max-w-md rounded bg-gradient-to-r dark:from-zinc-900 dark:to-slate-600 from-slate-200 to-slate-300 self-start p-4 mt-32">
    <form @submit.prevent="createTask" class="flex flex-grow flex-col justfiy-start">
      <input v-model="newv$.name.$model" type="text" class="text-black m-1 rounded" placeholder="Task Name">
      <div class=" text-sm mb-1">
        <div v-if="newv$.name.$error" class=" text-red-500 font-bold">{{ newv$.name.$errors[0].$message }}</div>
      </div>
      <textarea v-model="newv$.description.$model" class="text-black m-1 rounded" cols="30" rows="5" placeholder="Task Description"></textarea>
      <div class="flex flex-row justify-between">
        <div >
          <label for="Project">Project: </label>
          <select v-model="newv$.project.$model" class="rounded bg-transparent border" id="Project">
            <option class=" text-black" v-for="(project, key) in taskStore.projects" :value="key" :key="key">{{ project.name }}</option>
          </select>
          <div class=" text-sm mb-1">
            <div v-if="newv$.project.$error" class=" text-red-500 font-bold">{{ newv$.project.$errors[0].$message }}</div>
          </div>
        </div>
        <div>
          <label for="priority">Priority: </label>
          <select id="priority" class="rounded bg-transparent border" v-model="newv$.priority.$model" >
            <option class="text-black" value="High">High</option>
            <option class="text-black" value="Medium">Medium</option>
            <option class="text-black" value="Low">Low</option>
          </select>
        </div>
      </div>
      <div>
        <label for="date">Due Date:</label>
        <input type="date" id="date" class="bg-transparent" v-model="newv$.dueDate.$model">
      </div>
      <div class="flex justify-between m-1 ">
        <button type="submit">Submit</button>
        <button @click.prevent="showNewModal.close()">Cancel</button>
      </div>
    </form>
  </dialog>
  <base-modal v-if="showDelModal" id="deleteTaskModal" :class="[showDelModal ? 'flex' : 'hidden']">
  <form v-if="taskToDel" >
    <h1 class=" text-red-700 font-bold text-center">Warning! Are you sure you want to permanently delete <span class=" bg-red-300">{{ taskStore.tasks[taskToDel].name }}</span>?</h1>
    <div class="flex justify-between m-1 ">
      <button @click.prevent="deleteTask" class=" text-red-700 hover:text-white hover:bg-red-700 rounded p-1">Delete</button>
      <button @click.prevent="() => {taskToDel = ''}">Cancel</button>
    </div>
  </form>
  </base-modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useTaskStore } from '../store/taskStore'
import { useAuthStore } from '../store/authStore'
import BaseModal from '../components/BaseModal.vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import TaskComponent from '../components/TaskComponent.vue'

const authStore = useAuthStore()

const taskStore = useTaskStore()

// main form data for creating and updating tasks
const taskData = reactive({
  name: "",
  description: "",
  project: "",
  priority: "Medium",
  dueDate: ""
})

//#region newTaskModal

const showNewModal = ref()

const newRules = {
  name: {required, maxLength: maxLength(20)},
  description: {},
  project: {required},
  priority: {required},
  dueDate: {}
}

const newv$ = useVuelidate(newRules, taskData)

async function createTask() {

  const isFormValid = await newv$.value.$validate()

  if(isFormValid) {
    console.log('Creating task')
    
    taskStore.tasks[Date.now()] = {
      name: taskData.name,
      description: taskData.description,
      project: taskData.project,
      priority: taskData.priority,
      dueDate: taskData.dueDate
    }//taskStore.tasks[Date.now()]

    console.log('Task Created')
    console.log(taskData)

    taskData.name = ""
    taskData.description = ""
    taskData.project = ""
    taskData.priority = "Medium"
    taskData.dueDate = ""

    showNewModal.value.close()

  } //if(isFormValid)
}
//#endregion newTaskModal

//#region deleteTask

const taskToDel = ref("")

const showDelModal = computed(() => Boolean(taskToDel.value))

const deleteTask = function() {

  delete taskStore.tasks[taskToDel.value]

  console.log(`Task deleted!`)

  taskToDel.value = ""

}

//#endregion deletTask

</script>

<style>
  
</style>