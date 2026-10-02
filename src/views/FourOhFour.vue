<template>
  <div class="k-page">
    <SiteHeader />

    <main class="k-main">
      <header class="k-page-head">
        <h1 class="k-title">This page does not exist</h1>
        <p>The page you were looking for has moved or was never here.</p>
      </header>

      <router-link to="/" class="k-button">Go to the home page</router-link>
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';

export default {
  name: 'FourOhFour',

  components: { SiteHeader, SiteFooter },
};
</script>

<style scoped>
.k-main > .k-button {
  margin-bottom: 64px;
  display: inline-block;
}
</style>
