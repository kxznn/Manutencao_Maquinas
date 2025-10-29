import { defineStore } from "pinia";
import api from "../service/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),

  actions: {
    //  form logic 
    
    setFormForEdit(user) {
        this.editID = user._id;
        this.form.nome = user.nome;
        this.form.email = user.email;
    },

    resetForm() {
        this.editID = null;
        this.form.nome = '';
        this.form.email = '';
    },

    async salvar() {
        if (this.editID) {
            await this.updateUser(this.editID, this.form);
        } else { 
            await this.addUser(this.form);
        }
    },


    // functions api (crud)
    async fetchUsers() {
      const res = await api.get("/users");
      this.users = res.data;
    },
    async addUser(user) {
        const res = await api.post('/users', user);
        this.users.push(res.data)
    },
    async deleteUser(id) {
        const res = await api.delete(`/users/${id}`);
        this.users = this.users.filter( u => u._id !== id);
    }
  }
});
