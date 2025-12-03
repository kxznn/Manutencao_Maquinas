<template>
<!-- card simples que mostra uma métrica -->
<div class="bg-white p-4 rounded shadow">
<div class="text-sm text-gray-500">{{ title }}</div>
<div class="text-2xl font-bold">{{ value }}</div>
</div>
</template>


<script setup>
import { defineProps } from 'vue'


// recebe props title e value
const props = defineProps({
title: { type: String, required: true },
value: { type: [Number,String], default: 0 }
})
</script>


--- src/components/LineChart.vue ---
<template>
<!-- wrapper para chart.js via vue-chartjs -->
<div>
<canvas ref="canvas" />
</div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'


// registra elementos do chart.js
Chart.register(...registerables)


const props = defineProps({ chartData: { type: Object, required: true } })
const canvas = ref(null)
let chartInstance = null


onMounted(() => {
// cria chart quando montar
chartInstance = new Chart(canvas.value.getContext('2d'), {
type: 'bar',
data: props.chartData,
options: { responsive: true }
})
})


watch(() => props.chartData, (newData) => {
// atualiza dados do chart quando chartData mudar
if (chartInstance) {
chartInstance.data = newData
chartInstance.update()
}
})
</script>