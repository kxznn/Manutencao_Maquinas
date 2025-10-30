<template>
  <navbar />
</template>

<script>
import navbar from "../components/navbar.vue";
import kpicard from "../components/KPICard.vue";
export default {
  components: { navbar, kpicard },
};
</script>

<style scooped>
div {
  color: white;
}
</style>
