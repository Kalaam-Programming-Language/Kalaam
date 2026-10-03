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
  ["while spaces", "i = 0\nजबतक (i < 3)\n{\nदिखाए(i)\ni = i + 1\n}", {"out":["0","1","2"],"isError":false}],
  ["while false", "जबतक(1>2)\n{\nदिखाए(1)\n}\nदिखाए(\"end\")", {"out":["end"],"isError":false}],
  ["while with var limit", "n=2\ni=0\nजबतक(i<n)\n{\ni=i+1\n}\nदिखाए(i)", {"out":["2"],"isError":false}],
];

test.each(cases)('%s', (name, src, expected) => {
  expect(run(src)).toEqual(expected);
});

// Plan item C: a condition that never turns false stops with an error.
const LOOP_GUARD = 'जबतक loop ran 100000 times and the condition never became false. Check the line that changes the variable.';

test('loop guard: a जबतक that never increments returns within 5s', () => {
  const start = Date.now();
  const r = run('i=0\nजबतक(i<3)\n{\nदिखाए(i)\n}', { timeout: 5000 });
  expect(Date.now() - start).toBeLessThan(5000);
  expect(r).toEqual({ out: [LOOP_GUARD], isError: true });
});

test('loop guard: an empty body that never changes the variable', () => {
  expect(run('i=0\nजबतक(i<3)\n{\n}', { timeout: 5000 })).toEqual({ out: [LOOP_GUARD], isError: true });
});

// Plan item H3: the condition's variable extractor keeps names with digits
// and underscores whole (it used to cut i1 down to i).
test('while over a name with a digit', () => {
  expect(run('i1=0\nजबतक(i1<3)\n{\nदिखाए(i1)\ni1=i1+1\n}')).toEqual({ out: ['0', '1', '2'], isError: false });
});

test('while with an underscore name as the limit', () => {
  expect(run('n_max=2\ni=0\nजबतक(i<n_max)\n{\ni=i+1\n}\nदिखाए(i)')).toEqual({ out: ['2'], isError: false });
});
