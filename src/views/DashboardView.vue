<template>
  <div v-if="authStore.currentUser" class="h-screen flex flex-nowrap justify-center">
    <div class="flex flex-col w-64 grow-0 shrink-0 border rounded m-2">
      <div class="relative flex-grow">
        <div class="flex justify-between border-b mx-1">
          <div>In Progress</div>
          <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('In Progress')">+</button>
        </div>
        <TaskComponent v-for="key in InProgressTasks" :task-key="key" :key="key" @dragStart="() => { nowDragging = true }" @dragEnd="() => { nowDragging = false }" />
        <div id="In Progress" class="w-full h-full absolute top-0" :class="[nowDragging ? 'z-[997]': 'z-[-1]']" @drop="onDropFunction" @dragover="onDragOver"></div>
      </div>
      <div class="relative min-h-[10em] ">
        <div class="flex justify-between border-b border-t mx-1">
          <div>Pending</div>
          <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Pending')">+</button>
        </div>
        <TaskComponent v-for="key in PendingTasks" :task-key="key" :key="key" @dragStart="() => { nowDragging = true }" @dragEnd="() => { nowDragging = false }" />
        <div id="Pending" class="w-full h-full absolute top-0" :class="[nowDragging ? 'z-[997]': 'z-[-1]']" @drop="onDropFunction" @dragover="onDragOver"></div>
      </div>
    </div>
    <div class="relative w-64 grow-0 shrink-0 border rounded m-2">
      <div class="flex justify-between border-b mx-1">
        <div>Do Now!</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Do Now!')">+</button>
      </div>
      <TaskComponent v-for="key in DoNowTasks" :task-key="key" :key="key" @dragStart="() => { nowDragging = true }" @dragEnd="() => { nowDragging = false }" />
      <div id="Do Now!" class="w-full h-full absolute top-0" :class="[nowDragging ? 'z-[997]': 'z-[-1]']" @drop="onDropFunction" @dragover="onDragOver"></div>
    </div>
    <div class="relative w-64 grow-0 shrink-0 border rounded m-2">
      <div class="flex justify-between border-b mx-1">
        <div>Got a Minute?</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Got a Minute?')">+</button>
      </div>
      <TaskComponent v-for="key in GotAMinuteTasks" :task-key="key" :key="key" @dragStart="() => { nowDragging = true }" @dragEnd="() => { nowDragging = false }" />
      <div id="Got a Minute?" class="w-full h-full absolute top-0" :class="[nowDragging ? 'z-[997]': 'z-[-1]']" @drop="onDropFunction" @dragover="onDragOver"></div>
    </div>
    <div class="relative w-64 grow-0 shrink-0 border rounded m-2">
      <div class="flex justify-between border-b mx-1">
        <div>Whenever</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Whenever')">+</button>
      </div>
      <TaskComponent v-for="key in WheneverTasks" :task-key="key" :key="key" @dragStart="() => { nowDragging = true }" @dragEnd="() => { nowDragging = false }" />
      <div id="Whenever" class="w-full h-full absolute top-0" :class="[nowDragging ? 'z-[997]': 'z-[-1]']" @drop="onDropFunction" @dragover="onDragOver"></div>
    </div>
  </div>
  <div v-else class=" absolute min-w-full min-h-screen bg-black bg-opacity-75  z-10">
    <div class=" absolute top-2/4 text-5xl text-center m-auto min-w-full"> 
      <router-link to="/login">Log In</router-link>
    </div>
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
          <label for="status">Status: </label>
          <select id="status" class="rounded bg-transparent border" v-model="newv$.status.$model" >
            <option class="text-black" value="In Progress">In Progress</option>
            <option class="text-black" value="Do Now!">Do Now!</option>
            <option class="text-black" value="Got a Minute?">Got a Minute?</option>
            <option class="text-black" value="Whenever">Whenever</option>
            <option class="text-black" value="Pending">Pending</option>
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

  <div @drop="showDelModal" @dragover="(e) => { e.preventDefault()}" class=" absolute left-1/2 bottom-0 text-5xl m-2 p-10 z-[998]" :class="{ hidden: !nowDragging}">&#128465;</div>
  <dialog ref="delModal" class="max-w-md rounded bg-gradient-to-r dark:from-zinc-900 dark:to-slate-600 from-slate-200 to-slate-300 self-start p-4 mt-32">
    <form v-if="taskToDel" >
      <h1 class=" text-red-700 font-bold text-center">Warning! Are you sure you want to permanently delete <span class=" bg-red-300">{{ taskStore.tasks[taskToDel].name }}</span>?</h1>
      <div class="flex justify-between m-1 ">
        <button @click.prevent="deleteTask" class=" text-red-700 hover:text-white hover:bg-red-700 rounded p-1">Delete</button>
        <button @click.prevent="() => {delModal.close()}">Cancel</button>
      </div>
    </form>
  </dialog>
  



</template>

<script setup>
import { ref, reactive, watch} from 'vue'
import { useAuthStore } from '../store/authStore'
import { useTaskStore } from '../store/taskStore'
import TaskComponent from '../components/TaskComponent.vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'


const taskStore = useTaskStore()
const authStore = useAuthStore()

// main form data for creating and updating tasks
const taskData = reactive({
  name: "",
  description: "",
  project: "",
  status: "",
  dueDate: ""
})

//#region newTaskModal

const showNewModal = ref()

const newRules = {
  name: {required, maxLength: maxLength(20)},
  description: {},
  project: {required},
  status: {required},
  dueDate: {}
}

const newv$ = useVuelidate(newRules, taskData)

async function createTask() {

  console.log('submit button pressed')

  const isNewFormValid = await newv$.value.$validate()

  console.log(isNewFormValid)
  console.log(newv$.value)

  if(isNewFormValid) {
    console.log('Creating task')
    
    taskStore.tasks[Date.now()] = {
      name: taskData.name,
      description: taskData.description,
      project: taskData.project,
      status: taskData.status,
      dueDate: taskData.dueDate
    } //taskStore.tasks[Date.now()]

    console.log('Task Created')
    console.log(taskData)

    taskData.name = ""
    taskData.description = ""
    taskData.project = ""
    taskData.status = ""
    taskData.dueDate = ""

    showNewModal.value.close()

  } //if(isNewFormValid)
}

function launchNewTaskModal(newTaskStatus) {
  taskData.status = newTaskStatus

  showNewModal.value.showModal()  
}

//#endregion newTaskModal

//#region deleteTask

const nowDragging = ref(false)

// function busyDragging() {
  
//   if(!nowDragging.value) {
//     nowDragging.value = true
//     setTimeout(() => {
//       nowDragging.value = false
//     }, 500)
//   }
// }

const delModal = ref()

const taskToDel = ref()

const showDelModal = function(e) {
  taskToDel.value = e.dataTransfer.getData("text")

  delModal.value.showModal()
}

const deleteTask = function() {

  delete taskStore.tasks[taskToDel.value]

  console.log(`Task deleted!`)

  setTimeout(() => {
    delModal.value.close()
  }, 50)

  taskToDel.value = ""

  console.log('deleteTask finished')

}

//#endregion deletTask

//#region taskArrays

let InProgressTasks = ref()
let DoNowTasks = ref()
let GotAMinuteTasks = ref()
let WheneverTasks = ref()
let PendingTasks = ref()

function loadTaskArrays() {


  InProgressTasks.value = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'In Progress')

  DoNowTasks.value = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Do Now!')

  GotAMinuteTasks.value = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Got a Minute?')

  WheneverTasks.value = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Whenever')

  PendingTasks.value = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Pending')

}

loadTaskArrays()

watch( () => authStore.dataInit ,(dataInit) => {

  if (dataInit) {
    loadTaskArrays()
  }
})


// const InProgressTasks = computed(() => {
//   const _inProgressTasks = Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'In Progress')
//   console.log(_inProgressTasks)
//   return _inProgressTasks
// })

// const DoNowTasks = computed(() => {
//   return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Do Now!')
// })

// const GotAMinuteTasks = computed(() => {
//   return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Got a Minute?')
// })

// const WheneverTasks = computed(() => {
//   return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Whenever')
// })

// const PendingTasks = computed(() => {
//   return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Pending')
// })
//#endregion taskArrays

const onDragOver = function(e) {
  e.preventDefault()
}

const onDropFunction = function(e) {

  nowDragging.value = false
  
  if(e.target.id) {
    taskStore.tasks[e.dataTransfer.getData("text")].status = e.target.id
  }
}
</script>

<style>
  
</style>