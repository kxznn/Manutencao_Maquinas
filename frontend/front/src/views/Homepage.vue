<template>
  <navbar />
  

  <div class="hero-container">
    <h1>SysMaintenance</h1>
  </div>
  
  <Footer />
</template>

<script>
import navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue"
export default {
  components: { navbar, Footer },
};
</script>

<style scooped>
.hero-container {
  color: #fff
}
</style>
