<template>
  <!-- gráfico de evolução -->
  <div class="bg-white p-4 rounded shadow">
    <h2 class="mb-4 font-semibold">Evolução das manutenções</h2>
    <LineChart :chart-data="chartData" />
  </div>

  <!-- lista resumida de manutenções recentes -->
  <div class="bg-white p-4 rounded shadow">
    <h2 class="mb-4 font-semibold">Últimas manutenções</h2>
    <MaintenanceTable :items="recentMaintenances" />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue"; // hooks do Vue
import { useMainStore } from "../store"; // store global
import KPICard from "../components/KPICard.vue"; // componente card
import LineChart from "../components/LineChart.vue"; // componente gráfico
import MaintenanceTable from "../components/MaintenanceTable.vue"; // tabela

const store = useMainStore(); // instancia da store

// busca dados ao montar
onMounted(() => {
  store.fetchInitialData();
});

// computed para KPIs
const overdueCount = computed(
  () => store.maintenances.filter((m) => m.status === "Atrasada").length
);
const doneCount = computed(() => store.doneCount);
const pendingCount = computed(() => store.pendingCount);

// dados do gráfico (exemplo simples extraído dos dados)
const chartData = computed(() => {
  // transforma manutenções em contagem por mês (mock)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const counts = Array(12).fill(0);
  store.maintenances.forEach((m) => {
    const d = new Date(m.date);
    counts[d.getMonth()]++;
  });
  return { labels: months, datasets: [{ label: "Manutenções", data: counts }] };
});

// últimas 5 manutenções
const recentMaintenances = computed(() => [...store.maintenances].slice(0, 5));
</script>
