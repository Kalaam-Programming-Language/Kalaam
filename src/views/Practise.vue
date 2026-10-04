<template>
  <div class="k-page k-practice" :class="{ 'theme-dark': themeDark, 'is-learning': learning }">
    <SiteHeader />

    <!-- Toolbar: mode toggle, language select, theme toggle on the left;
         mode-specific actions on the right. -->
    <div class="pr-toolbar">
      <div class="pr-toolbar-left">
        <div class="mode-toggle">
          <button type="button" class="mode-label" :class="{ on: !learning }" @click="setLearning(false)">Practice</button>
          <button
            type="button"
            role="switch"
            class="switch"
            :class="{ on: learning }"
            :aria-checked="learning ? 'true' : 'false'"
            aria-label="Learning mode"
            @click="SwitchMode()"
          ><span class="knob"></span></button>
          <button type="button" class="mode-label" :class="{ on: learning }" @click="setLearning(true)">Learning</button>
        </div>

        <label class="pr-lang">Language
          <select class="pr-lang-select" v-model="ActiveLanguage" aria-label="Language">
            <option v-for="l in languageLabels" :key="l.value" :value="l.value" :lang="l.lang">{{ l.label }} ({{ l.value }})</option>
          </select>
        </label>

        <button
          type="button"
          class="theme-toggle"
          :aria-label="themeToggleLabel"
          :title="themeToggleLabel"
          @click="toggleTheme()"
        >
          <svg v-if="themeDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="2" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="22"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="2" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="22" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>

      <div class="pr-toolbar-right">
        <template v-if="!learning">
          <button type="button" class="btn-quiet" @click="Clear()">Clear</button>
          <button type="button" class="btn-ink" :title="runTitle" @click="Run()">
            <span class="run-icon"></span>Run
          </button>
          <span class="shortcut-hint">{{ shortcutHint }}</span>
        </template>
        <template v-else>
          <button type="button" class="btn-outline" :disabled="!canGoPrev" @click="PreviousStep()">Previous step</button>
          <span class="step-counter">Step {{ stepIndex }} of {{ totalLearningSteps }}</span>
          <button type="button" class="btn-ink" :disabled="!canGoNext" :title="runTitle" @click="NextStep()">Next step</button>
        </template>
      </div>
    </div>

    <main class="pr-main">
      <section class="pr-editor">
        <no-ssr placeholder="...">
          <codemirror
            id="codearea"
            ref="myCm"
            :value="code"
            placeholder="Welcome to Kalaam, this is your code editor."
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          ></codemirror>
        </no-ssr>

        <div class="chip-bar">
          <button type="button" class="chip" :disabled="learning" @click="Add(Keyword.Print + '()')">{{ Keyword.Print }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(Keyword.Input + '()')">{{ Keyword.Input }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(Keyword.If + '()')">{{ Keyword.If }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(forChipInsert)">{{ forChipLabel }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(Keyword.While + '()')">{{ Keyword.While }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(lengthChipInsert)">{{ lengthChipLabel }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(pushChipInsert)">{{ pushChipLabel }}</button>
          <button type="button" class="chip" :disabled="learning" @click="Add(Keyword.Function)">{{ Keyword.Function }}</button>
        </div>
      </section>

      <aside class="pr-aside">
        <template v-if="!learning">
          <div class="pr-panel">
            <div class="pr-panel-head">
              <h2>Output</h2>
              <span v-if="runTimingMs" class="pr-timing">{{ runTimingMs }}</span>
            </div>
            <div ref="consoleBody" class="pr-term pr-output pr-console" :class="{ 'is-error': isError === true }">
              <template v-if="!hasConsoleOutput">
                <p class="pr-term-prompt">kalaam ▸ <span class="pr-cursor" aria-hidden="true">▌</span></p>
                <p class="pr-term-hint">Press Run or {{ shortcutHint }}</p>
              </template>
              <template v-else>
                <p class="pr-term-prompt">kalaam ▸ run</p>
                <p
                  v-for="(line, index) in linebylineOutput"
                  :key="'out-' + runId + '-' + index"
                  class="pr-line pr-line-in"
                  :style="{ animationDelay: index * 25 + 'ms' }"
                >{{ line }}</p>
                <p class="pr-term-prompt"><span class="pr-cursor" aria-hidden="true">▌</span></p>
              </template>
            </div>
          </div>

          <div class="pr-panel">
            <h2>Memory</h2>
            <p v-if="!practiceMemoryRows.length" class="pr-empty">Variables appear here after you run your program.</p>
            <table v-else class="pr-memory">
              <tbody>
                <tr v-for="row in practiceMemoryRows" :key="row.name">
                  <td class="pr-mem-name">{{ row.name }}</td>
                  <td class="pr-mem-value">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template v-else>
          <div class="pr-panel pr-panel-did">
            <h2>What the computer did</h2>
            <p v-if="currentStep" class="pr-explain">{{ currentStep.message }}</p>
            <p v-else-if="learningIsError" class="pr-explain is-error">{{ learningErrorText }}</p>
            <p v-else class="pr-empty">Press Next step to run your program one line at a time.</p>
          </div>

          <div class="pr-panel">
            <h2>Memory</h2>
            <p v-if="!learningMemoryRows.length" class="pr-empty">Variables appear here after you run your program.</p>
            <table v-else class="pr-memory">
              <tbody>
                <tr v-for="row in learningMemoryRows" :key="row.name" :class="{ 'is-changed': row.changed }">
                  <td class="pr-mem-name">{{ row.name }}</td>
                  <td class="pr-mem-value">{{ row.value }}<span v-if="row.changed && row.previousValue !== null" class="pr-mem-was"> (was {{ row.previousValue }})</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pr-panel">
            <h2>Output so far</h2>
            <p v-if="!learningOutputSoFar.length" class="pr-empty">Nothing printed yet.</p>
            <div v-else class="pr-term pr-output">
              <p v-for="(line, index) in learningOutputSoFar" :key="'ls-' + index" class="pr-line">{{ line }}</p>
            </div>
          </div>
        </template>
      </aside>
    </main>
  </div>
</template>

<script>
//This is our header file AKA Navigation bar located in components folder.

// import { KalaamKeywords } from "../lib/Compiler/constants";

import { KalaamKeywords } from "../kalaam/Compiler/main";

const langs = Object.keys(KalaamKeywords);

//CodeMirror is an npm package whcih provides rich code editors
import { codemirror } from "vue-codemirror";

//Code editor styling
import "codemirror/lib/codemirror.css";
import "../components/Kalaam";

// theme css
//import 'codemirror/theme/yonce.css'
//import 'codemirror/theme/monokai.css'
// The editor is styled with the page's own light/dark variables in the
// <style> block below (see .k-practice .CodeMirror rules), not via a theme import.

// require active-line.js
import "codemirror/addon/selection/active-line.js";

// keyMap
import "codemirror/addon/edit/matchbrackets.js";

import "codemirror/addon/search/searchcursor.js";
import "codemirror/keymap/sublime.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
// Importing our Compile Engine
//this should come from npm package.
//import Compile from "../lib/Compiler/main";

import { Compile } from "../kalaam/Compiler/main";
// //Central data storage of Kalaam
// import { mapState } from "vuex";

import SiteHeader from "../components/SiteHeader.vue";

// Pulls the computed value out of a "=" execution-stack step's message --
// the interpreter doesn't return a separate "computed value" field, it's
// baked into the human-readable message text, in one of two shapes:
//   simple assignment:      ... को "7" ये VALUE ...
//   calculated assignment:  ... की कीमत (Value) , "7" आती है ... को "7" ये VALUE ...
// Both shapes are tried (in that order) before falling back to step.value.
function extractAssignedValue(step) {
  if (step && typeof step.message === "string") {
    const simple = step.message.match(/को,?\s*"([^"]*)"\s*ये\s*VALUE/);
    if (simple) return simple[1];
    const calculated = step.message.match(/की कीमत \(Value\)\s*,\s*"([^"]*)"\s*आती है/);
    if (calculated) return calculated[1];
  }
  return step ? step.value : undefined;
}

// Replays "=" steps (string variable only -- loop headers and other
// keywords carry a token array instead and aren't variable assignments)
// in order, keeping first-seen insertion order while letting a later
// assignment update that row's value in place.
function buildMemoryRows(steps) {
  const order = [];
  const values = new Map();
  (steps || []).forEach((step) => {
    if (step && step.keyword === "=" && typeof step.variable === "string") {
      if (!values.has(step.variable)) order.push(step.variable);
      values.set(step.variable, extractAssignedValue(step));
    }
  });
  return order.map((name) => ({ name, value: values.get(name) }));
}

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

  //This is a local data restricted to Kalaam.io/practise component.
  //Our Compiler takes data from here, does it's magic and save it back here
  data() {
    return {
      //Code written by user
      code: "",
      checked: "",
      //Compiled Output
      output: "",
      cm: "",
      //Error handling array. Need a lot of improvements in this particular part
      error: [],
      OperationObjects: [],
      //Printing compiled output in a more readable line by line format
      linebylineOutput: "",

      //Calculating the time taken to compile the code
      TimeTaken: "",
      inputIndexes: [],
      //input: '',
      isError: "",
      ExecutionStack: [],

      // Learning mode steps over its own compiled ExecutionStack, kept
      // separate from Practice's Run() output above so switching modes
      // never clobbers the other mode's last result.
      learningExecutionStack: [],
      learningLinebylineOutput: [],
      learningIsError: "",
      learningError: [],
      // The code the learning stack was compiled from -- Compile() only
      // runs again when this stops matching `code` (Learning starts, or
      // the code changed since the last compile).
      learningCodeSnapshot: null,
      // 0 = no step taken yet; otherwise the 1-based count of steps
      // executed so far. The active step is learningExecutionStack[stepIndex - 1].
      stepIndex: 0,
      // Bumped on every Run() so the terminal's fade-in restarts per run.
      runId: 0,
      // The CodeMirror line *handle* (as returned by addLineClass(), not
      // an index) currently carrying the k-current-line class, so it can
      // be removed via that handle before the next one is added -- a line
      // handle tracks its line through edits, a plain index doesn't.
      highlightedLine: null,

      LineByLineCode: [],
      Keyword: "",

      isRoutePractise: false,

      ActiveLanguage: "",

      // Light by default, matching the approved mockup. Dark reuses the
      // One Dark palette. Persisted so a reload keeps the choice.
      themeDark: false,

      // Native-script labels for the language select.
      // `value` matches an existing KalaamKeywords key (and ActiveLanguage option) exactly.
      languageLabels: [
        { value: "Hindi", label: "हिन्दी", lang: "hi" },
        { value: "Marathi", label: "मराठी", lang: "mr" },
        { value: "Bengali", label: "বাংলা", lang: "bn" },
        { value: "Telugu", label: "తెలుగు", lang: "te" },
        { value: "Odia", label: "ଓଡ଼ିଆ", lang: "or" },
      ],

      //Configuration for codemirror text edior that we are using
      cmOptions: {
        // codemirror options
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "k-step-gutter", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: "kalaam",
        hintOptions: {
          completeSingle: true,
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "kalaam",
        scrollbarStyle: "null",
        // Ctrl/Cmd-Enter runs the program in Practice mode, or steps to the
        // next line in Learning mode -- same as the toolbar's Run/Next step
        // button. Arrow functions here close over `this` from data()'s own
        // `this` (the component instance), since Vue calls data() with
        // `this` bound to the vm.
        extraKeys: {
          "Ctrl-Enter": () => this.RunShortcut(),
          "Cmd-Enter": () => this.RunShortcut(),
        },
      },

      model: null,

      // options: ["Hindi", "Marathi","Bengali","Telugu"],
      options: langs,
    };
  },

  //Imported components
  components: {
    codemirror,
    SiteHeader,
  },

  //Created() is Called synchronously after the instance is created or when kalaam.io/practise is visited

  computed: {
    learning() {
      return this.$store.state.LearningOn;
    },
    // "Ctrl + Enter" everywhere except Mac, where it's "⌘ Enter".
    shortcutHint() {
      if (
        typeof navigator !== "undefined" &&
        /Mac|iPhone|iPod|iPad/.test(navigator.platform)
      ) {
        return "⌘ Enter";
      }
      return "Ctrl + Enter";
    },

    runTitle() {
      return `${this.learning ? "Next step" : "Run"} (${this.shortcutHint})`;
    },

    themeToggleLabel() {
      return this.themeDark ? "Switch to light theme" : "Switch to dark theme";
    },

    // The For/Length/Push chips insert (and label) slightly differently
    // depending on mode -- this preserves exactly what each mode did
    // before the toolbar was unified.
    forChipInsert() {
      return this.learning ? this.Keyword.For + " x को y मे" : this.Keyword.For;
    },
    forChipLabel() {
      return this.learning ? this.Keyword.For + " x को y मे" : this.Keyword.For;
    },
    lengthChipInsert() {
      return this.learning ? "." + this.Keyword.Length + "()" : this.Keyword.Length + "()";
    },
    lengthChipLabel() {
      return this.learning ? "." + this.Keyword.Length + "()" : this.Keyword.Length;
    },
    pushChipInsert() {
      return this.learning ? "." + this.Keyword.Push + "()" : this.Keyword.Push;
    },
    pushChipLabel() {
      return this.learning ? "." + this.Keyword.Push + "()" : this.Keyword.Push;
    },

    hasConsoleOutput() {
      return !!(this.linebylineOutput && this.linebylineOutput.length);
    },
    emptyConsoleHint() {
      return `Press Run or ${this.shortcutHint} to see the output here.`;
    },
    // The interpreter returns TimeTaken as text like "सफल | speed - 0.3 ms"
    // (or a compile-error message with no number in it) -- pull just the
    // number-plus-unit out of it for the Output panel's timing display.
    runTimingMs() {
      if (!this.TimeTaken) return "";
      const match = String(this.TimeTaken).match(/([\d.]+)\s*ms/);
      return match ? `${match[1]} ms` : "";
    },

    // Practice mode's Memory panel: the final variable values after the
    // last Run(), built by replaying every "=" step in that run's stack.
    practiceMemoryRows() {
      return buildMemoryRows(this.ExecutionStack);
    },

    totalLearningSteps() {
      return this.learningExecutionStack.length;
    },
    // The step that was just executed (stepIndex is a 1-based count of
    // steps taken, so the active one is at stepIndex - 1), or null before
    // the first Next step.
    currentStep() {
      if (this.stepIndex === 0) return null;
      return this.learningExecutionStack[this.stepIndex - 1] || null;
    },
    // A snapshot key that changes whenever the code or the active language
    // changes -- used to tell whether the compiled Learning stack is stale
    // (Compile() needs to run again before stepping can continue).
    learningSnapshotKey() {
      return `${this.ActiveLanguage}::${this.code}`;
    },
    isLearningStale() {
      return this.learningCodeSnapshot !== this.learningSnapshotKey;
    },
    canGoNext() {
      if (!this.code) return false;
      // Stale means NextStep() will recompile before stepping -- Next
      // should stay enabled so that recompile can happen (e.g. right
      // after Clear(), or after editing code at the last step).
      if (this.isLearningStale) return true;
      return this.stepIndex < this.totalLearningSteps;
    },
    canGoPrev() {
      return this.stepIndex > 0;
    },
    learningErrorText() {
      return Array.isArray(this.learningError) ? this.learningError.join(" ") : this.learningError;
    },
    // Learning mode's Memory panel: the variables set by every step up to
    // and including the current one, with the row the current step just
    // touched flagged so the template can highlight it and show "(was X)".
    learningMemoryRows() {
      if (this.stepIndex === 0) return [];
      const steps = this.learningExecutionStack.slice(0, this.stepIndex);
      const rows = buildMemoryRows(steps);
      const active = this.currentStep;
      if (active && active.keyword === "=" && typeof active.variable === "string") {
        const priorRows = buildMemoryRows(steps.slice(0, -1));
        const prior = priorRows.find((row) => row.name === active.variable);
        return rows.map((row) => {
          if (row.name !== active.variable) return { ...row, changed: false, previousValue: null };
          return { ...row, changed: true, previousValue: prior ? prior.value : null };
        });
      }
      return rows.map((row) => ({ ...row, changed: false, previousValue: null }));
    },
    // Learning mode's "Output so far": the first K printed lines, where K
    // is how many print steps have been executed up to the current step.
    learningOutputSoFar() {
      if (this.stepIndex === 0) return [];
      const steps = this.learningExecutionStack.slice(0, this.stepIndex);
      const printKeyword = this.Keyword && this.Keyword.Print;
      const printed = steps.filter((step) => step && step.keyword === printKeyword).length;
      const lines = this.learningLinebylineOutput || [];
      return lines.slice(0, printed);
    },
  },

  watch: {
    ActiveLanguage: function (newval, oldval) {
      if (this.ActiveLanguage && langs.includes(this.ActiveLanguage)) {
        localStorage.setItem("ActiveLangugae", this.ActiveLanguage);
        this.Keyword = KalaamKeywords[this.ActiveLanguage];
      } else {
        localStorage.setItem("ActiveLangugae", "Hindi");
        this.Keyword = KalaamKeywords["Hindi"];
      }
    },
    // Switching mode (either direction) retires whatever step/highlight
    // Learning was on; entering Learning compiles its own stack right away
    // so "Step 0 of N" shows a real total immediately.
    learning(isLearning) {
      this.clearCurrentLineHighlight();
      this.stepIndex = 0;
      this.applyReadOnly();
      if (isLearning) {
        this.ensureLearningCompiled();
      }
    },
  },

  mounted() {
    // If the component mounts with Learning already on (e.g. Learning on
    // -> Examples -> "Open in practice"), the `learning` watcher below
    // never fires (it only reacts to a change), so the stack would stay
    // empty ("Step 0 of 0", Next disabled) until the user toggled modes.
    // Compile it here too, once `code` is set up by created().
    if (this.learning) {
      this.ensureLearningCompiled();
    }
  },

  created() {
    this.ActiveLanguage = localStorage.getItem("ActiveLangugae");

    if (this.ActiveLanguage == null) {
      this.ActiveLanguage = "Hindi";
    }

    this.checked = true;

    this.themeDark = localStorage.getItem("kalaamTheme") === "dark";

    //Setting the formatted code to this.code. this.code is how you can access the code written by user.
    // Examples/Documentation send plain text (textContent) now, not
    // HTML-escaped markup, so it's used as-is -- decoding here used to
    // double-decode real code that happened to contain "&lt;" etc.
    this.code = this.$store.state.CurrentCode;

    if (this.code == "") {
      this.code = localStorage.getItem("Code");
    }

    // Nothing saved and nothing routed in via "Open in practice" -- prefill
    // a short starter program so the editor isn't empty on a fresh visit.
    if (!this.code) {
      this.code = this.StarterCode(this.ActiveLanguage);
    }
  },

  beforeDestroy() {
    if (this._onResize) {
      window.removeEventListener("resize", this._onResize);
    }
  },

  //This is the start of our functions.
  methods: {
    Clear: function () {
      if (this.learning) {
        this.stepIndex = 0;
        this.learningExecutionStack = [];
        this.learningLinebylineOutput = [];
        this.learningCodeSnapshot = null;
        this.clearCurrentLineHighlight();
      } else {
        this.code = "";
        this.ExecutionStack = [];
        this.linebylineOutput = "";
        this.output = "";
        this.TimeTaken = "";
        this.isError = "";
        this.error = [];
      }
    },

    SwitchMode: function () {
      this.$store.commit("changeMode");
    },
    // Labels beside the toggle switch to the named mode (no-op if already there).
    setLearning(on) {
      if (on !== this.learning) this.SwitchMode();
    },
    // A short starter program so a fresh visit never shows a blank editor.
    StarterCode(lang) {
      if (lang === "Hindi") {
        return (
          `# नमस्ते! Run दबाओ या ${this.shortcutHint}\n` +
          'नाम="दुनिया"\n' +
          'दिखाए("नमस्ते " + नाम)'
        );
      }
      const kw = KalaamKeywords[lang] || KalaamKeywords.Hindi;
      return `${kw.Print}("Hello, Kalaam!")`;
    },
    // Below 3 are the fucntions provided by Codemirror code editor out of the box.
    // The editor fills its pane via CSS (see .k-practice .CodeMirror in the
    // style block), so this just keeps a resize listener wired for
    // CodeMirror's internal measurements, instead of a fixed pixel height.
    onCmReady(cm) {
      this.cm = cm;
      this.applyReadOnly();

      this.$nextTick(() => cm.refresh());

      this._onResize = () => {
        if (this.cm) {
          this.cm.refresh();
        }
      };
      window.addEventListener("resize", this._onResize);
    },

    // Learning mode shows the program, it does not edit it. 'nocursor' is
    // deliberately not used so the current-line highlight stays visible.
    applyReadOnly() {
      if (this.cm) {
        this.cm.setOption("readOnly", this.learning ? true : false);
        this.$nextTick(() => this.cm && this.cm.refresh());
      }
    },

    onCmFocus(cm) {},

    onCmCodeChange(newCode) {
      this.code = newCode;

      localStorage.setItem("Code", newCode);

      this.$store.state.CurrentCode = newCode;
    },
    //Add() is a function used to add clicked keywords on to the code editor.
    //This keywords are in hindi, provided in the control panel above the code editor.
    Add: function (insert) {
      //Getting a codemirror instance
      var doc = this.cm.getDoc();
      //Getting the current position of cursor on Code editor
      var cursor = doc.getCursor();

      //Adding the clikced element (insert)
      doc.replaceRange(insert, cursor);

      //getting the active element

      //setting as active line
    },

    // Scrolls the console to the bottom after new output arrives.
    scrollConsoleToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.consoleBody;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },

    //This is the start of Compiler. RUN() is the function executed when a user wants to run the code and see the output.
    //This is our main guy consisting of different functions to parse, generate token array, compile code and print output.

    Run: function () {
      //Compile is our #1 function located in /lib/compiler/main.js
      //this.$data is the local data restricted to Kalaam.io/practise component which we have declared in 'data()' above
      //try  to see what we are sending to our compiler

      var {
        linebylineOutput,
        TimeTaken,
        isError,
        output,
        error,
        ExecutionStack,
      } = Compile(this.code, this.Keyword);

      this.linebylineOutput = linebylineOutput;
      this.TimeTaken = TimeTaken;
      this.isError = isError;
      this.error = error;
      this.output = output;
      this.ExecutionStack = ExecutionStack;
      this.runId += 1;

      this.scrollConsoleToBottom();
    },

    // Compiles the current code into its own ExecutionStack for Learning
    // mode to step over, separate from Practice's Run() above. Only
    // re-compiles when the code or the active language has changed since
    // the last time (or the first time Learning starts), per the "compile
    // once, then step" rule -- so switching language resets stepping too.
    ensureLearningCompiled() {
      const snapshotKey = this.learningSnapshotKey;
      if (this.learningCodeSnapshot !== snapshotKey) {
        // this.Keyword is set by the ActiveLanguage watcher, which runs
        // asynchronously -- fall back to resolving it directly so a very
        // first compile (e.g. from mounted(), before that watcher has
        // flushed) still uses the right keyword map.
        const keyword = this.Keyword || KalaamKeywords[this.ActiveLanguage] || KalaamKeywords.Hindi;
        const { ExecutionStack, linebylineOutput, isError, error } = Compile(this.code, keyword);
        this.learningExecutionStack = ExecutionStack || [];
        this.learningLinebylineOutput = linebylineOutput || [];
        this.learningIsError = isError;
        this.learningError = error;
        this.learningCodeSnapshot = snapshotKey;
        this.stepIndex = 0;
        this.clearCurrentLineHighlight();
      }
    },

    NextStep() {
      this.ensureLearningCompiled();
      if (this.stepIndex < this.learningExecutionStack.length) {
        this.stepIndex += 1;
        this.applyCurrentLineHighlight();
      }
    },

    PreviousStep() {
      if (this.stepIndex > 0) {
        this.stepIndex -= 1;
        this.applyCurrentLineHighlight();
      }
    },

    clearCurrentLineHighlight() {
      if (this.cm && this.highlightedLine !== null) {
        this.cm.removeLineClass(this.highlightedLine, "background", "k-current-line");
        this.cm.setGutterMarker(this.highlightedLine, "k-step-gutter", null);
      }
      this.highlightedLine = null;
    },

    applyCurrentLineHighlight() {
      this.clearCurrentLineHighlight();
      const step = this.currentStep;
      if (step && this.cm && typeof step.Linenumber === "number") {
        const line = step.Linenumber - 1;
        // addLineClass() returns the line *handle*, not the index -- keep
        // that handle so removeLineClass() below still targets the right
        // line even after lines are inserted/removed above it.
        this.highlightedLine = this.cm.addLineClass(line, "background", "k-current-line");
        const marker = document.createElement("span");
        marker.className = "k-step-marker";
        marker.textContent = "▶";
        this.cm.setGutterMarker(this.highlightedLine, "k-step-gutter", marker);
        this.cm.scrollIntoView({ line: line, ch: 0 }, 80);
      }
    },

    toggleTheme() {
      this.themeDark = !this.themeDark;
      localStorage.setItem("kalaamTheme", this.themeDark ? "dark" : "light");
      this.$nextTick(() => {
        if (this.cm) this.cm.refresh();
      });
    },

    // Ctrl/Cmd-Enter from the editor: run the program in Practice mode,
    // or step to the next line in Learning mode -- the same methods the
    // toolbar's Run/Next step button calls.
    RunShortcut: function () {
      if (this.learning) {
        this.NextStep();
      } else {
        this.Run();
      }
    },
  },
};
</script>

<style scoped>
.k-practice {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--pr-bg);
  color: var(--pr-text);
}

/* In a flex column, margin:auto children shrink to their content;
   the header and toolbar/main must still span the page. */
.k-practice > * {
  width: 100%;
}

/* The workspace sits inside the same content width as the site header:
   its edges line up with the logo and the last nav link. */
.pr-toolbar,
.pr-main {
  max-width: calc(var(--k-max) - 2 * var(--k-gutter));
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 720px) {
  .pr-toolbar {
    margin-top: 20px;
    border: 1px solid var(--pr-border);
    border-radius: 8px 8px 0 0;
  }

  .pr-main {
    margin-bottom: 28px;
    border: 1px solid var(--pr-border);
    border-top: 0;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
}

/* Toolbar */

.pr-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 24px;
  background: var(--pr-panel);
  border-bottom: 1px solid var(--pr-border);
}

.pr-toolbar-left,
.pr-toolbar-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
}

.mode-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.mode-label {
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--pr-muted);
  background: none;
  border: 0;
  padding: 4px 2px;
  cursor: pointer;
  border-radius: 3px;
}

.mode-label.on {
  color: var(--pr-ink);
  font-weight: 600;
}

.is-learning .mode-label.on {
  color: #b88a1e;
}

/* Learning is a different room: gold rule under the toolbar, softer panels. */
.is-learning .pr-toolbar {
  border-bottom: 3px solid #b88a1e;
}

.pr-panel-did {
  transition: background-color 180ms ease;
}

.is-learning .pr-panel-did {
  background: #fffbe8;
}

.is-learning.theme-dark .pr-panel-did {
  background: #3a3322;
}

.k-practice,
.pr-toolbar,
.pr-editor,
.pr-aside,
.pr-panel,
.chip-bar {
  transition: background-color 180ms ease, border-color 180ms ease;
}

.switch {
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 11px;
  background: var(--pr-border-strong);
  cursor: pointer;
  transition: background 150ms ease;
  flex: 0 0 auto;
}

.switch.on {
  background: var(--pr-ink);
}

.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 150ms ease;
}

.switch.on .knob {
  transform: translateX(18px);
}

.pr-lang {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--pr-muted);
  font-family: var(--k-sans);
  font-size: 14px;
}

.pr-lang-select {
  font: inherit;
  color: var(--pr-ink);
  background: var(--pr-panel);
  border: 1px solid var(--pr-border-strong);
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.pr-lang-select option {
  background: var(--pr-panel);
  color: var(--pr-text);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--pr-ink);
  background: var(--pr-panel);
  border: 1px solid var(--pr-border-strong);
  border-radius: 6px;
  cursor: pointer;
  flex: 0 0 auto;
}

.theme-toggle:hover {
  border-color: var(--pr-ink);
}

.btn-quiet {
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--pr-muted);
  background: none;
  border: 0;
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-quiet:hover {
  color: var(--pr-text);
}

.btn-outline {
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--pr-ink);
  background: var(--pr-panel);
  border: 1px solid var(--pr-border-strong);
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--pr-ink);
}

.btn-ink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--k-sans);
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--pr-ink);
  border: 0;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: filter 150ms ease;
}

.btn-ink:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-quiet:disabled,
.btn-outline:disabled,
.btn-ink:disabled {
  opacity: 0.5;
  cursor: default;
}

.run-icon {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid currentColor;
  flex: 0 0 auto;
}

.shortcut-hint,
.step-counter {
  font-family: var(--k-sans);
  font-size: 13px;
  color: var(--pr-muted);
  white-space: nowrap;
}

.step-counter {
  min-width: 92px;
  text-align: center;
}

.mode-label:focus-visible,
.switch:focus-visible,
.pr-lang-select:focus-visible,
.theme-toggle:focus-visible,
.btn-quiet:focus-visible,
.btn-outline:focus-visible,
.btn-ink:focus-visible,

@media (prefers-reduced-motion: reduce) {
  .switch,
  .knob,
  .btn-ink,
  .k-practice,
  .pr-toolbar,
  .pr-editor,
  .pr-aside,
  .pr-panel,
  .pr-panel-did,
  .chip-bar {
    transition: none;
  }

  .pr-cursor,
  .pr-line-in {
    animation: none;
  }
}

/* Main: editor + aside, wrapping on narrow viewports */

.pr-main {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  min-width: 0;
}

.pr-editor {
  display: flex;
  flex-direction: column;
  flex: 999 1 560px;
  min-width: 0;
  background: var(--pr-panel);
  padding: 20px 0 0;
}

.pr-aside {
  display: flex;
  flex-direction: column;
  flex: 1 1 380px;
  min-width: 0;
  background: var(--pr-bg);
  border-left: 1px solid var(--pr-border);
}

/* Keyword buttons under the editor: a 4x2 grid on a black strip,
   like the original site's keyboard. */

.chip-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  flex: 0 0 auto;
  padding: 14px 24px 16px;
  background: #111318;
  border-top: 1px solid #000;
}

.chip {
  min-width: 0;
  min-height: 48px;
  font-family: var(--k-mono);
  font-size: 17px;
  color: #e9ecf3;
  background: #1f2330;
  border: 1px solid #343a4a;
  border-radius: 8px;
  padding: 10px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.chip:hover:not(:disabled) {
  background: #2a3042;
  border-color: #c792ea;
  color: #ffffff;
}

.chip:focus-visible {
  outline: 2px solid #c792ea;
  outline-offset: 2px;
}

.chip:disabled {
  opacity: 0.35;
  cursor: default;
}

/* Aside panels */

.pr-panel {
  padding: 20px 24px;
  border-bottom: 1px solid var(--pr-border);
}

.pr-panel:last-child {
  border-bottom: 0;
}

.pr-panel h2 {
  margin: 0 0 10px;
  font-family: var(--k-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--pr-muted);
}

.pr-panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.pr-timing {
  font-family: var(--k-mono);
  font-size: 13px;
  color: var(--pr-muted);
}

.pr-empty {
  margin: 0;
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--pr-muted);
}

.pr-explain {
  margin: 0;
  font-family: "Tiro Devanagari Hindi", serif;
  font-size: 19px;
  line-height: 1.6;
  color: var(--pr-ink);
  white-space: pre-line;
}

.pr-explain.is-error {
  color: var(--pr-error);
}

.pr-output {
  font-family: var(--k-mono);
}

/* Practice mode's Output panel is the one scrollConsoleToBottom() scrolls
   after a Run() -- bound so long output scrolls inside the panel instead
   of growing it (and the page) without limit. */
.pr-console {
  max-height: 420px;
  overflow-y: auto;
}

/* Terminal look, shared by the Practice output and Learning's "Output so far". */
.pr-term {
  box-sizing: border-box;
  background: #1e1f26;
  color: #d6d8e0;
  font-family: var(--k-mono);
  font-size: 14px;
  line-height: 1.7;
  padding: 14px 16px;
  border-radius: 6px;
  min-height: 180px;
  max-height: 420px;
  overflow-y: auto;
}

.theme-dark .pr-term {
  background: #15161b;
}

.pr-term .pr-line {
  margin: 0;
  font-size: 14px;
  color: #d6d8e0;
}

.pr-term.pr-output.is-error .pr-line {
  color: #ff7b72;
}

.pr-term-prompt,
.pr-term-hint {
  margin: 0;
  font-family: var(--k-mono);
  font-size: 14px;
  line-height: 1.7;
  color: #8b90a3;
  white-space: pre-wrap;
}

.pr-cursor {
  color: #d6d8e0;
  animation: pr-blink 1s steps(1) infinite;
}

@keyframes pr-blink {
  50% {
    opacity: 0;
  }
}

.pr-line-in {
  opacity: 0;
  animation: pr-fade 150ms ease forwards;
}

@keyframes pr-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pr-line {
  margin: 0 0 4px;
  font-family: var(--k-mono);
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--pr-text);
}

.pr-output.is-error .pr-line {
  color: var(--pr-error);
}

.pr-memory {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--k-mono);
  font-size: 15px;
}

.pr-memory tr {
  border-bottom: 1px solid var(--pr-border);
}

.pr-memory tr:last-child {
  border-bottom: 0;
}

.pr-mem-name {
  padding: 8px 0;
  color: var(--pr-text);
  text-align: left;
}

.pr-mem-value {
  padding: 8px 0;
  color: var(--pr-number);
  text-align: right;
}

.pr-memory tr.is-changed {
  background: var(--pr-current-line);
}

.pr-memory tr.is-changed .pr-mem-name,
.pr-memory tr.is-changed .pr-mem-value {
  color: var(--pr-ink);
  font-weight: 600;
}

.pr-mem-was {
  font-weight: 400;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .pr-toolbar {
    padding: 10px 16px;
  }

  .pr-panel {
    padding-left: 16px;
    padding-right: 16px;
  }

  .chip-bar {
    padding: 10px 12px 12px;
    gap: 8px;
  }

  .chip {
    font-size: 15px;
    min-height: 44px;
    padding: 8px 6px;
  }

  .pr-empty,
  .pr-explain {
    font-size: 14px;
  }
}
</style>

<style>
/* CSS custom properties for the light (default) and dark workspace
   themes, plus the CodeMirror rules that key off them -- both live in
   this non-scoped block because CodeMirror renders its own DOM outside
   this component's scoped-style boundary, and the variables need to
   reach that DOM too. Light matches the approved mockup; dark reuses the
   One Dark palette this page shipped with previously. */
.k-practice {
  --pr-bg: #f5f6f8;
  --pr-panel: #ffffff;
  --pr-border: #e3e6ee;
  --pr-border-strong: #cfd4e2;
  --pr-text: #24262d;
  --pr-muted: #5b6070;
  --pr-ink: #1f2766;
  --pr-current-line: #eef0fa;
  --pr-chip: #ffffff;
  --pr-lineno: #9da2ad;
  --pr-lineno-active: #1f2766;
  --pr-cursor: #1f2766;
  --pr-selection: #d7e3fa;
  --pr-keyword: #a626a4;
  --pr-def: #4078f2;
  --pr-string: #50a14f;
  --pr-number: #986801;
  --pr-operator: #0184bc;
  --pr-property: #c18401;
  --pr-comment: #a0a1a7;
  --pr-error: #a3261c;
  --pr-line-accent: var(--pr-ink);
}

.k-practice.theme-dark {
  --pr-bg: #282c34;
  --pr-panel: #21252b;
  --pr-border: #181a1f;
  --pr-border-strong: #3e4451;
  --pr-text: #abb2bf;
  --pr-muted: #7f848e;
  --pr-ink: #4d78cc;
  --pr-current-line: #2c3350;
  --pr-chip: #2c313a;
  --pr-lineno: #4b5263;
  --pr-lineno-active: #abb2bf;
  --pr-cursor: #528bff;
  --pr-selection: #3e4451;
  --pr-keyword: #c678dd;
  --pr-def: #61afef;
  --pr-string: #98c379;
  --pr-number: #d19a66;
  --pr-operator: #56b6c2;
  --pr-property: #e5c07b;
  --pr-comment: #5c6370;
  --pr-error: #e06c75;
}

/* Learning mode: a warm, paper-like second room. */
.k-practice.is-learning {
  --pr-bg: #faf6ee;
  --pr-panel: #fffdf8;
  --pr-border: #e6ddc9;
  --pr-border-strong: #d8cdb3;
  --pr-current-line: #fbf1cf;
  --pr-line-accent: #b88a1e;
}

.k-practice.is-learning.theme-dark {
  --pr-bg: #2a2621;
  --pr-panel: #332e27;
  --pr-border: #4a4238;
  --pr-border-strong: #5a5044;
  --pr-current-line: #3d3523;
}

@media (prefers-reduced-motion: reduce) {
  .k-practice .CodeMirror-gutters {
    transition: none;
  }
}

.k-practice .pr-editor no-ssr,
.k-practice .vue-codemirror,
.k-practice .CodeMirror {
  min-width: 0;
  max-width: 100%;
}

/* <no-ssr> (Quasar's QNoSsr, registered under the bare "no-ssr" tag here)
   renders as a literal wrapping element around the codemirror component --
   it has to join the flex chain too, or the editor below it can't grow. */
.k-practice .pr-editor no-ssr {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

/* vue-codemirror wraps .CodeMirror in its own, non-flex .vue-codemirror div
   (see node_modules/vue-codemirror/src/codemirror.vue) -- that wrapper has
   to be a flex container too, or flex: 1 on .CodeMirror itself has no
   parent to grow against. .pr-editor and .pr-aside are flex-row siblings
   (see .pr-main in the scoped block) and stretch to match height on wide
   viewports; on narrow ones .pr-editor wraps onto its own row, so the
   min-height floors below keep CodeMirror from collapsing. */
.k-practice .vue-codemirror {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.k-practice .CodeMirror {
  background: var(--pr-panel);
  color: var(--pr-text);
  font-family: var(--k-mono);
  font-size: 16px;
  line-height: 26px;
  direction: ltr;
  border: 0;
  height: auto;
  flex: 1 1 auto;
  min-height: 420px;
}

.k-practice .CodeMirror-lines {
  padding: 8px 0;
}

.k-practice .CodeMirror pre.CodeMirror-line,
.k-practice .CodeMirror pre.CodeMirror-line-like {
  padding: 0 24px;
}

.k-practice .CodeMirror-gutters {
  background: var(--pr-panel);
  border: none;
  transition: background-color 180ms ease;
}

.k-practice .k-step-gutter {
  width: 16px;
}

/* The marker column only exists in the Learning room. */
.k-practice:not(.is-learning) .k-step-gutter {
  width: 0;
}

.k-practice .k-step-marker {
  display: block;
  color: #b88a1e;
  font-size: 11px;
  line-height: 26px;
  text-align: center;
}

.k-practice .CodeMirror-linenumber {
  color: var(--pr-lineno);
  font-family: inherit;
  font-size: 13px;
  padding: 0 8px 0 12px;
}

.k-practice .CodeMirror-activeline-gutter .CodeMirror-linenumber {
  color: var(--pr-lineno-active);
}

.k-practice .CodeMirror-activeline-background {
  background: transparent;
}

.k-practice .CodeMirror-linebackground.k-current-line {
  background: var(--pr-current-line);
  border-left: 3px solid var(--pr-line-accent);
}

.k-practice .CodeMirror-cursor {
  border-left: 2px solid var(--pr-cursor);
}

.k-practice .CodeMirror-selected,
.k-practice .CodeMirror-focused .CodeMirror-selected {
  background: var(--pr-selection);
}

.k-practice .CodeMirror-matchingbracket {
  color: var(--pr-text) !important;
  background: transparent;
  border-bottom: 1px solid var(--pr-text);
  text-decoration: none;
}

.k-practice .CodeMirror-foldgutter-open,
.k-practice .CodeMirror-foldgutter-folded {
  color: var(--pr-lineno);
}

/* Syntax colours for the kalaam mode */
.k-practice .cm-keyword {
  color: var(--pr-keyword);
}

.k-practice .cm-def {
  color: var(--pr-def);
}

.k-practice .cm-variable,
.k-practice .cm-variable-2,
.k-practice .cm-variable-3 {
  color: var(--pr-text);
}

.k-practice .cm-property {
  color: var(--pr-property);
}

.k-practice .cm-operator {
  color: var(--pr-operator);
}

.k-practice .cm-number,
.k-practice .cm-atom {
  color: var(--pr-number);
}

.k-practice .cm-string,
.k-practice .cm-string-2 {
  color: var(--pr-string);
}

.k-practice .cm-comment {
  color: var(--pr-comment);
  font-style: italic;
}

.k-practice .cm-bracket,
.k-practice .cm-meta,
.k-practice .cm-tag,
.k-practice .cm-qualifier {
  color: var(--pr-text);
}

.k-practice .cm-error {
  color: var(--pr-error);
}

@media (max-width: 719px) {
  .k-practice .CodeMirror {
    font-size: 15px;
    line-height: 24px;
    min-height: 50vh;
  }
}
</style>
