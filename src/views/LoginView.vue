<template>
  <div class="mt-4 flex justify-center">
    <form @submit.prevent="submitFn" class="flex flex-grow flex-col justfiy-start max-w-md">
      <input v-model="v$.email.$model" type="email" name="email" id="email" placeholder="Email" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.email.$error" class=" text-red-500 font-bold">{{ v$.email.$errors[0].$message }}</div>
      </div>
      <input v-model="v$.password.$model" type="password" name="password" id="password" placeholder="Password" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.password.$error" class=" text-red-500 font-bold">{{ v$.password.$errors[0].$message }}</div>
      </div>
      <div class="mt-2 flex justify-around">
        <button :disabled="disableLogin" type="submit">Log In</button>
        <router-link to="/register">Register</router-link>
      </div>
      <button @click.prevent="() => {showModal = true}" class="m-2 self-end">Forgot Password</button>
    </form>
    <base-modal class="flex-grow" :class="[showModal ? 'flex' : 'hidden']">
      <form @submit.prevent="resetPassword" class="flex flex-grow flex-col justfiy-start">
        <input v-model="resetV$.email.$model" type="email" name="email" placeholder="Email" class="text-black m-1 rounded">
        <div class=" text-sm mb-1">
          <div v-if="resetV$.email.$error" class=" text-red-500 font-bold">{{ resetV$.email.$errors[0].$message }}</div>
        </div>
        <div v-if="displayEmailMessage" class=" font-bold">{{ displayEmailMessage }}.</div>
        <div class="flex justify-between m-1">
          <button type="submit">Submit</button>
          <button @click.prevent="() => {showModal = false}">Close</button>
        </div>
      </form>
    </base-modal>
  </div>
  
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'vue-router'
import BaseModal from '../components/BaseModal.vue'

const router = useRouter()

const formData = reactive({
  email: '',
  password: ''
})

//#region Vuelidate

const rules = {
  email: {required, email},
  password: {required}
}

const v$ = useVuelidate(rules, formData)

//#endregion Vuelidate

//#region Login
const disableLogin = ref(false)

// Function that is called when form is submitted.
async function submitFn() {
  disableLogin.value = true
  const isFormValid = await v$.value.$validate()

  if(isFormValid) {
    console.log("logging in user . . .")

    await signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(() => {
      router.push('/')
    }).catch((error) => {
      console.log(error.message)
      alert(error.message)
    })
  } else {
    console.log("Form fields not valid.")
    disableLogin.value = false
  }
}
//#endregion Login

//#region forgot password
const showModal = ref(false)
const disableForgotPassword = ref(false)
const displayEmailMessage = ref("")

const resetFormData = reactive({
  email: ''
})

const resetFormRules = reactive({
  email: {required, email}
})

const resetV$ = useVuelidate(resetFormRules, resetFormData)

async function resetPassword() {
  disableForgotPassword.value = true

  const isResetFormValid = await resetV$.value.$validate()

  if(isResetFormValid) {
    console.log("sending password reset request...")
    displayEmailMessage.value = `Please wait...`

    await sendPasswordResetEmail(auth, resetFormData.email)
    .then(() => {
      displayEmailMessage.value = `A password reset email has been sent to ${resetFormData.email}`
      disableForgotPassword.value = false
    }).catch((error) => {
      console.log(error.message)
      alert(error.message)
      disableForgotPassword.value = false
      displayEmailMessage.value = ""
      showModal.value = false
    })   
  } else {
    console.log("Form fields not valid.")
    disableForgotPassword.value = false
  }


}

//#endregion forgot password

  
</script>

<style>
  
</style>