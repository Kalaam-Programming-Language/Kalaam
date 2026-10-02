<template>
  <div class="k-page k-practice">
    <SiteHeader>
      <select v-model="ActiveLanguage" class="lang-select" aria-label="Keyword language">
        <option v-for="lang in options" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </SiteHeader>

    <main class="k-main">
      <!-- Learning Mode: step through the program one line at a time -->
      <section v-if="this.$store.state.LearningOn" class="editor-grid">
        <div class="k-sheet editor-sheet">
          <div class="sheet-head">
            <span class="mode-label" :class="{ active: this.$store.state.PractiseOn }">Practice mode</span>

            <label class="switch">
              <input
                @click="SwitchMode()"
                v-if="this.$store.state.PractiseOn"
                type="checkbox"
              />
              <input
                @click="SwitchMode()"
                v-if="this.$store.state.LearningOn"
                type="checkbox"
                checked
              />
              <span class="slider round"></span>
            </label>

            <span class="mode-label" :class="{ active: this.$store.state.LearningOn }">Learning mode</span>
          </div>

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

          <div class="control-panel">
            <button class="k-button" @click="RunLinebyLine()">Next</button>
            <button class="k-button-quiet" @click="Clear()">Clear</button>

            <button class="k-button-quiet" @click="Add(Keyword.Print + '()')">{{
              Keyword.Print
            }}</button>
            <button class="k-button-quiet" @click="Add('इनपुट()')">इनपुट</button>

            <button class="k-button-quiet" @click="Add(Keyword.If + '()')">{{
              Keyword.If
            }}</button>

            <button class="k-button-quiet" @click="Add('दुहराओ x को y मे')">दुहराओ</button>
            <button class="k-button-quiet" @click="Add(Keyword.While + '()')">{{
              Keyword.While
            }}</button>
            <button class="k-button-quiet" @click="Add('.संख्या()')">.संख्या</button>
            <button class="k-button-quiet" @click="Add('.पुश()')">.पुश</button>
            <button class="k-button-quiet" @click="Add('रचना')">रचना</button>
          </div>
        </div>

        <div class="k-sheet output-sheet">
          <p class="output-label k-muted">Run your program line by line</p>
          <p v-if="this.isError == false" class="timing-text k-muted">{{ TimeTaken }}</p>
          <p v-if="this.isError == true" class="timing-text k-muted">{{ TimeTaken }}</p>

          <div class="output-body" :class="{ 'k-error': isError === true }">
            <p class="output-line">{{ this.ExecutionStackLinebyLine }}</p>
          </div>
        </div>
      </section>

      <!-- Practice Mode: write code and run it -->
      <section v-if="this.$store.state.PractiseOn" class="editor-grid">
        <div class="k-sheet editor-sheet">
          <div class="sheet-head">
            <span class="mode-label" :class="{ active: this.$store.state.PractiseOn }">Practice mode</span>

            <label class="switch">
              <input
                @click="SwitchMode()"
                v-if="this.$store.state.PractiseOn"
                type="checkbox"
              />
              <input
                @click="SwitchMode()"
                v-if="this.$store.state.LearningOn"
                type="checkbox"
                checked
              />
              <span class="slider round"></span>
            </label>

            <span class="mode-label" :class="{ active: this.$store.state.LearningOn }">Learning mode</span>
          </div>

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

          <div class="control-panel">
            <button class="k-button" @click="Run()">Run</button>
            <button class="k-button-quiet" @click="Clear()">Clear</button>

            <button class="k-button-quiet" @click="Add(Keyword.Print + '()')">{{
              Keyword.Print
            }}</button>
            <button class="k-button-quiet" @click="Add(Keyword.Input + '()')">{{
              Keyword.Input
            }}</button>

            <button class="k-button-quiet" @click="Add(Keyword.If + '()')">{{
              Keyword.If
            }}</button>

            <button class="k-button-quiet" @click="Add(Keyword.For)">{{
              Keyword.For
            }}</button>
            <button class="k-button-quiet" @click="Add(Keyword.While + '()')">{{
              Keyword.While
            }}</button>
            <button class="k-button-quiet" @click="Add(Keyword.Length + '()')">{{
              Keyword.Length
            }}</button>
            <button class="k-button-quiet" @click="Add(Keyword.Push)">{{
              Keyword.Push
            }}</button>
            <button class="k-button-quiet" @click="Add(Keyword.Function)">{{
              Keyword.Function
            }}</button>
          </div>
        </div>

        <div class="k-sheet output-sheet">
          <p class="output-label k-muted">Output appears here.</p>
          <p v-if="this.isError == false" class="timing-text k-muted">{{ TimeTaken }}</p>
          <p v-if="this.isError == true" class="timing-text k-muted">{{ TimeTaken }}</p>

          <div class="output-body" :class="{ 'k-error': isError === true }">
            <p
              class="output-line"
              v-for="(output, index) in this.linebylineOutput"
              :key="index"
            >{{ output }}</p>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
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
import SiteFooter from "../components/SiteFooter.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

  //Retriveing CurrentCode present in the Central data storage of Kalaam.
  computed: {},

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
    SiteFooter,
  },

  //Created() is Called synchronously after the instance is created or when kalaam.io/practise is visited

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
    // Below 3 are the fucntions provided by Codemirror code editor out of the box. We dynamically change it's height for different devices and make it responsive.
    onCmReady(cm) {
      this.cm = cm;

      if (screen.width < 420) {
        this.cm.setSize("100%", 500);
        this.isMobile = true;
      } else {
        this.cm.setSize("100%", 550);
        this.isMobile = false;
      }
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
  },
};
</script>

<style scoped>
.sheet-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-bottom: 12px;
  font-family: var(--k-sans);
  font-size: 15px;
}

.mode-label {
  color: var(--k-muted);
}

.mode-label.active {
  color: var(--k-ink);
  font-weight: 600;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex: 0 0 auto;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--k-rule);
  transition: 0.2s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: #fff;
  transition: 0.2s;
}

input:checked + .slider {
  background-color: var(--k-ink);
}

input:focus + .slider {
  outline: 2px solid var(--k-ink);
  outline-offset: 2px;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.lang-select {
  font: inherit;
  font-family: var(--k-sans);
  font-size: 15px;
  color: var(--k-ink);
  background: var(--k-sheet);
  border: 1px solid var(--k-rule);
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}

.lang-select:focus-visible {
  outline: 2px solid var(--k-ink);
  outline-offset: 2px;
}

.editor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 24px 0 56px;
}

.editor-sheet {
  min-width: 0;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.control-panel .k-button,
.control-panel .k-button-quiet {
  font-size: 15px;
  padding: 10px 14px;
}

.output-sheet {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  min-width: 0;
}

.output-label {
  margin: 0 0 4px;
  font-size: 14px;
}

.timing-text {
  margin: 0 0 12px;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.output-body {
  flex: 1;
  overflow: auto;
  border-top: 1px solid var(--k-rule);
  padding-top: 12px;
}

.output-line {
  margin: 0 0 4px;
  /* same stack as the editor, so output reads like a console */
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas,
    'Roboto Mono', 'Noto Sans Mono', 'Noto Sans Devanagari', monospace;
  font-size: 16px;
  line-height: 1.75;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--k-text);
}

.output-body.k-error .output-line {
  color: var(--k-error);
}

@media (min-width: 960px) {
  .editor-grid {
    grid-template-columns: 3fr 2fr;
    align-items: start;
  }
}

@media (max-width: 480px) {
  .editor-grid {
    gap: 16px;
    padding: 20px 0 40px;
  }

  .control-panel .k-button,
  .control-panel .k-button-quiet {
    font-size: 14px;
    padding: 9px 12px;
  }
}
</style>

<style>
/* CodeMirror theme: a light code editor (One Light palette).
   Prefixed with .k-practice to beat the dark global rules in public/index.html.
   Latin text uses the system monospace; Devanagari falls back to the system
   Devanagari sans, the way desktop editors render it. */

.k-practice .CodeMirror {
  background: #ffffff;
  color: #383a42;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas,
    'Roboto Mono', 'Noto Sans Mono', 'Noto Sans Devanagari', monospace;
  font-size: 17px;
  line-height: 30px;
  direction: ltr;
  border: 1px solid #e3e6ee;
  border-radius: 4px;
}

.k-practice .CodeMirror-lines {
  padding: 8px 0;
}

.k-practice .CodeMirror pre.CodeMirror-line,
.k-practice .CodeMirror pre.CodeMirror-line-like {
  padding: 0 12px;
}

.k-practice .CodeMirror-gutters {
  background: #f7f8fa;
  border-right: 1px solid #e3e6ee;
}

.k-practice .CodeMirror-linenumber {
  color: #9da2ad;
  font-family: inherit;
  font-size: 13px;
  padding: 0 8px 0 12px;
}

.k-practice .CodeMirror-activeline-gutter .CodeMirror-linenumber {
  color: #383a42;
}

.k-practice .CodeMirror-activeline-background {
  background: #f2f4f9;
}

.k-practice .CodeMirror-cursor {
  border-left: 2px solid #526fff;
}

.k-practice .CodeMirror-selected,
.k-practice .CodeMirror-focused .CodeMirror-selected {
  background: #dfe5fb;
}

.k-practice .CodeMirror-matchingbracket {
  color: #383a42 !important;
  background: #e2e6f2;
  text-decoration: none;
}

.k-practice .CodeMirror-foldgutter-open,
.k-practice .CodeMirror-foldgutter-folded {
  color: #9da2ad;
}

/* Syntax colours for the kalaam mode */
.k-practice .cm-keyword {
  color: #a626a4;
}

.k-practice .cm-def {
  color: #4078f2;
}

.k-practice .cm-variable,
.k-practice .cm-variable-2,
.k-practice .cm-variable-3 {
  color: #383a42;
}

.k-practice .cm-property {
  color: #0184bc;
}

.k-practice .cm-operator {
  color: #0184bc;
}

.k-practice .cm-number,
.k-practice .cm-atom {
  color: #986801;
}

.k-practice .cm-string,
.k-practice .cm-string-2 {
  color: #50a14f;
}

.k-practice .cm-comment {
  color: #a0a1a7;
  font-style: italic;
}

.k-practice .cm-bracket,
.k-practice .cm-meta,
.k-practice .cm-tag,
.k-practice .cm-qualifier {
  color: #383a42;
}

.k-practice .cm-error {
  color: #e45649;
}

@media (max-width: 480px) {
  .k-practice .CodeMirror {
    font-size: 16px;
    line-height: 28px;
  }
}
</style>
