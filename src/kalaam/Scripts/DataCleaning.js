import { ActiveLangugaeKeywords } from '../Compiler/constants';

//A string literal on one line, in double or single quotes. Text inside quotes is never normalised or padded,
//so a keyword or an operator inside a string stays exactly as the user typed it.
const QuotedString = /("[^"\n]*"|'[^'\n]*')/;

const DevanagariDigits = '०१२३४५६७८९';

//Normalises the code between string literals so it splits into the same words as the no-space form.
//isPrintLine: on a print line the spaces are left alone, because the print of a concatenation already
//uses them: दिखाए(x + अक्षर) joins the parts with a space, दिखाए(x+अक्षर) calculates.
function NormaliseCode(code, keywords, isPrintLine) {
  //Devanagari digits: ५ becomes 5
  code = code.replace(/[०-९]/g, (digit) => String(DevanagariDigits.indexOf(digit)));

  if (!isPrintLine) {
    //c=a + b becomes c=a+b, so an expression stays one word when the program is split on spaces
    code = code.replace(/[ \t]*([+\-*\/%])[ \t]*/g, '$1');

    //(1, 3) becomes (1,3)
    code = code.replace(/[ \t]*,[ \t]*/g, ',');
  }

  keywords.forEach((kw) => {
    var regex = new RegExp(kw, 'g');

    code = code.replace(regex, ` ${kw} `);
  });

  code = code.replace(/\को/g, 'को ');
  code = code.replace(/\मे{/g, 'मे {');
  code = code.replace(/\अगर/g, 'अगर ');
  code = code.replace(/\जर/g, 'जर ');

  return code;
}

function SourceDataReplaceforEasyParsing(data) {
  let _AK = ActiveLangugaeKeywords;
  let keywords = [
    _AK.Print, //Still have to change this manually where REGEX are implemented
    _AK.If,
    _AK.For,
    _AK.While,
    _AK.Function,
  ];

  //Line by line; split() with a capturing group keeps the strings: even indexes are code, odd indexes are string literals
  data = data
    .split('\n')
    .map((line) => {
      let parts = line.split(QuotedString);
      let isPrintLine = parts.some((part, index) => index % 2 === 0 && part.includes(_AK.Print));

      return parts.map((part, index) => (index % 2 === 0 ? NormaliseCode(part, keywords, isPrintLine) : part)).join('');
    })
    .join('\n');

  // data = data.replace(/दिखाए/g, ' दिखाए ');
  // data = data.replace(/দেখাও/g, ' দেখাও ');

  // data = data.replace(/दाखवा/g, ' दाखवा ');
  data = data.replace(/\( /g, '(');
  // data = data.replace(/\)/g, ' )');
  //  data = data.replace(/\+ /g, '+');
  data = data.replace(/\= "/g, '="');
  data = data.replace(/\= '/g, "='");

  // data = data.replace(/\जबतक/g, 'जबतक ');
  // data = data.replace(/\जोपर्यंत/g, 'जोपर्यंत ');
  // data = data.replace(/\अन्यथा{/g, 'अन्यथा {');

  data = data.replace(/\[ /g, '[');
  data = data.replace(/\)}/g, ') }');
  data = data.replace(/\){/g, ') {');
  data = data.replace(/\}}/g, '} }');
  data = data.replace(/(?:\r\n|\r|\n)/g, ' ');
  // data = data.replace(/\==/g, ' == ');

  //preparing data for easy parsing by handling new lines, enters etc.

  data = data.replace(/(;|\n|\r|' '| '| ")/gm, '').split(' ');

  return data;
}

export { SourceDataReplaceforEasyParsing };
