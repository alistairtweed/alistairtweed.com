import { defineStore } from "pinia"

const useStore = defineStore("main", {
  state: () => ({
    currentUser: null
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
    }
  }
})

export default useStore
