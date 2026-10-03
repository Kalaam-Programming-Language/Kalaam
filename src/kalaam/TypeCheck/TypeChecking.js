import { ActiveLangugaeKeywords, ActiveLanguage } from '../Compiler/constants';

let _AK = ActiveLangugaeKeywords;
const Keywords = [
  _AK.Print, //Still have to change this manually where REGEX are implemented
  _AK.Input,
  _AK.If,
  _AK.For,
  _AK.While,
  _AK.Length,
  _AK.Push,
  _AK.Function,
];

// var PrintKeywordRegex = "^" + "(" + ActiveLangugaeKeywords.Print + ")*$"
// PrintKeywordRegex = new RegExp(PrintKeywordRegex)

const NativeOperations = [_AK.Length];

function RemoveBrackets(element) {
  const a = element.replace('(', '');
  const b = a.replace(')', '');
  const c = b.replace('}', '');
  const d = c.replace('{', '');

  return d;
}

function isArrayOperation(element) {
  // To find Patterns like Array[2], Array[index] etc

  element = RemoveBrackets(element);

  if (element.charAt(element.length - 1) == ']' && element.includes('[') && element.charAt(0) != '[') {
    return true;
  }
}

//need to include unicode range for new language

export function isVariable() {
  return function (element) {
    //https://unicode-table.com/en/alphabets/
    const HindiRegex = /(?:^|\s)[\u0900-\u097F]+?(?:\s|$)/g;
    const BengaliRegex = /(?:^|\s)[\u0980-\u09FB]+?(?:\s|$)/g;
    const TeluguRegex = /(?:^|\s)[\u0C05-\u0C63]+?(?:\s|$)/g;
    const OdiaRegex = /(?:^|\s)[\u0B05-\u0B32]+?(?:\s|$)/g;

    let al = ActiveLanguage;
    let regex = al === 'Hindi' ? HindiRegex : al === 'Bengali' ? BengaliRegex : al === 'Telugu' ? TeluguRegex : al === 'Odia' ? OdiaRegex : console.log('ERR: NO REGEX FOUND ');

    return (/^[a-z]+$/i.test(element) || regex.test(element)) && !Keywords.includes(element);
  };
}
export function isNumber() {
  return function (element) {
    return /^[0-9]*$/gm.test(element);
  };
}

export function isOperator() {
  return function (element) {
    return /^(=|}|{)*$/gm.test(element);
  };
}

export function isInput() {
  return function (element) {
    return element.includes(_AK.Input);
  };
}

export function isPrintOperation() {
  return function (element) {
    return element.includes(_AK.Print);
  };
}

export function isConditionalKeyword() {
  return function (element) {
    return element == _AK.If || element == _AK.While || element == 'अन्यथा';
  };
}

export function isForLoop() {
  return function (element) {
    return element == _AK.For;
  };
}

export function isWhileLoop() {
  return function (element) {
    return element == _AK.While;
  };
}

export function isFunction() {
  return function (element) {
    return element == _AK.Function;
  };
}

// needs work
export function isExpression() {
  return function (element) {
    return /\(([^)]+)\)/.test(element) || element.includes('()');
  };
}

export function isArray() {
  return function (element) {
    return element.charAt(0) == '[';
  };
}

export function isSetArrayIndexValue() {
  return function (element, data, i) {
    element = RemoveBrackets(element);

    if (isArrayOperation(element) && data[i + 1] == '=') {
      return true;
    }
    if (isArrayOperation(element) && (data[i + 1] == '=' || data[i - 1] == '=')) {
      return false;
    }
  };
}

export function isEmptyArrayInit() {
  return function (element, data, i) {
    return element == '=' && data[i + 1] == '[]';
  };
}

export function isinvalidString() {
  return function (element) {
    return element == '"' || element == "'" || element == '*' || element == '$' || element == '/' || element == '@' || element == '|' || element == '/' || element == '?' || element == '#' || (element.charAt(0) == "'" && element.charAt(element.length - 1) == "'") || (element.charAt(0) == '"' && element.charAt(element.length - 1) == '"');
  };
}

export function isString() {
  return function (element) {
    return element.charAt(0) == "'" || (element.charAt(0) == '"' && !element.includes(ActiveLangugaeKeywords.Print));
  };
}

export function isNativeOperation() {
  return function (element) {
    let flag = false;

    NativeOperations.forEach((el) => {
      if (element.includes(el)) {
        flag = true;
      }
    });

    return flag;
  };
}

export function isFunctionCall() {
  return function (element, tokens, cleaned_sourcedata, i) {
    if (!Keywords.includes(cleaned_sourcedata[i - 1])) {
      const CheckFunctionExpression = element.split('(');

      const token = tokens.find((el) => el.type == 'function' && el.value == CheckFunctionExpression[0]);

      return token != undefined;
    }
  };
}
