import api from '../service/api';
import { defineStore } from 'pinia';

export const useMachineStore = defineStore('machine', () => {
  state: () => ({
    machines: []
  }),

  actions: {
      async fetchMachine() {
        const res = await api.get('/machine');
        this.machine = res.data;
      },
      async addMachine(machine) {
        const res = await api.post("/machines", machine);
        this.machine.push(res.data);
      },

      
  }
});
