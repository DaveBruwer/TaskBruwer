import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: "Pending",
    dataInit: false
  })
})

