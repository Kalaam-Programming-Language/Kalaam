<template>
  <footer class="colophon">
    <p>
      Open source under the MIT licence.
      <a href="https://github.com/Kalaam-Programming-Language/Kalaam">Source on GitHub</a>.
    </p>
    <p>Made by Swanand Kadam.</p>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
};
</script>

<style scoped>
.colophon {
  max-width: var(--k-max);
  margin: 0 auto;
  padding: 20px var(--k-gutter) 40px;
  border-top: 1px solid var(--k-rule);
  font-size: 15px;
  color: var(--k-muted);
}

.colophon p {
  margin: 0 0 4px;
}

.colophon a {
  color: var(--k-ink);
}
</style>
