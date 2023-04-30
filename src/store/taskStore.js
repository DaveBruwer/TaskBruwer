import { defineStore } from "pinia"

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: {
      
    },
    projects: {
      
    }
  }),
  getters: {
    listOfProjects: (state) => Object.values(state.projects).map((project) => project.name)
  }
})

