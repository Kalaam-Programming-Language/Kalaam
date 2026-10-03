// Plan items H and I: mistakes a student makes come back as Kalaam errors
// with a line number instead of printing nothing (or a JavaScript exception).
import { run, silenceConsole } from './helpers';

silenceConsole();

const err = (...messages) => ({ out: messages, isError: true });

const cases = [
  // H2: undefined variables
  ['print an undefined variable', 'दिखाए(zzz)', err("Line 1: 'zzz' is not defined")],
  ['undefined variable in a calculation', 'a=1\nc=a+zzz\nदिखाए(c)', err("Line 2: 'zzz' is not defined")],
  ['undefined variable inside a loop is reported once', 'दुहराओ i को (1,3) मे\n{\nदिखाए(q)\n}', err("Line 3: 'q' is not defined")],
  // H2/H4: division by zero (eval gives Infinity or NaN instead of failing)
  ['divide by zero in an assignment', 'c=5/0\nदिखाए(c)', err('Line 1: cannot divide by zero')],
  ['divide by zero with spaces', 'c = 5 / 0\nदिखाए(c)', err('Line 1: cannot divide by zero')],
  ['divide by a variable that is zero', 'a=0\nc=5/a\nदिखाए(c)', err('Line 2: cannot divide by zero')],
  ['zero divided by zero', 'c=0/0\nदिखाए(c)', err('Line 1: cannot divide by zero')],
  ['divide by zero printed directly', 'दिखाए(5/0)', err('Line 1: cannot divide by zero')],
  ['modulo by zero', 'a=5\nदिखाए(a%0)', err('Line 2: cannot divide by zero')],
  // H1: words the scanner does not understand
  ['typo in a keyword', 'दिखाओ(1)', err("Line 1: 'दिखाओ(1)' समझ नहीं आया")],
  ['English keyword', 'print(1)', err("Line 1: 'print(1)' समझ नहीं आया")],
  ['undefined function', 'foo(1)', err("Line 1: 'foo(1)' समझ नहीं आया")],
  ['unknown word on a later line', 'a=1\nदिखाए(a)\nshow(a)', err("Line 3: 'show(a)' समझ नहीं आया")],
  // correct programs stay quiet
  ['function reads its argument and a global', 'x=10\nरचना f(a)\n{\nदिखाए(a)\nदिखाए(x)\n}\nf(2)', { out: ['2', '10'], isError: false }],
  ['tab before a statement', 'अगर(1<2)\n{\n\tदिखाए(1)\n}', { out: ['1'], isError: false }],
];

test.each(cases)('%s', (name, src, expected) => {
  expect(run(src)).toEqual(expected);
});
