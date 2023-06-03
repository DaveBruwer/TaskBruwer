<template>
  <div @dragover="temporarilyShowBin" class="h-screen flex flex-nowrap justify-center">
    <div class="flex flex-col w-64 grow-0 shrink-0 border rounded m-2">
      <div id="In Progress" class="min-h-[50%]  " @drop="onDropFunction" @dragover="(e) => { e.preventDefault()}">
        <div class="flex justify-between border-b mx-1">
          <div>In Progress</div>
          <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('In Progress')">+</button>
        </div>
        <TaskComponent v-for="key in InProgressTasks" :task-key="key" :key="key" />
      </div>
      <div id="Pending" class=" " @drop="onDropFunction" @dragover="(e) => { e.preventDefault()}">
        <div class="flex justify-between border-b border-t mx-1">
          <div>Pending</div>
          <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Pending')">+</button>
        </div>
        <TaskComponent v-for="key in PendingTasks" :task-key="key" :key="key" />
      </div>
    </div>
    <div id="Do Now!" class=" w-64 grow-0 shrink-0 border rounded m-2" @drop="onDropFunction" @dragover="(e) => { e.preventDefault()}">
      <div class="flex justify-between border-b mx-1">
        <div>Do Now!</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Do Now!')">+</button>
      </div>
      <TaskComponent v-for="key in DoNowTasks" :task-key="key" :key="key" />
    </div>
    <div id="Got a Minute?" class=" w-64 grow-0 shrink-0 border rounded m-2" @drop="onDropFunction" @dragover="(e) => { e.preventDefault()}">
      <div class="flex justify-between border-b mx-1">
        <div>Got a Minute?</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Got a Minute?')">+</button>
      </div>
      <TaskComponent v-for="key in GotAMinuteTasks" :task-key="key" :key="key" />
    </div>
    <div id="Whenever" class=" w-64 grow-0 shrink-0 border rounded m-2" @drop="onDropFunction" @dragover="(e) => { e.preventDefault()}">
      <div class="flex justify-between border-b mx-1">
        <div>Whenever</div>
        <button class=" text-xl px-2 py-0 my-0" @click.prevent="launchNewTaskModal('Whenever')">+</button>
      </div>
      <TaskComponent v-for="key in WheneverTasks" :task-key="key" :key="key" />
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
            <option class="text-black" value="Pending ">Pending</option>
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

  <div @drop="showDelModal" @dragover="(e) => { e.preventDefault()}" class=" absolute left-1/2 bottom-0 text-5xl m-2 p-10" :class="{ hidden: !showBin}">&#128465;</div>
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
import { ref, reactive, computed } from 'vue'
import { useTaskStore } from '../store/taskStore'
import TaskComponent from '../components/TaskComponent.vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'


const taskStore = useTaskStore()

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

const showBin = ref(false)

function temporarilyShowBin() {
  if(!showBin.value) {
    showBin.value = true
    setTimeout(() => {
      showBin.value = false
    }, 500)
  }
}

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

}

//#endregion deletTask

//#region taskArrays

const InProgressTasks = computed(() => {
  return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'In Progress')
})

const DoNowTasks = computed(() => {
  return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Do Now!')
})

const GotAMinuteTasks = computed(() => {
  return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Got a Minute?')
})

const WheneverTasks = computed(() => {
  return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Whenever')
})

const PendingTasks = computed(() => {
  return Object.keys(taskStore.tasks).filter((key) => taskStore.tasks[key].status == 'Pending')
})
//#endregion taskArrays

const onDropFunction = function(e) {
  taskStore.tasks[e.dataTransfer.getData("text")].status = e.target.id
}
</script>

<style>
  
</style>