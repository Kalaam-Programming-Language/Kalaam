import { ActiveLangugaeKeywords } from '../Compiler/constants';

function SourceDataReplaceforEasyParsing(data) {
  let _AK = ActiveLangugaeKeywords;
  let keywords = [
    _AK.Print, //Still have to change this manually where REGEX are implemented
    _AK.If,
    _AK.For,
    _AK.While,
    _AK.Function,
  ];

  keywords.forEach((kw) => {
    var regex = new RegExp(kw, 'g');

    data = data.replace(regex, ` ${kw} `);
  });

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
  data = data.replace(/\को/g, 'को ');
  data = data.replace(/\मे{/g, 'मे {');
  data = data.replace(/\अगर/g, 'अगर ');
  data = data.replace(/\जर/g, 'जर ');
  data = data.replace(/(?:\r\n|\r|\n)/g, ' ');
  // data = data.replace(/\==/g, ' == ');

  //preparing data for easy parsing by handling new lines, enters etc.

  data = data.replace(/(;|\n|\r|' '| '| ")/gm, '').split(' ');

  return data;
}

export { SourceDataReplaceforEasyParsing };
