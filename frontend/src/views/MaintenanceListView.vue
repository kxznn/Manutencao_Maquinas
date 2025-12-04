<template>
  <Sidebar />
  <div class="list">
    <div class="p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Lista de Manutenções</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nova Manutenção
        </button>
      </div>

      <MaintenanceTable :items="store.maintenances" />
    </div>
  </div>
</template>
1
<script setup>
import { useMaintenanceStore } from '../stores/maintenanceStore'
import MaintenanceTable from '../components/MaintenanceTable.vue'

const store = useMaintenanceStore()
</script>
