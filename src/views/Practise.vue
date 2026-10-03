<template>
  <div class="k-page k-practice">
    <SiteHeader />

    <main class="k-main workspace">
      <!-- Learning Mode: step through the program one line at a time -->
      <div v-if="this.$store.state.LearningOn" class="ide">
        <div class="toolbar">
          <div class="toolbar-group mode-switch" role="group" aria-label="Mode">
            <button
              type="button"
              class="seg-btn"
              :class="{ active: this.$store.state.PractiseOn }"
              :aria-pressed="this.$store.state.PractiseOn ? 'true' : 'false'"
              @click="this.$store.state.PractiseOn ? null : SwitchMode()"
            >Practice</button>
            <button
              type="button"
              class="seg-btn"
              :class="{ active: this.$store.state.LearningOn }"
              :aria-pressed="this.$store.state.LearningOn ? 'true' : 'false'"
              @click="this.$store.state.LearningOn ? null : SwitchMode()"
            >Learning</button>
          </div>

          <div class="toolbar-group lang-switch" role="group" aria-label="Keyword language">
            <button
              v-for="l in languageLabels"
              :key="l.value"
              type="button"
              class="lang-btn"
              :class="{ active: ActiveLanguage === l.value }"
              :aria-pressed="ActiveLanguage === l.value ? 'true' : 'false'"
              :lang="l.lang"
              @click="ActiveLanguage = l.value"
            >{{ l.label }}</button>
          </div>

          <div class="toolbar-actions">
            <button class="k-button" @click="RunLinebyLine()">Next</button>
            <span class="shortcut-hint k-muted">{{ shortcutHint }}</span>
            <button class="k-button-quiet" @click="Clear()">Clear</button>
          </div>
        </div>

        <div class="panes">
          <section class="pane editor-pane">
            <no-ssr placeholder="...">
              <codemirror
                id="codearea"
                ref="myCm"
                :value="code"
                :options="cmOptions"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange"
              ></codemirror>
            </no-ssr>

            <div class="chip-bar">
              <button class="chip" @click="Add(Keyword.Print + '()')">{{ Keyword.Print }}</button>
              <button class="chip" @click="Add(Keyword.Input + '()')">{{ Keyword.Input }}</button>
              <button class="chip" @click="Add(Keyword.If + '()')">{{ Keyword.If }}</button>
              <button class="chip" @click="Add(Keyword.For + ' x को y मे')">{{ Keyword.For }} x को y मे</button>
              <button class="chip" @click="Add(Keyword.While + '()')">{{ Keyword.While }}</button>
              <button class="chip" @click="Add('.' + Keyword.Length + '()')">.{{ Keyword.Length }}()</button>
              <button class="chip" @click="Add('.' + Keyword.Push + '()')">.{{ Keyword.Push }}()</button>
              <button class="chip" @click="Add(Keyword.Function)">{{ Keyword.Function }}</button>
            </div>
          </section>

          <section class="pane output-pane">
            <div class="console-head">
              <span class="k-muted">Output</span>
              <span v-if="TimeTaken" class="k-muted console-timing">{{ TimeTaken }}</span>
            </div>

            <div class="console-body" :class="{ 'is-error': isError === true }">
              <p v-if="!ExecutionStackLinebyLine" class="console-empty k-muted">Output appears here.</p>
              <p v-else class="console-line">{{ this.ExecutionStackLinebyLine }}</p>
            </div>
          </section>
        </div>
      </div>

      <!-- Practice Mode: write code and run it -->
      <div v-if="this.$store.state.PractiseOn" class="ide">
        <div class="toolbar">
          <div class="toolbar-group mode-switch" role="group" aria-label="Mode">
            <button
              type="button"
              class="seg-btn"
              :class="{ active: this.$store.state.PractiseOn }"
              :aria-pressed="this.$store.state.PractiseOn ? 'true' : 'false'"
              @click="this.$store.state.PractiseOn ? null : SwitchMode()"
            >Practice</button>
            <button
              type="button"
              class="seg-btn"
              :class="{ active: this.$store.state.LearningOn }"
              :aria-pressed="this.$store.state.LearningOn ? 'true' : 'false'"
              @click="this.$store.state.LearningOn ? null : SwitchMode()"
            >Learning</button>
          </div>

          <div class="toolbar-group lang-switch" role="group" aria-label="Keyword language">
            <button
              v-for="l in languageLabels"
              :key="l.value"
              type="button"
              class="lang-btn"
              :class="{ active: ActiveLanguage === l.value }"
              :aria-pressed="ActiveLanguage === l.value ? 'true' : 'false'"
              :lang="l.lang"
              @click="ActiveLanguage = l.value"
            >{{ l.label }}</button>
          </div>

          <div class="toolbar-actions">
            <button class="k-button" @click="Run()">Run</button>
            <span class="shortcut-hint k-muted">{{ shortcutHint }}</span>
            <button class="k-button-quiet" @click="Clear()">Clear</button>
          </div>
        </div>

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
              ></codemirror>
            </no-ssr>

            <div class="chip-bar">
              <button class="chip" @click="Add(Keyword.Print + '()')">{{ Keyword.Print }}</button>
              <button class="chip" @click="Add(Keyword.Input + '()')">{{ Keyword.Input }}</button>
              <button class="chip" @click="Add(Keyword.If + '()')">{{ Keyword.If }}</button>
              <button class="chip" @click="Add(Keyword.For)">{{ Keyword.For }}</button>
              <button class="chip" @click="Add(Keyword.While + '()')">{{ Keyword.While }}</button>
              <button class="chip" @click="Add(Keyword.Length + '()')">{{ Keyword.Length }}</button>
              <button class="chip" @click="Add(Keyword.Push)">{{ Keyword.Push }}</button>
              <button class="chip" @click="Add(Keyword.Function)">{{ Keyword.Function }}</button>
            </div>
          </section>

          <section class="pane output-pane">
            <div class="console-head">
              <span class="k-muted">Output</span>
              <span v-if="TimeTaken" class="k-muted console-timing">{{ TimeTaken }}</span>
            </div>

            <div class="console-body" :class="{ 'is-error': isError === true }">
              <p v-if="!linebylineOutput || linebylineOutput.length === 0" class="console-empty k-muted">Output appears here.</p>
              <p
                v-else
                class="console-line"
                v-for="(output, index) in this.linebylineOutput"
                :key="index"
              >{{ output }}</p>
            </div>
          </section>
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
// Monokai no longer applies; the editor is now styled as a light sheet
// in the <style> block below (see .k-practice .CodeMirror rules).

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

      // Native-script labels for the toolbar's language segmented control.
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
        theme: "monokai",
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
      // if (this.ActiveLanguage == "Hindi") {
      //   localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

      //   this.Keyword = KalaamKeywords.Hindi;
      // } else if (this.ActiveLanguage == "Marathi") {
      //   localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

      //   this.Keyword = KalaamKeywords.Marathi;
      // }
      // else if (this.ActiveLanguage == "Bengali") {
      //   localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

      //   this.Keyword = KalaamKeywords.Bengali;
      // } else if (this.ActiveLanguage == "Telugu") {
      //   localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

      //   this.Keyword = KalaamKeywords.Telugu;
      // }
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
    // Below 3 are the fucntions provided by Codemirror code editor out of the box.
    // The editor fills its pane via CSS (see .k-practice .CodeMirror in the
    // style block), so this just keeps a resize listener wired for
    // CodeMirror's internal measurements, instead of a fixed pixel height.
    onCmReady(cm) {
      this.cm = cm;

      this.isMobile = window.innerWidth < 960;

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
   the header and workspace must still span the page. */
.k-practice > * {
  width: 100%;
}

.workspace,
.ide,
.panes {
  min-width: 0;
}

/* Toolbar actions match the height of the segmented controls. */
.toolbar .k-button,
.toolbar .k-button-quiet {
  padding: 7px 16px;
  font-size: 14px;
  line-height: 1.2;
}

.workspace {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 560px;
}

.ide {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

/* Toolbar */

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--k-code-border);
  flex: 0 0 auto;
}

.toolbar-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: auto;
}

.shortcut-hint {
  font-size: 13px;
  white-space: nowrap;
}

.seg-btn,
.lang-btn {
  font: inherit;
  font-family: var(--k-sans);
  font-size: 14px;
  color: var(--k-ink);
  background: transparent;
  border: 1px solid var(--k-rule);
  border-radius: 4px;
  padding: 7px 12px;
  line-height: 1.2;
  cursor: pointer;
}

.seg-btn:hover,
.lang-btn:hover {
  border-color: var(--k-ink);
}

.seg-btn.active,
.lang-btn.active {
  background: var(--k-ink);
  border-color: var(--k-ink);
  color: #fff;
}

/* Panes: editor left, console right on desktop; stacked on phone */

.panes {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.pane {
  min-width: 0;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* <no-ssr> (Quasar's QNoSsr, registered under the bare "no-ssr" tag here)
   renders as a literal wrapping element around the codemirror component --
   it has to join the flex chain too, or the editor below it can't grow. */
.editor-pane no-ssr {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.output-pane {
  display: flex;
  flex-direction: column;
  min-height: 180px;
  border-top: 1px solid var(--k-code-border);
}

/* Keyword chip bar, directly under the editor */

.chip-bar {
  display: flex;
  flex: 0 0 auto;
  gap: 6px;
  padding: 8px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.chip {
  flex: 0 0 auto;
  font-family: var(--k-mono);
  font-size: 13px;
  color: var(--k-code-keyword);
  background: var(--k-code-bg);
  border: 1px solid var(--k-code-border);
  border-radius: 4px;
  padding: 6px 10px;
  white-space: nowrap;
  cursor: pointer;
}

.chip:hover {
  border-color: var(--k-code-keyword);
}

/* Output console */

.console-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--k-code-border);
  font-size: 13px;
  flex: 0 0 auto;
}

.console-timing {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.console-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 12px 0;
}

.console-empty {
  margin: 0;
  font-family: var(--k-sans);
  font-size: 15px;
}

.console-line {
  margin: 0 0 4px;
  font-family: var(--k-mono);
  font-size: 17px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--k-code-text);
}

.console-body.is-error .console-line {
  color: var(--k-code-error);
}

@media (max-width: 720px) {
  .toolbar-group,
  .toolbar-actions {
    flex: 1 1 100%;
  }

  .toolbar-actions {
    margin-left: 0;
  }
}

@media (min-width: 960px) {
  .panes {
    flex-direction: row;
  }

  .editor-pane no-ssr {
    flex: 1 1 auto;
  }

  .editor-pane {
    flex: 3 1 0;
    min-width: 0;
    border-right: 1px solid var(--k-code-border);
    padding-right: 24px;
  }

  .output-pane {
    flex: 2 1 0;
    min-width: 0;
    min-height: 0;
    border-top: 0;
    padding-left: 24px;
  }
}

@media (max-width: 480px) {
  .console-line,
  .console-empty {
    font-size: 15px;
  }

  .seg-btn,
  .lang-btn {
    font-size: 13px;
    padding: 6px 10px;
  }
}
</style>

<style>
.k-practice .editor-pane no-ssr,
.k-practice .vue-codemirror,
.k-practice .CodeMirror {
  min-width: 0;
  max-width: 100%;
}

/* CodeMirror theme: a light code editor (One Light palette).
   Prefixed with .k-practice to beat the dark global rules in public/index.html.
   Latin text uses the system monospace; Devanagari falls back to the system
   Devanagari sans, the way desktop editors render it.
   Sizing: fixed 55vh on phone, fills its flex pane on desktop (see the
   min-width: 960px block below) -- this is reached here, not in the scoped
   block above, because CodeMirror renders its own DOM outside this
   component's scoped-style boundary. */

/* vue-codemirror wraps .CodeMirror in its own, non-flex .vue-codemirror div
   (see node_modules/vue-codemirror/src/codemirror.vue) -- that wrapper has
   to be a flex container too, or flex: 1 on .CodeMirror itself has no
   parent to grow against. */
.k-practice .vue-codemirror {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.k-practice .CodeMirror {
  background: var(--k-code-bg);
  color: var(--k-code-text);
  font-family: var(--k-mono);
  font-size: 17px;
  line-height: 30px;
  direction: ltr;
  border: 1px solid var(--k-code-border);
  border-radius: 4px;
  height: 55vh;
}

.k-practice .CodeMirror-lines {
  padding: 8px 0;
}

.k-practice .CodeMirror pre.CodeMirror-line,
.k-practice .CodeMirror pre.CodeMirror-line-like {
  padding: 0 12px;
}

.k-practice .CodeMirror-gutters {
  background: var(--k-code-gutter);
  border-right: 1px solid var(--k-code-border);
}

.k-practice .CodeMirror-linenumber {
  color: var(--k-code-lineno);
  font-family: inherit;
  font-size: 13px;
  padding: 0 8px 0 12px;
}

.k-practice .CodeMirror-activeline-gutter .CodeMirror-linenumber {
  color: var(--k-code-text);
}

.k-practice .CodeMirror-activeline-background {
  background: var(--k-code-active-line);
}

.k-practice .CodeMirror-cursor {
  border-left: 2px solid var(--k-code-cursor);
}

.k-practice .CodeMirror-selected,
.k-practice .CodeMirror-focused .CodeMirror-selected {
  background: var(--k-code-selection);
}

.k-practice .CodeMirror-matchingbracket {
  color: var(--k-code-text) !important;
  background: var(--k-code-selection);
  text-decoration: none;
}

.k-practice .CodeMirror-foldgutter-open,
.k-practice .CodeMirror-foldgutter-folded {
  color: var(--k-code-lineno);
}

/* Syntax colours for the kalaam mode */
.k-practice .cm-keyword {
  color: var(--k-code-keyword);
}

.k-practice .cm-def {
  color: var(--k-code-def);
}

.k-practice .cm-variable,
.k-practice .cm-variable-2,
.k-practice .cm-variable-3 {
  color: var(--k-code-text);
}

.k-practice .cm-property {
  color: var(--k-code-operator);
}

.k-practice .cm-operator {
  color: var(--k-code-operator);
}

.k-practice .cm-number,
.k-practice .cm-atom {
  color: var(--k-code-number);
}

.k-practice .cm-string,
.k-practice .cm-string-2 {
  color: var(--k-code-string);
}

.k-practice .cm-comment {
  color: var(--k-code-comment);
  font-style: italic;
}

.k-practice .cm-bracket,
.k-practice .cm-meta,
.k-practice .cm-tag,
.k-practice .cm-qualifier {
  color: var(--k-code-text);
}

.k-practice .cm-error {
  color: var(--k-code-error);
}

@media (min-width: 960px) {
  .k-practice .vue-codemirror {
    flex: 1 1 auto;
  }

  .k-practice .CodeMirror {
    height: auto;
    flex: 1 1 auto;
    min-height: 0;
  }
}

@media (max-width: 480px) {
  .k-practice .CodeMirror {
    font-size: 16px;
    line-height: 28px;
  }
}
</style>
