<template>
  <!-- Barra superior com título e ícone -->
  <nav class="w-full bg-white border-b p-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <img src="/src/assets/logo.svg" alt="logo" class="h-8 w-8" />
      <h1 class="text-lg font-semibold">SMPM</h1>
    </div>
    <div>
      <slot name="actions"></slot>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar2'
}
</script>