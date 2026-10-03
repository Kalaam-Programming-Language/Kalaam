// Generated on 2026-10-03 by running every program once through the vendored
// interpreter (src/kalaam) BEFORE any fix. Each expectation is what Kalaam
// printed at that moment, quirks included. Rows marked "// quirk, plan item X"
// are expected to change when that item of INTERPRETER_PLAN.md lands; update
// them deliberately, together with the fix.
import { run, silenceConsole } from './helpers';

silenceConsole();

// [name, source, expected, options]
const cases = [
  ["print number", "दिखाए(5)", {"out":["5"],"isError":false}],
  ["print string", "दिखाए(\"नमस्ते\")", {"out":["नमस्ते"],"isError":false}],
  ["print var", "a=5\nदिखाए(a)", {"out":["5"],"isError":false}],
  ["print expr direct", "दिखाए(2+3)", {"out":["5"],"isError":false}],
  ["print var expr direct", "a=2\nb=3\nदिखाए(a+b)", {"out":["5"],"isError":false}],
  ["print two args", "a=2\nदिखाए(a, 3)", {"out":["a, 3"],"isError":false}],
  ["print concat str+num", "a=5\nदिखाए(\"a is \" + a)", {"out":["a is  5"],"isError":false}], // unchanged by A on purpose: print lines keep their spaces (see DataCleaning.js)
  ["spaces around =", "a = 5\nदिखाए(a)", {"out":["5"],"isError":false}],
  ["spaces in arithmetic", "a=2\nb=3\nc=a + b\nदिखाए(c)", {"out":["5"],"isError":false}],
  ["spaces in multiply", "a=2\nb=3\nc=a * b\nदिखाए(c)", {"out":["6"],"isError":false}],
  ["precedence", "c=2+3*4\nदिखाए(c)", {"out":["14"],"isError":false}],
  ["parens", "c=(2+3)*4\nदिखाए(c)", {"out":["20"],"isError":false}],
  ["subtract", "c=10-4\nदिखाए(c)", {"out":["6"],"isError":false}],
  ["divide", "c=10/4\nदिखाए(c)", {"out":["2.5"],"isError":false}],
  ["modulo", "c=10%3\nदिखाए(c)", {"out":["1"],"isError":false}],
  ["power **", "c=2**3\nदिखाए(c)", {"out":["8"],"isError":false}],
  ["negative literal", "c=-5\nदिखाए(c)", {"out":["-5"],"isError":false}],
  ["negative result", "c=3-5\nदिखाए(c)", {"out":["-2"],"isError":false}],
  ["decimal", "c=1.5+1.5\nदिखाए(c)", {"out":["3"],"isError":false}],
  ["divide by zero", "c=5/0\nदिखाए(c)", {"out":["Line 1: cannot divide by zero"],"isError":true}],
  ["reassign", "a=1\na=a+1\nदिखाए(a)", {"out":["2"],"isError":false}],
  ["var with digit", "a1=5\nदिखाए(a1)", {"out":["Line 1: 'a1' समझ नहीं आया"],"isError":true}], // quirk, plan item H3
  ["var underscore", "my_var=5\nदिखाए(my_var)", {"out":["Line 1: 'my_var' समझ नहीं आया"],"isError":true}], // quirk, plan item H3
  ["devanagari digits", "a=५\nदिखाए(a)", {"out":["5"],"isError":false}],
  ["string with spaces", "a=\"hello world\"\nदिखाए(a)", {"out":["hello world"],"isError":false}],
  ["single quotes", "a='hi'\nदिखाए(a)", {"out":["hi"],"isError":false}],
  ["string with keyword inside", "a=\"अगर यह चले\"\nदिखाए(a)", {"out":["अगर यह चले"],"isError":false}],
  ["string with = inside", "a=\"x=1\"\nदिखाए(a)", {"out":["x=1"],"isError":false}],
  ["string concat two vars", "a=\"नम\"\nb=\"स्ते\"\nदिखाए(a+b)", {"out":["नमस्ते"],"isError":false}],
  ["string length", "a=\"hello\"\nदिखाए(a.संख्या())", {"out":[],"isError":false}],
  ["string index", "a=\"hello\"\nदिखाए(a[1])", {"out":[],"isError":false}],
  ["num + str", "a=5\nb=\"x\"\nc=a+b\nदिखाए(c)", {"out":["Line 3: cannot calculate 'a+b'"],"isError":true}],
  ["boolean compare print", "दिखाए(5>3)", {"out":[],"isError":false}],
  ["compare to var", "a=5\nb=a>3\nदिखाए(b)", {"out":["Line 2: 'a>3' समझ नहीं आया","Assignment error in \"b = \""],"isError":true}], // booleans are not values (plan J)
  // plan items A, B and I-digits (string-aware cleaning pre-pass)
  ["A: spaces in literal arithmetic", "c=2 + 3\nदिखाए(c)", {"out":["5"],"isError":false}],
  ["A: spaces around %", "a=2\nb=a % 2\nदिखाए(b)", {"out":["0"],"isError":false}],
  ["A: negative literal with spaces", "c = -5\nदिखाए(c)", {"out":["-5"],"isError":false}],
  ["A: comma with space in a call", "रचना f(a,b)\n{\nदिखाए(a+b)\n}\nf(2, 3)", {"out":["5"],"isError":false}],
  ["A: comma with space in an array", "a=[1, 2, 3]\nदिखाए(a)", {"out":["[1,2,3]"],"isError":false}],
  ["A: print keeps its spaces (joins with a space)", "a=2\nb=3\nदिखाए(a + b)", {"out":["2 3"],"isError":false}],
  ["B: keyword inside a string", "a=\"मेरा अगर\"\nदिखाए(a)", {"out":["मेरा अगर"],"isError":false}],
  ["B: keyword fragment inside a word in a string", "a=\"आपको जरूर\"\nदिखाए(a)", {"out":["आपको जरूर"],"isError":false}],
  ["I: Devanagari digits in arithmetic", "x=१०+५\nदिखाए(x)", {"out":["15"],"isError":false}],
  ["I: Devanagari digit printed", "दिखाए(२)", {"out":["2"],"isError":false}],
  ["comment line", "# टिप्पणी\nदिखाए(1)", {"out":["1"],"isError":false}],
  ["trailing comment", "दिखाए(1) # टिप्पणी", {"out":["1"],"isError":false}],
  ["blank lines", "\n\na=1\n\nदिखाए(a)\n\n", {"out":["1"],"isError":false}],
  ["trailing spaces", "a=1   \nदिखाए(a)   ", {"out":["1"],"isError":false}],
  ["tab indent", "अगर(1<2)\n{\n\tदिखाए(1)\n}", {"out":["1"],"isError":false}],
  ["CRLF", "a=1\r\nदिखाए(a)\r\n", {"out":["1"],"isError":false}],
  ["empty program", "", {"out":[],"isError":false}],
  ["if true", "अगर(5>3)\n{\nदिखाए(\"हाँ\")\n}", {"out":["हाँ"],"isError":false}],
  ["if false no else", "अगर(5<3)\n{\nदिखाए(\"हाँ\")\n}\nदिखाए(\"बाद\")", {"out":["बाद"],"isError":false}],
  ["if else वरना", "अगर(5<3)\n{\nदिखाए(\"हाँ\")\n}\nवरना\n{\nदिखाए(\"नहीं\")\n}", {"out":["नहीं"],"isError":false}],
  ["if else अन्यथा", "अगर(5<3)\n{\nदिखाए(\"हाँ\")\n}\nअन्यथा\n{\nदिखाए(\"नहीं\")\n}", {"out":["नहीं"],"isError":false}],
  ["if ==", "a=5\nअगर(a==5)\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if single =", "a=5\nअगर(a=5)\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}], // quirk, plan item I
  ["if string ==", "a=\"x\"\nअगर(a==\"x\")\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if and &&", "a=5\nअगर(a>1 && a<10)\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if or ||", "a=5\nअगर(a<1 || a==5)\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if space before brace", "अगर (5>3)\n{\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if brace same line", "अगर(5>3) {\nदिखाए(\"ok\")\n}", {"out":["ok"],"isError":false}],
  ["if no braces", "अगर(5>3)\nदिखाए(\"ok\")", {"out":["ok"],"isError":false}], // quirk, plan item I
  ["nested if", "अगर(1<2)\n{\nअगर(2<3)\n{\nदिखाए(\"in\")\n}\n}", {"out":["in"],"isError":false}],
  ["if inside for", "दुहराओ i को (1,5) मे\n{\nअगर(i==3)\n{\nदिखाए(i)\n}\n}", {"out":["3"],"isError":false}],
  ["else-if chain", "a=2\nअगर(a==1)\n{\nदिखाए(1)\n}\nवरना अगर(a==2)\n{\nदिखाए(2)\n}", {"out":["2"],"isError":false}],
  ["for basic", "दुहराओ i को (1,3) मे\n{\nदिखाए(i)\n}", {"out":["1","2","3"],"isError":false}],
  ["for var bounds", "n=3\nदुहराओ i को (1,n) मे\n{\nदिखाए(i)\n}", {"out":["1","2","3"],"isError":false}],
  ["for expr bound", "n=3\nदुहराओ i को (1,n-1) मे\n{\nदिखाए(i)\n}", {"out":[],"isError":false}],
  ["for countdown", "दुहराओ i को (3,1) मे\n{\nदिखाए(i)\n}", {"out":[],"isError":false}],
  ["for zero start", "दुहराओ i को (0,2) मे\n{\nदिखाए(i)\n}", {"out":["0","1","2"],"isError":false}],
  ["for accumulate", "s=0\nदुहराओ i को (1,4) मे\n{\ns=s+i\n}\nदिखाए(s)", {"out":["10"],"isError":false}],
  ["for over string", "a=\"abc\"\nदुहराओ x को a मे\n{\nदिखाए(a[x])\n}", {"out":[],"isError":false}],
  ["nested for", "दुहराओ i को (1,2) मे\n{\nदुहराओ j को (1,2) मे\n{\nदिखाए(i*j)\n}\n}", {"out":["1","2","2","4"],"isError":false}],
  ["for no spaces", "दुहराओ i को(1,3)मे\n{\nदिखाए(i)\n}", {"out":["Line 3: '(i)' समझ नहीं आया"],"isError":true}], // मे glued to the range: the header swallows दिखाए, so the error lands on (i)
  ["for with spaces in range", "दुहराओ i को (1, 3) मे\n{\nदिखाए(i)\n}", {"out":["1","2","3"],"isError":false}],
  ["function basic", "रचना जोड़(a,b)\n{\nदिखाए(a+b)\n}\nजोड़(2,3)", {"out":["5"],"isError":false}],
  ["function return", "रचना जोड़(a,b)\n{\nवापस a+b\n}\nc=जोड़(2,3)\nदिखाए(c)", {"out":["जोड़"],"isError":false}],
  ["function no params", "रचना hi()\n{\nदिखाए(\"hi\")\n}\nhi()", {"out":["hi"],"isError":false}],
  ["function twice", "रचना hi(x)\n{\nदिखाए(x)\n}\nhi(1)\nhi(2)", {"out":["1","2"],"isError":false}],
  ["function sees global", "g=7\nरचना f()\n{\nदिखाए(g)\n}\nf()", {"out":["7"],"isError":false}],
  ["call undefined fn", "foo(1)", {"out":["Line 1: 'foo(1)' समझ नहीं आया"],"isError":true}],
  ["array literal print", "a=[1,2,3]\nदिखाए(a)", {"out":["[1,2,3]"],"isError":false}],
  ["array index", "a=[1,2,3]\nदिखाए(a[0])", {"out":[],"isError":false}],
  ["array length", "a=[1,2,3]\nदिखाए(a.संख्या())", {"out":[],"isError":false}],
  ["array push", "a=[1]\na.पुश(2)\nदिखाए(a.संख्या())", {"out":[],"isError":false}],
  ["array index var", "a=[10,20]\ni=1\nदिखाए(a[i])", {"out":[],"isError":false}],
  ["array for", "a=[5,6]\nदुहराओ x को a मे\n{\nदिखाए(a[x])\n}", {"out":[],"isError":false}],
  ["array assign index", "a=[1,2]\na[0]=9\nदिखाए(a[0])", {"out":[],"isError":false}],
  ["array of strings", "a=[\"x\",\"y\"]\nदिखाए(a[1])", {"out":[],"isError":false}],
  ["undefined var", "दिखाए(b)", {"out":["Line 1: 'b' is not defined"],"isError":true}],
  ["typo keyword", "दिखाओ(1)", {"out":["Line 1: 'दिखाओ(1)' समझ नहीं आया"],"isError":true}],
  ["english print", "print(1)", {"out":["Line 1: 'print(1)' समझ नहीं आया"],"isError":true}],
  ["missing close paren", "दिखाए(1", {"out":["1"],"isError":false}],
  ["missing close brace", "अगर(1<2)\n{\nदिखाए(1)", {"out":["1"],"isError":false}],
  ["extra close brace", "दिखाए(1)\n}", {"out":["1"],"isError":false}],
  ["unclosed string", "दिखाए(\"hi)", {"out":["hi"],"isError":false}],
  ["assign keyword", "अगर=5", {"out":[],"isError":false}],
  ["uppercase var mismatch", "Abc=1\nदिखाए(abc)", {"out":["Line 2: 'abc' is not defined"],"isError":true}],
  ["marathi kw in hindi mode", "दाखवा(1)", {"out":["Line 1: 'दाखवा(1)' समझ नहीं आया"],"isError":true}],
  ["input call", "इनपुट(x)\nदिखाए(x)", {"out":["7"],"isError":false}, { inputs: ["7"] }],
  ["print no parens", "दिखाए 5", {"out":["5"],"isError":false}],
  ["semicolon", "a=5;\nदिखाए(a)", {"out":["5"],"isError":false}],
  ["two stmts one line", "a=5 b=6", {"out":[],"isError":false}],
];

// Rest parameter on purpose: Jest treats a declared parameter beyond the row
// length as a done() callback, and most rows have no options.
test.each(cases)('%s', (name, src, expected, ...options) => {
  expect(run(src, options[0])).toEqual(expected);
});
