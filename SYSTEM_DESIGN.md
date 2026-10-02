# Kalaam — System Design

**Author:** Swanand Kadam  
**Version:** 2.3.3 (npm) | v1.1.0 (frontend)  
**Website:** kalaamlang.in | **npm:** `kalaam`  
**Date:** May 2026

---

## Table of Contents

1. [What Is Kalaam](#1-what-is-kalaam)
2. [Hard Constraints That Drove Every Decision](#2-hard-constraints-that-drove-every-decision)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Tech Stack Decisions](#4-tech-stack-decisions)
5. [Why a Custom Parser — Not a Parser Generator](#5-why-a-custom-parser--not-a-parser-generator)
6. [Why Token-Based — Not AST-Based](#6-why-token-based--not-ast-based)
7. [Why Zero Dependencies](#7-why-zero-dependencies)
8. [Interpreter Pipeline — The Core Flow](#8-interpreter-pipeline--the-core-flow)
9. [Language Abstraction Layer — Multi-Language Without Multiple Parsers](#9-language-abstraction-layer--multi-language-without-multiple-parsers)
10. [Key Data Structures](#10-key-data-structures)
11. [Learning Mode — Teaching the Engine, Not Just the Code](#11-learning-mode--teaching-the-engine-not-just-the-code)
12. [npm Package Design](#12-npm-package-design)
13. [CodeMirror Integration — Syntax Highlighting Without a Library](#13-codemirror-integration--syntax-highlighting-without-a-library)
14. [V8 as the Execution Sandbox](#14-v8-as-the-execution-sandbox)
15. [Performance Analysis](#15-performance-analysis)
16. [Known Gaps and Honest Limitations](#16-known-gaps-and-honest-limitations)

---

## 1. What Is Kalaam

Kalaam is a programming language — with its own lexer, parser, and interpreter — where every keyword is a native Indian language word. Students write code in Hindi, Marathi, Bengali, Telugu, or Odia on the phone they already own, with no internet connection, and the program runs entirely in the browser via V8.

The name comes from the Arabic/Urdu/Hindi word for "word" or "speech" — the act of expressing thought in language.

### The Problem It Solves

Tier-3 city students in India, aged 14–18, typically discover programming 4–5 years later than their urban counterparts — not because of ability, but because of access barriers:

- **No laptop or desktop** — the only computing device is an Android phone
- **No reliable internet** — 2G/3G with frequent drops in rural and semi-urban areas
- **English barrier** — all programming education is delivered in English, a second or third language
- **No local role models** — no software engineers in their immediate community

The question Kalaam answers: **Can a student write and run their first program in Hindi, on the phone they already own, with zero internet?**

Kalaam was not built to replace Python or JavaScript. It is the **zeroth step** — the awareness spark that shows a student, in their own language, that they can make a machine do something they asked it to do. The goal is discovery, not production. Once a student has seen their first "Hello World" in Hindi, the journey into real languages begins from a position of confidence rather than alienation.

Kalaam was actively deployed in Indian schools and used by real students.

---

## 2. Hard Constraints That Drove Every Decision

These are not requirements that were nice to have. They are hard constraints — any decision that violated them was disqualified regardless of other merits.

### Constraint 1 — Offline First

The service must work with no internet. Not just "degrade gracefully" — fully functional offline. This meant:
- No API calls to any server at any point during execution
- All interpretation must happen on the device
- Static assets must be cacheable for indefinite offline use
- A server code-execution model (like Judge0, AWS Lambda, or any custom Docker sandbox) was disqualified immediately

### Constraint 2 — Mobile First

The device is a mid-range Android phone (2–4GB RAM, Snapdragon 400-series CPU). No laptop. This meant:
- The editor must work on a touchscreen — no keyboard shortcuts assumed
- The bundle size must be small — every extra kilobyte matters on slow initial loads
- Every third-party library added to the bundle is a cost paid by every student on their first use
- Computationally heavy approaches (full AST construction, heavy parsing frameworks) were penalized

### Constraint 3 — On-Device Execution

Code runs in V8 — the JavaScript engine inside the Chrome/Android browser. No code ever leaves the device. This gave two things for free: the browser's existing sandbox (V8 already isolates execution), and zero latency (no network round-trip between write and result).

### Constraint 4 — Zero Infrastructure Cost

There is no server. No backend. The platform must be hostable on any static CDN — GitHub Pages, Netlify, Cloudflare Pages. This means zero monthly cost regardless of usage — 10 students or 10,000 students, the infrastructure cost is $0. Any architecture that required a running process was disqualified.

### Constraint 5 — Embeddable as a Package

The interpreter must be publishable as a standalone npm package, usable by any developer building a learning app. This forced a clean API boundary between the interpreter and the UI, and forced zero runtime dependencies (a package with dependencies imposes those on every downstream user).

---

## 3. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         kalaamlang.in (PWA)                          │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Vue 2 + Quasar Framework                                    │    │
│  │                                                              │    │
│  │  ┌───────────────────────┐   ┌────────────────────────────┐  │    │
│  │  │  CodeMirror Editor    │   │  Practice / Examples /     │  │    │
│  │  │  (custom kalaam mode) │   │  Docs / Language Selector  │  │    │
│  │  └──────────┬────────────┘   └────────────────────────────┘  │    │
│  └─────────────┼────────────────────────────────────────────────┘    │
│                │ sourcecode (string)                                  │
│                ▼                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Kalaam Interpreter (npm: kalaam v2.3.3)                     │    │
│  │                                                              │    │
│  │  Compile(sourcecode, languageKeywords) → kalaam{}            │    │
│  │                                                              │    │
│  │  Phase 1: Cleaner  (normalize + keyword substitution)        │    │
│  │  Phase 2: Scanner  (character scan → cleaned_sourcedata[])   │    │
│  │  Phase 3: Tokenizer (cleaned_sourcedata[] → tokens[])        │    │
│  │  Phase 4: Interpreter (tokens[] + memory{} → execution)      │    │
│  │  Phase 5: Output   (kalaam{} object returned)                │    │
│  └──────────────────────────┬───────────────────────────────────┘    │
│                             │ kalaam{ output, ExecutionStack,        │
│                             │         isError, TimeTaken }           │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Output Panel + Learning Mode UI                             │    │
│  │  (renders output, replays ExecutionStack[] step by step)     │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  Service Worker — caches all assets on first load, serves offline    │
└──────────────────────────────────────────────────────────────────────┘
```

Three clean layers with hard boundaries between them:

1. **Frontend (kalaamlang.in)** — Vue 2 + Quasar PWA. CodeMirror editor with custom Kalaam syntax mode. No server. Hosted statically.
2. **Interpreter Core (npm: kalaam)** — Pure JavaScript interpreter. Zero runtime dependencies. Runs in V8.
3. **Output/Learning Layer** — Renders `kalaam.output` and replays `kalaam.ExecutionStack[]` line-by-line.

The separation between (1) and (2) is the architectural decision that makes Kalaam embeddable. Any developer can `npm install kalaam` and embed execution in their own app without taking the Vue/Quasar frontend as a dependency.

---

## 4. Tech Stack Decisions

### Decision Table

| Layer | Choice | Alternatives Considered | Reason for Choice |
|---|---|---|---|
| Frontend framework | Vue 2 + Quasar | React, Vue 3, Flutter | Quasar's PWA support out of the box; project predates stable Vue 3; mobile-first component library |
| Code editor | CodeMirror 5 | Monaco, Ace | Monaco is 3–5MB bundle — too heavy for mobile first load; Ace lacks first-class Unicode/Devanagari support; CM5 is lightweight, fork-friendly mode API |
| Parser implementation | Handwritten | PEG.js, nearley, Chevrotain, ANTLR | No runtime dependencies (constraint); full control over Unicode handling; simpler for a constrained grammar |
| Parsing approach | Token-based (flat array) | AST-based | See §6 — for sequential beginner programs, AST adds complexity with no benefit |
| Execution environment | V8 (browser) | Server-side Docker, Lambda, Judge0 | Offline constraint; V8 is the sandbox; zero latency; zero cost |
| Deployment | PWA (static CDN) | React Native, Flutter, native Android APK | No app store friction; teacher shares a URL; service worker handles offline |
| Package format | npm (CommonJS/ESM) | CDN script tag | Developer embeddability; Jest test runner; language-segregated test folders |
| Test runner | Jest | Mocha, Vitest | Mature, wide documentation, familiar to contributors; no config needed for basic cases |

---

## 5. Why a Custom Parser — Not a Parser Generator

This is the most common question about the Kalaam interpreter. Why write a parser from scratch when tools like PEG.js, nearley, Chevrotain, and ANTLR exist?

### Parser generators that were evaluated

**PEG.js**
- Would add a runtime dependency — violates Constraint 5
- PEG grammars output ASTs by default — the token-based design requires fighting the tool to not produce a tree
- PEG grammars are designed for English-like grammars. Unicode keyword handling requires custom configuration
- The grammar itself becomes an abstraction layer: students or contributors debugging parsing issues have to understand PEG syntax, not JavaScript

**nearley**
- Same runtime dependency issue
- Built around AST output with EBNF grammars
- Does not natively handle Unicode identifier characters (Devanagari, Bengali script)

**Chevrotain**
- TypeScript-first, adds overhead
- Designed for AST construction — overkill for the feature set Kalaam needs
- Bundle size impact on mobile

**ANTLR4**
- Java toolchain — requires a build step that generates JavaScript parsers
- Overkill for a constrained grammar
- Generated parser is opaque — harder to debug when a student's code hits an edge case

### Why handwritten works here

Kalaam's grammar is constrained by design. This is not a general-purpose programming language trying to replicate Python's full grammar. It handles:
- Scalar assignments and arithmetic
- Conditionals (if/else)
- Two loop types (for, while)
- User-defined functions (no closures)
- Arrays
- Input/output
- Built-in operations (length, push)

That is approximately 20 constructs. A handwritten parser for 20 constructs, where each construct is recognized by a leading keyword, is roughly 20 `if/else` branches in the tokenizer. This is maintainable, debuggable, and transparent.

**The key property of Kalaam's grammar:** every statement begins with a recognizable leading token. `अगर` always starts a conditional. `दुहराओ` always starts a for loop. `दिखाए` always starts a print. There is no ambiguity at the leading token. This makes the tokenizer a simple left-to-right scan — the leading token identifies the construct, then the rest of the statement is consumed by the corresponding `Push*` function.

```
Statement recognition:

  cleaned_sourcedata[i] == "[IF]"       → PushCondition()
  cleaned_sourcedata[i] == "[FOR]"      → PushForLoop()
  cleaned_sourcedata[i] == "[PRINT]"    → PushRealTimePrintOperation()
  cleaned_sourcedata[i] == "[FUNCTION]" → PushFunctionData()
  ...etc

```

A parser generator would add no value here because there is no grammar ambiguity to resolve. The grammar is simple enough that the recognition is trivial.

**The Unicode advantage of handwritten:** the keyword substitution step (Phase 1) converts all Hindi/Marathi/Bengali keywords to ASCII normalized tokens before the scanner runs. The scanner therefore handles only ASCII — no Unicode-aware character classification needed at the core parsing level. This is a deliberate design inversion: handle Unicode at the edges (substitution step), keep the core ASCII-clean.

---

## 6. Why Token-Based — Not AST-Based

Every serious production language compiler — Python, JavaScript, Java — builds an Abstract Syntax Tree. The question is: why doesn't Kalaam?

### The analogy

**AST is like building a map before driving.**

You parse the entire program into a tree — every expression nested inside every statement — then traverse that tree to execute it. The tree is the program's structure made explicit in memory. You recurse into it, visiting nodes, evaluating sub-expressions, climbing back out.

**Kalaam is like a printed instruction sheet.**

Phase 3 produces a flat list of typed instructions: *assign x=5, assign y=3, compute x+y store in z, print z.* Execution is: follow the list top to bottom. No recursion. No tree. A `for` loop over an array and a `switch` on `token.type`.

### The counterintuitive truth — Python doesn't execute its AST either

Most people assume AST = serious, token array = shortcut. The actual story is the opposite.

CPython compiles source → AST → **bytecode** (flat instruction array) → then executes the bytecode. The AST is a stepping stone that gets thrown away. The CPython VM walks flat instructions, not a tree.

Kalaam's Phase 3 tokenizer does the same thing — it compiles source code into a typed instruction set. We skip the intermediate AST because we don't need it. There are no optimization passes, no type checking passes, no code generation. The instruction set is the final target.

```
CPython:  source → AST → bytecode → execute bytecode
Kalaam:   source → tokens[]       → execute tokens
                   ↑
          AST step eliminated — we go straight to the instruction set
```

That is not a shortcut. That is identifying which steps actually serve the goal and removing the ones that do not.

### What the tree buys you — and why we do not need it

| AST capability | Does Kalaam need it? |
|---|---|
| Multiple traversal passes (type check, optimize, codegen) | No — single-pass interpretation |
| Operator precedence encoded in tree structure | Partially — handled in AdvancedTypeChecking |
| Precise source location on every node | No — "something went wrong" is enough for a beginner |
| Scope analysis for closures | No — closures not supported by design |
| Transformation / transpilation | No — executes directly, never transpiles |

For the programs Kalaam is designed for — a 15-year-old's first 50-line program — none of these are needed. The AST layer would be complexity added to solve problems that do not exist in this context.

### Why the flat array is a better fit for Learning Mode

Learning Mode replays `ExecutionStack[]` — a sequential trace of operations in execution order.

An AST interpreter executes by tree traversal. To produce a sequential trace, you would instrument every `visit()` call and record the nodes in the order they were visited. The traversal order is not visible in the tree — you have to run the traversal to discover it.

The flat token array IS already in sequential execution order. Every `AddtoExecutionStack()` call appends one line as the interpreter walks left to right. The trace writes itself with zero extra work.

### The one trade-off consciously accepted

Complex operator precedence is structural in an AST — `(a + b) * c / (d - e)` builds a tree where `*` is shallower than `+`. In the flat array, `CalculateValues()` handles this with a mini-expression parser.

For beginner programs under 50 lines, this is never hit in practice. If Kalaam ever needed to support production-complexity programs, adding an AST layer for v3 would be the right call. We did not need it, so we did not build it.

### Summary

| | Token-based (Kalaam) | AST-based |
|---|---|---|
| Execution model | Sequential array walk | Recursive tree traversal |
| Memory | Flat array allocation | Tree node per expression |
| Operator precedence | Explicit in CalculateValues() | Structural (in the tree) |
| Multiple passes | Not supported | Natural |
| Learning Mode trace | Free — array order = execution order | Requires traversal serialization |
| Closest production analogy | CPython bytecode VM | CPython AST builder |
| Right for | Beginner programs, sequential flow | General-purpose, production languages |

---

## 7. Why Zero Dependencies

The npm package `kalaam` has exactly zero runtime dependencies. This is a constraint, not a coincidence.

### The offline constraint forces it

If the npm package had a runtime dependency — even a small utility library — that dependency would need to be bundled into the PWA. The Quasar build system would include it. The service worker would cache it. And if that dependency ever made a CDN request at runtime (which several well-known libraries do for telemetry or dynamic loading), it would break offline execution.

Zero dependencies is the only safe default for an offline-first package.

### Dependencies in an embedded package compound

When Kalaam is `npm install`ed by a third-party developer, its dependencies become their dependencies. If `kalaam` depended on a string utility library, every school app that imports Kalaam inherits that library. At scale across many downstream apps, this creates unpredictable upgrade paths.

A zero-dependency package is a one-time decision by Kalaam — not an ongoing debt imposed on everyone who uses it.

### The interpreter does not need packages

What does an interpreter need?
- String manipulation: JavaScript built-ins handle this
- Character-level scanning: loop + `charAt()` — no library
- Type detection: `typeof`, `isNaN()`, `Array.isArray()` — no library
- Arithmetic: JavaScript operators — no library
- Time measurement: `performance.now()` — browser built-in
- Data storage: plain JavaScript objects — no library

There is genuinely nothing that requires an external package. Adding one would be adding weight for no gain.

---

## 8. Interpreter Pipeline — The Core Flow

The interpreter is a 5-phase pipeline from raw source code to executed output.

```
Raw Source Code (Hindi/Marathi/Bengali/Telugu/Odia)
         │
         ▼  Phase 1 — Cleaning
    earlyCleaning()
    SourceDataReplaceforEasyParsing()
    → normalized source (ASCII keywords + Unicode identifiers/values)
         │
         ▼  Phase 2 — Scanning
    scanner/main.js
    → cleaned_sourcedata[]   (flat string array)
         │
         ▼  Phase 3 — Tokenization
    Compiler/main.js
    → tokens[]               (typed token object array)
         │
         ▼  Phase 4 — Interpretation
    Scripts/main.js
    memory{}                 (variable store)
    ExecutionStack[]         (operation trace)
         │
         ▼  Phase 5 — Output
    kalaam{ output, ExecutionStack, isError, TimeTaken }
```

### Phase 1 — Cleaning and Keyword Substitution

Two operations run sequentially:

**`earlyCleaning(sourcecode)`**
- Strips trailing whitespace, normalizes line endings, removes empty lines
- Prepares source for safe character-level scanning

**`SourceDataReplaceforEasyParsing()`**
- Substitutes language-specific keywords with normalized ASCII tokens using the caller-supplied `languageKeywords` map
- This is the key abstraction: after this step, the rest of the pipeline is completely language-agnostic

```
Input:  "दिखाए(z)"     (Hindi)
        "দেখাও(z)"     (Bengali)
        "చూపించు(z)"  (Telugu)
Output: "[PRINT](z)"   (normalized — same for all three)
```

Why keyword substitution happens in Phase 1, not Phase 3: the scanner runs character-by-character and produces raw token strings. If keyword substitution happened after scanning, the scanner would need to handle multi-character Unicode keywords as identifiers and the tokenizer would need to be multilingual. Doing it before scanning keeps both the scanner and tokenizer purely ASCII-aware.

### Phase 2 — Scanning

**`scanner/main.js`**
- Walks the cleaned source character by character
- `IsSpecialChar()` detects token boundaries: `= + - * / > < ( ) { } , ; :`
- Each boundary character becomes its own element in `cleaned_sourcedata[]`
- Identifiers and literals are accumulated character by character until a boundary is hit

```javascript
// Input source: "x = 5\ny = 3"
cleaned_sourcedata = ["x", "=", "5", "y", "=", "3"]

// Input source: "[PRINT](z)"
cleaned_sourcedata = ["[PRINT]", "(", "z", ")"]
```

The output is a flat array of every meaningful symbol. No meaning has been assigned yet — this is purely lexical splitting.

### Phase 3 — Tokenization

**`Compiler/main.js`**

The tokenizer walks `cleaned_sourcedata[]` left to right. At each position, it identifies the construct by the leading token and calls the corresponding `Push*` function.

**20 Push\* functions cover every language construct:**

| Function | Construct |
|---|---|
| `PushVariable` / `PushVariableValue` | Variable assignment |
| `PushForLoop` / `PushForLoopArguments` | For loop |
| `PushWhileLoop` | While loop |
| `PushCondition` / `PushConditionalKeyword` | If / else |
| `PushFunctionData` / `PushFunctionExecution` | Function define / call |
| `PushRealTimePrintOperation` | Print statement |
| `PushInput` | Input statement |
| `PushArray` / `PushToArray` | Array operations |
| `PushCalculation` / `PushArithmetic` | Math expressions |
| `PushExpression` / `PushOperator` | Expressions |
| `PushNativeOperation` | Built-ins (length, push) |
| `PushString` / `PushNumber` | Literals |

**Type checking runs before each push:**
- `TypeChecking.js` — is it a Number, String, Array, Boolean?
- `AdvancedTypeChecking.js` — is it a multi-string concat, arithmetic expression, or conditional operator?

Output: `tokens[]` — a fully typed, structured representation of the program. The original language is gone. Only typed intent remains.

```javascript
// Source: "z = x + y\ndिखाए(z)"
tokens = [
  { type: "variable",   name: "z"                },
  { type: "arithmetic", expr: "x + y"            },
  { type: "print",      value: "z"               },
]
```

### Phase 4 — Interpretation

**`Scripts/main.js`**

The interpreter walks `tokens[]` sequentially and executes each token. It maintains three state objects:

- **`memory{}`** — key/value variable store. Every assigned variable lives here.
- **`ExecutionStack[]`** — ordered trace of every operation (powers Learning Mode).
- **`functionContextmemory{}`** — scoped memory for user-defined function calls.
- **`skipInterpretation`** flag — set when an if-condition is false, skips the enclosed block without executing it.

**Key execution functions:**

| Function | Role |
|---|---|
| `AssignorUpdateValues()` | Resolve and store variable values in memory{} |
| `CalculateValues()` | Evaluate arithmetic, resolving variable refs from memory{} |
| `GetConditionValue()` | Evaluate boolean conditions |
| `HandleBlocks()` | Manage `{` `}` block entry/exit and control flow state |
| `getLoopIndexStart()` / `ForLoopSetMetadata()` | For loop counter init and iteration |
| `GetArrayorStringElement()` | Index into arrays or strings |
| `prepareFunction()` / `handleOutput()` | Function setup and print execution |

**Control flow implementation:** The interpreter uses a `skipInterpretation` boolean flag rather than a jump table or program counter manipulation. When an `if` condition evaluates to false, `skipInterpretation = true`. All subsequent token handlers check this flag first and return without executing. When the closing `}` of the block is hit, `HandleBlocks()` resets `skipInterpretation = false`. This is simpler than maintaining a program counter and does not require knowing the block's end position in advance.

For loops work differently: the interpreter stores loop metadata (start index, end value, current value, step) and replays the loop body tokens using a stored `loopStartIndex` — the position in `tokens[]` where the loop body begins.

### Phase 5 — Output

The interpreter returns the `kalaam` object:

```javascript
{
  output: "8",                   // concatenated print output (string)
  ExecutionStack: [              // ordered trace of all operations
    "z को x + y = 5 + 3 = 8 का मान दिया",
    "दिखाए(z) → 8"
  ],
  isError: false,                // whether an error stopped execution
  LastConditionValue: [],        // last evaluated condition result
  TimeTaken: "2.4ms",            // performance.now() t1 - t0
}
```

---

## 9. Language Abstraction Layer — Multi-Language Without Multiple Parsers

Supporting 5 languages might suggest 5 parsers. The actual implementation uses 1 parser and 5 keyword maps. This is the core architectural insight.

### Why not separate parsers per language?

If each language had its own parser, adding a 6th language would require writing a new parser — duplicating all the scanner logic, all 20 Push\* functions, all type checking. At N languages, you have N parsers, all of which need to be kept in sync every time a new language construct is added. This is N×M maintenance where M is the number of constructs.

### The insight: Indian languages share grammar, not vocabulary

Hindi, Marathi, Bengali, Telugu, and Odia all have the same programmatic grammar for Kalaam's constructs. A print statement in all five languages is:

```
<print_keyword> ( <expression> )
```

The only thing that differs is what `<print_keyword>` is. The structure — parentheses, semicolons, braces, the arrangement of arguments — is identical.

This means the entire parser can operate on normalized tokens. Keyword substitution at Phase 1 converts the surface vocabulary to normalized ASCII tokens. The parser never sees a Hindi or Bengali character — it sees `[PRINT]`, `[IF]`, `[FOR]`, `[FUNCTION]`.

```
constants.js — KalaamKeywords map:

KalaamKeywords = {
  Hindi: {
    print:    "दिखाए",
    if:       "अगर",
    while:    "जबतक",
    for:      "दुहराओ",
    function: "रचना",
    ...
  },
  Bengali: {
    print:    "দেখাও",
    if:       "যদি",
    while:    "যখন",
    for:      "সন্ধানে",
    function: "পর্ব",
    ...
  },
  Telugu: {
    print:    "చూపించు",
    if:       "ఉంటే",
    while:    "ఉండగా",
    for:      "కోసం",
    function: "నిర్మాణము",
    ...
  }
}
```

**Adding a new language requires exactly:**
1. Add one entry to `KalaamKeywords` in `constants.js`
2. Add the localStorage check to set `ActiveLangugaeKeywords`
3. Add the UI option in the language selector
4. Write test cases in `tests/NewLang/`

Zero changes to the scanner, tokenizer, or interpreter.

### Supported languages (v2.3.3)

| Language | Print | If | While | For | Function |
|---|---|---|---|---|---|
| Hindi | दिखाए | अगर | जबतक | दुहराओ | रचना |
| Marathi | दाखवा | जर | जोपर्यंत | दुहराओ | रचना |
| Bengali | দেখাও | যদি | যখন | সন্ধানে | পর্ব |
| Telugu | చూపించు | ఉంటే | ఉండగా | కోసం | నిర్మాణము |
| Odia | ଦେଖାଅ | ଯଦି | ଯେପର୍ଯ୍ୟନ୍ତ | ଦୋହରାଅ | ବିଭାଗ |

The npm package (v2.3.3) exposes all five. The frontend deployed at kalaamlang.in started with Hindi/Marathi and expanded as the npm package was built.

---

## 10. Key Data Structures

### `cleaned_sourcedata[]`

A flat string array. Every token — identifier, operator, keyword, literal, bracket — is its own element. The raw material for the tokenizer.

```javascript
// "x = 5 + y"
cleaned_sourcedata = ["x", "=", "5", "+", "y"]

// "[IF]( x > 3 ){ [PRINT](x) }"
cleaned_sourcedata = ["[IF]", "(", "x", ">", "3", ")", "{", "[PRINT]", "(", "x", ")", "}"]
```

This is a deliberate intermediate representation. The scanner is responsible only for splitting — it makes no decisions about meaning. The tokenizer gets a clean list of atoms to work with.

### `tokens[]`

An array of typed token objects. Each object has at minimum a `type` field, plus type-specific fields. The interpreter's instruction set — it never looks at the original source code again.

```javascript
tokens = [
  { type: "variable",    name: "x"                  },
  { type: "varValue",    value: "5"                  },
  { type: "condition",   expr: "x > 3", condType: "if" },
  { type: "blockOpen"                                },
  { type: "print",       value: "x"                 },
  { type: "blockClose"                               },
]
```

The typed structure is the key property: the interpreter does a `switch` on `token.type` and never needs to re-parse. Every parsing decision is made exactly once, in Phase 3.

### `memory{}`

A plain JavaScript object used as the variable store. Keys are variable names (strings), values are their resolved JavaScript values. Every assignment writes here. Every variable reference reads from here.

```javascript
memory = {
  "x": 5,
  "y": 3,
  "z": 8,
  "name": "Arjun",
  "scores": [92, 88, 75]
}
```

Why a plain object and not a Map? Maps are the "correct" structure for a key-value store in modern JS. Plain objects were chosen for two reasons: JSON serialization is trivial (relevant for Learning Mode display), and V8 optimizes plain objects heavily — property lookups on small-to-medium plain objects are faster than Map lookups due to hidden class optimization.

### `ExecutionStack[]`

An ordered array of human-readable strings describing each operation, generated incrementally during interpretation. This is the Learning Mode feed.

```javascript
ExecutionStack = [
  "x को 5 का मान दिया गया",
  "y को 3 का मान दिया गया",
  "z = x + y = 5 + 3 = 8",
  "अगर x > 3 — सत्य है",
  "दिखाए(z) → 8"
]
```

The strings are generated at execution time in the student's language where the construct is known (assignments, conditions, arithmetic). The UI replays this array at any pace — step-forward, step-backward, auto-play.

---

## 11. Learning Mode — Teaching the Engine, Not Just the Code

Most beginner programming tools show output. Kalaam shows **how the engine arrived at the output**.

### The pedagogical problem it solves

A student without a teacher cannot answer the question: "why did my program print 8?" They can see that it printed 8. They can't see the steps the interpreter took. They don't know variables are stored somewhere. They don't know arithmetic is evaluated step by step. They don't know conditions are checked at runtime against values that exist at that moment.

Learning Mode makes the interpreter's state visible. The student watches the machine work.

### Why the architecture supports this without extra cost

Learning Mode is not a "debug mode" that re-runs the program. It is a replay of `ExecutionStack[]` — a byproduct that the interpreter generates during normal execution. Every call to `AddtoExecutionStack()` appends one string. The interpreter does this regardless of whether Learning Mode is enabled in the UI.

Cost: one string append per meaningful operation. At 50-line programs, this adds negligible overhead.

### What gets recorded

Every meaningful operation generates an entry:

- **Variable assignment:** `"x को 5 का मान दिया गया"`
- **Variable update:** `"z को x + y = 5 + 3 = 8 का मान दिया"`
- **Condition true:** `"अगर x > 3 — सत्य है"`
- **Condition false:** `"अगर x > 10 — असत्य है, ब्लॉक छोड़ा"`
- **Loop iteration:** `"दुहराओ: i = 1"`
- **Function call:** `"रचना greet() को बुलाया"`
- **Print:** `"दिखाए(z) → 8"`

### The effect

A student who watches Learning Mode step through their first program learns:
- Variables are stored somewhere and have a value at each moment
- Arithmetic is evaluated step by step, left to right
- Conditions are checked at runtime against whatever value the variable holds at that instant
- Loops are just repetition of the same block

None of this is explicitly taught. The student discovers it by watching the trace. The machine demonstrates its own operation.

---

## 12. npm Package Design

### Why publish as a separate package at all?

The interpreter running inside the Kalaam PWA is embedded in the Quasar/Vue build. A school app, a chatbot, a game that wants to teach kids to code in Hindi could not embed the Kalaam interpreter without taking the entire frontend as a dependency.

Separating the interpreter from the frontend is the clean architecture move. The npm package `kalaam` contains only the interpreter. The frontend is a consumer, not the owner.

### Public API

```javascript
import { Compile } from 'kalaam';

const result = Compile(sourceCode, KalaamKeywords.Hindi);

// result = {
//   output: string,
//   ExecutionStack: string[],
//   isError: boolean,
//   TimeTaken: string
// }
```

One function. Pass source code as a string. Pass the keyword map for the target language. Receive the result object. No class instantiation, no builder pattern, no config object.

### Why language is a parameter, not a global

An earlier design stored `ActiveLanguage` in `localStorage` and read it inside the interpreter. This meant the interpreter had a side effect — it read from browser state. For an npm package meant to run anywhere (Node.js, browser, serverless), a dependency on `localStorage` is a portability violation.

The published package takes the keyword map as a parameter. The caller decides the language. The interpreter is stateless. This enables using multiple languages in one Node.js process, which is useful for test suites.

### Jest test suite — language-segregated

```
tests/
  Hindi/
    variables.test.js
    loops.test.js
    functions.test.js
    ...
  Marathi/
    variables.test.js
    ...
  Bengali/
    ...
```

Each language folder is a complete test of the language's behavior. When a new language is added, the test structure makes the coverage requirement explicit. A contributor cannot claim "Bengali is supported" without a `tests/Bengali/` folder with passing tests.

---

## 13. CodeMirror Integration — Syntax Highlighting Without a Library

The editor uses CodeMirror 5 with a custom `kalaam` syntax mode defined in `src/components/Kalaam.js`.

### Why CodeMirror 5 and not Monaco

Monaco is the editor inside VS Code. It is an excellent editor for desktop applications. Its bundle size is 3–5MB. For the Kalaam PWA, where the first-load experience on a 2GB RAM Android phone on a slow connection is the critical path, adding a 3–5MB JavaScript bundle for the editor alone is unacceptable.

CodeMirror 5 is approximately 300KB. It is designed to run in browsers, including mobile browsers. It has a well-documented mode API that supports forking existing modes — which is how the `kalaam` mode was built.

### Why CodeMirror 5 and not CodeMirror 6

CodeMirror 6 is a complete rewrite with a better architecture (Lezer parser, modular system). The `kalaam` mode was written when CM6 was in active development but not widely stable. CM6's syntax highlighting requires writing a Lezer grammar — a separate learning curve. CM5's mode API is a simpler function-based interface that could be extended in an afternoon.

### Custom mode — fork of JavaScript mode

The `kalaam` mode is a fork of CodeMirror's built-in JavaScript mode, modified to:
- Add all Hindi/Marathi/Bengali/Telugu/Odia keywords to the keyword table, classified by highlight type (keyword a/b/c/d)
- Register `wordChars` helper that recognizes Devanagari Unicode block characters as valid identifier characters — without this, CodeMirror would split words like `दिखाए` at non-ASCII character boundaries
- Register MIME types: `text/kalaam`, `application/kalaam`

```javascript
// wordChars patch for Devanagari Unicode block
CodeMirror.registerHelper("wordChars", "text/kalaam",
  /[ऀ-ॿঀ-৿ఀ-౿଀-୿]/
);
```

The result: students get real-time syntax highlighting in their language. Keywords glow like they do in VS Code.

---

## 14. V8 as the Execution Sandbox

### Why code runs in the browser, not on a server

The offline constraint made this non-negotiable. But even if offline weren't a constraint, V8 would be the right choice.

### What a server-side execution model would require

To execute student code on a server:
- A running server (EC2, App Engine, Heroku, etc.) — monthly cost regardless of usage
- A sandbox for code execution — Docker, gVisor, Firecracker, or a service like Judge0
- Network latency for the round-trip — even 200ms is felt on slow connections
- Failure modes: server down, network unreachable, sandbox CVEs

Judge0 specifically (a popular code execution API) had 3 CVEs published in April 2024 — symlink attacks and SSRF vulnerabilities. Depending on Judge0 for a school platform would mean accepting someone else's security patch timeline.

### What V8 gives for free

- **Sandboxing:** V8 is designed to run untrusted code. The browser's V8 instance is the same sandbox that runs every website's JavaScript. It has been hardened over 15 years by Google. Student code runs in the same security context as any web page.
- **Zero infrastructure cost:** The browser's V8 instance is provided by the device. Zero cost, scales to any number of students without additional infrastructure.
- **Zero latency:** No network hop. Code runs on the device. Time from submit to output is pure CPU time. On a mid-range Android, simple programs complete in under 5ms.
- **Offline by default:** The browser runs V8 regardless of network connectivity.

### Why this is not naive

Running student code in V8 does not mean running arbitrary JavaScript. The Kalaam interpreter receives source code in Hindi/Marathi/etc., translates it to a structured `tokens[]` array, and executes the tokens by calling pre-defined JavaScript functions. The student never writes JavaScript. The Kalaam runtime does not use `eval()`. Student code cannot access browser APIs, `window`, `document`, or any JavaScript globals. The interpreter's execution context is isolated by design.

---

## 15. Performance Analysis

### Execution time

Typical programs complete in under 5ms on a mid-range Android (Snapdragon 450, 3GB RAM):

| Program type | Typical execution time |
|---|---|
| Simple variable assignment + print | < 1ms |
| 10-iteration for loop with arithmetic | 1–3ms |
| Recursive function (10 levels) | 3–8ms |
| 100-iteration loop with array push | 5–15ms |

These are measured with `performance.now()` — the `TimeTaken` field in the result object is `(t1 - t0).toFixed(2) + "ms"`.

### Why no AST overhead matters on mobile

Building an AST requires allocating tree nodes on the heap. For a 20-line program with 50+ expressions, this means 50+ object allocations, a GC pause when they're freed, and a recursive traversal algorithm. On a desktop, this is imperceptible. On a 2GB RAM Android phone with a slower GC, it is measurable.

The flat token array is allocated once (one array push per token during Phase 3) and walked linearly. Linear array traversal is the most cache-friendly data access pattern in V8's memory model.

### Service Worker caching

All static assets — the Quasar bundle, CodeMirror, the interpreter — are cached by the service worker on first load. Subsequent visits require zero network requests. The first load on a 3G connection takes approximately 5–10 seconds (depending on bundle size). Every subsequent visit loads from disk cache in under 1 second.

---

## 16. Known Gaps and Honest Limitations

### Language and parser gaps

| Scenario | Status | Why |
|---|---|---|
| Error recovery | **Not implemented** | Parser stops at first error. No partial execution, no recovery. A production language would recover and report multiple errors in one pass. |
| Precise error messages | **Basic** | Errors report "something went wrong" rather than a specific line number and column. The flat token array loses source position information after Phase 3. |
| Closures | **Not supported** | Functions cannot capture outer scope variables. The `functionContextmemory{}` is created fresh on each function call. |
| Recursion depth | **Limited** | No explicit stack limit is enforced. Deep recursion (>100 levels) will cause a JavaScript call stack overflow via the interpreter's own recursion. |
| Complex expressions | **Limited** | Operator precedence for nested arithmetic (e.g., `(a + b) * c + d`) depends on pre-parsing logic in AdvancedTypeChecking. Complex grouped expressions may not parse correctly. |
| Cross-language Unicode | **Not tested** | Scripts mixing Devanagari and Bengali characters in identifiers are not validated. The keyword substitution step would fail to match them. |

### Technical debt

1. **JavaScript CodeMirror mode uses regex for Unicode ranges:** The `wordChars` helper uses a hardcoded Unicode range for Devanagari. Bengali and Telugu script ranges are added but not exhaustively tested across all edge cases.

2. **`ActiveLangugaeKeywords` typo in variable name:** The misspelled variable name (`ActiveLangugaeKeywords` instead of `ActiveLanguageKeywords`) is present throughout the codebase and in the published npm package API. Fixing it would be a semver major breaking change.

3. **Keyword substitution is string replacement, not token-aware:** `SourceDataReplaceforEasyParsing()` uses string `.replace()`. If a student uses a language keyword as part of a string value (e.g., `name = "अगर"`), the substitution would incorrectly replace it. The fix requires scanning for quoted strings and excluding them from substitution.

4. **No debugger or breakpoints:** Learning Mode is a post-execution replay. There is no way to pause mid-execution, inspect memory, or step through a live run. For the target audience, this is acceptable; for advanced students, it would be limiting.

5. **Vue 2 end-of-life:** Vue 2 reached end of life in December 2023. The frontend is on a deprecated framework. Migration to Vue 3 would be a significant frontend rewrite.
