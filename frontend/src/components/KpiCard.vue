<template>
  <div class="KPI">
    <div class="bg-white p-6 rounded-lg shadow-md border-l-4" :class="borderColor">
      <h3 class="text-gray-500 text-sm font-medium uppercase">{{ title }}</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps(['title', 'value', 'type'])

  const borderColor = computed(() => {
    if (props.type === 'danger') return 'border-red-500'
    if (props.type === 'success') return 'border-green-500'
    return 'border-yellow-500'
  })
</script>

