<template>
  <div class="k-page k-practice">
    <SiteHeader />

    <main class="ide-shell">
      <div class="ide">
        <!-- Top bar: mode toggle on the left, Clear + Run/Next on the right -->
        <div class="ide-topbar">
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

          <div class="ide-topbar-actions">
            <button type="button" class="ide-clear" @click="Clear()">Clear</button>
            <button type="button" class="ide-run" :title="runTitle" @click="RunShortcut()">
              <span class="run-icon"></span>{{ runLabel }}
            </button>
          </div>
        </div>

        <!-- Editor + console panes -->
        <div class="panes">
          <section class="pane editor-pane">
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
                @cursorActivity="onCmCursorActivity"
              ></codemirror>
            </no-ssr>

            <div class="chip-bar">
              <button class="chip" @click="Add(Keyword.Print + '()')">{{ Keyword.Print }}</button>
              <button class="chip" @click="Add(Keyword.Input + '()')">{{ Keyword.Input }}</button>
              <button class="chip" @click="Add(Keyword.If + '()')">{{ Keyword.If }}</button>
              <button class="chip" @click="Add(forChipInsert)">{{ forChipLabel }}</button>
              <button class="chip" @click="Add(Keyword.While + '()')">{{ Keyword.While }}</button>
              <button class="chip" @click="Add(lengthChipInsert)">{{ lengthChipLabel }}</button>
              <button class="chip" @click="Add(pushChipInsert)">{{ pushChipLabel }}</button>
              <button class="chip" @click="Add(Keyword.Function)">{{ Keyword.Function }}</button>
            </div>
          </section>

          <section class="pane output-pane">
            <div class="console-head">
              <span class="console-head-label">Output</span>
            </div>

            <div class="console-body" ref="consoleBody" :class="{ 'is-error': isError === true }">
              <p v-if="!hasConsoleOutput" class="console-empty">{{ emptyConsoleHint }}</p>
              <template v-else>
                <p v-if="!learning" class="console-line console-echo">{{ runEchoLine }}</p>
                <template v-if="!learning">
                  <p
                    v-for="(line, index) in linebylineOutput"
                    :key="'out-' + index"
                    class="console-line"
                  >{{ line }}</p>
                </template>
                <p v-if="learning" class="console-line console-steps">{{ ExecutionStackLinebyLine }}</p>
              </template>
            </div>
          </section>
        </div>

        <!-- Status bar: language + mode on the left, cursor position + shortcut on the right -->
        <div class="ide-statusbar">
          <div class="status-left">
            <select class="status-lang" v-model="ActiveLanguage" aria-label="Language">
              <option v-for="l in languageLabels" :key="l.value" :value="l.value" :lang="l.lang">{{ l.label }} ({{ l.value }})</option>
            </select>
            <span class="status-mode">{{ modeStatusLabel }}</span>
          </div>
          <div class="status-right">
            <span class="status-pos">Ln {{ cursorLine }}, Col {{ cursorCol }}</span>
            <span class="status-shortcut">{{ shortcutHint }} to run</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//This is our header file AKA Navigation bar located in components folder.

// import { KalaamKeywords } from "../lib/Compiler/constants";

import { KalaamKeywords } from "kalaam";

const langs = Object.keys(KalaamKeywords);

//CodeMirror is an npm package whcih provides rich code editors
import { codemirror } from "vue-codemirror";

//Code editor styling
import "codemirror/lib/codemirror.css";
import "../components/Kalaam";

// theme css
//import 'codemirror/theme/yonce.css'
//import 'codemirror/theme/monokai.css'
// The editor is styled as a dark, One Dark-palette IDE in the <style>
// block below (see .k-practice .CodeMirror rules), not via a theme import.

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

import { Compile } from "kalaam";
// //Central data storage of Kalaam
// import { mapState } from "vuex";

import SiteHeader from "../components/SiteHeader.vue";

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
      flag: false,
      inputIndexes: [],
      //input: '',
      isError: "",
      ExecutionStack: [],
      ExecutionStackLinebyLine: "",

      LastConditionValue: [],
      LineByLineCode: [],
      CurrentLine: 0,
      Keyword: "",

      isRoutePractise: false,

      ShowSupport: true,
      ShowAbout: true,
      isMobile: false,

      ActiveLanguage: "",

      // Live cursor position for the status bar, updated from CodeMirror's
      // cursorActivity event (1-based, the way editors display it).
      cursorLine: 1,
      cursorCol: 1,

      // Native-script labels for the status bar's language dropdown.
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
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: "kalaam",
        hintOptions: {
          completeSingle: true,
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "onedark",
        scrollbarStyle: "null",
        // Ctrl/Cmd-Enter runs the program -- same method the toolbar's Run
        // (or Next, in Learning mode) button calls. Arrow functions here
        // close over `this` from data()'s own `this` (the component
        // instance), since Vue calls data() with `this` bound to the vm.
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

    runLabel() {
      return this.learning ? "Next" : "Run";
    },
    runTitle() {
      return `Run (${this.shortcutHint})`;
    },
    modeStatusLabel() {
      return this.learning ? "Learning mode" : "Practice mode";
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
      if (this.learning) {
        return !!this.ExecutionStackLinebyLine;
      }
      return !!(this.linebylineOutput && this.linebylineOutput.length);
    },
    emptyConsoleHint() {
      return `Press Run or ${this.shortcutHint} to see the output here.`;
    },
    // The interpreter returns TimeTaken as text like "सफल | speed - 0.3 ms"
    // (or a compile-error message with no number in it) -- pull just the
    // number-plus-unit out of it for the console echo line.
    runTimingMs() {
      if (!this.TimeTaken) return "";
      const match = String(this.TimeTaken).match(/([\d.]+)\s*ms/);
      return match ? `${match[1]} ms` : "";
    },
    runEchoLine() {
      return this.runTimingMs ? `› Run  ${this.runTimingMs}` : "› Run";
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
  },

  created() {
    this.ActiveLanguage = localStorage.getItem("ActiveLangugae");

    if (this.ActiveLanguage == null) {
      this.ActiveLanguage = "Hindi";
    }

    this.checked = true;

    //Setting the formatted code to this.code. this.code is how you can access the code written by user.
    let m = this.$store.state.CurrentCode.replace(/&lt;/g, "<");

    m = m.replace(/&gt;/g, ">");

    m = m.replace(/&amp;/g, "&");
    this.code = m;

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
    Reload: function () {
      //console.log(this.ActiveLanguage);
    },
    Clear: function () {
      if (this.$store.state.PractiseOn) {
        this.code = "";
      } else {
        this.ExecutionStack = [];
        this.ExecutionStackLinebyLine = [];
        this.output = "";
        this.linebylineOutput = "";

        this.LineByLineCode = [];

        this.flag = false;
        this.CurrentLine = 0;
        var doc = this.cm.getDoc();

        doc.setCursor({ line: this.CurrentLine });
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
          "# नमस्ते! Run दबाओ या ⌘ Enter\n" +
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

      this.isMobile = window.innerWidth < 960;

      const cursor = cm.getCursor();
      this.cursorLine = cursor.line + 1;
      this.cursorCol = cursor.ch + 1;

      this.$nextTick(() => cm.refresh());

      this._onResize = () => {
        this.isMobile = window.innerWidth < 960;
        if (this.cm) {
          this.cm.refresh();
        }
      };
      window.addEventListener("resize", this._onResize);
    },

    onCmFocus(cm) {},

    // Keeps the status bar's "Ln X, Col Y" live as the cursor moves.
    onCmCursorActivity(cm) {
      const cursor = cm.getCursor();
      this.cursorLine = cursor.line + 1;
      this.cursorCol = cursor.ch + 1;
    },

    onCmCodeChange(newCode) {
      this.code = newCode;

      localStorage.setItem("Code", newCode);

      this.$store.state.CurrentCode = newCode;
    },
    //Add() is a function used to add clicked keywords on to the code editor.
    //This keywords are in hindi, provided in the control panel at the bottom of our code editor.
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

      this.scrollConsoleToBottom();
    },

    RunLinebyLine: function () {
      //Compile is our #1 function located in /lib/compiler/main.js
      //this.$data is the local data restricted to Kalaam.io/practise component which we have declared in 'data()' above
      //try  to see what we are sending to our compiler

      if (this.flag == false) {
        let { ExecutionStack } = Compile(this.code, this.ActiveLanguage);
        this.ExecutionStack = ExecutionStack;
      }

      this.flag = true;

      this.ExecutionStackLinebyLine =
        this.ExecutionStackLinebyLine +
        this.ExecutionStack[this.CurrentLine].message +
        "\n" +
        "\n";

      let Line = this.ExecutionStack[this.CurrentLine].Linenumber;

      //this.cm.state.activeLines

      var doc = this.cm.getDoc();

      doc.setCursor({ line: Line - 1 });

      this.CurrentLine += 1;

      this.scrollConsoleToBottom();
    },

    // Ctrl/Cmd-Enter from the editor: run the program in Practice mode,
    // or step to the next line in Learning mode -- the same methods the
    // toolbar's Run/Next button calls.
    RunShortcut: function () {
      if (this.$store.state.LearningOn) {
        this.RunLinebyLine();
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
}

/* In a flex column, margin:auto children shrink to their content;
   the header and IDE shell must still span the page. */
.k-practice > * {
  width: 100%;
}

.ide-shell {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
}

.ide {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 520px;
  background: var(--ide-bg);
}

/* Top bar */

.ide-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 44px;
  flex: 0 0 44px;
  padding: 0 16px;
  background: var(--ide-panel);
  border-bottom: 1px solid var(--ide-border);
}

.mode-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.mode-label {
  font-family: var(--k-sans);
  font-size: 13px;
  color: var(--ide-muted);
  background: none;
  border: 0;
  padding: 4px 2px;
  cursor: pointer;
  border-radius: 3px;
}

.mode-label.on {
  color: var(--ide-text);
  font-weight: 600;
}

.switch {
  position: relative;
  width: 34px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: var(--ide-border-strong);
  cursor: pointer;
  transition: background 150ms ease;
  flex: 0 0 auto;
}

.switch.on {
  background: var(--ide-accent);
}

.knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  transition: transform 150ms ease;
}

.switch.on .knob {
  transform: translateX(16px);
}

.ide-topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 0 0 auto;
}

.ide-clear {
  font-family: var(--k-sans);
  font-size: 13px;
  color: var(--ide-muted);
  background: none;
  border: 0;
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 3px;
}

.ide-clear:hover {
  color: var(--ide-text);
}

.ide-run {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--k-sans);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--ide-accent);
  border: 0;
  border-radius: 4px;
  padding: 6px 14px;
  cursor: pointer;
  transition: filter 150ms ease;
}

.ide-run:hover {
  filter: brightness(1.1);
}

.run-icon {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid currentColor;
  flex: 0 0 auto;
}

.mode-label:focus-visible,
.ide-clear:focus-visible,
.ide-run:focus-visible,
.switch:focus-visible,
.status-lang:focus-visible,
.chip:focus-visible {
  outline: 2px solid var(--ide-cursor);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .switch,
  .knob,
  .ide-run {
    transition: none;
  }
}

/* Panes: editor on top (phone) / left (desktop), console below / right */

.panes {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
}

.pane {
  min-width: 0;
  min-height: 0;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  flex: 0 0 55vh;
  min-height: 0;
}

.output-pane {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 30vh;
  background: var(--ide-bg);
}

/* Snippet strip, bottom of the editor pane */

.chip-bar {
  display: flex;
  flex: 0 0 40px;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--ide-panel);
}

.chip {
  flex: 0 0 auto;
  font-family: var(--k-mono);
  font-size: 13px;
  color: var(--ide-keyword);
  background: var(--ide-chip);
  border: 1px solid var(--ide-border);
  border-radius: 4px;
  padding: 5px 10px;
  white-space: nowrap;
  cursor: pointer;
}

.chip:hover {
  border-color: var(--ide-keyword);
}

/* Output console */

.console-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px 6px;
  flex: 0 0 auto;
}

.console-head-label {
  font-family: var(--k-sans);
  font-size: 12px;
  color: var(--ide-muted);
}

.console-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 12px 16px;
}

.console-empty {
  margin: 0;
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--ide-muted);
}

.console-line {
  margin: 0 0 4px;
  font-family: var(--k-mono);
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--ide-text);
}

.console-echo {
  color: var(--ide-muted);
}

.console-body.is-error .console-line {
  color: var(--ide-error);
}

/* Status bar -- brand ink, VS Code style */

.ide-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 26px;
  flex: 0 0 26px;
  padding: 0 12px;
  background: #1f2766;
  color: #fff;
  font-family: var(--k-sans);
  font-size: 12px;
  overflow: hidden;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.status-lang {
  font-family: var(--k-sans);
  font-size: 12px;
  color: #fff;
  background-color: transparent;
  border: 0;
  padding: 2px 16px 2px 2px;
  cursor: pointer;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #fff 50%),
    linear-gradient(135deg, #fff 50%, transparent 50%);
  background-position: calc(100% - 10px) 55%, calc(100% - 6px) 55%;
  background-size: 4px 4px, 4px 4px;
  background-repeat: no-repeat;
}

.status-lang option {
  background: var(--ide-panel);
  color: var(--ide-text);
}

.status-mode,
.status-pos,
.status-shortcut {
  white-space: nowrap;
  opacity: 0.92;
}

@media (max-width: 480px) {
  .status-shortcut {
    display: none;
  }

  .console-line,
  .console-empty {
    font-size: 14px;
  }
}

@media (max-width: 720px) {
  .ide-topbar {
    gap: 10px;
  }
}

@media (min-width: 960px) {
  .panes {
    flex-direction: row;
  }

  .editor-pane {
    flex: 3 1 0;
    min-width: 0;
    min-height: 0;
    border-right: 1px solid var(--ide-border);
  }

  .output-pane {
    flex: 2 1 0;
    min-width: 0;
    min-height: 0;
  }
}
</style>

<style>
/* CSS custom properties for the Dark IDE (One Dark palette), plus the
   CodeMirror theme -- both live in this non-scoped block because
   CodeMirror renders its own DOM outside this component's scoped-style
   boundary, and the variables need to reach that DOM too. */
.k-practice {
  --ide-bg: #282c34;
  --ide-panel: #21252b;
  --ide-border: #181a1f;
  --ide-border-strong: #3e4451;
  --ide-text: #abb2bf;
  --ide-muted: #7f848e;
  --ide-lineno: #4b5263;
  --ide-lineno-active: #abb2bf;
  --ide-active-line: #2c313a;
  --ide-selection: #3e4451;
  --ide-cursor: #528bff;
  --ide-keyword: #c678dd;
  --ide-def: #61afef;
  --ide-string: #98c379;
  --ide-number: #d19a66;
  --ide-operator: #56b6c2;
  --ide-property: #e5c07b;
  --ide-comment: #5c6370;
  --ide-error: #e06c75;
  --ide-chip: #2c313a;
  --ide-accent: #4d78cc;
}

.k-practice .editor-pane no-ssr,
.k-practice .vue-codemirror,
.k-practice .CodeMirror {
  min-width: 0;
  max-width: 100%;
}

/* <no-ssr> (Quasar's QNoSsr, registered under the bare "no-ssr" tag here)
   renders as a literal wrapping element around the codemirror component --
   it has to join the flex chain too, or the editor below it can't grow. */
.k-practice .editor-pane no-ssr {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

/* vue-codemirror wraps .CodeMirror in its own, non-flex .vue-codemirror div
   (see node_modules/vue-codemirror/src/codemirror.vue) -- that wrapper has
   to be a flex container too, or flex: 1 on .CodeMirror itself has no
   parent to grow against. The editor pane's own height (55vh on phone,
   flex: 3 on desktop -- see the scoped block above) sets the total size;
   CodeMirror just fills whatever is left above the chip bar. */
.k-practice .vue-codemirror {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.k-practice .CodeMirror {
  background: var(--ide-bg);
  color: var(--ide-text);
  font-family: var(--k-mono);
  font-size: 16px;
  line-height: 26px;
  direction: ltr;
  border: 0;
  height: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.k-practice .CodeMirror-lines {
  padding: 8px 0;
}

.k-practice .CodeMirror pre.CodeMirror-line,
.k-practice .CodeMirror pre.CodeMirror-line-like {
  padding: 0 16px;
}

.k-practice .CodeMirror-gutters {
  background: var(--ide-bg);
  border: none;
}

.k-practice .CodeMirror-linenumber {
  color: var(--ide-lineno);
  font-family: inherit;
  font-size: 13px;
  padding: 0 8px 0 12px;
}

.k-practice .CodeMirror-activeline-gutter .CodeMirror-linenumber {
  color: var(--ide-lineno-active);
}

.k-practice .CodeMirror-activeline-background {
  background: var(--ide-active-line);
}

.k-practice .CodeMirror-cursor {
  border-left: 2px solid var(--ide-cursor);
}

.k-practice .CodeMirror-selected,
.k-practice .CodeMirror-focused .CodeMirror-selected {
  background: var(--ide-selection);
}

.k-practice .CodeMirror-matchingbracket {
  color: var(--ide-text) !important;
  background: transparent;
  border-bottom: 1px solid var(--ide-text);
  text-decoration: none;
}

.k-practice .CodeMirror-foldgutter-open,
.k-practice .CodeMirror-foldgutter-folded {
  color: var(--ide-lineno);
}

/* Syntax colours for the kalaam mode (One Dark) */
.k-practice .cm-keyword {
  color: var(--ide-keyword);
}

.k-practice .cm-def {
  color: var(--ide-def);
}

.k-practice .cm-variable,
.k-practice .cm-variable-2,
.k-practice .cm-variable-3 {
  color: var(--ide-text);
}

.k-practice .cm-property {
  color: var(--ide-property);
}

.k-practice .cm-operator {
  color: var(--ide-operator);
}

.k-practice .cm-number,
.k-practice .cm-atom {
  color: var(--ide-number);
}

.k-practice .cm-string,
.k-practice .cm-string-2 {
  color: var(--ide-string);
}

.k-practice .cm-comment {
  color: var(--ide-comment);
  font-style: italic;
}

.k-practice .cm-bracket,
.k-practice .cm-meta,
.k-practice .cm-tag,
.k-practice .cm-qualifier {
  color: var(--ide-text);
}

.k-practice .cm-error {
  color: var(--ide-error);
}

@media (max-width: 959px) {
  .k-practice .CodeMirror {
    font-size: 15px;
    line-height: 24px;
  }
}
</style>
