<template>
  <navbar />
  <h1>SysMaintenance</h1>

  <footer />
</template>

<script>
import navbar from "../components/navbar.vue";
import footer from "../components/footer.vue"
export default {
  components: { navbar, footer },
};
</script>

<style scooped>
div {
  color: rgb(94, 27, 27);
}

</style>
