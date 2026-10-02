<template>
  <div class="page k-page">
    <SiteHeader />

    <main class="k-main">
      <section class="hero">
        <div class="hero-text">
          <h1 class="k-title" lang="hi">अपनी भाषा में कोड लिखो</h1>
          <p class="lede">
            Kalaam is a programming language with keywords in Hindi, Marathi, Bengali,
            Telugu and Odia. Write a program on your phone and run it in the browser,
            even without internet.
          </p>
          <div class="actions">
            <router-link to="/Practice" class="k-button">Start coding</router-link>
            <router-link to="/Documentation" class="k-link">Read the documentation</router-link>
          </div>
        </div>

        <div class="sheet k-sheet">
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
            <button class="k-button" @click="run">Run program</button>
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

      <section class="k-band">
        <h2 class="k-heading">Keywords</h2>
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

      <section class="k-band">
        <h2 class="k-heading">Five languages</h2>
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

    <SiteFooter />
  </div>
</template>

<script>
import { Compile, KalaamKeywords } from 'kalaam';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';

// The interpreter reads `a*b` but not `a * b`, and ranges include both ends.
const SAMPLE = `अंक=7
दुहराओ i को (1,10) मे
{
  जवाब=अंक*i
  दिखाए(जवाब)
}`;

export default {
  name: 'Home',

  components: { SiteHeader, SiteFooter },

  data() {
    return {
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
  --code-size: 22px;
  --code-line: 44px;
}

/* Hero */

.hero {
  display: grid;
  gap: 32px;
  padding: 40px 0 56px;
}

.hero .k-title {
  font-size: 44px;
}

.lede {
  max-width: 34em;
  margin: 0 0 28px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
}

/* The sheet: code hangs from ruled lines the way Devanagari hangs from its shirorekha */

.sheet-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  margin-bottom: 12px;
  font-size: 15px;
}

.sheet-head [lang='hi'] {
  font-family: var(--k-serif);
  font-size: 19px;
  color: var(--k-ink);
}

.hint {
  color: var(--k-muted);
}

.editor {
  --hang: 17px;
  display: grid;
  grid-template-columns: 2.2em 1fr;
  font-family: var(--k-serif);
  font-size: var(--code-size);
  line-height: var(--code-line);
  /* one rule per line, sitting where the shirorekha of each line falls */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--hang),
    var(--k-rule) var(--hang),
    var(--k-rule) calc(var(--hang) + 1px),
    transparent calc(var(--hang) + 1px),
    transparent var(--code-line)
  );
}

.gutter {
  list-style: none;
  margin: 0;
  padding: 0 12px 0 0;
  font-size: 14px;
  line-height: var(--code-line);
  color: var(--k-muted);
  font-variant-numeric: tabular-nums;
  text-align: right;
  border-right: 2px solid var(--k-bar);
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
  color: var(--k-ink);
  font: inherit;
  line-height: var(--code-line);
  tab-size: 2;
}

.editor:focus-within {
  outline: 2px solid var(--k-ink);
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
  color: var(--k-muted);
  font-variant-numeric: tabular-nums;
}

.output {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--k-rule);
  min-height: 3.5em;
}

.output-empty {
  margin: 0;
  color: var(--k-muted);
}

.output-error {
  margin: 0;
  color: var(--k-error);
}

.output-lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-family: var(--k-serif);
  font-size: var(--code-size);
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

.band-intro {
  max-width: 38em;
  margin: 0 0 24px;
}

.glossary {
  margin: 0;
}

.entry {
  display: grid;
  grid-template-columns: 6.5em 1fr;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--k-rule);
}

.entry dt {
  font-family: var(--k-serif);
  font-size: 22px;
  line-height: 1.4;
  color: var(--k-ink);
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
  border-top: 1px solid var(--k-rule);
}

.script-word {
  font-family: var(--k-serif);
  font-size: 30px;
  line-height: 1.5;
  color: var(--k-ink);
}

.script-name {
  font-size: 15px;
  color: var(--k-muted);
}

@media (min-width: 720px) {
  .hero .k-title {
    font-size: 60px;
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

  .hero .k-title {
    font-size: 64px;
  }

  .k-sheet {
    padding: 20px 28px 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .output-lines li {
    animation: none;
  }
}
</style>
