<template>
  <table class="min-w-full text-sm">
    <thead>
      <tr class="text-left">
        <th class="p-2">ID</th>
        <th class="p-2">Máquina</th>
        <th class="p-2">Data</th>
        <th class="p-2">Status</th>
        <th class="p-2">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" class="border-t">
        <td class="p-2">{{ item.id }}</td>
        <td class="p-2">{{ item.machine }}</td>
        <td class="p-2">{{ item.date }}</td>
        <td class="p-2"><Badge :status="item.status" /></td>
        <td class="p-2">
          <router-link
            :to="`/maintenances/${item.id}`"
            class="px-3 py-1 bg-blue-500 text-white rounded"
            >Ver / Editar</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from "vue";
import Badge from "./Calendar.vue";

const props = defineProps({ items: { type: Array, default: () => [] } });
</script>
