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

          <div class="editor k-home-code" :class="{ typing }" @mousedown="skipTyping">
            <ol class="gutter" aria-hidden="true">
              <li v-for="n in gutterLines" :key="n">{{ n }}</li>
            </ol>
            <div class="code-scroll">
              <div class="code-layer">
                <pre class="code-view" aria-hidden="true" v-html="highlighted"></pre>
                <textarea
                  v-model="code"
                  class="code-input"
                  lang="hi"
                  wrap="off"
                  spellcheck="false"
                  autocapitalize="off"
                  autocomplete="off"
                  aria-label="Kalaam program"
                  :readonly="typing"
                  @focus="skipTyping"
                ></textarea>
              </div>
            </div>
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
const SAMPLE_LINES = SAMPLE.split('\n').length;

// Words the editor colours as keywords: the Hindi keyword map plus the loop particles.
const H = KalaamKeywords.Hindi;
const KEYWORDS = new Set([H.Print, H.Input, H.If, H.For, H.While, H.Length, H.Push, H.Function, 'को', 'मे']);

const TOKEN = /("[^"\n]*"?|'[^'\n]*'?)|(\d+(?:\.\d+)?)|([\p{L}\p{M}_][\p{L}\p{M}\p{N}_]*)|([=+\-*/<>!%&|]+)|([\s\S])/gu;

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(source) {
  return source.replace(TOKEN, (match, str, num, word, op) => {
    const text = escapeHtml(match);
    if (str) return `<span class="tok-string">${text}</span>`;
    if (num) return `<span class="tok-number">${text}</span>`;
    if (word) return KEYWORDS.has(word) ? `<span class="tok-keyword">${text}</span>` : text;
    if (op) return `<span class="tok-operator">${text}</span>`;
    return text;
  });
}

export default {
  name: 'Home',

  components: { SiteHeader, SiteFooter },

  data() {
    return {
      code: SAMPLE,
      typing: false,
      typingTimer: null,
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

    // Keep the editor at full height while the sample types itself out.
    gutterLines() {
      return this.typing ? SAMPLE_LINES : this.lineCount;
    },

    highlighted() {
      const caret = this.typing ? '<span class="caret"></span>' : '';
      // The trailing newline keeps an empty last line at full height.
      return `${highlight(this.code)}${caret}\n`;
    },
  },

  mounted() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) this.typeSample();
  },

  beforeDestroy() {
    clearTimeout(this.typingTimer);
  },

  methods: {
    // Types the sample out character by character, then runs it once.
    typeSample() {
      const chars = Array.from(SAMPLE);
      let i = 0;
      this.code = '';
      this.typing = true;

      const step = () => {
        this.code += chars[i];
        i += 1;
        if (i >= chars.length) {
          this.typing = false;
          this.typingTimer = setTimeout(this.run, 450);
          return;
        }
        const pause = chars[i - 1] === '\n' ? 220 : 45 + Math.random() * 50;
        this.typingTimer = setTimeout(step, pause);
      };

      this.typingTimer = setTimeout(step, 600);
    },

    // Clicking into the editor mid-animation jumps straight to the full program.
    skipTyping() {
      if (!this.typing) return;
      clearTimeout(this.typingTimer);
      this.code = SAMPLE;
      this.typing = false;
    },

    run() {
      const result = Compile(this.code, KalaamKeywords.Hindi);
      this.hasRun = true;
      this.runId += 1;
      this.error = result.isError ? String(result.error || 'The program could not run.') : '';
      this.output = result.linebylineOutput || [];
      // TimeTaken comes back as text, e.g. "सफल | speed - 0.3 ms"
      const ms = /([\d.]+)\s*ms/.exec(String(result.TimeTaken || ''));
      if (!ms || this.error) {
        this.timeTaken = null;
      } else {
        const value = Number(ms[1]);
        this.timeTaken = value < 0.1 ? 'under 0.1' : value.toFixed(1);
      }
    },
  },
};
</script>


<style scoped>
.page {
  --code-size: 16px;
  --code-line: 28px;
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

/* The sample editor: a highlighted <pre> under a transparent <textarea>,
   so it looks like the Practice editor but stays a plain, light textarea. */

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
  display: grid;
  grid-template-columns: auto 1fr;
  background: var(--k-code-bg);
  border: 1px solid var(--k-code-border);
  border-radius: 4px;
  font-family: var(--k-mono);
  font-size: var(--code-size);
  line-height: var(--code-line);
  overflow: hidden;
}

.gutter {
  list-style: none;
  margin: 0;
  padding: 10px 10px 10px 14px;
  background: var(--k-code-gutter);
  border-right: 1px solid var(--k-code-border);
  color: var(--k-code-lineno);
  font-size: 0.8em;
  line-height: var(--code-line);
  font-variant-numeric: tabular-nums;
  text-align: right;
  user-select: none;
}

.code-scroll {
  overflow-x: auto;
  padding: 10px 0;
}

.code-layer {
  position: relative;
  display: inline-block;
  min-width: 100%;
}

.code-view,
.code-input {
  margin: 0;
  padding: 0 14px;
  font: inherit;
  line-height: var(--code-line);
  white-space: pre;
  tab-size: 2;
}

.code-view {
  color: var(--k-code-text);
}

.code-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  resize: none;
  overflow: hidden;
  background: transparent;
  color: transparent;
  -webkit-text-fill-color: transparent;
  caret-color: var(--k-code-cursor);
}

.code-input::selection {
  background: var(--k-code-selection);
}

.editor:focus-within {
  outline: 2px solid var(--k-ink);
  outline-offset: 3px;
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
  font-family: var(--k-mono);
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
    --code-size: 19px;
    --code-line: 32px;
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


<style>
/* Token colours and the typing caret live inside v-html, which scoped styles can't reach. */
.k-home-code .tok-keyword {
  color: var(--k-code-keyword);
}

.k-home-code .tok-string {
  color: var(--k-code-string);
}

.k-home-code .tok-number {
  color: var(--k-code-number);
}

.k-home-code .tok-operator {
  color: var(--k-code-operator);
}

.k-home-code .caret {
  display: inline-block;
  width: 2px;
  height: 1.15em;
  margin-left: 1px;
  vertical-align: -0.2em;
  background: var(--k-code-cursor);
  animation: k-caret-blink 1s steps(1) infinite;
}

@keyframes k-caret-blink {
  50% {
    opacity: 0;
  }
}
</style>
