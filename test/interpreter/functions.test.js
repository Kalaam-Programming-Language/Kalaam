// Plan item E: each function call gets its own context. The shared
// functionContextmemory used to keep every earlier call's arguments, so
// f(1) then f(2) printed 1, 1, 2.
import { run, silenceConsole } from './helpers';

silenceConsole();

const F = 'रचना f(x)\n{\nदिखाए(x)\n}\n';

const cases = [
  ['two calls', `${F}f(1)\nf(2)`, ['1', '2']],
  ['same value twice', `${F}f(1)\nf(1)`, ['1', '1']],
  ['three calls', `${F}f(1)\nf(2)\nf(3)`, ['1', '2', '3']],
  ['two different functions', `${F}रचना g(y)\n{\nदिखाए(y)\n}\nf(1)\ng(2)\nf(3)`, ['1', '2', '3']],
  ['reads a global on every call', `g=7\nरचना f(x)\n{\nदिखाए(g)\nदिखाए(x)\n}\nf(1)\nf(2)`, ['7', '1', '7', '2']],
  ['variable then literal argument', `a=3\n${F}f(a)\nf(4)`, ['3', '4']],
  ['two parameters, two calls', 'रचना जोड़(a,b)\n{\nदिखाए(a+b)\n}\nजोड़(2,3)\nजोड़(4,5)', ['5', '9']],
];

test.each(cases)('%s', (name, src, out) => {
  expect(run(src)).toEqual({ out, isError: false });
});
