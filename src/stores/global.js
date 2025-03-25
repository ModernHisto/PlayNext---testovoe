// Utilities

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    LinkHome: "http://localhost:3000/",
  }),
})
