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
  ["Marathi print number", "दाखवा(1)", "Marathi", {"out":["1"],"isError":false}],
  ["Bengali print number", "দেখাও(1)", "Bengali", {"out":["1"],"isError":false}],
  ["Telugu print number", "చూపించు(1)", "Telugu", {"out":["1"],"isError":false}],
  ["Odia print number", "ଦେଖାଅ(1)", "Odia", {"out":["1"],"isError":false}],
  ["Hindi after other languages", "दिखाए(1)", "Hindi", {"out":["1"],"isError":false}],
  ["Marathi print string", "दाखवा(\"नमस्कार\")", "Marathi", {"out":["नमस्कार"],"isError":false}],
  ["Marathi print variable", "a=5\nदाखवा(a)", "Marathi", {"out":["5"],"isError":false}],
  ["Marathi for loop", "दुहराओ i को (1,3) मे\n{\nदाखवा(i)\n}", "Marathi", {"out":["1","2","3"],"isError":false}],
  ["Marathi if", "a=5\nजर(a>3)\n{\nदाखवा(a)\n}", "Marathi", {"out":["5"],"isError":false}],
  ["Marathi while loop", "i=0\nजोपर्यंत(i<3)\n{\nदाखवा(i)\ni=i+1\n}", "Marathi", {"out":["0","1","2"],"isError":false}],
  ["Marathi Devanagari variable name", "नाव=\"राम\"\nदाखवा(नाव)", "Marathi", {"out":["राम"],"isError":false}],
  ["Bengali print variable", "a=5\nদেখাও(a)", "Bengali", {"out":["5"],"isError":false}],
  ["Bengali print string", "দেখাও(\"হ্যালো\")", "Bengali", {"out":["হ্যালো"],"isError":false}],
  ["Telugu print variable", "a=5\nచూపించు(a)", "Telugu", {"out":["5"],"isError":false}],
  ["Odia print variable", "a=5\nଦେଖାଅ(a)", "Odia", {"out":["5"],"isError":false}],
  ["Marathi keyword in Hindi mode", "दाखवा(1)", "Hindi", {"out":[],"isError":false}], // quirk, plan item H1
  ["Hindi again at the end", "a=2\nदिखाए(a)", "Hindi", {"out":["2"],"isError":false}],
];

test.each(cases)('%s', (name, src, lang, expected) => {
  expect(run(src, { lang })).toEqual(expected);
});
