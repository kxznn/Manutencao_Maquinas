<template>
  <div class="table">
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm uppercase">
            <th class="p-4 border-b">ID</th>
            <th class="p-4 border-b">Máquina</th>
            <th class="p-4 border-b">Data</th>
            <th class="p-4 border-b">Setor</th>
            <th class="p-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50 border-b last:border-0">
            <td class="p-4">{{ item.id }}</td>
            <td class="p-4 font-bold">{{ item.machine }}</td>
            <td class="p-4">{{ item.date }}</td>
            <td class="p-4">{{ item.sector }}</td>
            <td class="p-4">
              <span
                :class="statusClass(item.status)"
                class="px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps(['items'])

const statusClass = (status) => {
  if (status === 'Concluída') return 'bg-green-100 text-green-800'
  if (status === 'Atrasada') return 'bg-red-100 text-red-800'
  return 'bg-yellow-100 text-yellow-800'
}
</script>
