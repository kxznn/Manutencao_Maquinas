<template>
  <div class="Form">
    <div class="p-8 max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Nova Manutenção</h1>

      <form @submit.prevent="submitForm" class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Máquina</label>
          <select
            v-model="form.machine"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option disabled value="">Selecione uma máquina</option>
            <option>M1</option>
            <option>M2</option>
            <option>M3</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            v-model="form.date"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Setor</label>
          <input
            type="text"
            v-model="form.sector"
            placeholder="Ex: Usinagem"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="form.status"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option>Pendente</option>
            <option>Concluída</option>
            <option>Atrasada</option>
          </select>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            @click="$router.push('/lista')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMaintenanceStore } from '../stores/maintenanceStore'

const store = useMaintenanceStore()
const router = useRouter()

const form = reactive({
  machine: '',
  date: '',
  sector: '',
  status: 'Pendente'
})

const submitForm = () => {
  const newId = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  
  store.addMaintenance({
    id: newId,
    ...form
  })
  router.push('/lista')
}
</script>