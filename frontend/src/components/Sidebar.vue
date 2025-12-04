<template>
  <div class="sidebar-container">
    <aside class="w-64 bg-slate-800 text-white min-h-screen flex flex-col fixed">
      <div class="p-6 text-xl font-bold border-b border-slate-700">SMPM</div>
      <nav class="flex-1 mt-6">
        <router-link to="/" class="block py-3 px-6 hover:bg-slate-700"> 📊 Dashboard </router-link>
        <router-link to="/calendario" class="block py-3 px-6 hover:bg-slate-700">
          📅 Calendário
        </router-link>
        <router-link to="/lista" class="block py-3 px-6 hover:bg-slate-700">
          📋 Lista de Manutenções
        </router-link>
      </nav>
    </aside>
  </div>
</template>


<script>
export default {
  name: 'AppSidebar', 
}
</script>