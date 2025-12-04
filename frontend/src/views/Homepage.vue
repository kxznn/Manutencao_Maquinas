<template>
  <div class="Homepage">
    <div class="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white p-4">
      <div class="max-w-xl text-center">
        <div class="mb-6">
          <svg
            class="w-20 h-20 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </div>

        <h1 class="text-4xl font-bold mb-4">SMPM</h1>
        <p class="text-xl text-gray-300 mb-8">Sistema de Manutenção Preventiva de Máquinas</p>

        <p class="text-gray-400 mb-8">
          Gerencie manutenções, acompanhe KPIs e otimize a produtividade da sua indústria com nossa
          solução SPA moderna.
        </p>

        <router-link
          to="/dashboard"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg"
        >
          Acessar Dashboard
        </router-link>
      </div>

      <footer class="mt-12 text-sm text-gray-500">
        &copy; 2025 SENAI "Roberto Mange" - Projeto Somativa Front-end
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage', 
}
</script>