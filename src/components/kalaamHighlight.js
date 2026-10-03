// Lightweight syntax highlighting for Kalaam code shown outside CodeMirror
// (the Home sample, Examples, Documentation). Colours come from the
// --k-code-* tokens in src/styles/kalaam.css.

import { KalaamKeywords } from '../kalaam/Compiler/main';

const KEYWORD_FIELDS = ['Print', 'Input', 'If', 'For', 'While', 'Length', 'Push', 'Function'];

// Keywords from every language, plus the Hindi loop particles and else words.
const KEYWORDS = new Set(['को', 'मे', 'वरना', 'अन्यथा']);
Object.values(KalaamKeywords).forEach((language) => {
  KEYWORD_FIELDS.forEach((field) => KEYWORDS.add(language[field]));
});

const TOKEN = /(#[^\n]*)|("[^"\n]*"?|'[^'\n]*'?)|(\d+(?:\.\d+)?)|([\p{L}\p{M}_][\p{L}\p{M}\p{N}_]*)|([=+\-*/<>!%&|]+)|([\s\S])/gu;

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlight(source) {
  return source.replace(TOKEN, (match, comment, str, num, word, op) => {
    const text = escapeHtml(match);
    if (comment) return `<span class="tok-comment">${text}</span>`;
    if (str) return `<span class="tok-string">${text}</span>`;
    if (num) return `<span class="tok-number">${text}</span>`;
    if (word) return KEYWORDS.has(word) ? `<span class="tok-keyword">${text}</span>` : text;
    if (op) return `<span class="tok-operator">${text}</span>`;
    return text;
  });
}

// One span per line so CSS counters can number them. The newlines stay in the
// text, so el.textContent is exactly the original source.
export function highlightLines(source) {
  return source
    .split('\n')
    .map((line) => `<span class="k-line">${highlight(line)}</span>`)
    .join('\n');
}

// v-kalaam-code: turns a static <pre> of Kalaam source into a highlighted,
// line-numbered block. Read the code back with el.textContent, not innerHTML.
export const kalaamCode = {
  inserted(el) {
    const source = el.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
    el.innerHTML = highlightLines(source);
    el.classList.add('k-codeblock');
  },
};
