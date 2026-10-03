// Generated on 2026-10-03 by running every program once through the vendored
// interpreter (src/kalaam) BEFORE any fix. Each expectation is what Kalaam
// printed at that moment, quirks included. Rows marked "// quirk, plan item X"
// are expected to change when that item of INTERPRETER_PLAN.md lands; update
// them deliberately, together with the fix.
// Every program runs inside a vm timeout (see helpers.js): a loop that never
// ends comes back as 'HANG' instead of freezing the test run.
import { run, silenceConsole } from './helpers';

silenceConsole();
jest.setTimeout(20000);

const cases = [
  ["while basic", "i=0\nजबतक(i<3)\n{\nदिखाए(i)\ni=i+1\n}", {"out":["0","1","2"],"isError":false}],
  ["while spaces", "i = 0\nजबतक (i < 3)\n{\nदिखाए(i)\ni = i + 1\n}", 'HANG'], // quirk, plan item C, then A
  ["while false", "जबतक(1>2)\n{\nदिखाए(1)\n}\nदिखाए(\"end\")", {"out":[" end"],"isError":false}], // quirk, plan item F
  ["while with var limit", "n=2\ni=0\nजबतक(i<n)\n{\ni=i+1\n}\nदिखाए(i)", {"out":["2"],"isError":false}],
];

test.each(cases)('%s', (name, src, expected) => {
  expect(run(src)).toEqual(expected);
});
