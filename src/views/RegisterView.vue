<template>
  <div class="mt-4 flex justify-center">
    <form class="flex flex-grow flex-col justfiy-start max-w-md">
      <input type="text" id="displayName" placeholder="Display Name" class="text-black m-1 rounded">
      <input type="text" id="firstName" placeholder="First Names" class="text-black m-1 rounded">
      <input type="text" id="lastName" placeholder="Last Name" class="text-black m-1 rounded">
      <input type="email" name="email" id="email" placeholder="Email" class="text-black m-1 rounded">
      <input type="password" name="password" id="password" placeholder="Password" class="text-black m-1 rounded">
      <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" class="text-black m-1 rounded">
      <div class="mt-2 flex justify-around">
        <button type="submit">Register</button>
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
  
</template>

<script setup>
  
</script>

<style>
  
</style>