<template>
  <header>
    <div class="logo">SysMaintenance</div>
    <div class="navbar">
      <nav class="nav-links">
        <a href="/"> Home</a>
        <a href="/dashboard"> Dashboard </a>
        <a href="/calendar"> Calendário </a>
        <a href="/list"> Lista de Manutenção </a>
      </nav>
      <router-link to="/loginpage" class="btnLogin">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style scooped>
header {
  background-color: rgba(12, 65, 73, 0.658);
  padding: 1.5rem 2rem;
  text-align: center;
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-radius: 20px;
}

header 

.navbar {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  position: relative;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-links a:hover {
  color: #ffdddd;
}


.btnLogin {
  border: none;
  background-color: rgb(110, 184, 184);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
}

.btnLogin:hover {
  background-color: rgb(44, 90, 90);
}
</style>
