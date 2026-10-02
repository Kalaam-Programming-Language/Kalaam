<template>
  <div class="page">
    <header class="masthead">
      <router-link to="/" class="wordmark" aria-label="Kalaam home">कलाम</router-link>

      <button
        class="menu-toggle"
        :aria-expanded="showMenu ? 'true' : 'false'"
        aria-controls="site-nav"
        @click="showMenu = !showMenu"
      >
        {{ showMenu ? 'Close' : 'Menu' }}
      </button>

      <nav id="site-nav" class="nav" :class="{ open: showMenu }">
        <router-link to="/Practice">Practice</router-link>
        <router-link to="/Documentation">Documentation</router-link>
        <router-link to="/Examples">Examples</router-link>
        <router-link to="/About">About</router-link>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-text">
          <h1 lang="hi">अपनी भाषा में कोड लिखो</h1>
          <p class="lede">
            Kalaam is a programming language with keywords in Hindi, Marathi, Bengali,
            Telugu and Odia. Write a program on your phone and run it in the browser,
            even without internet.
          </p>
          <div class="actions">
            <router-link to="/Practice" class="button">Start coding</router-link>
            <router-link to="/Documentation" class="link">Read the documentation</router-link>
          </div>
        </div>

        <div class="sheet">
          <div class="sheet-head">
            <span lang="hi">7 का पहाड़ा</span>
            <span class="hint">Change 7 to any number, then run it.</span>
          </div>

          <div class="editor">
            <ol class="gutter" aria-hidden="true">
              <li v-for="n in lineCount" :key="n">{{ n }}</li>
            </ol>
            <textarea
              v-model="code"
              class="code"
              lang="hi"
              :rows="lineCount"
              wrap="off"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="off"
              aria-label="Kalaam program"
            ></textarea>
          </div>

          <div class="run-row">
            <button class="button" @click="run">Run program</button>
            <span v-if="timeTaken !== null" class="timing">Ran in {{ timeTaken }} ms</span>
          </div>

          <div class="output" aria-live="polite">
            <p v-if="!hasRun" class="output-empty">Output appears here.</p>
            <p v-else-if="error" class="output-error">{{ error }}</p>
            <ol v-else class="output-lines" :key="runId">
              <li
                v-for="(line, i) in output"
                :key="i"
                :style="{ animationDelay: i * 40 + 'ms' }"
              >{{ line }}</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="band">
        <h2>Keywords</h2>
        <div class="band-body">
          <p class="band-intro">
            Everyday Hindi words do the work of <i>if</i>, <i>for</i> and <i>print</i>.
            Everything else, like numbers, maths and brackets, works the way it does in
            any other language.
          </p>
          <dl class="glossary">
            <div v-for="k in keywords" :key="k.word" class="entry">
              <dt lang="hi">{{ k.word }}</dt>
              <dd>
                <span class="en">{{ k.en }}</span>
                {{ k.does }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="band">
        <h2>Five languages</h2>
        <div class="band-body">
          <p class="band-intro">
            Pick your language in the editor. Here is the word for <i>print</i> in each.
          </p>
          <ul class="scripts">
            <li v-for="s in scripts" :key="s.name">
              <span class="script-word" :lang="s.lang">{{ s.print }}</span>
              <span class="script-name">{{ s.name }}</span>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="colophon">
      <p>
        Open source under the MIT licence.
        <a href="https://github.com/Kalaam-Programming-Language/Kalaam">Source on GitHub</a>.
      </p>
      <p>Made by Swanand Kadam.</p>
    </footer>
  </div>
</template>

<script>
import { Compile, KalaamKeywords } from 'kalaam';

// The interpreter reads `a*b` but not `a * b`, and ranges include both ends.
const SAMPLE = `अंक=7
दुहराओ i को (1,10) मे
{
  जवाब=अंक*i
  दिखाए(जवाब)
}`;

export default {
  name: 'Home',

  data() {
    return {
      showMenu: false,
      code: SAMPLE,
      output: [],
      error: '',
      hasRun: false,
      runId: 0,
      timeTaken: null,
      keywords: [
        { word: 'अगर', en: 'if', does: 'runs a block only when a condition is true.' },
        { word: 'दुहराओ', en: 'for', does: 'repeats a block for each number in a range.' },
        { word: 'जबतक', en: 'while', does: 'repeats a block as long as a condition holds.' },
        { word: 'दिखाए()', en: 'print', does: 'shows a value on screen.' },
        { word: 'इनपुट()', en: 'input', does: 'asks the person running the program for a value.' },
        { word: 'रचना', en: 'function', does: 'names a block so you can run it again later.' },
      ],
      scripts: [
        { name: 'Hindi', lang: 'hi', print: KalaamKeywords.Hindi.Print },
        { name: 'Marathi', lang: 'mr', print: KalaamKeywords.Marathi.Print },
        { name: 'Bengali', lang: 'bn', print: KalaamKeywords.Bengali.Print },
        { name: 'Telugu', lang: 'te', print: KalaamKeywords.Telugu.Print },
        { name: 'Odia', lang: 'or', print: KalaamKeywords.Odia.Print },
      ],
    };
  },

  computed: {
    lineCount() {
      return this.code.split('\n').length;
    },
  },

  methods: {
    run() {
      const result = Compile(this.code, KalaamKeywords.Hindi);
      this.hasRun = true;
      this.runId += 1;
      this.error = result.isError ? String(result.error || 'The program could not run.') : '';
      this.output = result.linebylineOutput || [];
      // TimeTaken comes back as text, e.g. "सफल | speed - 0.3 ms"
      const ms = /([\d.]+)\s*ms/.exec(String(result.TimeTaken || ''));
      this.timeTaken = ms && !this.error ? Number(ms[1]).toFixed(1) : null;
    },
  },
};
</script>

<style scoped>
.page {
  --paper: #f5f6f8;
  --sheet: #ffffff;
  --ink: #1f2766;
  --ink-hover: #2c378a;
  --text: #24262d;
  --muted: #5b6070;
  --rule: #cfd4e2;
  --bar: #1f2766;
  --error: #a3261c;

  --serif: 'Tiro Devanagari Hindi', 'Tiro Bangla', 'Tiro Telugu', 'Noto Serif Oriya',
    'Noto Serif Devanagari', serif;
  --sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans Devanagari', sans-serif;

  --code-size: 22px;
  --code-line: 44px;

  min-height: 100vh;
  background: var(--paper);
  color: var(--text);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  text-align: left;
}

.page *,
.page *::before,
.page *::after {
  box-sizing: border-box;
}

/* Masthead */

.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  border-bottom: 3px solid var(--bar);
}

.wordmark {
  font-family: var(--serif);
  font-size: 30px;
  line-height: 1;
  color: var(--ink);
  text-decoration: none;
}

.menu-toggle {
  font: inherit;
  font-size: 15px;
  color: var(--ink);
  background: none;
  border: 1px solid var(--rule);
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
  color: var(--text);
  text-decoration: none;
  padding: 10px 0;
  border-top: 1px solid var(--rule);
}

.nav a:hover {
  color: var(--ink);
}

/* Hero */

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.hero {
  display: grid;
  gap: 32px;
  padding: 40px 0 56px;
}

h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 44px;
  line-height: 1.3;
  letter-spacing: 0;
  color: var(--ink);
  margin: 0 0 16px;
  text-wrap: balance;
}

.lede {
  max-width: 34em;
  margin: 0 0 28px;
  color: var(--text);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
}

.button {
  display: inline-block;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: var(--ink);
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  text-decoration: none;
  cursor: pointer;
}

.button:hover {
  background: var(--ink-hover);
}

.link {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* The sheet: code hangs from ruled lines the way Devanagari hangs from its shirorekha */

.sheet {
  background: var(--sheet);
  border-top: 6px solid var(--bar);
  padding: 16px 16px 20px;
  box-shadow: 0 1px 0 var(--rule);
}

.sheet-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  margin-bottom: 12px;
  font-size: 15px;
}

.sheet-head [lang='hi'] {
  font-family: var(--serif);
  font-size: 19px;
  color: var(--ink);
}

.hint {
  color: var(--muted);
}

.editor {
  display: grid;
  grid-template-columns: 2.2em 1fr;
  font-family: var(--serif);
  font-size: var(--code-size);
  line-height: var(--code-line);
  /* one rule per line, sitting where the shirorekha of each line falls */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--hang),
    var(--rule) var(--hang),
    var(--rule) calc(var(--hang) + 1px),
    transparent calc(var(--hang) + 1px),
    transparent var(--code-line)
  );
  --hang: 17px;
}

.gutter {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: var(--code-line);
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  text-align: right;
  padding-right: 12px;
  border-right: 2px solid var(--bar);
  user-select: none;
}

.code {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0 0 0 12px;
  border: 0;
  outline: 0;
  resize: none;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: pre;
  background: transparent;
  color: var(--ink);
  font: inherit;
  line-height: var(--code-line);
  tab-size: 2;
}

.editor:focus-within {
  outline: 2px solid var(--ink);
  outline-offset: 4px;
}

.run-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 20px;
}

.timing {
  font-size: 14px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.output {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--rule);
  min-height: 3.5em;
}

.output-empty {
  margin: 0;
  color: var(--muted);
}

.output-error {
  margin: 0;
  color: var(--error);
}

.output-lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-family: var(--serif);
  font-size: var(--code-size);
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.output-lines li {
  animation: appear 240ms ease-out both;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Bands below the hero */

.band {
  border-top: 3px solid var(--bar);
  padding: 20px 0 48px;
}

h2 {
  font-family: var(--sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  margin: 0 0 12px;
}

.band-intro {
  max-width: 38em;
  margin: 0 0 24px;
}

.glossary {
  margin: 0;
  display: grid;
  gap: 0;
}

.entry {
  display: grid;
  grid-template-columns: 6.5em 1fr;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--rule);
}

.entry dt {
  font-family: var(--serif);
  font-size: 22px;
  line-height: 1.4;
  color: var(--ink);
}

.entry dd {
  margin: 0;
  padding-top: 4px;
}

.en {
  font-weight: 600;
  margin-right: 4px;
}

.scripts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0 16px;
}

.scripts li {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-top: 1px solid var(--rule);
}

.script-word {
  font-family: var(--serif);
  font-size: 30px;
  line-height: 1.5;
  color: var(--ink);
}

.script-name {
  font-size: 15px;
  color: var(--muted);
}

/* Footer */

.colophon {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px 40px;
  border-top: 1px solid var(--rule);
  font-size: 15px;
  color: var(--muted);
}

.colophon p {
  margin: 0 0 4px;
}

.colophon a {
  color: var(--ink);
}

/* Focus */

.page a:focus-visible,
.page button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

/* Wider screens */

@media (min-width: 720px) {
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
  }

  .nav a {
    border-top: 0;
    padding: 4px 0;
  }

  .masthead,
  main,
  .colophon {
    padding-left: 32px;
    padding-right: 32px;
  }

  h1 {
    font-size: 60px;
  }

  .band {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 32px;
  }

  .entry {
    grid-template-columns: 8em 1fr;
  }
}

@media (min-width: 1024px) {
  .page {
    --code-size: 28px;
    --code-line: 56px;
  }

  .editor {
    --hang: 22px;
  }

  .hero {
    grid-template-columns: 5fr 7fr;
    gap: 64px;
    align-items: start;
    padding: 72px 0 88px;
  }

  h1 {
    font-size: 64px;
  }

  .sheet {
    padding: 20px 28px 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .output-lines li {
    animation: none;
  }
}
</style>
