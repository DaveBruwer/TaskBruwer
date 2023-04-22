
<template>
  <Header />
  <main class="mx-2">
    <RouterView />
  </main>
</template>

<script setup>
import { doc, updateDoc } from "@firebase/firestore";
import { ref } from "vue"
import Header from "./components/Header.vue"
import { db } from "./firebase";
import { useAuthStore } from "./store/authStore";
import { useTaskStore } from "./store/taskStore"

const authStore = useAuthStore()

const countdown = ref(3)
const countdownStarted = ref(false)

const taskStore = useTaskStore()
taskStore.$subscribe(() => {
  if(authStore.currentUser && authStore.dataInit) {
      countdown.value = 3

    if(!countdownStarted.value){
      doCountdown()
      countdownStarted.value = true
    }
  }
})

function doCountdown() {
  console.log("starting countdown...")
  const setInt = setInterval(() => {
    if(countdown.value < 1) {
      clearInterval(setInt)
      countdownStarted.value = false
      syncData()
    } else {
      console.log(countdown.value)
      countdown.value--
    }
  }, 1000);
}

async function syncData() {
  console.log('Syncing store')
  await updateDoc(doc(db, "users", authStore.currentUser.uid), {
    data: JSON.stringify(taskStore.$state)
  }).then(() => {
    console.log("sync complete")
  }).catch((error) => {
    console.log(error.message)
    alert(error.message)
  })
}

</script>
  
<style>

</style>