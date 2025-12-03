<template>
<!-- View do calendário: usa calendário simples com eventos -->
<div class="bg-white p-4 rounded shadow">
<h2 class="font-semibold mb-4">Calendário</h2>
<!-- calendario simples: implementação mínima para demonstração -->
<div>
<input type="date" v-model="selectedDate" class="border p-2 rounded" />
<div class="mt-4">
<div v-for="m in eventsOnSelectedDate" :key="m.id" class="p-2 bg-red-50 rounded mb-2">
<div class="font-semibold">{{ m.machine }}</div>
<div class="text-sm">{{ m.description }}</div>
</div>
</div>
</div>
</div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../store'


const store = useMainStore()
const selectedDate = ref(new Date().toISOString().slice(0,10))


const eventsOnSelectedDate = computed(() => store.maintenances.filter(m => m.date === selectedDate.value))
</script>