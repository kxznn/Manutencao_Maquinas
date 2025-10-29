<template>
  <navbar />
  <kpicard />
    <div>
        <h1>CRUD FULL STACK </h1>
        <nav>
            <router-link to="/users"> Users</router-link>
        </nav>
    </div>
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
