import { RemoveQuotes, RemoveBrackets, operatorType } from "../Scripts/Helpers";
import { ActiveLangugaeKeywords } from "../Compiler/constants";
import { IsReservedKeyword } from "../Scripts/main";
import { HandleBlocks } from "../Scripts/main";
function isNumber(element) {
  return /^[0-9]*$/gm.test(element);
}
function handleOutput(value, kalaam) {
  kalaam.output += value + "\n";
}

function handleHygiene(el) {
  let restricted = [
    ActiveLangugaeKeywords.If,
    "दुहराओ",
    ActiveLangugaeKeywords.While,
    ActiveLangugaeKeywords.Print,
    "इनपुट",
    "रचना",
    "को",
    "मे",
  ];
  for (const val in el) {
    let result = restricted.includes(el[val]) ? "fail" : "pass";
    return result;
  }
}

function handleVariable(element, tokens, cleaned_sourcedata, i, nextEl, prevEl) {
  if (handleHygiene({ nextEl }) === "pass") {
    let variable_value = cleaned_sourcedata[i + 2];
    let token;

    if (nextEl === "=") {
      variable_value = RemoveQuotes(variable_value);

      let Datatype = isNumber(variable_value) && variable_value != "" ? "Number" : "String";

      token = {
        type: "variable",
        value: element,
        Datatype: Datatype,
      };

      return token;
    }
  }
}

function handleRealtimePrint(cleaned_sourcedata, i) {
  let foundString = "";

  let k = i;

  let skip = 0;

  var flag = 0;

  for (k; k < cleaned_sourcedata.length; k++) {
    let element = cleaned_sourcedata[k];
    let conditionEnd = element.charAt(element.length - 1) + element.charAt(element.length - 2);

    if (IsReservedKeyword(element)) {
      break;
    }

    if (conditionEnd == ')"' || element.charAt(element.length - 1) == ")") {
      foundString = foundString + " " + cleaned_sourcedata[k];
      break;
    } else if (flag == 1) {
      foundString = foundString + " " + cleaned_sourcedata[k];
    } else if (flag == 0) {
      foundString = cleaned_sourcedata[k];

      flag = 1;
    }

    skip = skip + 1;
  }

  return { foundString, skip };
}

function prepareFunction(mutable_tokens, j) {
  //We are preparing the required data to execute a function call later in the prgroam

  //functionsourcedata includes all the tokens from tokens array which belongs to a particular function

  //We find self range or a function block through HandleBlocks function

  let functionSourceData = [];

  let result = HandleBlocks(mutable_tokens, j + 1, functionSourceData);

  functionSourceData = result.StoreResult;

  //To identify function context in tokens array

  functionSourceData.forEach((el) => {
    el.context = "function";
  });

  return { functionSourceData };
}

export { handleOutput, handleVariable, handleHygiene, handleRealtimePrint, prepareFunction };
