<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <KpiCard title="Manutenções Atrasadas" :value="store.totalDelayed" type="danger" />
      <KpiCard title="Concluídas" :value="store.totalCompleted" type="success" />
      <KpiCard title="Pendentes" :value="store.totalPending" type="warning" />
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Evolução das Manutenções</h2>
      <div class="flex items-end space-x-4 h-48 border-b pb-2">
        <div class="w-1/6 bg-green-400 h-32 rounded-t" title="Concluídas"></div>
        <div class="w-1/6 bg-yellow-400 h-20 rounded-t" title="Pendentes"></div>
        <div class="w-1/6 bg-red-400 h-10 rounded-t" title="Atrasadas"></div>
      </div>
      <p class="text-sm text-gray-500 mt-2">*Gráfico ilustrativo (implementar Chart.js)</p>
    </div>
  </div>
</template>

<script setup>
import { useMaintenanceStore } from '../stores/maintenanceStore'
import KpiCard from '../components/KpiCard.vue'

const store = useMaintenanceStore()
</script>
