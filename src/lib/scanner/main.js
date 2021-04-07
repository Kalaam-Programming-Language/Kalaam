//To check variable types: Number, String, Array etc.

import * as TypeCheck from "../TypeCheck/TypeChecking";

//To check other operations like MultiString, Arithmetic Operation etc.
import * as AdvancedTypeCheck from "../TypeCheck/AdvancedTypeChecking";

//SECTION - Checking for type of characters. TypeCheck is an object which consists all self functions. Check Line 102

const isVariable = TypeCheck.isVariable();

const isNumber = TypeCheck.isNumber();

const isOperator = TypeCheck.isOperator();

const isPrintOperation = TypeCheck.isPrintOperation();
const isConditionalKeyword = TypeCheck.isConditionalKeyword();
const isForLoop = TypeCheck.isForLoop();
const isWhileLoop = TypeCheck.isWhileLoop();
const isFunction = TypeCheck.isFunction();
const isFunctionCall = TypeCheck.isFunctionCall();
const isNativeOperation = TypeCheck.isNativeOperation();

//needs work
const isExpression = TypeCheck.isExpression();

const isArray = TypeCheck.isArray();
const isInput = TypeCheck.isInput();

const isSetArrayIndexValue = TypeCheck.isSetArrayIndexValue();

// const isEmptyArrayInit = TypeCheck.isEmptyArrayInit()

const isString = TypeCheck.isString();
const isEmptyStringorChar = TypeCheck.isEmptyStringorChar();

const isPureEval = AdvancedTypeCheck.isPureEval();

//if parser encounters anything like (" or (, then that's a realtime print.

//buildstring will be applied now to create a string and push it into tokens. Buildstring is used to combine string tokens like
//['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

//It's becausRc=e cleaned_sourcedata is an array of tokens and each token is an individual word in a program.

//It's recommended to look at cleaned_sourcedata of every program to understand how it converts plain text into array of individual words.

const isRealTimePrintMultipleString = AdvancedTypeCheck.isRealTimePrintMultipleString();

//const isStringandValue = AdvancedTypeCheck.isStringandValue()

const isCalculation = AdvancedTypeCheck.isCalculation();

function Scanner(cleaned_sourcedata, i, tokens) {
  var element = cleaned_sourcedata[i];
  console.log("scanner element:", element);

  if (isVariable(element)) {
    return "VARIABLE";
  } else if (isNumber(element)) {
    return "NUMBER";
  } else if (isEmptyStringorChar(element)) {
    return "EMPTY_STRING";
  } else if (isInput(element)) {
    return "INPUT";
  } else if (isOperator(element)) {
    return "OPERATOR";
  } else if (isPrintOperation(element, cleaned_sourcedata, i)) {
    return "PRINT";
  } else if (isFunction(element)) {
    return "FUNCTION";
  } else if (isArray(element)) {
    return "ARRAY";
  } else if (isSetArrayIndexValue(element, cleaned_sourcedata, i)) {
    return "SET_ARRAY_INDEX";
  } else if (isSetArrayIndexValue(element, cleaned_sourcedata, i) == false) {
    return "GET_ARRAY_INDEX";
  } else if (isConditionalKeyword(element)) {
    if (isWhileLoop(element)) {
      return "WHILE_LOOP";
    } else {
      return "CONDITIONAL_KEYWORD";
    }
  } else if (element.includes("पुश")) {
    return "PUSH_TO_ARRAY";
  } else if (isForLoop(element)) {
    return "FOR_LOOP";
  } else if (isCalculation(element)) {
    return "CALCULATION";
  } else if (isRealTimePrintMultipleString(element)) {
    return "CALCULATION";
  }

  //storing only the string values to tokens ( not the strings in print statements)
  else if (isString(element)) {
    return "STRING";
  } else if (isFunctionCall(element, tokens, cleaned_sourcedata, i)) {
    return "FUNCTION_CALL";
  } else if (isNativeOperation(element)) {
    return "NATIVE_OPERATION";
  } /* else if (
  
        else if (isExpression(element)  && !isCalculation(element) && !element.includes("[") && !element.includes("]") && (!isConditionalKeyword(cleaned_sourcedata[i - 1])) && (cleaned_sourcedata[i - 1] != "मे" && cleaned_sourcedata[i - 1] != "रचना")) {


            
            let CheckFunctionExpression = element.split("(");

            let passedValues = RemoveBrackets(CheckFunctionExpression[1]);
            passedValues = passedValues.split(",");
            token = tokens.find(el => el.value == CheckFunctionExpression[0]);
           

            if (token != undefined && cleaned_sourcedata[i-1]!='दिखाए') {

                PushFunctionExecution(element, tokens, cleaned_sourcedata, i, passedValues);

            }
            else {

                PushExpression(element, tokens);
                
            }

        }

        
    isExpression(element) &&
    element.includes("[") &&
    element.includes("]")
    
  ) {
    PushArray(element, tokens);
  }
    */
}

export default Scanner;
