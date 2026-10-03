//To check variable types: Number, String, Array etc.

import * as TypeCheck from '../TypeCheck/TypeChecking';

//To check other operations like MultiString, Arithmetic Operation etc.
import * as AdvancedTypeCheck from '../TypeCheck/AdvancedTypeChecking';

//SECTION - Checking for type of characters. TypeCheck is an object which consists all self functions. Check Line 102

const isVariable = TypeCheck.isVariable();

const isNumber = TypeCheck.isNumber();

const isOperator = TypeCheck.isOperator();

const isPrintOperation = TypeCheck.isPrintOperation();
const isConditionalKeyword = TypeCheck.isConditionalKeyword();
const isForLoop = TypeCheck.isForLoop();
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
const isinvalidString = TypeCheck.isinvalidString();


//if parser encounters anything like (" or (, then that's a realtime print.

//buildstring will be applied now to create a string and push it into tokens. Buildstring is used to combine string tokens like
//['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

//It's becausRc=e sourcecode is an array of tokens and each token is an individual word in a program.

//It's recommended to look at sourcecode of every program to understand how it converts plain text into array of individual words.

const isRealTimePrintMultipleString = AdvancedTypeCheck.isRealTimePrintMultipleString();

//const isStringandValue = AdvancedTypeCheck.isStringandValue()

const isCalculation = AdvancedTypeCheck.isCalculation();

function Scanner(sourcecode, i, tokens) {
    var el = sourcecode[i];

    var type = isVariable(el)
        ? 'VARIABLE'
        : isNumber(el)
            ? 'NUMBER'
            : isinvalidString(el)
                ? 'EMPTY_STRING'
                : isInput(el)
                    ? 'INPUT'
                    : isOperator(el)
                        ? 'OPERATOR'
                        : isPrintOperation(el, sourcecode, i)
                            ? 'PRINT'
                            : isFunction(el)
                                ? 'FUNCTION'
                                : isArray(el)
                                    ? 'ARRAY'
                                    : isSetArrayIndexValue(el, sourcecode, i)
                                        ? 'SET_ARRAY_INDEX'
                                        : isSetArrayIndexValue(el, sourcecode, i) == false
                                            ? 'GET_ARRAY_INDEX'
                                            : isConditionalKeyword(el)
                                                ? 'CONDITIONAL_KEYWORD'
                                                : el.includes('पुश')
                                                    ? 'PUSH_TO_ARRAY'
                                                    : isForLoop(el)
                                                        ? 'FOR_LOOP'
                                                        : isCalculation(el)
                                                            ? 'CALCULATION'
                                                            : isRealTimePrintMultipleString(el)
                                                                ? 'REALTIME_PRINT'
                                                                : isString(el)
                                                                    ? 'STRING'
                                                                    : isFunctionCall(el, tokens, sourcecode, i)
                                                                        ? 'FUNCTION_CALL'
                                                                        : isNativeOperation(el)
                                                                            ? 'NATIVE_OPERATION'
                                                                            : isExpression(el) && el.includes('[') && el.includes(']')
                                                                                ? 'ARRAY_PUSH'
                                                                                : 'UNKNOWN';

    return type;
}

export default Scanner;

/*\\ 
        else if isExpression(el)  && !isCalculation(el) && !el.includes("[") && !el.includes("]") && (!isConditionalKeyword(sourcecode[i - 1])) && (sourcecode[i - 1] != "मे" && sourcecode[i - 1] != "रचना")?


            
            let CheckFunctionExpression = el.split("(")

            let passedValues = RemoveBrackets(CheckFunctionExpression[1])
            passedValues = passedValues.split(",")
            token = tokens.find(el => el.value == CheckFunctionExpression[0])
           

            if (token != undefined && sourcecode[i-1]!='दिखाए'?

                PushFunctionExecution(el, tokens, sourcecode, i, passedValues)

            }
            else {

                PushExpression(el, tokens)
                
            }

        }
 */
