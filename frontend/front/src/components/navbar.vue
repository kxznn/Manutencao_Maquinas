<template>
  <header>
    <div class="logotipo">LOGO</div>
    <div class="navbar">
      <nav class="nav-links">
        <a href="/"> Home</a>
        <a href="/dashboard"> Dashboard </a>
        <a href="/calendar"> Calendário </a>
        <a href="/list"> Lista de Manutenção </a>

        <a href="/loginpage" class="btnLogin">LOGIN</a>
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
  padding: 1.2rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.nav-links a {
  text-decoration: none;
  color: white;
  margin: 24px;
}

.btnLogin {
    border: 1px  rgb(92, 5, 5);
    background-color: rgb(92, 5, 5);
    padding: 8px 14px;
    border-radius: 8px;
    transition: 0.3s, color 0.3s;
}
.btnLogin:hover{
    background-color: rgb(165, 32, 32);
    color: white
}


</style>