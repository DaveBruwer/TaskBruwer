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
        <button type="submit">Log In</button>
        <router-link to="/register">Register</router-link>
      </div>
    </form>
  </div>
  
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'

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


// Function that is called whan form is submitted.
async function submitFn() {
  const isFormValid = await v$.value.$validate()

  if(isFormValid) {
    alert("Register Triggered")
  } else {
    alert("Error: Please double check that all the form fields are filled in and valid.")
  }
  
}
  
</script>

<style>
  
</style>