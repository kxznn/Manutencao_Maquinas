import api from '../service/api';
import { defineStore } from 'pinia';

export const useMachineStore = defineStore('machine', {
  state: () => ({
    machines: []
  }),

    actions: {
      async fetchMachine() {
        const res = await api.get('/machines');
        this.machines = res.data;
      },
      async addMachine(machine) {
        const res = await api.post("/machines", machine);
        this.machines.push(res.data);
      },
      async deleteMachine(id) {
        await api.delete(`/machines/${id}`);
        this.machines = this.machines.filter( u => u._id !== id);
      }, 
      async updateMachine(id, machine) {
        const res = await api.put(`/machines/${id}`, machine);
        const i = this.machine.findIndex( m => m._id === id);
        if (i !== -1) this.machines[i] = res.data; 
      }
  }
});
