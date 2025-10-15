<template>
  <header>
    <div class="logotipo">LOGO</div>
    <div class="navbar">
      <nav class="nav-links">
        <a href="/"> Home</a>
        <a href="/dashboard"> Dashboard </a>
        <a href="/calendar"> Calendário </a>
        <a href="/list"> Lista de Manutenção </a>

        <button href="/login" class="btnLogin"> LOGIN </button>
      </nav>
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
  background-color: rgba(148, 71, 71, 0.658);
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white
}

.nav-links a {
  text-decoration: none;
  color: white;
  margin: 24px;
}

.btnLogin {
    padding: 8px;
    border: 20px 10px;
    border-radius: 13px;
}
</style>
