<template>
  <div class="flex justify-center flex-col">
    <h1 class=" text-3xl">Project Page</h1>
    <div>
      <button @click.prevent="() => { showModal = true}" :disabled="!authStore.currentUser">New Project</button>
    </div>
  </div>
  <h1 class="text-2xl">Projects:</h1>
  <ul>
    <li class="flex flex-row ml-4 my-2" v-for="(project, key) in taskStore.projects" >
      <div class="mr-1 w-5" :style="{ 'background-color': project.colour}">
      </div>
      <div>
        <div class="flex flex-row items-end justify-start">
          <div class="text-xl">{{ project.name }}</div>
          <div class=" mx-5 text-md">Priority: {{ project.priority }}</div>
          <button @click.prevent="() => { projectToDel = key }" class=" text-red-700 font-bold">Delete</button>
        </div>
        <div>{{ project.description }}</div>
      </div>
    </li>
  </ul>
  <base-modal :class="[showModal ? 'flex' : 'hidden']">
  <form @submit.prevent="createProject" class="flex flex-grow flex-col justfiy-start">
    <input v-model="v$.name.$model" type="text" class="text-black m-1 rounded" placeholder="Project Name">
    <div class=" text-sm mb-1">
      <div v-if="v$.name.$error" class=" text-red-500 font-bold">{{ v$.name.$errors[0].$message }}</div>
    </div>
    <div v-if="processingMessage" class=" font-bold">{{ processingMessage }}.</div>
    <textarea v-model="v$.description.$model" class="text-black m-1 rounded" cols="30" rows="10" placeholder="Project Description"></textarea>
    <div class="flex flex-row justify-between">
      <div >
        <label for="Colour">Colour: </label>
        <datalist id="colours" class=" rounded w-20" :class="projectData.colour" >
          <option class=" bg-red-600" value="#dc2626"></option>
          <option class=" bg-orange-600" value="#ea580c"></option>
          <option class=" bg-yellow-500" value="#f59e0b"></option>
          <option class=" bg-green-600" value="#16a34a"></option>
          <option class=" bg-blue-700" value="#1d4ed8"></option>
          <option class=" bg-purple-700" value="#7e22ce"></option>
          <option class=" bg-pink-600" value="#e11d48"></option>
          <option class=" bg-gray-500" value="#6b7280"></option>
        </datalist>
        <input class="bg-transparent" v-model="v$.colour.$model" list="colours" type="color">
      </div>
      <div>
        <label for="priority">Priority: </label>
        <select id="priority" class="rounded bg-transparent" v-model="v$.priority.$model" >
          <option class="text-black" value="High">High</option>
          <option class="text-black" value="Medium">Medium</option>
          <option class="text-black" value="Low">Low</option>
        </select>
      </div>
    </div>
    <div class="flex justify-between m-1 ">
      <button type="submit">Submit</button>
      <button @click.prevent="() => {showModal = false}">Cancel</button>
    </div>
  </form>
  </base-modal>
  <base-modal :class="[showDelModal ? 'flex' : 'hidden']">
  <form v-if="projectToDel" >
    <h1 class=" text-red-700 font-bold text-center">Warning! Are you sure you want to permanently delete {{ taskStore.projects[projectToDel].name }}?</h1>
    <div class="flex justify-between m-1 ">
      <button @click.prevent="deleteProject" class=" text-red-700 hover:text-white hover:bg-red-700 rounded p-1">Delete</button>
      <button @click.prevent="() => {projectToDel = ''}">Cancel</button>
    </div>
  </form>
  </base-modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useTaskStore } from '../store/taskStore'
import { useAuthStore } from '../store/authStore'
import BaseModal from '../components/BaseModal.vue'
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';

// initiating the stores
const authStore = useAuthStore()
const taskStore = useTaskStore()

//#region New Project

const showModal = ref(false) // for toggling modal visibility
const disableSubmit = ref(false) // for disabling the submit button while processing

const projectData = reactive({
  name: "",
  description: "",
  priority: "Medium",
  colour: "#dc2626"
})

// Custom validator function to check if project name already exists.
const uniqueName = (value) => !Object.values(taskStore.projects).find((project) => project.name == value)

const rules = {
  name: {required, maxLength: maxLength(25), uniqueName: helpers.withMessage('This project name already exists.', uniqueName)},
  description: {},
  priority: {required},
  colour: {required}
}

const v$ = useVuelidate(rules, projectData)

const processingMessage = ref("")

async function createProject() {
  disableSubmit.value = true
  
  const isFormValid = await v$.value.$validate()
  
  if(isFormValid) {
    console.log("creating project")
    processingMessage.value = "Processing..."

    taskStore.projects[Date.now()] = {
      name: projectData.name,
      description: projectData.description,
      priority: projectData.priority,
      colour: projectData.colour
    }

    projectData.name = ""
    projectData.description = ""
    projectData.priority = "Medium"
    projectData.colour = "#dc2626"

    processingMessage.value = ""
    showModal.value = false
  }

  disableSubmit.value = false
}


//#endregion New Project

//#region Delete Project

const projectToDel = ref("")

const showDelModal = computed(() => Boolean(projectToDel.value))

const deleteProject = function() {

  delete taskStore.projects[projectToDel.value]

  console.log(`Project deleted!`)

  projectToDel.value = ""

}


//#endregion Delete Project


  
</script>

<style>
  
</style>