<template>
  <div class="login-container">
    <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-blue-600">
        <div class="text-center mb-8">
          <div class="bg-blue-100 p-3 rounded-full inline-block mb-3">
            <svg
              class="w-10 h-10 text-blue-600"
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
          <h1 class="text-2xl font-bold text-gray-800">Acesso ao SMPM</h1>
          <p class="text-gray-500 text-sm">Sistema de Manutenção Preventiva</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              v-model="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="admin@senai.br"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              v-model="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <div
            v-if="errorMessage"
            class="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200 flex justify-center items-center"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <div class="mt-6 text-center text-xs text-gray-400">&copy; 2025 SENAI "Roberto Mange"</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api"; // 🔥 IMPORTANTE (resolve "api is not defined")

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

// 🔥 Função de Login conectada ao backend
const login = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    // chamada ao backend
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    // salvar token no navegador
    localStorage.setItem("token", res.data.token);

    // redirecionar para dashboard
    router.push("/dashboard");

  } catch (err) {
    // backend rejeitou
    errorMessage.value = "Credenciais inválidas";
  } finally {
    isLoading.value = false;
  }
};
</script>


