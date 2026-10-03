// Shared runner for the interpreter regression suite.
//
// Every program goes through run(): it stubs prompt() (इनपुट calls the
// browser's prompt directly), silences the interpreter's console.log noise,
// and runs Compile inside a vm timeout so a program that loops forever is
// reported as 'HANG' instead of freezing Jest.
import vm from 'vm';
import { Compile, KalaamKeywords } from '../../src/kalaam/Compiler/main';

export function silenceConsole() {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterAll(() => {
    console.log.mockRestore();
  });
}

// Returns { out, isError } for a normal run, 'HANG' when the program does
// not finish within `timeout` ms, 'UNDEFINED' when Compile returns nothing,
// or { thrown } when Compile throws.
export function compile(src, { lang = 'Hindi', inputs = [], timeout = 3000 } = {}) {
  const queue = inputs.slice();
  global.prompt = () => (queue.length ? String(queue.shift()) : '5');
  let r;
  try {
    r = vm.runInNewContext('run()', { run: () => Compile(src, KalaamKeywords[lang]) }, { timeout });
  } catch (e) {
    if (/timed out/.test(String(e && e.message))) return { hang: true };
    return { thrown: String(e && e.message) };
  }
  return { result: r };
}

export function run(src, opts) {
  const { hang, thrown, result } = compile(src, opts);
  if (hang) return 'HANG';
  if (thrown !== undefined) return { thrown };
  if (result === undefined) return 'UNDEFINED';
  return { out: result.linebylineOutput, isError: result.isError };
}

// The Learning-mode trace, made plain JSON so it can be compared with a fixture.
export function stackOf(src, opts) {
  const { result } = compile(src, opts);
  return result ? JSON.parse(JSON.stringify(result.ExecutionStack)) : null;
}
