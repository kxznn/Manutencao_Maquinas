import { defineStore } from 'pinia' // importa helper
import axios from 'axios' // axios para chamadas API


// define store chamada 'main'
export const useMainStore = defineStore('main', {
state: () => ({
// lista de máquinas cadastradas
machines: [],
// lista de manutenções
maintenances: [],
// status de carregamento
loading: false,
}),
getters: {
// calcula total de pendentes
pendingCount: (state) => state.maintenances.filter(m => m.status === 'Pendente').length,
// calcula total de concluídas
doneCount: (state) => state.maintenances.filter(m => m.status === 'Concluída').length,
},
actions: {
// busca dados do backend (mock ou real)
async fetchInitialData() {
try {
this.loading = true
// busca máquinas
const machinesRes = await axios.get('/api/machines')
this.machines = machinesRes.data
// busca manutenções
const maintRes = await axios.get('/api/maintenances')
this.maintenances = maintRes.data
} catch (err) {
console.error('Erro ao buscar dados', err)
} finally {
this.loading = false
}
},
// atualiza um registro de manutenção
async updateMaintenance(id, payload) {
try {
const res = await axios.put(`/api/maintenances/${id}`, payload)
// atualiza localmente
const idx = this.maintenances.findIndex(m => m.id === id)
if (idx !== -1) this.maintenances[idx] = res.data
} catch (err) {
console.error('Erro ao atualizar manutenção', err)
}
},
// cria manutenção
async createMaintenance(payload) {
try {
const res = await axios.post('/api/maintenances', payload)
this.maintenances.push(res.data)
} catch (err) {
console.error('Erro ao criar manutenção', err)
}
}
}
})