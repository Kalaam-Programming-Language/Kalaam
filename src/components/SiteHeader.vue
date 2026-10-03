<template>
  <header class="masthead">
    <router-link to="/" class="wordmark" aria-label="Kalaam home">
      <img class="mark" src="../assets/logo-mark.png" alt="" width="35" height="32" />
      <span>कलाम</span>
    </router-link>

    <div class="masthead-end">
      <!-- Page-specific controls, e.g. the language picker on Practice -->
      <div v-if="$slots.default" class="page-controls"><slot /></div>
      <button
        class="menu-toggle"
        :aria-expanded="showMenu ? 'true' : 'false'"
        aria-controls="site-nav"
        @click="showMenu = !showMenu"
      >
        {{ showMenu ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav id="site-nav" class="nav" :class="{ open: showMenu }">
      <router-link to="/Practice">Practice</router-link>
      <router-link to="/Documentation">Documentation</router-link>
      <router-link to="/Examples">Examples</router-link>
      <router-link to="/About">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return { showMenu: false };
  },
  watch: {
    $route() {
      this.showMenu = false;
    },
  },
};
</script>

<style scoped>
.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0 16px;
  max-width: var(--k-max);
  margin: 0 auto;
  padding: 16px var(--k-gutter);
  border-bottom: 1px solid var(--k-rule);
  font-family: var(--k-sans);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--k-serif);
  font-size: 30px;
  line-height: 1;
  color: var(--k-ink);
  text-decoration: none;
}

.mark {
  display: block;
  width: auto;
  height: 32px;
}

.masthead-end {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-toggle {
  font: inherit;
  font-size: 15px;
  color: var(--k-ink);
  background: none;
  border: 1px solid var(--k-rule);
  border-radius: 4px;
  padding: 6px 14px;
  cursor: pointer;
}

.nav {
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  padding-top: 8px;
}

.nav.open {
  display: flex;
}

.nav a {
  color: var(--k-text);
  text-decoration: none;
  padding: 10px 0;
  border-top: 1px solid var(--k-rule);
}

.nav a:hover,
.nav a.router-link-exact-active {
  color: var(--k-ink);
}

.nav a.router-link-exact-active {
  font-weight: 600;
}

@media (min-width: 720px) {
  .masthead {
    flex-wrap: nowrap;
    gap: 0;
  }

  .masthead-end {
    order: 2;
    gap: 0;
  }

  .page-controls {
    margin-left: 28px;
  }

  .menu-toggle {
    display: none;
  }

  .nav,
  .nav.open {
    display: flex;
    flex-direction: row;
    flex-basis: auto;
    gap: 28px;
    padding-top: 0;
    margin-left: auto;
  }

  .nav a {
    border-top: 0;
    padding: 4px 0;
  }
}
</style>
