<template>
  <div @click.prevent="() => { editTaskModal.showModal() }" draggable=true @dragstart="dragStart" @dragend="dragEnd" class=" cursor-grab rounded border flex-row justify-start mx-2 my-2 overflow-hidden h-16 w-60" :class="[dragging ? 'hidden' : 'flex']">
    <div class="text-sm w-6 " :style="{ 'background-color': taskStore.projects[taskStore.tasks[taskKey].project].colour}"></div>
    <div class="relative grow">
      <div class="absolute top-0 left-0 mx-1">{{taskStore.tasks[taskKey].name}}</div>
      <div v-if="taskStore.tasks[taskKey].dueDate" class="absolute bottom-0 right-0 mx-1 ">Due: {{taskStore.tasks[taskKey].dueDate}}</div>
    </div>
    <!-- <button @click.prevent="() => { taskToDel = key }">Del</button> -->
  </div>
  <dialog ref="editTaskModal" class="max-w-md rounded bg-gradient-to-r dark:from-zinc-900 dark:to-slate-600 from-slate-200 to-slate-300 self-start p-4 mt-32">
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
          <label for="status">Status: </label>
          <select id="status" class="rounded bg-transparent border" v-model="edit$.status.$model" >
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
        <input type="date" id="date" class="bg-transparent" v-model="edit$.dueDate.$model">
      </div>
      <div class="flex justify-between m-1 ">
        <button type="submit">Submit</button>
        <button @click.prevent="cancelEditModal">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useTaskStore } from '../store/taskStore'
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
  status: taskStore.tasks[props.taskKey].status,
  dueDate: taskStore.tasks[props.taskKey].dueDate
})

//#region Edit Modal

const editTaskModal = ref()

const editRules = {
  name: {required, maxLength: maxLength(20)},
  description: {},
  project: {required},
  status: {required},
  dueDate: {}
}

const edit$ = useVuelidate(editRules, task)

async function updateTask() {
  
  const isEditFormValid = await edit$.value.$validate()
  
  if(isEditFormValid) {
    console.log('Updating Task')

    taskStore.tasks[props.taskKey].name = task.name
    taskStore.tasks[props.taskKey].description = task.description
    taskStore.tasks[props.taskKey].project = task.project
    taskStore.tasks[props.taskKey].status = task.status
    taskStore.tasks[props.taskKey].dueDate = task.dueDate

    editTaskModal.value.close()
  }
}

function cancelEditModal() {
  task.name = taskStore.tasks[props.taskKey].name,
  task.description = taskStore.tasks[props.taskKey].description,
  task.project = taskStore.tasks[props.taskKey].project,
  task.status = taskStore.tasks[props.taskKey].status,
  task.dueDate = taskStore.tasks[props.taskKey].dueDate

  editTaskModal.value.close()
}

//#endregion Edit Modal
  
//#region Drag

let dragging = ref(false)

function dragStart(e) {
  console.log('drag start')
  console.log(e)
  e.dataTransfer.setData("text", props.taskKey)
  setTimeout(() => {
    dragging.value = true
  }, 10)
}

function dragEnd() {
  console.log('drag end')
  dragging.value = false
}


//#endregion Drag


</script>

<style>
  
</style>