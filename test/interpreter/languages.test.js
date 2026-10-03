// Generated on 2026-10-03 by running every program once through the vendored
// interpreter (src/kalaam) BEFORE any fix. Each expectation is what Kalaam
// printed at that moment, quirks included. Rows marked "// quirk, plan item X"
// are expected to change when that item of INTERPRETER_PLAN.md lands; update
// them deliberately, together with the fix.
import { run, silenceConsole } from './helpers';

silenceConsole();

// [name, source, language, expected]. Order matters: the Hindi rows run after
// the other languages to prove no language state leaks between runs.
const cases = [
  ["Marathi print number", "दाखवा(1)", "Marathi", {"out":[],"isError":false}], // quirk, plan item D
  ["Bengali print number", "দেখাও(1)", "Bengali", {"out":[],"isError":false}], // quirk, plan item D
  ["Telugu print number", "చూపించు(1)", "Telugu", {"out":[],"isError":false}], // quirk, plan item D
  ["Odia print number", "ଦେଖାଅ(1)", "Odia", {"out":[],"isError":false}], // quirk, plan item D
  ["Hindi after other languages", "दिखाए(1)", "Hindi", {"out":["1"],"isError":false}],
  ["Marathi print string", "दाखवा(\"नमस्कार\")", "Marathi", {"out":[],"isError":false}], // quirk, plan item D
  ["Marathi print variable", "a=5\nदाखवा(a)", "Marathi", {"out":[],"isError":false}], // quirk, plan item D
  ["Marathi for loop", "दुहराओ i को (1,3) मे\n{\nदाखवा(i)\n}", "Marathi", {"out":[],"isError":false}], // quirk, plan item D
  ["Marathi if", "a=5\nजर(a>3)\n{\nदाखवा(a)\n}", "Marathi", {"out":[],"isError":false}], // quirk, plan item D
  ["Hindi again at the end", "a=2\nदिखाए(a)", "Hindi", {"out":["2"],"isError":false}],
];

test.each(cases)('%s', (name, src, lang, expected) => {
  expect(run(src, { lang })).toEqual(expected);
});
