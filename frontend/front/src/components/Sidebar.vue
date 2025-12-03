<template>
  <!-- barra lateral com navegação principal -->
  <aside class="w-64 bg-white shadow p-4">
    <div class="mb-6">
      <img src="/src/assets/logo-placeholder.png" alt="logo" class="h-10" />
    </div>

    <nav class="flex flex-col gap-2">
      <router-link to="/" class="px-3 py-2 rounded hover:bg-gray-100"
        >Dashboard</router-link
      >
      <router-link to="/calendar" class="px-3 py-2 rounded hover:bg-gray-100"
        >Calendário</router-link
      >
      <router-link
        to="/maintenances"
        class="px-3 py-2 rounded hover:bg-gray-100"
        >Lista de Manutenções</router-link
      >
    </nav>
  </aside>
</template>

<script>
export default { name: "Sidebar" };
</script>
