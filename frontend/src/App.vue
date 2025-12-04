<template>
  <div class="flex bg-gray-50 min-h-screen font-sans">
    
    <Sidebar v-if="$route.name !== 'login'" />

    <main :class="['flex-1', $route.name !== 'login' ? 'ml-64' : '']">
      <router-view />
    </main>
    
  </div>
</template>

<script setup>

import Sidebar from '../components/Sidebar.vue'
</script>