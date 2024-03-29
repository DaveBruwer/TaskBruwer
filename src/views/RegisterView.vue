<template>
  <div class="mt-4 flex justify-center">
    <form @submit.prevent="submitFn" class="flex flex-grow flex-col justfiy-start max-w-md">
      <input v-model="v$.displayName.$model" type="text" id="displayName" placeholder="Display Name" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.displayName.$error" class=" text-red-500 font-bold">{{ v$.displayName.$errors[0].$message }}</div>
        <div v-else>This can be changed later.</div>
      </div>
      <input v-model="v$.firstNames.$model" type="text" id="firstNames" placeholder="First Names" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.firstNames.$error" class=" text-red-500 font-bold">{{ v$.firstNames.$errors[0].$message }}</div>
        <div v-else>This will be kept private.</div>
      </div>
      <input v-model="v$.lastName.$model" type="text" id="lastName" placeholder="Last Name" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.lastName.$error" class=" text-red-500 font-bold">{{ v$.lastName.$errors[0].$message }}</div>
        <div v-else>This will be kept private.</div>
      </div>
      <input v-model="v$.email.$model" type="email" name="email" id="email" placeholder="Email" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.email.$error" class=" text-red-500 font-bold">{{ v$.email.$errors[0].$message }}</div>
        <div v-else>This will be kept private.</div>
      </div>
      <input v-model="v$.password.$model" type="password" name="password" id="password" placeholder="Password" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.password.$error" class=" text-red-500 font-bold">{{ v$.password.$errors[0].$message }}</div>
        <div v-else>Please ensure to use password <a href="https://www.it.ucsb.edu/secure-compute-research-environment-user-guide/password-best-practices" target="_blank" class=" underline text-blue-500">best practices</a>.</div>
      </div>
      <input v-model="v$.confirmPassword.$model" type="Password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" class="text-black m-1 rounded">
      <div class=" text-sm mb-1">
        <div v-if="v$.confirmPassword.$error" class=" text-red-500 font-bold">{{ v$.confirmPassword.$errors[0].$message }}</div>
        <div v-else>This needs to match the password above.</div>
      </div>
      <div class="mt-2 flex justify-around">
        <button type="submit" :disabled="disableSubmit">Register</button>
        <router-link to="/login">Log In</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth, db } from '../firebase'
import { doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router'

const router = useRouter()

const disableSubmit = ref(false)

const formData = reactive({
  displayName: '',
  firstNames: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

//#region Vuelidate

const rules = {
  displayName: {required, maxLength: maxLength(15)},
  firstNames: {required, maxLength: maxLength(50)},
  lastName: {required, maxLength: maxLength(30)},
  email: {required, email},
  password: {required, minLength: minLength(6)},
  confirmPassword: {required, sameAs: sameAs(computed(() => formData.password))}
}

const v$ = useVuelidate(rules, formData)

//#endregion Vuelidate


// Function that is called when form is submitted.
async function submitFn() {
  disableSubmit.value = true

  const isFormValid = await v$.value.$validate()

  if(isFormValid) {
    console.log('registering new user . . .')

    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then( async () => {
      await updateProfile(auth.currentUser, {displayName: formData.displayName})
    }).then( async () => {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: formData.displayName,
        firstNames: formData.firstNames,
        lastName: formData.lastName
      })
    }).then( () => {
      router.push('/')
    }).catch((error) => {
      console.log(error.message)
      alert(error.message)
    })
  } else {
    alert("Invalid form data.")
    disableSubmit.value = false
  }
  
}
  
</script>

<style>
  
</style>