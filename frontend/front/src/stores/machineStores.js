import { defineStore } from 'pinia';
import { maintenanceService } from '@/services/api';

export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    maintenances: [],
    currentMaintenance: null,
    loading: false,
  }),
  actions: {
    async fetchMaintenances() {
      this.loading = true;
      try {
        const response = await maintenanceService.getAll();
        this.maintenances = response.data;
      } catch (error) {
        console.error('Erro ao buscar manutenções:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    overdueMaintenances: (state) => state.maintenances.filter(m => m.status === 'vermelho'),
    completedMaintenances: (state) => state.maintenances.filter(m => m.status === 'verde'),
    pendingMaintenances: (state) => state.maintenances.filter(m => m.status === 'amarelo'),
  },
});