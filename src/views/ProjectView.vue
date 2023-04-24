<template>
  <div class="flex justify-center flex-col">
    <h1 class=" text-3xl">Project Page</h1>
    <div>
      <button @click.prevent="() => { showModal = true}" :disabled="!authStore.currentUser">New Project</button>
    </div>
  </div>
  <h1 class="text-2xl">Projects:</h1>
  <ul>
    <li v-for="project in taskStore.projects" >
      <div class="text-xl">{{ project.name }}</div>
      <div>{{ project.description }}</div>
    </li>
  </ul>
  <base-modal :class="[showModal ? 'flex' : 'hidden']">
  <form @submit.prevent="createProject" class="flex flex-grow flex-col justfiy-start">
    <input type="text" class="text-black m-1 rounded" placeholder="Project Name">
    <textarea class="text-black m-1 rounded" cols="30" rows="10" placeholder="Project Description"></textarea>
    <div class="flex flex-row justify-between">
      <div >
        <label for="Colour">Colour: </label>
        <datalist id="colours" class=" rounded w-20" :class="projectData.colour" >
          <option class=" bg-red-700" value="#b91c1c"></option>
          <option class=" bg-orange-700" value="#c2410c"></option>
          <option class=" bg-yellow-700" value="#a16207"></option>
          <option class=" bg-green-700" value="#15803d"></option>
          <option class=" bg-blue-700" value="#1d4ed8"></option>
          <option class=" bg-purple-700" value="#7e22ce"></option>
          <option class=" bg-pink-700" value="#be185d"></option>
        </datalist>
        <input class="bg-transparent" v-model="v$.colour.$model" list="colours" type="color">
      </div>
      <div>
        <label for="priority">Priority: </label>
        <select id="priority" class="rounded bg-transparent" v-model="v$.priority.$model" >
          <option class="text-black" value="Low">Low</option>
          <option class="text-black" value="Medium">Medium</option>
          <option class="text-black" value="High">High</option>
        </select>
      </div>
    </div>
    <div class="flex justify-between m-1 ">
      <button type="submit">Submit</button>
      <button @click.prevent="() => {showModal = false}">Cancel</button>
    </div>
  </form>
  </base-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTaskStore } from '../store/taskStore'
import { useAuthStore } from '../store/authStore'
import BaseModal from '../components/BaseModal.vue'
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

// initiating the stores
const authStore = useAuthStore()
const taskStore = useTaskStore()

//#region Modal logic

const showModal = ref(false) // for toggling modal visibility
const disableSubmit = ref(false) // for disabling the submit button while processing

const projectData = reactive({
  name: "",
  description: "",
  priority: "Med",
  colour: "#b91c1c"
})

const rules = {
  name: {required, maxLength: maxLength(25)},
  description: {},
  priority: {required},
  colour: {required}
}

const v$ = useVuelidate(rules, projectData)


function createProject() {
  disableSubmit.value = true
  console.log("creating project")
  showModal.value = false
  disableSubmit.value = false
}


//#endregion Modal logic




  
</script>

<style>
  
</style>