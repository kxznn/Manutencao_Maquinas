<template>
  <div class="card">
    <p class="label">{{ label }}</p>
    <h2 class="value">{{ value }}</h2>
  </div>
</template>

<script>
export default {
  name: 'KpiCard',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 1rem; /* equivalente a rounded-2xl */
  padding: 1rem; /* equivalente a p-4 */
  text-align: center;
}

.label {
  color: #6b7280; /* text-gray-500 */
  font-size: 0.875rem; /* text-sm */
}

.value {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold;
  color: #2563eb; /* text-blue-600 */
}
</style>
