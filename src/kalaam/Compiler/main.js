/*!
 * Kalaam v1.0.0
 * (C) 2020-21 Swanand Kadam
 * Released under the MIT License.
 */

//SECTION - Importing function modules

//To check variable types: Number, String, Array etc.
import * as TypeCheck from '../TypeCheck/TypeChecking';

import { KalaamKeywords } from '../Compiler/constants';

//To check other operations like MultiString, Arithmetic Operation etc.
import * as AdvancedTypeCheck from '../TypeCheck/AdvancedTypeChecking';

//To format user input into a proper String, Array or Condition.
import * as BuildOperation from '../Scripts/BuildOperations';

import { RemoveQuotes, RemoveBrackets, earlyCleaning } from '../Scripts/Helpers';

//Functions imported to push a particular data to our Tokens array.
//Tokens array is basically a clean, formatted and a word by word version of raw code provided by user
import { PushArray, PushCalculation, PushConditionalKeyword, PushCondition, PushForLoop, PushWhileLoop, PushForLoopAruguments, PushExpression, PushNativeOperation, PushKeyword, PushNumber, PushOperator, PushRealTimePrintOperation, PushString, PushVariable, PushVariableValue, PushFunctionData, PushFunctionExecution, PushToArray, PushInput } from '../PushTokens/main';

//This are other helper functions that we need for a particular task. All of this functions will be explained indepth as we see them in codebase.
import {
  GetCleanSourcedata,
  GetcleanedExpression,
  AddElementToArray,
  ResetValue,
  CreateArrayElement,
  CalculateValues,
  GetArrayorStringElement,
  HandleBlocks,
  SplitElementsArray,
  SetValues,
  PushSetArrayIndexValue,
  PushGetArrayIndexValue,
  GetConditionValue,
  AcceptInputandSetValue,
  AssignorUpdateValues,
  HandleConditions,
  getLoopIndexStart,
  ForLoopSetMetadata,
  SetArrayIndexValue,
  AddtoExecutionStack,
} from '../Scripts/main.js';

import scanner from '../scanner/main';

import '../HelperLibrary/main';
import { handleRealtimePrint, handleVariable, handleOutput, prepareFunction } from '../Scripts/Handlers';
import { findtokenPositioninCode } from '../Scripts/finders';
import { isInterpretableType } from '../Scripts/testers';
//We will be importing this whole function to practise.vue and it will be executed when user clicks on 'RUN'

function Compile(sourcecode, ActiveLangugaeKeywords) {
  try {
    //t0 along with t1 takes record of Time taken to run the code. t1-t0 gives us the exact time taken.
    var t0 = performance.now(); // eslint-disable-line

    //Sourcedata is the raw code provided by user
    const sourcedata = sourcecode;

    var LinebylineSourcedata = sourcedata.replace(/(?:\r\n|\r|\n)/g, 'breakpoint').split('breakpoint');

    //This is where formatted and cleaned sourcedata will go.
    var cleaned_sourcedata = [];
    var ExecutionStack = [];
    var i = 0;
    //This is where tokens will be pushed depending upon their types like Variable, function, loops etc.
    var tokens = [];

    //Experimental
    var mixedimpurity = [];

    //The variables with their calculated values are pushed here. If c=a+b, memory is where you will find the calculated value
    var memory = [];

    //Variable-value pairs similar to memory but limits itself to a user created function.
    var functionContextmemory = [];

    var variables_array = [];

    //Pushing the variables that are assigned to filter out defined and undefined variables. Useful in error handling
    var assigned_variables = [];

    //TO REMOVE DUPLICATE VARIABLES,

    // var variableArray = [];
    //A temporary instance of a global variable. Used because of scoping issue, there are better soultions and we will do that.

    //emptying accumulated value
    //See AssignorUpdateValues function for more

    var skipParsing = 0;
    var skipInterpretation = 0;

    ResetValue();
    var kalaam = {};
    //If an error is encountered we set the value to true and push the error to errors array.
    kalaam.isError = false;

    sourcecode = earlyCleaning(sourcecode);

    kalaam.output = '';
    kalaam.LastConditionValue = [];
    kalaam.ExecutionStack = [];

    kalaam.linebylineOutput = kalaam.output.split('\n');
    kalaam.error = [];
    kalaam.OperationObjects = [];

    //SECTION - Checking for type of characters. TypeCheck is an object which consists all self functions. Check Line 102

    const isVariable = TypeCheck.isVariable();

    const isNumber = TypeCheck.isNumber();

    const isWhileLoop = TypeCheck.isWhileLoop();

    const isPureEval = AdvancedTypeCheck.isPureEval();

    //if _tokensr encounters anything like (" or (, then that's a realtime print.

    //buildstring will be applied now to create a string and push it into tokens. Buildstring is used to combine string tokens like
    //['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

    //It's because cleaned_sourcedata is an array of tokens and each token is an individual word in a program.

    //It's recommended to look at cleaned_sourcedata of every program to understand how it converts plain text into array of individual words.

    const isRealTimePrintMultipleString = AdvancedTypeCheck.isRealTimePrintMultipleString();

    //const isStringandValue = AdvancedTypeCheck.isStringandValue()

    const isCalculation = AdvancedTypeCheck.isCalculation();

    // const isDirectPrintArithmetic = AdvancedTypeCheck.isDirectPrintArithmetic()

    //SECTION - Build Operations

    //To convert ['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

    const BuildString = BuildOperation.BuildString();

    //To convert ['[', 'x','y','z',']'] into ['x','y','z']

    const BuildArray = BuildOperation.BuildArray();

    //self function is the first step to handlle operations like अगर (ageone===10 && AverageAge<1000 && agetwo>100 || ageone===10) OR (ageone===10 )

    const BuildCondition = BuildOperation.BuildCondition();

    //This will run for every दिखाए() statement encountered in the program, not just for loops

    //ARGUMENTS TO PrintEngine are:
    //Tokens- Tokens array
    //memory- Variable-value pairs of variables
    //j- Index of a token in Tokens array
    //global- self or self
    //iterator and OriginalIterator are used to print values in for and while loops.

    function PrintEngine(Tokens, memory, j, iterator, OriginalIterator) {
      //To understand what kind of data is necessary to print a value

      //Getting the current token as token and value to be printed as NextTokenValue
      //e.g. For दिखाए(Name), Name is the NextTokenValue and it is the one which we will have to print

      var StringVar = [];

      var token = Tokens[j].value;

      var NextTokenValue = Tokens.nextElement(j).value;
      //Removing the brackets, if any.
      var VariableToPrint = RemoveBrackets(NextTokenValue);

      //SECTION - Outputting the code
      // finding the variable value in memory. memory is where our Variable-value pairs exists.

      //This loop is only for printing direct values like print(name), print(array)

      memory.forEach((el) => {
        console.log('el:', el);
        //If we have a variable-value pair sitting in memory

        if (el.name === VariableToPrint) {
          //for calculations like x=ageone+agetwo

          //If we have already calculated value in assigned_variables, use that or else move forward

          if (assigned_variables.includes(el) || assigned_variables.includes(el.name)) {
            handleOutput(el.value, kalaam);
          } else {
            //if the value found is a Number

            if (isNumber(el.value)) {
              handleOutput(el.value, kalaam);

              assigned_variables.push(el.name);
            }

            //if the value found is operations like age=2020-1996
            else if (isPureEval(el.value)) {
              //we are using Javascript's eval function to calculate direct arithmetic operations
              let outputpure = eval(el.value);

              el.value = outputpure;

              handleOutput(el.value, kalaam);

              assigned_variables.push(el.name);
            }

            //We will simplify this conditions as we move forward
            else if (!isPureEval(el.value) && !isNumber(el.value)) {
              if (!(el.name.includes(']') && el.name.includes('['))) {
                if (el.type === 'Array') {
                  if (!el.value.includes('[')) {
                    el.value = '[' + el.value.toString() + ']';
                  }
                }

                handleOutput(el.value, kalaam);

                assigned_variables.push(el.name);
              }
            }
          }
        }
      });

      //This is how we print Array in Kalaam
      if (Tokens[j + 1].type === 'Array') {
        //To run only if iterator is present

        //This runs on for loop - दिखाए(Array[a]) etc

        //self runs only if for(i) and in the loop, array[i], not on array[x]. For loop Iterator and index should be same, in self case 'i'

        if (iterator != undefined && Tokens[j + 1].IndexInput === OriginalIterator) {
          let Value = NextTokenValue;

          let ArrayElement = CreateArrayElement(Value, iterator);

          let output = GetArrayorStringElement(ArrayElement, memory);

          output = RemoveQuotes(output);

          handleOutput(output, kalaam);

          assigned_variables.push(Tokens[j + 1]);
        }

        //This runs to Print(Array[2]) like specific array values
        else if (Tokens[j + 1].IndexInput != OriginalIterator) {
          let Value = NextTokenValue;

          let IndexToChange = Tokens[j + 1].IndexInput;

          let ArrayElement = CreateArrayElement(Value, IndexToChange);

          let element = ArrayElement.replace(']', '');

          let Split = element.split('[');

          if (Split[1].includes('-') || Split[1].includes('+')) {
            let output = CalculateValues(Split[1], j, memory);

            Split[1] = output;

            Split = Split.join('[') + ']';
            ArrayElement = Split;
          }

          let token = memory.find((el) => el.name === Split[1]);

          if (token != undefined && OriginalIterator != Split[1]) {
            Split[1] = token.value;

            Split = Split.join('[') + ']';
            ArrayElement = Split;
          } else {
            ArrayElement = ArrayElement;
            ////
          }

          let output = GetArrayorStringElement(ArrayElement, memory);

          handleOutput(output, kalaam);
        }
      }

      //printing direct numbers and direct calcultions like print(10), print(10*10)
      else if (token === ActiveLangugaeKeywords.Print && (isPureEval(RemoveBrackets(NextTokenValue)) || isNumber(RemoveBrackets(NextTokenValue)))) {
        NextTokenValue = RemoveBrackets(NextTokenValue);

        if (isNumber(NextTokenValue) && Tokens[j + 1].type != 'Calculation') {
          handleOutput(NextTokenValue, kalaam);
        } else {
          let a = eval(NextTokenValue);

          handleOutput(a, kalaam);
        }
      }

      //foroperations like print('you live, you learn')
      else if (Tokens[j + 1].mode === 'RealTimePrint' && !NextTokenValue.includes('+') /*&& !NextTokenValue.includes('=')*/) {
        let output = RemoveBrackets(NextTokenValue);

        output = RemoveQuotes(output);

        handleOutput(output + '\n', kalaam);
      }

      //operations like print(Age + 'is young age') i.e string concatenations
      else if (Tokens[j + 1].mode === 'RealTimePrint' && NextTokenValue.includes('+')) {
        let x = SplitElementsArray(NextTokenValue);

        x = x.join('').split('+');

        StringVar = SetValues(x, memory);

        let output = StringVar.join(' ');

        output = RemoveBrackets(output);
        output = RemoveQuotes(output);

        handleOutput(output + '\n', kalaam);
      } else if (isCalculation(RemoveBrackets(NextTokenValue)) && Tokens[j + 1].mode != 'RealTimePrint') {
        NextTokenValue = RemoveBrackets(NextTokenValue);

        let output = CalculateValues(NextTokenValue, j, memory);

        handleOutput(output + '\n', kalaam);
      }

      let message = ' Computer ने आपकी दी गयी वैल्यू, ' + '"' + RemoveBrackets(NextTokenValue) + '"' + ' को दिखाया है |';

      //This is the experession whcih is getting evaluated.

      let expression = token + NextTokenValue;
      let description = 'किसी VALUE को OUTPUT SCREEN पे दिखाने के लिए दिखाए() का उपयोग होता है।';

      expression = GetcleanedExpression(expression);

      let position = findtokenPositioninCode(LinebylineSourcedata, expression, true);
      if (position != undefined) {
        AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.Print, description, VariableToPrint, null, message, position);
      }
    }

    //END OF Functions and Imported Functions

    //Out of all self function, PrintEngine is very important function. It prints variable values by searching their value in memory.

    //SECTION - Checking each token and adding to tokens array

    //_tokens takes two arguments. The cleaned_sourcedata array and current index of cleaned_sourcedata array

    //_tokens is used to create a tokens array with each token having it's name, value, type and other metadata

    //It performs operations depending upon whether the element is variable, array, function, loop etc.

    //scanning every single element from cleaned_sourcedata array and pushing it to Tokens depending upon the type pf element

    function _analyzeToken(cleaned_sourcedata, i, tokens) {
      let element = cleaned_sourcedata[i];

      skipParsing = 0;

      let nextEl = cleaned_sourcedata.nextElement(i);
      let prevEl = cleaned_sourcedata.prevElement(i);

      let token_type = scanner(cleaned_sourcedata, i, tokens);
      console.log('token_type:', token_type);
      //Push variables to tokens
      //Format: {type: "variable", value: "ReverseString"}

      //whenever we need a certain handling, handlers.js is used
      switch (token_type) {
        case 'VARIABLE':
          //Here we seperate Message = 'Hello' into following three tokens :

          //1: {type: "variable", value: "Message"}

          //2: {type: "operator", value: "="}

          //3: {type: "value", value: "Hello"}

          let handled_variable = handleVariable(element, tokens, cleaned_sourcedata, i, nextEl, prevEl);
          console.log('handled_variable:', handled_variable);
          let h = handled_variable;
          if (h != undefined) {
            try {
              h.type === 'variable' ? PushVariable(h, tokens) : console.log(`error in setting ${element}`);
            } catch (e) {
              console.log(e, `error in setting ${element}`);
            }
          }
          break;
        //Push variables to tokens
        case 'NUMBER':
          PushNumber(element, tokens);
          break;

        //Push EmptyStrings to tokens
        case 'EMPTY_STRING':
          //In some cases empty strings will be modified into something like "'" or '"'
          //We convert it back to " "
          try {
            let e = element;
            e = e.length > 1 && (e.charAt(0) === "'" || e.charAt(0) === '"') ? (e = e.replace(/['"]+/g, '')) : (e = ' ');

            PushVariableValue(e, tokens);
          } catch (e) {
            console.log(e, `Error in setting Empty string ${element}`);
          }
          break;

        //Push Input to tokens
        //Format: {type: "AcceptInput", value: " ", AcceptAs: "Message"}
        case 'INPUT':
          try {
            PushInput(element, tokens, cleaned_sourcedata, i);
            console.log('element:', element);
          } catch (e) {
            console.log(e, `Error in setting Input ${element}`);
          }
          break;
        //Push operators to tokens. The accepted operators are =,},{
        //Format: {type: "operator", value: "="}
        case 'OPERATOR':
          try {
            PushOperator(element, tokens);
          } catch (e) {
            console.log(e, `Error in setting operator ${element}`);
          }
          break;

        //Push keyowrds to tokens. The accepted keywords is दिखाए

        //Format: {type: "keyword", value: ActiveLangugaeKeywords.Print}
        case 'PRINT':
          try {
            PushKeyword(element, tokens);

            let ExpressiontoPrint = nextEl;

            if (!isRealTimePrintMultipleString(ExpressiontoPrint)) {
              PushExpression(ExpressiontoPrint, tokens);
            }
          } catch (e) {
            console.log(e, `Error in printing ${element}`);
          }
          break;
        //Push functions to tokens
        //Format: {type: "function", value: "First", arguments: Array(2), FunctionInvocationExists: false, FunctionStack: Array(0), …}
        case 'FUNCTION':
          try {
            PushFunctionData(element, tokens, cleaned_sourcedata, i);
          } catch (e) {
            console.log(e, `Error in handling function ${element}`);
          }
          break;

        // Push array to tokens

        case 'ARRAY':
          //Format: {type: "Array", value: "[]"}
          //if empty array else build the array (To convert '[',1,2,3,4,']'  into [1,2,3,4]
          try {
            let e = element;
            e.charAt(e.length - 1) === ']'
              ? PushArray(e, tokens)
              : function () {
                  let BuiltArray = BuildArray(e, i, cleaned_sourcedata);

                  PushArray(BuiltArray, tokens);
                };
          } catch (e) {
            console.log(e, `Error in handling Array ${element}`);
          }

          break;

        //For operations like Numbers[a]=a
        //Format: {type: "SetArrayIndexValue", value: "Fibonacci[a]", ValueToSet: "a"}
        case 'SET_ARRAY_INDEX':
          try {
            PushSetArrayIndexValue(element, tokens, cleaned_sourcedata, i);

            cleaned_sourcedata.splice(i + 1, 1);
          } catch (e) {
            console.log(e, `Error in setting array index value ${element}`);
          }

          break;

        //For operations like a=Numbers[a], reverse of above
        //Format: {type: "GetArrayIndexValue", value: "Fibonacci[a-2]"}
        case 'GET_ARRAY_INDEX':
          try {
            PushGetArrayIndexValue(element, tokens, cleaned_sourcedata, i);
          } catch (e) {
            console.log(e, `Error in getting array index value ${element}`);
          }
          break;

        //Push conditions to tokens. The accepted keywords are अगर, जबतक, अन्यथा
        // Format: {type: "conditionalkeyword", value: "अगर"}
        //Push while loops to tokens
        //Format: {type: "WhileLoopStart", value: "जबतक"}, {type: "condition", value: "count<25"}

        case 'CONDITIONAL_KEYWORD':
          try {
            isWhileLoop(element) ? PushWhileLoop(element, tokens) : PushConditionalKeyword(element, tokens);

            //This is how we push conditions encountered in the sourcecode
            //Format:{type: "condition", value: "a<3"}
            let foundcondition = BuildCondition(element, i, cleaned_sourcedata);

            //Push conditions to tokens array

            if (foundcondition != '') {
              PushCondition(foundcondition, tokens);
            }
          } catch (e) {
            console.log(e, `Error in operating on conditionals ${element}`);
          }

          break;

        //Finding operations like Numbers.पुश(x)
        //Format: {type: "PushToArray", value: "Numbers.पुश(x)"}
        case 'PUSH_TO_ARRAY':
          try {
            PushToArray(element, tokens);
          } catch (e) {
            console.log(e, `Error in pushing the values to array ${element}`);
          }
          break;

        //Push For loop to tokens
        // Format:
        // {type: "ForLoopStart", value: "दुहराओ"}
        // {type: "ForLoopArguments", iterator: "a", value: "(0,25)", iterationStart: "0", iterationEnd: "25"}
        case 'FOR_LOOP':
          try {
            PushForLoop(element, tokens);
            PushForLoopAruguments(element, cleaned_sourcedata, i, tokens);

            memory.push({
              name: nextEl,
              value: 0,
              type: 'ForLoopIterator',
            });
          } catch (e) {
            console.log(e, `Error in operating on for loop ${element}`);
          }
          break;

        //Pushing basic Calculations like 'length-1' to tokens
        //Format: {type: "Calculation", value: "length-1"}
        case 'CALCULATION':
          /* red zone
  
          if (nextEl != undefined) {
            // this is to perform long calculations like AverageAge=(ageone+agetwo)/2 + (ageone+agetwo)*2
  
            while (isCalculation(cleaned_sourcedata[i])) {
              el = el + cleaned_sourcedata[i];
  
              i++;
            }
          }
  
          console.log("el:", el);
  */
          /*error prone*/

          try {
            let el = element;
            let cal = '';
            let count = 0;
            //   function findCalculation(cleaned_sourcedata, i) {
            let x = i;
            let d = 0;

            while (isCalculation(cleaned_sourcedata[x]) || cleaned_sourcedata[x] == '+') {
              cal = cal + cleaned_sourcedata[x];
              count += 1;
              x++;
            }

            function isMultiCalculation(c, op = '*+/-') {
              if (c.includes('(') && c.includes(')')) {
                let s = c.split('');
                s.forEach((el) => {
                  if (op.includes(el)) {
                    d = d + 1;
                  }
                });

                if (d > 1) {
                  return true;
                } else {
                  return false;
                }
              }
            }

            let multiCal = isMultiCalculation(cal);

            //  console.log("x", x, i);
            skipParsing = count - 1;
            // cal = RemoveBrackets(cal);

            //let c_el = RemoveBrackets(cal);

            //  let cal = findCalculation();

            // to stop prevention of expressions like is"+ getting added as a calculation
            !cal.includes('"') && !['/', '*', "'", '"'].includes(el.charAt(0)) ? PushCalculation(cal, tokens, cleaned_sourcedata, i, multiCal) : console.log(`impure calculation terms ${el}`);
          } catch (e) {
            console.log(e, `Error in completing calculation ${element}`);
          }
          break;

        case 'REALTIME_PRINT':
          //finding operations like print(x + 'y'). The RealTimePrint operations

          //Format: {type: "value", value: "('Reversed String-'+ ReverseString)", mode: "RealTimePrint"}
          try {
            let { foundString, skip } = handleRealtimePrint(cleaned_sourcedata, i);

            PushRealTimePrintOperation(foundString, tokens);

            skipParsing = skip;
          } catch (e) {
            console.log(e, `Error in real time print ${element}`);
          }

          break;

        case 'STRING':
          //storing only the string values to tokens ( not the strings in print statements)
          try {
            let s = BuildString(element, i, cleaned_sourcedata);

            s = s.replace(/['"]+/g, '');

            !s.includes(ActiveLangugaeKeywords.Print) ? PushString(s, tokens) : console.log(`error in pushing string ${(s, element)}`);
          } catch (e) {
            console.log(e, `error in operating on string ${element}`);
          }
          break;

        //An extension of isPrintOperation() function
        // Needs improvement

        /*     else if (/^(?=.*?दिखाए)(?=.*[a-z])/.test(element)) {
                
    
                PushKeyword(element.slice(0, 6), tokens); //Pushing print keyword only
    
                PushExpression(element.slice(6), tokens); //Pushing remaining expression like (a), (Message) etc
            }
            */

        //error prone change made here- Pushing expression in here
        //Used to push functions and expressions
        //Unnecessary data is being passed through kalaam.
        //This was created for a temporary fix
        case 'FUNCTION_CALL':
          try {
            let CheckFunctionExpression = element.split('(');

            let passedValues = RemoveBrackets(CheckFunctionExpression[1]);
            passedValues = passedValues.split(',');

            PushFunctionExecution(element, tokens, cleaned_sourcedata, i, passedValues);
          } catch (e) {
            console.log(e, `error in pushing function execution ${element}`);
          }
          break;

        case 'NATIVE_OPERATION':
          try {
            PushNativeOperation(element, tokens);
          } catch (e) {
            console.log(e, `error in pushing native operaion ${element}`);
          }
          break;

        case 'ARRAY_PUSH':
          try {
            PushArray(element, tokens);
          } catch (e) {
            console.log(e, `error in array push ${element}`);
          }
          break;
      }
    }

    //making sense of tokens array coming from _parser.
    function interpretToken(t, j, memory) {
      skipInterpretation = 0;
      let mutable_tokens = t;

      let token = mutable_tokens[j].value;

      let token_type = mutable_tokens[j].type;
      let token_subtype = mutable_tokens[j].subtype;

      let type = token === ActiveLangugaeKeywords.Print || token_type === 'operator' ? token_subtype : token_type;
      //need to skip over some unncessary types

      //operators are not working correctly
      // no need to interpret over non-types
      try {
        if (isInterpretableType(type)) {
          switch (type) {
            case 'SetArrayIndexValue':
              {
                SetArrayIndexValue(mutable_tokens, j, j, memory, tokens, OriginalIterator, iterator, ExecutionStack, LinebylineSourcedata);
              }
              break;

            case 'assignment': {
              AssignorUpdateValues(mutable_tokens, j, memory, iterator, OriginalIterator, kalaam, ExecutionStack, LinebylineSourcedata); // eslint-disable-line

              break;
            }
            //type=assignment

            case 'PushToArray':
              {
                AddElementToArray(mutable_tokens, j, memory, ExecutionStack, LinebylineSourcedata);
              }
              break;
            case 'AcceptInput':
              {
                AcceptInputandSetValue(mutable_tokens, j, memory, ExecutionStack, LinebylineSourcedata);
              }
              break;

            //Whenever we encounter a function, we create a seperate execution context
            case 'function':
              {
                //We are preparing the required data to execute a function call later in the prgroam

                //functionsourcedata includes all the tokens from tokens array which belongs to a particular function
                skipInterpretation = 0;
                //We find self range or a function block through HandleBlocks function
                let { functionSourceData } = prepareFunction(mutable_tokens, j);

                mutable_tokens[j].SourceData = functionSourceData;

                let message = `इस ${ActiveLangugaeKeywords.Function} का नाम ${token} है जिसे हम कोड में बाद में NEW VALUES पास करके उपयोग कर सकते है|`;

                let expression = `${ActiveLangugaeKeywords.Function} ${token}`;
                let description = ' एक विशिष्ट रूप से लिखा गया कोड जिसका हम बार बार उपयोग कर सकते है | ';

                let position = findtokenPositioninCode(LinebylineSourcedata, expression, true);
                if (position != undefined) {
                  AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.Function, description, mutable_tokens[j].value, functionSourceData, message, position);
                }
                skipInterpretation = functionSourceData.length;
              }
              break;
            //We are out of the fucntion execution context and back to global execution context
            case 'condition':
              {
                let element = token;

                var message;

                //this function is the first step to calculate value of operations like अगर (ageone===10 && AverageAge<1000 && agetwo>100 || ageone===10) OR (ageone===10 )

                let ConditionValue = GetConditionValue(element, memory, j);

                kalaam.LastConditionValue.push(ConditionValue);

                //if value is false, just skip the if loop context, if not it will be ran in final print module

                if (!ConditionValue) {
                  //  let InitializeLoop = tokens.indexOf(mutable_tokens[j]);

                  //Handle Blocks is a function which takes care of nested block by taking care of nested { and } brackets
                  //it uses the stack to push and pop brackets to accurately identify start and the end of the block
                  let Returnvalue = HandleBlocks(mutable_tokens, j);

                  //amount to skip if condition is false
                  skipInterpretation = Returnvalue.j - j;

                  message = `कंडीशन  ${element}  , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा `;
                } else {
                  message = `कंडीशन ${element}  , TRUE(सत्य) होने के कारन COMPUTER आगे के कोड को रन करेगा `;
                }

                let expression = element;
                let description = 'एक Certain Condition के तहत कोड Execution को Allow करता है। ';

                expression = GetcleanedExpression(expression);

                let position = findtokenPositioninCode(LinebylineSourcedata, expression, true);
                if (position != undefined) {
                  AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.If, description, element, ConditionValue, message, position);
                }
              }

              break;
            //So that we don't print a same value twice. First in global execution context and the in function context

            //This one prints the global context values
            case 'print':
              {
                PrintEngine(mutable_tokens, memory, j); // eslint-disable-line
              }
              break;

            //This runs our while loop .i.e जबतक
            case 'WhileLoopStart':
              {
                skipInterpretation = 0;
                let element = mutable_tokens[j + 1].value;

                let ExtratcedVariable = [];

                let variable = '';
                let WhileLoopSourcedataIndexStart = 0;
                let WhileLoopSourcedataTokens = [];

                for (let i = 0; i < element.length; i++) {
                  let x = element.charAt(i);

                  if (isVariable(x)) {
                    variable = variable + x;
                  }
                  if (!isVariable(element.charAt(i + 1)) && isVariable(x)) {
                    let token = memory.find((el) => el.name === variable);

                    ExtratcedVariable.push({
                      variable: variable,
                      value: token.value,
                    });

                    variable = '';
                  }
                }

                function getWhileLoopSourcedata(startIndex, mutable_tokens, StoreResult) {
                  StoreResult = HandleBlocks(mutable_tokens, startIndex, StoreResult);

                  return StoreResult;
                }

                WhileLoopSourcedataIndexStart = getLoopIndexStart(mutable_tokens, j, '{', WhileLoopSourcedataIndexStart);

                WhileLoopSourcedataTokens = getWhileLoopSourcedata(WhileLoopSourcedataIndexStart, mutable_tokens, WhileLoopSourcedataTokens).StoreResult;

                let message = 'जबतक ' + element + ' सही होगा तब तक आगे का कोड रन किया जायेगा ';

                let description = 'जबतक में दिए हुए शर्त(Condition) के पूरा होने तक आगे के कोड को रन करे |';

                let expression = GetcleanedExpression(element);

                let position = findtokenPositioninCode(LinebylineSourcedata, expression, true);
                if (position != undefined) {
                  AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.While, description, element, WhileLoopSourcedataTokens, message, position);
                }

                //constantly accessing the conditionvalue

                while (GetConditionValue(element, memory, j + 1)) {
                  for (let i = 0; i < WhileLoopSourcedataTokens.length; i++) {
                    //SECTION while loop context

                    if (WhileLoopSourcedataTokens[i].value === '=') {
                      AssignorUpdateValues(WhileLoopSourcedataTokens, i, memory, '', '', '', ExecutionStack, LinebylineSourcedata);
                    } else if (WhileLoopSourcedataTokens[i].type === 'AcceptInput') {
                      AcceptInputandSetValue(WhileLoopSourcedataTokens, i, memory, ExecutionStack);
                    }

                    // Handling CONDITIONAL statements in While loop
                    else if (WhileLoopSourcedataTokens[i].type === 'condition') {
                      //if index returns a value, it means condition is false and skip the execution

                      let index = HandleConditions(WhileLoopSourcedataTokens, i, memory);

                      if (index != undefined) {
                        i = index;
                      } else {
                        i = i;
                      }
                    }

                    //Handling दिखाए statements in while loop
                    else if (WhileLoopSourcedataTokens[i].value === ActiveLangugaeKeywords.Print) {
                      PrintEngine(WhileLoopSourcedataTokens, memory, i, ExecutionStack); // eslint-disable-line
                    }

                    //operations like Numbers[a]='xyz'
                    else if (WhileLoopSourcedataTokens[i].type === 'SetArrayIndexValue') {
                      SetArrayIndexValue(WhileLoopSourcedataTokens, i, j, memory, tokens, OriginalIterator, iterator, ExecutionStack, LinebylineSourcedata);
                    }
                  }
                }
                skipInterpretation = WhileLoopSourcedataTokens.length;

                //End of While loop execution

                //Handling For loops
              }
              break;

            case 'ForLoopStart':
              {
                var FlagPrimalLoop = 0; // eslint-disable-line

                var SourcedataTokens = [];

                var { OriginalIterator, IterationStart, IterationEnd, iterator, element, ForLoopSourcedataIndexStart, Cycle } = ForLoopSetMetadata(mutable_tokens, j, memory);

                function getSourcedata(startIndex, mutable_tokens, StoreResult) {
                  let Returnvalue = HandleBlocks(mutable_tokens, startIndex, StoreResult);
                  StoreResult = Returnvalue.StoreResult;

                  return StoreResult;
                }

                ForLoopSourcedataIndexStart = getLoopIndexStart(mutable_tokens, j, '{', ForLoopSourcedataIndexStart);

                SourcedataTokens = getSourcedata(ForLoopSourcedataIndexStart, mutable_tokens, SourcedataTokens);

                SourcedataTokens.forEach((el) => {
                  el.isNestedLoop = false;
                });

                //Checking if the for loop has one more for loop inside it
                let FindNestedLoop = SourcedataTokens.find((el) => el.type === 'ForLoopStart');

                if (FindNestedLoop != undefined) {
                  let NestedLoopindex = SourcedataTokens.indexOf(FindNestedLoop) + 3;
                  let NestedLooplength = SourcedataTokens[NestedLoopindex].EndIndex - SourcedataTokens[NestedLoopindex].startIndex + 2;

                  //if we have a nested loop, set isNesteLoop to TRUE

                  for (let x = NestedLoopindex; x < NestedLoopindex + NestedLooplength; x++) {
                    SourcedataTokens[x].isNestedLoop = true;
                  }
                }

                if (element.includes('(') && element.includes(',')) {
                  FlagPrimalLoop = 1;
                }

                //Iterating over forloop sourcedata
                //self line 'iterator <= Cycle' determines start of the loop and the duration of the loop

                let message = 'दुहराओ के अंदर लिखे गए कोड को ' + IterationStart + ' से ' + IterationEnd + ' तक, मतलब ' + eval(IterationEnd - IterationStart + 1) + ' बार RUN(रन) किया जायेगा |' + '\n' + ' इसमें Computer, ' + '"' + iterator + '"' + ' को Memory में, ' + IterationStart + ' से ' + IterationEnd + ' तक क़ीमत(Values) सेट करता जाएगा|';

                //This is the experession whcih is getting evaluated.
                let expression = 'दुहराओ ' + iterator + ' को ' + mutable_tokens[j + 1].value + ' मे';
                let description = 'एक ही कोड को बार-बार दोहराना। ';
                let Linenumber = LinebylineSourcedata.indexOf(expression);
                Linenumber += 1;

                AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.For, description, SourcedataTokens, '', message, Linenumber);

                for (iterator = IterationStart; iterator <= Cycle; iterator++) {
                  let forloopindex = memory.find((el) => el.name === OriginalIterator);

                  forloopindex.value = iterator;

                  //flag to avoid running this code if loop is primal because the payload needs to be compeltely different
                  if (FlagPrimalLoop === 0) {
                    // ForLoopArrayorStringOutput(elementValue, iterator, memory, self); // eslint-disable-line
                  }

                  for (let i = 0; i < SourcedataTokens.length; i++) {
                    // let isNested = SourcedataTokens[i].isNestedLoop;

                    //This code runs only if we have a nested loop situation
                    skipInterpretation = 0;
                    try {
                      interpretToken(SourcedataTokens, i, memory);
                    } catch (e) {
                      console.log(e, `error in interpreting for loop ${SourcedataTokens[i]}`);
                    }
                    if (skipInterpretation != 0) {
                      i = i + skipInterpretation;
                    }
                  }
                }

                skipInterpretation = skipInterpretation + SourcedataTokens.length;
              }

              break;
            //END FOR LOOP EXECUTION
            case 'functionExecution': {
              //checking if function is invoked somewhere later in the program

              //If we see a function execution call, for e.g Add(x,y), we prepare for execution

              let functionSourceData = [];
              let functionName = token;

              let passedValues = mutable_tokens[j].passedValues;

              let functionToken = mutable_tokens.find((el) => el.value === functionName);

              let functionArguments = functionToken.arguments;

              functionSourceData = functionToken.SourceData;

              //Creating a seperate execution context and setting fucntion context name:value pair in functionContextmemory

              //for e.g x=3, y=4 is already defined and then we execute add(x,y)

              // This is an memory form limited to function context

              //Operating on function arguments and setting their values. For e.g the function add(x,y) might be called as add(3,4)

              //so we set x=3, y=4 and set self variable-value pair in functionContextmemory

              functionArguments.forEach((el, index) => {
                let val = passedValues[index];

                val = val.replace(/"/g, '');
                val = val.replace(/'/g, '');

                passedValues[index] = val;

                //in self code we are filtering out arguments passed based on whether they already exist in updated tokens or not

                let FindInUpdatedTokens = memory.find((el) => el.name === val);

                //For passing same argument and same value to function  e.g function foo (fibonacci) and fibonacci is already declared with some value
                if (FindInUpdatedTokens === undefined) {
                  functionContextmemory.push({
                    name: el,

                    value: val,

                    identifier: j + index,
                    type: 'value',
                    context: 'FunctionExecutionContext',
                  });
                }

                //For passing different argument and value to function  e.g function foo (arr) and arr doesn't exist anywhere in tokens.
                else if (el != FindInUpdatedTokens.name && FindInUpdatedTokens != undefined) {
                  functionContextmemory.push({
                    name: el,

                    value: FindInUpdatedTokens.value,

                    identifier: j + index,
                    type: FindInUpdatedTokens.type,
                    context: 'FunctionExecutionContext',
                    IntheEndSetValueto: val,
                  });
                } else {
                  functionContextmemory.push({
                    name: el,

                    value: val,

                    identifier: j + index,
                    type: FindInUpdatedTokens.type,
                    context: 'FunctionExecutionContext',
                    IntheEndSetValueto: val,
                  });
                }
              });

              //Building a complete variable-value pair dataset

              var CompleteTokenValueList = [...memory, ...functionContextmemory];

              let message = 'Computer ' + '"' + functionName + '"' + ' नाम की रचना को कॉल (Call) करता है | आपने ' + '"()"' + ' के अंदर दिए गए New Values का रचना ' + functionName + ' में उपयोग करके, रचना ' + functionName + ' में लिखे गए कोड को रन करता है |';

              let expression = functionName + '(';

              let description = ' एक विशिष्ट रूप से लिखा गया कोड जिसका हम बार बार उपयोग कर सकते है | ';

              let position = findtokenPositioninCode(LinebylineSourcedata, expression, false);

              if (position != undefined) {
                AddtoExecutionStack(ExecutionStack, ActiveLangugaeKeywords.Function, description, functionName, functionSourceData, message, position);
              }

              //Now we start digging into the function execution
              //might have to change i to 1
              //skip in functionsourcedata
              for (let i = 0; i < functionSourceData.length; i++) {
                skipInterpretation = 0;
                try {
                  interpretToken(functionSourceData, i, CompleteTokenValueList);
                } catch (e) {
                  console.log(e, `error in interpreting function execution ${functionName}`);
                }
                if (skipInterpretation != 0) {
                  i = i + skipInterpretation;
                }
              }
              break;
            }
          }
        }
      } catch (e) {
        console.log(e, `Error in Interpreting token ${mutable_tokens[j]}`);
      }
      /* else if (token === "अन्यथा") {
        let result = HandleBlocks(mutable_tokens, j, result);
        // let StartofBlock = mutable_tokens[j + 1].startIndex;
        let EndofBlock = mutable_tokens[j + 1].EndIndex;
  
        let lastValue = kalaam.LastConditionValue.pop();
  
        if (lastValue) {
          j = EndofBlock;
        }*/
    }

    //#STEP 1- Cleaning the sourcedata and setting the 'result' to 'cleaned_sourcedata'

    //If a code is not working, it is probably because it's not cleaned properly.
    // console.log('cleaned_sourcedata:', cleaned_sourcedata);

    console.log('cleaned', cleaned_sourcedata);
    console.log('tokens:', tokens);
    console.log('memory:', memory);

    cleaned_sourcedata = GetCleanSourcedata(sourcedata, cleaned_sourcedata, mixedimpurity);

    //#STEP 2- - Parsing cleaned_sourcedata, adding each item depending on it's type to tokens array

    // PARSING INITIATION

    (function _parser() {
      for (i; i < cleaned_sourcedata.length; i++) {
        _analyzeToken(cleaned_sourcedata, i, tokens);

        //Code to skip improve a particular part of cleaned_sourcedata if it's being operated by two different functions.
        if (skipParsing != 0) {
          i = i + skipParsing;
        }
      }
    })();

    //CLEANING UP THE TOKENS ARRAY
    //Removing tokens with value = '', It was generated due to " cleaned_sourcedata = cleaned_sourcedata.replace(/(;|\n|\r)/gm, " ").split(' ')"

    //Filtering seemed unnecessary, removed for now.
    //tokens = tokens.filter(el => el.value != '')

    //variableArray = tokens.filter((el) => el.type === 'variable');

    //As of now, this is how the timeline looks

    //raw sourcecode -> cleaned_sourcedata -> tokens

    //#STEP 3 - evaluating conditions, running loops, executing functions finding values in memory and printing outputs

    //This is the final section
    //interpreting the code from syntax tree
    (function _interpretor() {
      for (let x = 0; x < tokens.length; x++) {
        //We will be having a copy of tokens as mutable_tokens
        interpretToken(tokens, x, memory);
        if (skipInterpretation != 0) {
          x = x + skipInterpretation;
        }
      }
    })();

    //This is where error handling kicks in

    //To find undefined variables

    function onlyUnique(value, index, arr) {
      return arr.indexOf(value) === index;
    }

    var assigned_variables = assigned_variables.filter(onlyUnique);

    var difference = variables_array.filter((x) => !assigned_variables.includes(x));

    if (difference.length > 0) {
      difference.forEach((el) => {
        kalaam.error.push(`Variable ${el} is undefined`);
      });
    }

    kalaam.linebylineOutput = kalaam.error.length > 0 ? kalaam.error : kalaam.output.split('\n');

    //time taken to transpile the code is t1-t0
    var t1 = performance.now(); // eslint-disable-line

    if (kalaam.error.length === 0) {
      let s = (t1 - t0).toPrecision(4);
      kalaam.TimeTaken = `सफल | speed - ${s} ms`;
    } else {
      kalaam.isError = true;

      kalaam.TimeTaken = 'Compilation Error: Check for assignement and declaration mistyping';
    }

    //kalaam.linebylineoutput is what you will finally see on output screen

    kalaam.linebylineOutput = kalaam.linebylineOutput.filter(function (item) {
      return item !== '';
    });

    kalaam.ExecutionStack = ExecutionStack;
    return kalaam;
  } catch (e) {
    console.log(e);
  }
}

export { Compile, KalaamKeywords };
