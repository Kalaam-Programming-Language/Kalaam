<template>
  <div class="page k-page">
    <SiteHeader />

    <main class="k-main">
      <section class="hero">
        <div class="hero-text">
          <h1 class="k-title">Programming in Indian languages</h1>
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
                <!-- :value + @input rather than v-model: v-model waits for IME
                     composition to finish, so Hindi keyboards would show nothing
                     in the highlighted layer until each word is committed. -->
                <textarea
                  :value="code"
                  class="code-input"
                  lang="hi"
                  wrap="off"
                  spellcheck="false"
                  autocapitalize="off"
                  autocomplete="off"
                  aria-label="Kalaam program"
                  :readonly="typing"
                  @input="code = $event.target.value"
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
        <h2 class="k-heading">Open source since 2020</h2>
        <div class="band-body">
          <ul class="stats">
            <li v-for="st in stats" :key="st.label">
              <a v-if="st.href" :href="st.href" class="stat-value">{{ st.value }}</a>
              <span v-else class="stat-value">{{ st.value }}</span>
              <span class="stat-label">{{ st.label }}</span>
            </li>
          </ul>
          <p class="band-intro featured-intro">Featured in</p>
          <ul class="featured">
            <li v-for="f in featured" :key="f.href">
              <a :href="f.href" rel="noopener" class="featured-card">
                <img v-if="f.image" :src="f.image" alt="" class="featured-thumb" loading="lazy" width="640" height="360" />
                <span v-else class="featured-thumb featured-thumb-text" :style="{ background: f.tint }">{{ f.source }}</span>
                <span class="featured-body">
                  <span class="featured-title">{{ f.title }}</span>
                  <span class="featured-source">{{ f.source }}</span>
                </span>
              </a>
            </li>
          </ul>
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
import { Compile, KalaamKeywords } from '../kalaam/Compiler/main';
import { highlight } from '../components/kalaamHighlight';
import youtubeThumb from '../assets/press/youtube.jpg';
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
      github: { stars: 197, forks: 68 },
      featured: [
        {
          title: 'मिलें भारत के पहले हिंदी ऑनलाइन प्रोग्रामिंग लैंग्वेज प्लेटफॉर्म के निर्माता से',
          source: 'YourStory',
          image: null,
          tint: '#e5322d',
          href: 'https://yourstory.com/hindi/swanand-kadam-masai-school-1st-ever-hindi-online-programming-language-platform-kalaam',
        },
        {
          title: 'What if you could code in Hindi? Meet Swanand, inventor of Kalaam',
          source: 'Masai School',
          image: null,
          tint: '#1f2766',
          href: 'https://www.masaischool.com/blog/what-if-you-could-code-in-hindi-meet-swanand-inventor-of-kalaam-io/',
        },
        {
          title: 'How he made the first Indian programming language: the story of Kalaam',
          source: 'YouTube',
          image: youtubeThumb,
          href: 'https://www.youtube.com/watch?v=lbLKk8NmzDA',
        },
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
    stats() {
      const n = (v) => v.toLocaleString('en-IN');
      return [
        { value: n(this.github.stars), label: 'GitHub stars', href: 'https://github.com/Kalaam-Programming-Language/Kalaam' },
        { value: n(this.github.forks), label: 'forks', href: 'https://github.com/Kalaam-Programming-Language/Kalaam/forks' },
        { value: '12', label: 'contributors', href: 'https://github.com/Kalaam-Programming-Language/Kalaam/graphs/contributors' },
        { value: '5', label: 'languages' },
        { value: 'MIT', label: 'licence' },
      ];
    },

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
    this.refreshStars();
  },

  beforeDestroy() {
    clearTimeout(this.typingTimer);
  },

  methods: {
    // Live counts when online; the numbers in data() are the offline fallback.
    refreshStars() {
      if (typeof fetch !== 'function' || !navigator.onLine) return;
      fetch('https://api.github.com/repos/Kalaam-Programming-Language/Kalaam')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d && d.stargazers_count) this.github = { stars: d.stargazers_count, forks: d.forks_count };
        })
        .catch(() => {});
    },

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
      // The cancelled timer would have run the sample; run it now instead.
      this.run();
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
  font-size: 38px;
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

/* Credibility band */

.stats {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0 16px;
}

.stats li {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-top: 1px solid var(--k-rule);
}

.stat-value {
  font-family: var(--k-serif);
  font-size: 34px;
  line-height: 1.3;
  color: var(--k-ink);
  text-decoration: none;
  font-variant-numeric: tabular-nums;
}

a.stat-value:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.stat-label {
  font-size: 15px;
  color: var(--k-muted);
}

.featured-intro {
  margin-bottom: 0;
  font-weight: 600;
}

.featured {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.featured-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--k-sheet);
  border: 1px solid var(--k-rule);
  border-radius: 8px;
  overflow: hidden;
  color: var(--k-text);
  text-decoration: none;
}

.featured-card:hover .featured-title {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.featured-thumb {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: var(--k-rule);
  flex: 0 0 auto;
}

.featured-thumb-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--k-serif);
  font-size: 32px;
  color: #ffffff;
}

.featured-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px 14px;
}

.featured-title {
  font-size: 15px;
  line-height: 1.45;
  color: var(--k-ink);
}

.featured-source {
  font-size: 13px;
  color: var(--k-muted);
}

@media (min-width: 720px) {
  .featured {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 720px) {
  .hero .k-title {
    font-size: 48px;
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
    font-size: 52px;
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
/* The typing caret lives inside v-html, which scoped styles can't reach. */
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
