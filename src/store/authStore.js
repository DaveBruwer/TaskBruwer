import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
    dataInit: false
  })
})

