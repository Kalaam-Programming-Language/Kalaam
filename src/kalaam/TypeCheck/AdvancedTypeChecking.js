export function isPureEval() {
  return function (element) {
    if (/^([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)*$/gm.test(element)) {
      return true;
    }
  };
}

//if parser encounters anything like (" or (, then that's a realtime print.
//buildstring will be applied now to create a string and push it into tokens

export function isRealTimePrintMultipleString() {
  return function (element) {
    let conditionStart = element.charAt(0);
    let lastChar = element.charAt(element.length - 1);

    //THE Principle condition to proceed building a string after identifyting it as a potential realtimestring

    if ((conditionStart == '(' && lastChar != ')') || element.includes('("') || element.includes("('")) {
      return true;
    }
  };
}

export function isStringandValue() {
  return function (element) {
    let x = element;

    if (x.includes('"') && x.includes('+')) {
      return true;
    }
  };
}

export function isCalculation() {
  return function (element) {
    if ((element.includes('+') || element.includes('%') || element.includes('-') || element.includes('*') || element.includes('/')) && !element.includes('[') && ((element.includes('(') && element.includes(')')) || (!element.includes('(') && !element.includes(')'))) && element.charAt(element.length - 1) != '+' && (element.charAt(0) != '/' || element.charAt(0) != '*')) {
      return true;
    }
  };
}

export function isDirectPrintArithmetic() {
  return function (token) {
    if (token.includes('+') || token.includes('-') || token.includes('*') || token.includes('/')) {
      return true;
    }
  };
}
