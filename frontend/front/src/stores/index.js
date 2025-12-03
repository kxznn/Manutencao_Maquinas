import { defineStore } from 'pinia' 
import api from '../services/api' 
export const useMainStore = defineStore('main', {
  state: () => ({
    machines: [], 
    maintenances: [],
    loading: false 
  }),
  actions: {
    async loadAll() {
      this.loading = true 
      this.machines = await api.getMachines()
      this.maintenances = await api.getMaintenances() 
      this.loading = false 
    },

    async addMaintenance(payload) {
      const created = await api.createMaintenance(payload) 
      this.maintenances.push(created) 
    },
    async updateMaintenance(id, payload) {
      const updated = await api.updateMaintenance(id, payload) 
      const idx = this.maintenances.findIndex(m => m.id === id)
      if (idx !== -1) this.maintenances.splice(idx, 1, updated)
    }
  }
})