<template>
  <div class='bg-white shadow rounded-2xl p-4 text-center'>
    <p class='text-gray-500 text-sm'>{{ label }}</p>
    <h2 class='text-2xl font-bold text-blue-600'>{{ value }}</h2>
  </div>
</template>

<script setup>
defineProps({ label: String, value: [String, Number] })
</script>