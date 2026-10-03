// Plan item G: Compile must never return undefined. The UI destructures the
// result, so an internal exception used to become a TypeError in the page.
import { Compile, KalaamKeywords } from '../../src/kalaam/Compiler/main';
import { run, silenceConsole } from './helpers';

silenceConsole();

const FRIENDLY = 'Kalaam could not run this program. Check your code for a mistake on the line where it stops.';

function expectErrorShape(r) {
  expect(r).toEqual({
    isError: true,
    output: '',
    linebylineOutput: [FRIENDLY],
    error: [FRIENDLY],
    ExecutionStack: [],
    TimeTaken: '',
    LastConditionValue: [],
    OperationObjects: [],
  });
}

test('an internal exception returns an error result, not undefined', () => {
  // A non-string source throws on the first .replace() inside Compile.
  expectErrorShape(Compile(undefined, KalaamKeywords.Hindi));
});

// The trigger named in the plan, a while loop over an undefined variable, is
// caught by interpretToken's own try/catch and never reached the outer catch:
// it returns a normal (empty) result, which stays locked here.
test('जबतक over an undefined variable returns a result', () => {
  expect(run('जबतक(x<3)\n{\n}')).toEqual({ out: [], isError: false });
});

// The real browser trigger before plan item D: with Marathi selected when the
// page loads, isVariable had no regex for Marathi and threw on the first
// Devanagari word, so every Marathi program returned undefined.
test('Marathi selected at page load runs', () => {
  localStorage.setItem('ActiveLangugae', 'Marathi');
  try {
    // constants.js reads localStorage once, at import: load a fresh copy.
    jest.resetModules();
    const fresh = require('../../src/kalaam/Compiler/main');
    expect(fresh.Compile('दाखवा(1)', fresh.KalaamKeywords.Marathi).linebylineOutput).toEqual(['1']);
  } finally {
    localStorage.removeItem('ActiveLangugae');
  }
});
