import { defineStore } from 'pinia'
import axios from 'axios'

export const useMaintenanceStore = defineStore('maintenance', {
    state: () => ({
        maintenances: [], // Array com os dados das manutenções
        machines: ["M1", "M2", "M3"], // Mock ou vindo da API
        loading: false
    }),
    getters: {
        // KPI: Conta quantas estão atrasadas
        totalDelayed: (state) => state.maintenances.filter(m => m.status === 'Vermelho').length,
        // KPI: Conta concluídas
        totalCompleted: (state) => state.maintenances.filter(m => m.status === 'Concluído').length,
        // Outros getters úteis
        totalMaintenances: (state) => state.maintenances.length
    },
    actions: {
        async fetchMaintenances() {
            this.loading = true
            try {
                // Exemplo com API
                const response = await axios.get('/api/maintenances')
                this.maintenances = response.data
            } catch (error) {
                console.error('Erro ao buscar manutenções:', error)
                // Em caso de erro, usar dados mock como fallback
                this.maintenances = [
                    { id: 1, machine: "M1", status: "Vermelho", description: "Manutenção atrasada" },
                    { id: 2, machine: "M2", status: "Concluído", description: "Preventiva" },
                    { id: 3, machine: "M3", status: "Em andamento", description: "Corretiva" }
                ]
            } finally {
                this.loading = false
            }
        },
        
        async addMaintenance(maintenance) {
            try {
                const response = await axios.post('/api/maintenances', maintenance)
                this.maintenances.push(response.data)
                return response.data
            } catch (error) {
                console.error('Erro ao adicionar manutenção:', error)
                throw error
            }
        },
        
        // Action para buscar máquinas da API se necessário
        async fetchMachines() {
            try {
                const response = await axios.get('/api/machines')
                this.machines = response.data
            } catch (error) {
                console.error('Erro ao buscar máquinas:', error)
            }
        }
    }
})