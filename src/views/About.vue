<template>
  <div class="k-page">
    <SiteHeader />

    <main class="k-main">
      <header class="k-page-head">
        <h1 class="k-title">About</h1>
        <p>The project, and how to reach me.</p>
      </header>

      <section class="k-band">
        <h2 class="k-heading">The project</h2>
        <div class="band-body">
          <p>
            Kalaam is a programming language in Hindi with the basic functionality of a
            modern language: for loops, while loops, functions and conditional
            statements. It also has a beta framework for building web apps &mdash; HTML,
            CSS and JS written in Hindi. A basic to-do app is possible today; improvements
            are ongoing.
          </p>
          <p>Anyone with a smartphone or a computer can start coding in Kalaam.</p>
          <p>
            To stay updated with the project, or to share ideas and suggestions, connect
            here:
          </p>
          <ul class="links">
            <li><a class="k-link" href="https://www.linkedin.com/in/swanandkadam/">LinkedIn</a></li>
            <li>
              <a class="k-link" href="https://github.com/Kalaam-Programming-Language/Kalaam">GitHub</a>
            </li>
          </ul>
        </div>
      </section>

      <section class="k-band">
        <h2 class="k-heading">Frequently asked questions</h2>
        <div class="band-body">
          <div class="faq-item">
            <button
              type="button"
              class="faq-toggle"
              :aria-expanded="showStar0 ? 'true' : 'false'"
              @click="showStar0 = !showStar0"
            >
              How can I contribute to Kalaam?
              <span class="faq-mark" aria-hidden="true">{{ showStar0 ? '−' : '+' }}</span>
            </button>
            <transition name="slide-fade">
              <div v-if="showStar0" class="faq-body">
                <p>
                  Kalaam is an open source project and anyone can start contributing to
                  it. There is a
                  <a class="k-link" href="https://github.com/Kalaam-Programming-Language/Kalaam#readme">
                    readme document</a
                  >
                  on the Kalaam GitHub repo with all the details about contributing.
                </p>
              </div>
            </transition>
          </div>

          <div class="faq-item">
            <button
              type="button"
              class="faq-toggle"
              :aria-expanded="showStar1 ? 'true' : 'false'"
              @click="showStar1 = !showStar1"
            >
              How can I add comments to my code in Kalaam?
              <span class="faq-mark" aria-hidden="true">{{ showStar1 ? '−' : '+' }}</span>
            </button>
            <transition name="slide-fade">
              <div v-if="showStar1" class="faq-body">
                <p>
                  Comments are an experimental feature for now and might introduce some
                  issues. You can still use the
                  <code class="k-code">#This is a comment</code> format, with a mandatory
                  <code class="k-code">#</code> at the start of every comment.
                </p>
              </div>
            </transition>
          </div>

          <div class="faq-item">
            <button
              type="button"
              class="faq-toggle"
              :aria-expanded="showStar2 ? 'true' : 'false'"
              @click="showStar2 = !showStar2"
            >
              Where can I learn more about how Kalaam was built?
              <span class="faq-mark" aria-hidden="true">{{ showStar2 ? '−' : '+' }}</span>
            </button>
            <transition name="slide-fade">
              <div v-if="showStar2" class="faq-body">
                <p>
                  Visit the
                  <a class="k-link" href="https://github.com/Kalaam-Programming-Language/Kalaam">
                    GitHub repo</a
                  >
                  of Kalaam to explore the project. It is commented at each step to help
                  you understand how it works.
                </p>
              </div>
            </transition>
          </div>

          <div class="faq-item">
            <button
              type="button"
              class="faq-toggle"
              :aria-expanded="showStar3 ? 'true' : 'false'"
              @click="showStar3 = !showStar3"
            >
              What if I have an issue with my code execution?
              <span class="faq-mark" aria-hidden="true">{{ showStar3 ? '−' : '+' }}</span>
            </button>
            <transition name="slide-fade">
              <div v-if="showStar3" class="faq-body">
                <p>
                  Kalaam is still in its first stage and has only been tested by a
                  handful of people. Any issue you run into should be minor and fixable
                  in a day or two. Please share feedback and issues on the Kalaam Discord
                  server or my Instagram handle so the Kalaam community can keep
                  improving the language.
                </p>
              </div>
            </transition>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';

export default {
  name: 'About',

  components: { SiteHeader, SiteFooter },

  data() {
    return {
      showStar0: false,
      showStar1: false,
      showStar2: false,
      showStar3: false,
      showStar4: false,
      showStar5: false,
      showStar6: false,
      showStar7: false,
      showStar8: false,
    };
  },
};
</script>

<style scoped>
.k-band {
  padding-top: 24px;
}

.band-body p {
  max-width: 38em;
  margin: 0 0 20px;
}

.links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 24px;
}

.faq-item {
  border-top: 1px solid var(--k-rule);
}

.faq-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  font: inherit;
  font-weight: 600;
  text-align: left;
  color: var(--k-text);
  background: none;
  border: 0;
  padding: 16px 0;
  cursor: pointer;
}

.faq-toggle:hover {
  color: var(--k-ink);
}

.faq-mark {
  color: var(--k-ink);
  font-weight: 600;
  flex-shrink: 0;
}

.faq-body {
  padding-bottom: 20px;
}

.faq-body p {
  margin: 0;
  max-width: 38em;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.15s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
