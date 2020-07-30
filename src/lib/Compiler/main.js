  
/*!
 * Kalaam v1.0.0
 * (C) 2020 Swanand Kadam
 * Released under the MIT License.
 */


 //SECTION - Importing function modules


//To check variable types: Number, String, Array etc.
import * as TypeCheck from '../TypeCheck/TypeChecking'

//To check other operations like MultiString, Arithmetic Operation etc.
import * as AdvancedTypeCheck from '../TypeCheck/AdvancedTypeChecking'

//To format user input into a proper String, Array or Condition. 
import * as BuildOperation from '../Scripts/BuildOperations'

//Functions imported to push a particular data to our Tokens array. 
//Tokens array is basically a clean, formatted and a word by word version of raw code provided by user
import
{
  PushArray,
  PushCalculation,
  PushConditionalKeyword,
  PushCondition,
  PushForLoop,
  PushWhileLoop,
  PushWhileLoopCondition,
  PushForLoopAruguments,
  PushExpression,
  PushKeyword,
  PushNumber,
  PushOperator,
  PushRealTimePrintOperation,
  PushString,
  PushStringandValueOperation,
  PushVariable,
  PushVariableValue,
  PushFunctionData,
  PushFunctionExecution,
  PushToArray,
  PushInput

}
from '../PushTokens/main'

//This are other helper functions that we need for a particular task. All of this functions will be explained indepth as we see them in codebase.
import
{
  GetCleanSourcedata,
  GetcleanedExpression,
  RemoveBrackets,
  Count,
  AddElementToArray,
  ResetValue,
  isArrayOperation,
  CreateArrayElement,
  CalculateValues,
  GetArrayorStringElement,
  SetArrayorStringElement,
  handlemultConditions,
  HandleBlocks,
  SplitElementsArray,
  SetValues,
  PushSetArrayIndexValue,
  PushGetArrayIndexValue,
  UpdateUpdated_tokenswithValues,
  GetConditionValue,
  AcceptInputandSetValue,
  ForLoopArrayorStringOutput,
  AssignorUpdateValues,
  HandleConditions,
  getLoopIndexStart,
  ForLoopSetMetadata,
  SetArrayIndexValue,
  AddtoExecutionStack
}
from '../Scripts/main.js'

  
//We will be importing this whole function to practise.vue and it will be executed when user clicks on 'RUN'

  export default function Compile(kalaam){



 //'kalaam' is our global object and access it's value as 'this.$data' from practise.vue located in views
//All the input sourcecode, tokens, output, error handling etc is stored in kalaam object



  //t0 along with t1 takes record of Time taken to run the code. t1-t0 gives us the exact time taken.
  var t0 = performance.now()

  //If an error is encountered we set the value to true and push the error to errors array.
  kalaam.isError = false

  //to stop accumulating output on succesive RUN. 
  kalaam.output = ''

  //kalaam.input = '',
  kalaam.linebylineOutput = kalaam.output.split("\n")
  //kalaam.inputIndexes = []
  kalaam.error = []
  kalaam.OperationObjects = []

  //Sourcedata is the raw code provided by use
  var sourcedata = kalaam.code;

  var LinebylineSourcedata=sourcedata.replace(/(?:\r\n|\r|\n)/g, 'line').split("line")
  //LinebylineSourcedata=LinebylineSourcedata.filter(el=>el!='')
  console.log('LinebylineSourcedata: ', LinebylineSourcedata);
  

  //This is where formatted and cleaned sourcedata will go.
  var cleaned_sourcedata = []
  var ExecutionStack=[]
  var i = 0;
  //This is where tokens will be pushed depending upon their types like Variable, function, loops etc.
  var tokens = [];

  //Experimental
  var mixedimpurity = []

  //The variables with their calculated values are pushed here. If c=a+b, updated_tokens is where you will find the calculated value
  var updated_tokens = []

  //Variable-value pairs similar to updated_tokens but limits itself to a user created function.
  var functionContextupdated_tokens = []

  var variables_array = []

  //Pushing the variables that are assigned to filter out defined and undefined variables. Useful in error handling
  var assigned_variables = []
  var terms = []
  var terms2 = []
  var operation = ''
  var CalculationStack = []
  var foundToken = ''
  var ReIntializedVariables = []

  //TO REMOVE DUPLICATE VARIABLES, 

  let variableArray = []
  //A temporary instance of a global variable. Used because of scoping issue, there are better soultions and we will do that.

  //emptying accumulated value 
  //See AssignorUpdateValues function for more
  ResetValue()

  //SECTION - Checking for type of characters. TypeCheck is an object which consists all self functions. Check Line 102

  const isVariable = TypeCheck.isVariable()
  
  const isNumber = TypeCheck.isNumber()

  const isOperator = TypeCheck.isOperator()

  const isKeyword = TypeCheck.isKeyword()
  const isConditionalKeyword = TypeCheck.isConditionalKeyword()
  const isForLoop = TypeCheck.isForLoop()
  const isWhileLoop = TypeCheck.isWhileLoop()
  const isFunction = TypeCheck.isFunction()

  //needs work
  const isExpression = TypeCheck.isExpression()

  const isArray = TypeCheck.isArray()
  const isInput = TypeCheck.isInput()

  const isSetArrayIndexValue = TypeCheck.isSetArrayIndexValue()

  // const isEmptyArrayInit = TypeCheck.isEmptyArrayInit()

  const isString = TypeCheck.isString()
  const isEmptyStringorChar = TypeCheck.isEmptyStringorChar()

  const isPureEval = AdvancedTypeCheck.isPureEval()

  //if parser encounters anything like (" or (, then that's a realtime print. 

  //buildstring will be applied now to create a string and push it into tokens. Buildstring is used to combine string tokens like 
  //['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

  //It's because cleaned_sourcedata is an array of tokens and each token is an individual word in a program.

  //It's recommended to look at cleaned_sourcedata of every program to understand how it converts plain text into array of individual words.

  const isRealTimePrintMultipleString = AdvancedTypeCheck.isRealTimePrintMultipleString()

  const isStringandValue = AdvancedTypeCheck.isStringandValue()

  const isCalculation = AdvancedTypeCheck.isCalculation()

  const isDirectPrintArithmetic = AdvancedTypeCheck.isDirectPrintArithmetic()

  //SECTION Build Operations 

  //To convert ['hello', 'Kalaam', 'developers', "!"] into 'hello kalaam developers!'.

  const BuildString = BuildOperation.BuildString()

  //To convert ['[', 'x','y','z',']'] into ['x','y','z']

  const BuildArray = BuildOperation.BuildArray()

  //self function is the first step to handlle operations like अगर (ageone==10 && AverageAge<1000 && agetwo>100 || ageone==10) OR (ageone==10 )

  const BuildCondition = BuildOperation.BuildCondition()

  //This will run for every प्रिंट() statement encountered in the program, not just for loops

  //ARGUMENTS TO PrintEngine are:
  //Tokens- Tokens array 
  //updated_tokens- Variable-value pairs of variables
  //j- Index of a token in Tokens array
  //global- self or self
  //iterator and OriginalIterator are used to print values in for and while loops.

  function PrintEngine(Tokens, updated_tokens, j, global, iterator, OriginalIterator)

  {

    //Try //console.log('Tokens, updated_tokens, j, global, iterator, OriginalIterator): ', Tokens, updated_tokens, j, global, iterator, OriginalIterator)); 
    //To understand what kind of data is necessary to print a value 

    //Getting the current token as token and value to be printed as NextTokenValue
    //e.g. For प्रिंट(Name), Name is the NextTokenValue and it is the one which we will have to print

    var token = Tokens[j].value

    var NextTokenValue = Tokens[j + 1].value

    var StringVar = []

    //Removing the brackets, if any. 
    var VariableToPrint = RemoveBrackets(NextTokenValue)

    //Adding the variable to variables_array

    if (isVariable(VariableToPrint) && !variables_array.includes(VariableToPrint))
    {

      variables_array.push(VariableToPrint)
      // 

    }

    //SECTION - Outputting the code
    // finding the variable value in updated_tokens. Updated_tokens is where our Variable-value pairs exists.
    //Try //console.log(updated_tokens) to see how it looks

    //This loop is only for printing direct values like print(name), print(array)
    updated_tokens.forEach((el, i) =>
    {

      //If we have a variable-value pair sitting in updated_tokens

      if (el.name == VariableToPrint)
      {

        //for calculations like x=ageone+agetwo

        //If we have already calculated value in assigned_variables, use that or else move forward

        if (assigned_variables.includes(el) || assigned_variables.includes(el.name))
        {

          AddOutput( el.value)

        }
        else
        {

          //if the value found is a Number

          if (isNumber(el.value))
          {

            AddOutput( el.value)

            assigned_variables.push(el.name);

          }

          //if the value found is operations like age=2020-1996
          else if (isPureEval(el.value))
          {

            //we are using Javascript's eval function to calculate direct arithmetic operations 
            let outputpure = eval(el.value)

            el.value = outputpure

            AddOutput( el.value)

            assigned_variables.push(el.name);

          }

          //We will simplify self conditions as we move forward
          else if (!isPureEval(el.value) && !isNumber(el.value))

          {

            if (!(el.name.includes(']') && el.name.includes('[')))
            {

              if (el.type == 'Array')
              {

                if (el.value.includes('[') == false)

                {

                  el.value = '[' + el.value.toString() + ']'

                }

              }

              AddOutput( el.value)

              assigned_variables.push(el.name);
            }

          }

        }

      }

    })

    //This is how we print Array in Kalaam
    if (Tokens[j + 1].type == 'Array')

    {

      //To run only if iterator is present

      //This runs on for loop - प्रिंट(Array[a]) etc

      //self runs only if for(i) and in the loop, array[i], not on array[x]. For loop Iterator and index should be same, in self case 'i'

      if (iterator != undefined && Tokens[j + 1].IndexInput == OriginalIterator)

      {

        let Value = NextTokenValue

        let ArrayElement = CreateArrayElement(Value, iterator)

        let output = GetArrayorStringElement(ArrayElement, updated_tokens)
        

       output=output.replace(/'/g,'')
      output=output.replace(/"/g,'')

        AddOutput( output)

        assigned_variables.push(Tokens[j + 1]);

      }

      //This runs to Print(Array[2]) like specific array values
      else if (Tokens[j + 1].IndexInput != OriginalIterator)

      {

        let Value = NextTokenValue

        let IndexToChange = Tokens[j + 1].IndexInput

        let ArrayElement = CreateArrayElement(Value, IndexToChange)

        let element = ArrayElement.replace(']', '')

        let Split = element.split('[')

        if (Split[1].includes('-') || Split[1].includes('+'))
        {

          let output = CalculateValues(Split[1], j, updated_tokens)

          Split[1] = output

          Split = Split.join('[') + ']'
          ArrayElement = Split

        }

        let token = updated_tokens.find(el => el.name == Split[1])

        if (token != undefined && OriginalIterator != Split[1])
        {

          Split[1] = token.value

          Split = Split.join('[') + ']'
          ArrayElement = Split

        }
        else
        {

          ArrayElement = ArrayElement
          ////console.log('ArrayElement: ', ArrayElement);

        }

        let output = GetArrayorStringElement(ArrayElement, updated_tokens)

        AddOutput( output)

      }

    }

    //printing direct numbers and direct calcultions like print(10), print(10*10)
    else if (token == 'प्रिंट' && (isPureEval(RemoveBrackets(NextTokenValue)) || isNumber(RemoveBrackets(NextTokenValue))))
    {

      NextTokenValue = RemoveBrackets(NextTokenValue)

      if (isNumber(NextTokenValue) && Tokens[j + 1].type != 'Calculation')

      {

        AddOutput( NextTokenValue)

      }
      else
      {

        let a = eval(NextTokenValue)

        AddOutput( a)

      }

    }

    //foroperations like print('you live, you learn')
    else if (Tokens[j + 1].mode == "RealTimePrint" && !NextTokenValue.includes('+') && !NextTokenValue.includes('='))

    {

      let output = RemoveBrackets(NextTokenValue)

      output = output.replace(/"/g, '');
      output = output.replace(/'/g, '');

      AddOutput( output + "\n")

    }

    //operations like print(Age + 'is young age') i.e string concatenations
    else if (Tokens[j + 1].mode == "RealTimePrint" && NextTokenValue.includes('+'))
    {

      let x = SplitElementsArray(NextTokenValue)
      

      StringVar = SetValues(x, updated_tokens)

      StringVar = StringVar.join('')
      StringVar = StringVar.split("+")

    

      let output = StringVar.join(' ')

      output = output.replace(/"/g, '');
      output = output.replace(/'/g, '');
      output = RemoveBrackets(output)

      AddOutput( output + "\n")

    }
    else if (isCalculation(RemoveBrackets(NextTokenValue)) && Tokens[j + 1].mode != "RealTimePrint")

    {

      NextTokenValue = RemoveBrackets(NextTokenValue)

      let output = CalculateValues(NextTokenValue, j, updated_tokens)
      
      

      AddOutput( output + "\n")

    }



   let message= ' Computer ने आपकी दी गयी वैल्यू, ' + RemoveBrackets(NextTokenValue) + ' को प्रिंट() किया है |'

//This is the experession whcih is getting evealuated. 



  let expression= token + NextTokenValue

  expression=GetcleanedExpression(expression)
  
  let flag=true
  
  LinebylineSourcedata.forEach((el,index)=>{

   el=GetcleanedExpression(el)
    
    
    
    if(el.includes(expression) && flag==true)
    
    
    
    {


      AddtoExecutionStack(ExecutionStack,'प्रिंट()', 'किसी VALUE को OUTPUT SCREEN पे दिखाने के लिए प्रिंट() का उपयोग होता है।   ', VariableToPrint ,'', message,index+1)
     flag=false
    
    }
  })

  
  
  


  }

  //END OF Functions and Imported Functions

  //Out of all self function, PrintEngine is very important function. It prints variable values by searching their value in updated_tokens.

  //SECTION - Checking each token and adding to tokens array

  //Parse takes two arguments. The cleaned_sourcedata array and current index of cleaned_sourcedata array

  //Parse is used to create a tokens array with each token having it's name, value, type and other metadata

  //It performs operations depending upon whether the element is variable, array, function, loop etc.

  function Parse(cleaned_sourcedata, i)
  {

    var element = cleaned_sourcedata[i];

    var string = []

    //Push variables to tokens
    //Format: {type: "variable", value: "ReverseString"}

    if (isVariable(element) == true)
    {

      //Here we seperate Message = 'Hello' into following three tokens :

      //1: {type: "variable", value: "Message"} 

      //2: {type: "operator", value: "="}

      //3: {type: "value", value: "Hello"}

      if (cleaned_sourcedata[i + 1] == '=')
      {

        PushVariable(element, tokens)

        //If we already have the variable declared before, push it to ReIntializedVariables array

        if (variableArray.includes(element))
        {

          let x = tokens.find(el => el.value == element)

          let index = tokens.indexOf(x)

          ReIntializedVariables.push(
          {
            name: element
          })

          //

          //tokens[index+2].value= cleaned_sourcedata[i+2]

        }

        variableArray.push(element)

      }
      else if (cleaned_sourcedata[i - 1] == '=')
      {

        PushVariableValue(element, tokens)

      }

      //Push variables to tokens

    }
    else if (isNumber(element) == true)
    {

      PushNumber(element, tokens)

      //Push EmptyStrings to tokens

    }
    else if (isEmptyStringorChar(element) == true)
    {

      //In some cases empty strings will be modified into something like "'" or '"'
      //We convert it back to " "
      if (element.length > 1 && (element.charAt(0) == "'" || element.charAt(0) == '"'))
      {

        element = element.replace(/['"]+/g, '')

      }
      else
      {

        element = " "
      }

      PushVariableValue(element, tokens)

      //Push Input to tokens
      //Format: {type: "AcceptInput", value: " ", AcceptAs: "Message"}

    }
    else if (isInput(element) == true)

    {

      PushInput(element, tokens, cleaned_sourcedata, i)

      //Push operators to tokens. The accepted operators are =,},{
      //Format: {type: "operator", value: "="}    

    }
    else if (isOperator(element) == true)
    {

      PushOperator(element, tokens)

      //Push keyowrds to tokens. The accepted keywords is प्रिंट

      //Format: {type: "keyword", value: "प्रिंट"}

    }
    else if (isKeyword(element) == true)
    {

      PushKeyword(element, tokens)

      //Push functions to tokens
      //Format: {type: "function", value: "First", arguments: Array(2), FunctionInvocationExists: false, FunctionStack: Array(0), …}

    }
    else if (isFunction(element) == true)
    {

      PushFunctionData(element, tokens, cleaned_sourcedata, i)

    }

    // Push array to tokens
    //Format: {type: "Array", value: "[]"}
    else if (isArray(element) == true)
    {

      if (element.charAt(element.length - 1) == ']')
      {

        PushArray(element, tokens)

      }
      else
      {

        //To convert '[',1,2,3,4,']'  into [1,2,3,4]

        let BuiltArray = BuildArray(element, i, cleaned_sourcedata)

        PushArray(BuiltArray, tokens)

      }
    }

    //For operations like Numbers[a]=a
    //Format: {type: "SetArrayIndexValue", value: "Fibonacci[a]", ValueToSet: "a"}
    else if (isSetArrayIndexValue(element, cleaned_sourcedata, i) == true)
    
    {

      PushSetArrayIndexValue(element, tokens, cleaned_sourcedata, i);

      cleaned_sourcedata.splice(i+1, 1);
     // cleaned_sourcedata.splice(i+2, 1);
      //cleaned_sourcedata.splice(i+3, 1);


    }

    //For operations like a=Numbers[a], reverse of above
    //Format: {type: "GetArrayIndexValue", value: "Fibonacci[a-2]"}
    else if (isSetArrayIndexValue(element, cleaned_sourcedata, i) == false)
    {

      PushGetArrayIndexValue(element, tokens, cleaned_sourcedata, i)

    }

    //Push conditions to tokens. The accepted keywords are अगर, जबतक, अन्यथा
    // Format: {type: "conditionalkeyword", value: "अगर"}
    else if (isConditionalKeyword(element) == true)
    {

      //Push while loops to tokens
      //Format: {type: "WhileLoopStart", value: "जबतक"}, {type: "condition", value: "count<25"}

      if (isWhileLoop(element) == true)
      {

        PushWhileLoop(element, tokens, cleaned_sourcedata, i)

      }
      else
      {

        PushConditionalKeyword(element, tokens)
      }

      //This is how we push conditions encountered in the sourcecode
      //Format:{type: "condition", value: "a<3"}
      let foundcondition = BuildCondition(element, i, cleaned_sourcedata)

      //Push conditions to tokens array
      PushCondition(foundcondition, tokens)

    }

    //Finding operations like Numbers.पुश(x) 
    //Format: {type: "PushToArray", value: "Numbers.पुश(x)"}
    else if (element.includes('पुश'))

    {

      PushToArray(element, tokens)

    }

    //Push For loop to tokens
    // Format: 
    // {type: "ForLoopStart", value: "दुहराओ"}
    // {type: "ForLoopArguments", iterator: "a", value: "(0,25)", iterationStart: "0", iterationEnd: "25"}
    else if (isForLoop(element) == true)
    {

      PushForLoop(element, tokens)
      PushForLoopAruguments(element, cleaned_sourcedata, i, tokens)

      updated_tokens.push(
      {

        name: cleaned_sourcedata[i + 1],
        value: 0,
        type: 'ForLoopIterator'

      })

    }

    //Pushing basic Calculations like 'length-1' to tokens
    //Format: {type: "Calculation", value: "length-1"}
    else if (isCalculation(element) == true)
    {

      let element = ''

      if (cleaned_sourcedata[i + 1] != undefined)
      {

        // self is to perform long calculations like AverageAge=(ageone+agetwo)/2 + (ageone+agetwo)*2

        while (isCalculation(cleaned_sourcedata[i]))

        {

          element = element + cleaned_sourcedata[i];

          i++;

        }

      }

      terms = element.split('')

      //removing the "("" and ")"

      var CleanedElement = RemoveBrackets(element)

      // to stop prevention of expressions like is"+ getting added as a calculation
      if (!(CleanedElement.includes('"')) && element.charAt(0) != '/' && element.charAt(0) != '*' && element.charAt(0) != "'")
      {

        PushCalculation(element, tokens, cleaned_sourcedata, i)

      }

    }

    //finding operations like print(x + 'y'). The RealTimePrint operations

    //Format: {type: "value", value: "('Reversed String-'+ ReverseString)", mode: "RealTimePrint"}
    else if (isRealTimePrintMultipleString(element) == true)
    {

      let foundString = ''

      let k = i

      let conditionEnd = element.charAt(element.length - 1) + element.charAt(element.length - 2)

      var flag = 0;

      for (k; k < cleaned_sourcedata.length; k++)
      {

        let element = cleaned_sourcedata[k]
        let conditionEnd = element.charAt(element.length - 1) + element.charAt(element.length - 2)

        if (element.includes('दुहराओ') || element.includes('रचना') || element.includes('अन्यथा') || element.includes('इनपुट') || element.includes('पुश') || element.includes('प्रिंट') || element.includes('अगर') || cleaned_sourcedata[k + 1] == '=' || element == '}')
        {

          break;

        }

        if (conditionEnd == ')"')

        {

          foundString = foundString + ' ' + cleaned_sourcedata[k];
          break;

        }
        else if (flag == 1)
        {

          foundString = foundString + ' ' + cleaned_sourcedata[k]

        }
        else if (flag == 0)
        {

          foundString = cleaned_sourcedata[k];

          flag = 1;

        }

      }

      if ((!foundString.includes(">")) && (!foundString.includes('/')) && (!foundString.includes('*')) && (!foundString.includes('<')) && (!foundString.includes('==')))

      {

        ////console.log('foundString: ', foundString);
        PushRealTimePrintOperation(foundString, tokens)

      }

    }

    //storing only the string values to tokens ( not the strings in print statements)
    else if (isString(element))

    {

      let calculatedString = BuildString(element, i, cleaned_sourcedata)

      calculatedString = calculatedString.replace(/['"]+/g, '')

      if (!(calculatedString.includes("प्रिंट")))

        PushString(calculatedString, tokens)

    }

    //An extension of isKeyword() function
    // Needs improvement
    else if (/^(?=.*?प्रिंट)(?=.*[a-z])/.test(element))
    {

      PushKeyword(element.slice(0, 6), tokens); //Pushing print keyword only

      PushExpression(element.slice(6), tokens) //Pushing remaining expression like (a), (Message) etc
    }

    //error prone change made here- Pushing expression in here
    //Used to push functions and expressions
    //Unnecessary data is being passed through kalaam.
    //This was created for a temporary fix
    else if (isExpression(element) == true && !isCalculation(element) && !element.includes('[') && !element.includes(']') && (!isConditionalKeyword(cleaned_sourcedata[i - 1])) && (cleaned_sourcedata[i - 1] != 'मे' && cleaned_sourcedata[i - 1] != 'रचना'))
    {

      let CheckFunctionExpression = element.split('(')

      let passedValues = RemoveBrackets(CheckFunctionExpression[1])
      passedValues = passedValues.split(',')
      let token = tokens.find(el => el.value == CheckFunctionExpression[0])

      if (token != undefined)
      {

        PushFunctionExecution(element, tokens, cleaned_sourcedata, i, passedValues)

      }
      else
      {

        PushExpression(element, tokens)
      }

    }
    else if (isExpression(element) == true && element.includes('[') && element.includes(']'))
    {

      PushArray(element, tokens)

    }

    //This is experimental. For now, you can just neglect self
    else if (!isKeyword(element) && !isNumber(element) && !isVariable(element) && !isExpression(element) && !isOperator(element))
    {

      //ANCHOR 
      /*Hnadling Impurity error-The main problem is figuring out how to solve "=7000" like things
      instead asking developers to add space manually
      Handling Alphanumeric strings to solve issues like ' anna=2362934'

      let impurity = element.split('=')

      let findString = impurity[1]


      //to accept long numbers i.e a=749374593745937

      if (isVariable(impurity[0]) && isNumber(impurity[1])) {


          impurity[2] = impurity[1];
          impurity[1] = '=';

      }

      //to accept a=STRING
      if (isVariable(impurity[0]) && isVariable(impurity[1])) {


          impurity[2] = impurity[1];
          impurity[1] = '=';

      }



      impurity.forEach((element, i) => {

          if (isVariable(element) == true) {



              PushVariable(element, tokens)


              //continue;
          }

          // ANCHOR 

          //Issue: Right now, only isNumber is resolved, a=, =23828qw aren't resolved.
          //Solution: Work on all the modules


          if (isNumber(element) == true) {


              PushNumber(element, tokens)

          }

          //ANCHOR 
          //You might have to remove self extra filters since you are only working on numbers (Future Issue)
          if (isOperator(element) == true) {
              PushOperator(element, token)

          }



          if (isKeyword(element) == true) {

              PushKeyword(element)

          }

          if (isExpression(element) == true) {


              PushExpression(element, tokens)

          }




      })
         */

    }

  }

  //The final stage of adding an output to output stack i.e. kalaam.output or kalaam.output

  function AddOutput( value)
  {

    kalaam.output = kalaam.output + value + "\n";

  }

  
  
  
  //#STEP 1- Cleaning the sourcedata and setting the 'result' to 'cleaned_sourcedata'

 
 
 
 //If a code is not working, it is probably because it's not cleaned properly. 
  cleaned_sourcedata = GetCleanSourcedata(sourcedata, cleaned_sourcedata, mixedimpurity)
  console.log('cleaned_sourcedata: ', cleaned_sourcedata);


  
  

  
  
  //#STEP 2- - Checking each token and adding to tokens array
  
  
  
  //Parsing every single element from cleaned_sourcedata array and pushing it to Tokens depending upon the type pf element

  // PARSING INITIATION

  for (i; i < cleaned_sourcedata.length; i++)
  {

    Parse(cleaned_sourcedata, i)
  }

  //CLEANING UP THE TOKENS ARRAY
  //Removing tokens with value = '', It was generated due to " cleaned_sourcedata = cleaned_sourcedata.replace(/(;|\n|\r)/gm, " ").split(' ')"

  tokens = tokens.filter(el => el.value != '')
  console.log('tokens: ', tokens);
  
  

  
  
  //#STEP 3 - evaluating conditions, finding values in updated_tokens and printing outputs

  
  
  //As of now, self is how the timeline looks

  //raw sourcecode -> cleaned_sourcedata -> tokens 

  //This is the final section

  for (var j = 0; j < tokens.length; j++)
  {

    //We will be having a copy of tokens as mutable_tokens 

    let mutable_tokens = tokens

    //token value
    var token = mutable_tokens[j].value
    

    //type of token like variable, array, function, loops etc
    let tokenType = mutable_tokens[j].type

    var StringVar = []

    let VarWithoutbrackets = RemoveBrackets(mutable_tokens[j].value)
    

    VarWithoutbrackets = VarWithoutbrackets.replace(/ /g, '')

    if (tokenType == "SetArrayIndexValue")

    {

      SetArrayIndexValue(mutable_tokens, j, j, updated_tokens, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

    }
    else if (token == '=')
    {

      AssignorUpdateValues(mutable_tokens, j, updated_tokens, iterator, OriginalIterator, self, ExecutionStack,LinebylineSourcedata)
      

    }
    else if (tokenType == 'PushToArray')
    {

      AddElementToArray(mutable_tokens, j, updated_tokens,ExecutionStack,LinebylineSourcedata)

    }
    else if (token == 'अन्यथा')

    {

      let result = HandleBlocks(mutable_tokens, j, result)
      let StartofBlock = mutable_tokens[j + 1].startIndex
      let EndofBlock = mutable_tokens[j + 1].EndIndex

      let lastValue = kalaam.LastConditionValue.pop()

      if (lastValue == true)

      {

        j = EndofBlock

      }

    }
    else if (tokenType == 'AcceptInput')
    {

      AcceptInputandSetValue(mutable_tokens, j, updated_tokens,ExecutionStack,LinebylineSourcedata)

    
      

    }

    //Whenever we encounter a function, we create a seperate execution context 
    else if (tokenType == 'function')
    {

      //We are preparing the required data to execute a function call later in the prgroam

      //functionsourcedata includes all the tokens from tokens array which belongs to a particular function

      //We find self range or a function block through HandleBlocks function

      let functionSourceData = []

      let result = HandleBlocks(mutable_tokens, j + 1, functionSourceData)

      functionSourceData = result.StoreResult

      //To identify function context in tokens array

      functionSourceData.forEach(el =>
      {

        el.context = 'function'
      })

      mutable_tokens[j].SourceData = functionSourceData


      let message='इस रचना का नाम '+ token+ ' है जिसे हम कोड में बाद में NEW VALUES पास करके उपयोग कर सकते है|'

      let expression= 'रचना '+ token
      let Linenumber=''
      //console.log('expression: ', expression);

LinebylineSourcedata.forEach((el,i)=>{

if(el.includes(expression))
{

Linenumber=i+1

}


})



      AddtoExecutionStack(ExecutionStack,'रचना', ' एक विशिष्ट रूप से लिखा गया कोड जिसका हम बार बार उपयोग कर सकते है | ', result ,functionSourceData, message,Linenumber)


    }

    //We are out of the fucntion execution context and back to global execution context
    else if (tokenType == 'condition')

    {

      let element = mutable_tokens[j].value

      //self function is the first step to calculate value of operations like अगर (ageone==10 && AverageAge<1000 && agetwo>100 || ageone==10) OR (ageone==10 )

      let ConditionValue = GetConditionValue(element, updated_tokens, j)
      
      kalaam.LastConditionValue.push(ConditionValue)

      //if value is false, just skip the if loop context, if not it will be ran in final print module

      if (ConditionValue == false)
      {

        let InitializeLoop = tokens.indexOf(mutable_tokens[j])

        //Handle Blocks is a function which takes care of nested block by taking care of nested { and } brackets
        //it uses the stack to push and pop brackets to accurately identify start and the end of the block
        let Returnvalue = HandleBlocks(mutable_tokens, j)

        j = Returnvalue.j

        var message= 'कंडीशन '+ element+' , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा '
        

      }

      else{
        var message= 'कंडीशन '+ element+ ' , TRUE(सत्य) होने के कारन COMPUTER आगे के कोड को रन करेगा '
        


      }


let expression= element





expression=GetcleanedExpression(expression)


LinebylineSourcedata.forEach((el,index)=>{

el=GetcleanedExpression(el)

if(el.includes(expression))

{

  AddtoExecutionStack(ExecutionStack,'अगर', 'एक Certain Condition के तहत कोड Execution को Allow करता है। ', element, ConditionValue  , message,index+1)

}





})


      

    }

    //So that we don't print a same value twice. First in global execution context and the in function context

    //This one prints the global context values
    else if (token == 'प्रिंट' && mutable_tokens[j].context != 'function')

    {

      PrintEngine(mutable_tokens, updated_tokens, j, self) //for operations like print(array[3])

    }

    //This runs our while loop .i.e जबतक
    else if (tokenType == 'WhileLoopStart')
    {

      let TokensCurrentIndex = j + 3

      let ConditionValue = false

      let element = mutable_tokens[j + 1].value
      

      let ExtratcedVariable = []

      let variable = ''
      let WhileLoopSourcedataIndexStart = 0
      let WhileLoopSourcedataTokens = []

      for (let i = 0; i < element.length; i++)
      {
        let x = element.charAt(i)

        if (isVariable(x))

        {

          variable = variable + x

        }
        if (!isVariable(element.charAt(i + 1)) && isVariable(x))
        {

          let token = updated_tokens.find(el => el.name == variable)

          ExtratcedVariable.push(
          {
            variable: variable,
            value: token.value

          })

          variable = ''

        }

      }

      function getWhileLoopSourcedata(startIndex, mutable_tokens, check, StoreResult)
      {

        StoreResult = HandleBlocks(mutable_tokens, startIndex, StoreResult)

        return StoreResult

      }

      WhileLoopSourcedataIndexStart = getLoopIndexStart(mutable_tokens, j, '{', WhileLoopSourcedataIndexStart)

      WhileLoopSourcedataTokens = getWhileLoopSourcedata(WhileLoopSourcedataIndexStart, mutable_tokens, '}', WhileLoopSourcedataTokens).StoreResult
 
      let message='जबतक ' + element + ' सही होगा तब तक आगे का कोड रन किया जायेगा '

      let Linenumber=''
      //console.log('element: ', element);
      
      LinebylineSourcedata.forEach((el,i)=>{


        if(el.includes(element))
        
        {

          AddtoExecutionStack(ExecutionStack,'जबतक', 'जबतक में दिए हुए शर्त(Condition) के पूरा होने तक आगे के कोड को रन करे |', element, WhileLoopSourcedataTokens  , message,i+1)



        }


      })


      //constantly accessing the conditionvalue

      while (GetConditionValue(element, updated_tokens, j + 1))
      {

        for (let i = 0; i < WhileLoopSourcedataTokens.length; i++)
        {

          //SECTION while loop context

          if (WhileLoopSourcedataTokens[i].value == '=')
          {

            AssignorUpdateValues(WhileLoopSourcedataTokens, i, updated_tokens,'','','',ExecutionStack,LinebylineSourcedata)
            
            

          }
          else if (WhileLoopSourcedataTokens[i].type == 'AcceptInput')
          {

            AcceptInputandSetValue(WhileLoopSourcedataTokens, i, updated_tokens,ExecutionStack)

          }

          // Handling CONDITIONAL statements in While loop
          else if (WhileLoopSourcedataTokens[i].type == 'condition')

          {

            //if index returns a value, it means condition is false and skip the execution

            let index = HandleConditions(WhileLoopSourcedataTokens, i, updated_tokens)

            if (index != undefined)
            {
              i = index

            }
            else
            {
              i = i
            }

          }

          //Handling प्रिंट statements in while loop
          else if (WhileLoopSourcedataTokens[i].value == 'प्रिंट')

          {

            PrintEngine(WhileLoopSourcedataTokens, updated_tokens, i, self,ExecutionStack) //for operations like print(array[3])

          }

          //operations like Numbers[a]='xyz'
          else if (WhileLoopSourcedataTokens[i].type == "SetArrayIndexValue")

          {

            SetArrayIndexValue(WhileLoopSourcedataTokens, i, j, updated_tokens, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

          }

        }

      }

      //End of While loop execution

      //Handling For loops 

    }
    else if (tokenType == 'ForLoopStart')

    {

      var FlagPrimalLoop = 0

      var SourcedataTokens = []

      let ForLoopMetaData = ForLoopSetMetadata(mutable_tokens, j, updated_tokens)
      

      var ForLoopSourcedataIndexStart = ForLoopMetaData.ForLoopSourcedataIndexStart
      var Cycle = ForLoopMetaData.Cycle

      var OriginalIterator = ForLoopMetaData.OriginalIterator
      var IterationStart = ForLoopMetaData.IterationStart
      var IterationEnd = ForLoopMetaData.IterationEnd

      var iterator = ForLoopMetaData.iterator
      var element = ForLoopMetaData.element
      var elementValue = ForLoopMetaData.elementValue

      function getSourcedata(startIndex, mutable_tokens, check, StoreResult)
      {

        let Returnvalue = HandleBlocks(mutable_tokens, startIndex, StoreResult)
        StoreResult = Returnvalue.StoreResult

        return StoreResult

      }

      ForLoopSourcedataIndexStart = getLoopIndexStart(mutable_tokens, j, '{', ForLoopSourcedataIndexStart)

      SourcedataTokens = getSourcedata(ForLoopSourcedataIndexStart, mutable_tokens, '}', SourcedataTokens)
      

      SourcedataTokens.forEach(el =>
      {

        el.isNestedLoop = false

      })

      //Checking if the for loop has one more for loop inside it
      let FindNestedLoop = SourcedataTokens.find(el => el.type == 'ForLoopStart')

      if (FindNestedLoop != undefined)
      {

        let NestedLoopindex = SourcedataTokens.indexOf(FindNestedLoop) + 3
        let NestedLooplength = (SourcedataTokens[NestedLoopindex].EndIndex - SourcedataTokens[NestedLoopindex].startIndex) + 2

        //if we have a nested loop, set isNesteLoop to TRUE

        for (let x = NestedLoopindex; x < NestedLoopindex + NestedLooplength; x++)
        {

          SourcedataTokens[x].isNestedLoop = true

        }

      }

      if (element.includes('(') && element.includes(','))

      {

        FlagPrimalLoop = 1

      }

      //Iterating over forloop sourcedata
      //self line 'iterator <= Cycle' determines start of the loop and the duration of the loop

let message='दुहराओ के अंदर लिखे गए कोड को '+IterationStart+' से '+ IterationEnd + ' तक, मतलब '+ eval((IterationEnd-IterationStart)+1)  + ' बार RUN(रन) किया जायेगा |' + 'इसमें Computer, '+ iterator+' को Memory में, '+ IterationStart + ' से ' + IterationEnd +  ' तक क़ीमत(Values) सेट करता जाएगा|' 

//This is the experession whcih is getting evaluated. 
let expression= 'दुहराओ ' + iterator +' को ' + mutable_tokens[j+1].value + ' मे'

let Linenumber= LinebylineSourcedata.indexOf(expression)
Linenumber=Linenumber+1

      AddtoExecutionStack(ExecutionStack,'दुहराओ', 'एक ही कोड को बार-बार दोहराना। ', SourcedataTokens, ''  , message, Linenumber)


      for (iterator = IterationStart; iterator <= Cycle; iterator++)
      
      {

        let forloopindex = updated_tokens.find(el => el.name == OriginalIterator)

        forloopindex.value = iterator

        //flag to avoid running self code if loop is primal because the payload needs to be compeltely different
        if (FlagPrimalLoop = 0)
        {
          ForLoopArrayorStringOutput(elementValue, iterator, updated_tokens, self)

        }

        for (let i = 0; i < SourcedataTokens.length; i++)

        {

          let isNested = SourcedataTokens[i].isNestedLoop

          //This code runs only if we have a nested loop situation

          if (SourcedataTokens[i].type == 'ForLoopStart')
          {

            var NestedFlagPrimalLoop = 0

            var NestedSourcedataTokens = []

            let NestedForLoopMetaData = ForLoopSetMetadata(SourcedataTokens, i, updated_tokens)
            var NestedForLoopSourcedataIndexStart = NestedForLoopMetaData.ForLoopSourcedataIndexStart
            var NestedCycle = NestedForLoopMetaData.Cycle + 1
            var NestedOriginalIterator = NestedForLoopMetaData.OriginalIterator
            var NestedIterationStart = NestedForLoopMetaData.IterationStart
            var Nestediterator = NestedForLoopMetaData.IterationStart
            var Nestedelement = NestedForLoopMetaData.element
            var NestedelementValue = NestedForLoopMetaData.elementValue

            function getSourcedata(startIndex, SourcedataTokens, check, StoreResult)
            {

              let Returnvalue = HandleBlocks(SourcedataTokens, startIndex, StoreResult)
              StoreResult = Returnvalue.StoreResult

              return StoreResult

            }

            NestedForLoopSourcedataIndexStart = getLoopIndexStart(SourcedataTokens, i, '{', NestedForLoopSourcedataIndexStart)

            NestedSourcedataTokens = getSourcedata(NestedForLoopSourcedataIndexStart, SourcedataTokens, '}', NestedSourcedataTokens)

            for (Nestediterator; Nestediterator < NestedCycle; Nestediterator++)
            {
              {

                let y = Nestediterator

                let Nestedforloopindex = updated_tokens.find(el => el.name == NestedOriginalIterator)

                Nestedforloopindex.value = y

                for (let index = 0; index < NestedSourcedataTokens.length; index++)
                {

                  let el = NestedSourcedataTokens[index]

                  if (el.value == 'प्रिंट')

                  {

                    PrintEngine(NestedSourcedataTokens, updated_tokens, index, self, y, NestedOriginalIterator,)

                  }
                  else if (el.value == '=' && el.isNestedLoop == true)
                  {

                    AssignorUpdateValues(NestedSourcedataTokens, index, updated_tokens, y, NestedOriginalIterator)

                  }
                  else if (el.type == 'condition' && el.isNestedLoop == true)

                  {

                    let ConditionStartIndex = index
                    let condition = NestedSourcedataTokens[index].value
                    //HandleConditions evaluates condition and return the index of from where printing should resume

                    //value of i depends on the conditions

                    let value = GetConditionValue(condition, updated_tokens, index)
                    

                    kalaam.LastConditionValue.push(value)

                    if (value == false)
                    {

                      break

                    }

                  }
                  else if (el.type == "SetArrayIndexValue" && el.isNestedLoop == true)

                  {

                    SetArrayIndexValue(NestedSourcedataTokens, i, j, updated_tokens, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

                  }

                }

              }

            }

          }
          else if (SourcedataTokens[i].value == '=' && isNested == false)
          {

            //assigning values to variables in a for loop

            AssignorUpdateValues(SourcedataTokens, i, updated_tokens, iterator, OriginalIterator,global,ExecutionStack,LinebylineSourcedata)
            

          }
          else if (SourcedataTokens[i].type == 'PushToArray')

          {

            AddElementToArray(SourcedataTokens, i, updated_tokens,ExecutionStack,LinebylineSourcedata)

          }
          else if (SourcedataTokens[i].type == 'AcceptInput')
          {

            AcceptInputandSetValue(SourcedataTokens, i, updated_tokens)

          }

          //Handling print statements in for loop
          else if (SourcedataTokens[i].value == 'प्रिंट' && isNested == false)

          {

            PrintEngine(SourcedataTokens, updated_tokens, i, self, iterator, OriginalIterator)

          }

          //Handling set array element statements in for loop
          else if (SourcedataTokens[i].type == "SetArrayIndexValue")

          {

            SetArrayIndexValue(SourcedataTokens, i, j, updated_tokens, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

          }

          // Handling CONDITIONAL statements in for loop
          else if (SourcedataTokens[i].type == 'condition')

          {

            let ConditionStartIndex = i
            let condition = SourcedataTokens[i].value
            
            //HandleConditions evaluates condition and return the index of from where printing should resume
            //value of i depends on the conditions

            if (condition.includes('||') || condition.includes('&&'))

            {

              let value = GetConditionValue(condition, updated_tokens, i)

              //Experimental
              kalaam.LastConditionValue.push(value)

              if (value == false)
              {

                let BlockLength = 0
                let BlockStart = 0

                while (SourcedataTokens[i].value != '{')

                {

                  if (SourcedataTokens[i + 1].value == '{')

                  {

                    BlockLength = SourcedataTokens[i + 1].EndIndex - SourcedataTokens[i + 1].startIndex

                    i = BlockLength + i + 1

                    break;

                  }

                  i++
                }

              }
              else
              {

                i = i

              }

            }
            else
            {

              i = HandleConditions(SourcedataTokens, i, updated_tokens);

             
    
    
              let expression= condition
              let Linenumber=''

expression=GetcleanedExpression(expression)

LinebylineSourcedata.forEach((el,index)=>{

el=GetcleanedExpression(el)
if(el.includes(expression))
{


Linenumber=index


}

})
              if (i != undefined)
              {

                i = i
                let message= 'कंडीशन '+ condition+' , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा '
                AddtoExecutionStack(ExecutionStack,'अगर', 'एक Certain Condition के तहत कोड Execution को Allow करता है। ', condition, ''  , message,Linenumber+1)



              }
              else
              {
                i = ConditionStartIndex

                let message= 'कंडीशन '+ condition+ ' TRUE(सत्य) होने के कारन COMPUTER आगे के कोड को रन करेगा '
                AddtoExecutionStack(ExecutionStack,'अगर', 'एक Certain Condition के तहत कोड Execution को Allow करता है। ', condition, ''  , message,Linenumber+1)


              }

      
       
              

            }
      
           
            

            

          }

        }

      }

      j = j + SourcedataTokens.length

    }

    //END FOR LOOP EXECUTION
    else if (tokenType == 'functionExecution')
    {

      //checking if function is invoked somewhere later in the program

      //If we see a function execution call, for e.g Add(x,y), we prepare for execution

      let functionSourceData = []

      let functionName = mutable_tokens[j].value

      let passedValues = mutable_tokens[j].passedValues

      let functionToken = mutable_tokens.find(el => el.value == functionName)

      let functionArguments = functionToken.arguments

      functionSourceData = functionToken.SourceData

      //Creating a seperate execution context and setting fucntion context name:value pair in functionContextupdated_tokens

      //for e.g x=3, y=4 is already defined and then we execute add(x,y)

      // This is an updated_tokens form limited to function context

      //Operating on function arguments and setting their values. For e.g the function add(x,y) might be called as add(3,4)

      //so we set x=3, y=4 and set self variable-value pair in functionContextupdated_tokens

      functionArguments.forEach((el, index) =>
      {

        let val = passedValues[index]

        val = val.replace(/"/g, "");
        val = val.replace(/'/g, "");

        passedValues[index] = val

        //in self code we are filtering out arguments passed based on whether they already exist in updated tokens or not

        let FindInUpdatedTokens = updated_tokens.find(el => el.name == val)

        //For passing same argument and same value to function  e.g function foo (fibonacci) and fibonacci is already declared with some value
        if (FindInUpdatedTokens == undefined)
        {

          functionContextupdated_tokens.push(
          {

            name: el,

            value: val,

            identifier: j + index,
            type: 'value',
            context: 'FunctionExecutionContext'

          })

        }

        //For passing different argument and value to function  e.g function foo (arr) and arr doesn't exist anywhere in tokens.
        else if (el != FindInUpdatedTokens.name && FindInUpdatedTokens != undefined)
        {

          functionContextupdated_tokens.push(
          {

            name: el,

            value: FindInUpdatedTokens.value,

            identifier: j + index,
            type: FindInUpdatedTokens.type,
            context: 'FunctionExecutionContext',
            IntheEndSetValueto: val

          })

        }
        else
        {

          functionContextupdated_tokens.push(
          {

            name: el,

            value: val,

            identifier: j + index,
            type: FindInUpdatedTokens.type,
            context: 'FunctionExecutionContext',
            IntheEndSetValueto: val

          })

        }

      });

      //Building a complete variable-value pair dataset

      var CompleteTokenValueList = [...updated_tokens, ...functionContextupdated_tokens]

      //Now we start digging into the function execution

      for (let i = 1; i < functionSourceData.length; i++)

      {

        let el = functionSourceData[i]

        //operations like प्रिंट(Message)
        //PrintEngine will take care of every print statement encountered in the program

        if (el.value == 'प्रिंट')

        {

          PrintEngine(functionSourceData, CompleteTokenValueList, i, self,ExecutionStack)

        }

        //operations like Message='Hello World'

        //AssignorUpdateValues function will take care of every assignment encountered in the program
        else if (el.value == '=')
        {

          AssignorUpdateValues(functionSourceData, i, CompleteTokenValueList, iterator, OriginalIterator, self,ExecutionStack,LinebylineSourcedata)

        }

        //operations like इनपुट(Message)
        else if (el.type == 'AcceptInput')
        {

          AcceptInputandSetValue(functionSourceData, i, updated_tokens,ExecutionStack)

        }

        //operations like x<24, y!=5, Message=='HellO World"
        else if (el.type == 'condition')

        {

          let element = functionSourceData[i].value

          //self function is the first step to calculate value of  mulitiple conditions like अगर (ageone==10 && AverageAge<1000 && agetwo>100 || ageone==10) OR (ageone==10 )

          //GetConditionValue is our goto function to evaluate a condition to true or false
          let ConditionValue = GetConditionValue(element, CompleteTokenValueList, i)

          kalaam.LastConditionValue.push(ConditionValue)

          //if value is false, just skip the if loop context, if not it will be ran in final print module

          if (ConditionValue == false)
          {

            let InitializeLoop = tokens.indexOf(functionSourceData[i])

            //Handle Blocks is a function which takes care of nested block by taking care of nested { and } brackets
            //it uses the stack to push and pop brackets to accurately identify start and the end of the block
            let Returnvalue = HandleBlocks(functionSourceData, i)

            i = Returnvalue.i
          }

        }

        //Handling set array element statements in for loop
        // for e.g Numbers[2]=28
        else if (functionSourceData[i].type == "SetArrayIndexValue")

        {

          SetArrayIndexValue(functionSourceData, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

        }

        //Opearting on for loop encountered in program
        else if (functionSourceData[i].type == 'ForLoopStart')

        {

          var FlagPrimalLoop = 0

          var SourcedataTokens = []

          let ForLoopMetaData = ForLoopSetMetadata(functionSourceData, i, CompleteTokenValueList)

          var ForLoopSourcedataIndexStart = ForLoopMetaData.ForLoopSourcedataIndexStart
          var Cycle = ForLoopMetaData.Cycle
          var OriginalIterator = ForLoopMetaData.OriginalIterator
          var IterationStart = ForLoopMetaData.IterationStart
          var iterator = ForLoopMetaData.iterator
          var element = ForLoopMetaData.element
          var elementValue = ForLoopMetaData.elementValue

          function getSourcedata(startIndex, functionSourceData, check, StoreResult)
          {

            let Returnvalue = HandleBlocks(functionSourceData, startIndex, StoreResult)
            StoreResult = Returnvalue.StoreResult

            return StoreResult

          }

          ForLoopSourcedataIndexStart = getLoopIndexStart(functionSourceData, i, '{', ForLoopSourcedataIndexStart)

          //

          SourcedataTokens = getSourcedata(ForLoopSourcedataIndexStart, functionSourceData, '}', SourcedataTokens)

          SourcedataTokens.forEach(el =>
          {

            el.isNestedLoop = false

          })

          let FindNestedLoop = SourcedataTokens.find(el => el.type == 'ForLoopStart')
          if (FindNestedLoop != undefined)
          {

            let NestedLoopindex = SourcedataTokens.indexOf(FindNestedLoop) + 2
            let NestedLooplength = (SourcedataTokens[NestedLoopindex].EndIndex - SourcedataTokens[NestedLoopindex].startIndex) + 1

            for (let x = NestedLoopindex; x < NestedLoopindex + NestedLooplength; x++)
            {

              SourcedataTokens[x].isNestedLoop = true

            }

          }

          //Primal loop is the one where user gives us the range directly like (1,20) etc.

          if (element.includes('(') && element.includes(','))

          {

            FlagPrimalLoop = 1

          }

          //Iterating over forloop sourcedata
          //self line 'iterator <= Cycle' determines start of the loop and the duration of the loop

          for (iterator = IterationStart; iterator <= Cycle; iterator++)
          {

            let forloopindex = CompleteTokenValueList.find(el => el.name == OriginalIterator)

            forloopindex.value = iterator

            //flag to avoid running self code if loop is primal because the payload needs to be compeltely different
            if (FlagPrimalLoop = 0)
            {
              ForLoopArrayorStringOutput(elementValue, iterator, CompleteTokenValueList, self)

            }

            for (let i = 0; i < SourcedataTokens.length; i++)

            {

              let isNested = SourcedataTokens[i].isNestedLoop

              //This is nested loop
              //Works but needs improvements on various parts

              //NESTED FOR LOOP START

              if (SourcedataTokens[i].type == 'ForLoopStart')
              {

                var NestedFlagPrimalLoop = 0

                var NestedSourcedataTokens = []

                let NestedForLoopMetaData = ForLoopSetMetadata(SourcedataTokens, i, CompleteTokenValueList)

                var NestedForLoopSourcedataIndexStart = NestedForLoopMetaData.ForLoopSourcedataIndexStart
                var NestedCycle = NestedForLoopMetaData.Cycle + 1
                var NestedOriginalIterator = NestedForLoopMetaData.OriginalIterator
                var NestedIterationStart = NestedForLoopMetaData.IterationStart
                var Nestediterator = NestedForLoopMetaData.IterationStart

                var Nestedelement = NestedForLoopMetaData.element
                var NestedelementValue = NestedForLoopMetaData.elementValue

                function getSourcedata(startIndex, SourcedataTokens, check, StoreResult)
                {
                  ////console.log('startIndex, SourcedataTokens, check, StoreResult: ', startIndex, SourcedataTokens, check, StoreResult);

                  let Returnvalue = HandleBlocks(SourcedataTokens, startIndex, StoreResult)
                  StoreResult = Returnvalue.StoreResult

                  return StoreResult

                }

                NestedForLoopSourcedataIndexStart = getLoopIndexStart(SourcedataTokens, i, '{', NestedForLoopSourcedataIndexStart)

                NestedSourcedataTokens = getSourcedata(NestedForLoopSourcedataIndexStart, SourcedataTokens, '}', NestedSourcedataTokens)
                ////console.log('NestedSourcedataTokens: ', NestedSourcedataTokens);

                for (Nestediterator; Nestediterator < NestedCycle; Nestediterator++)
                {
                  {

                    let y = Nestediterator

                    let Nestedforloopindex = CompleteTokenValueList.find(el => el.name == NestedOriginalIterator)
                    ////console.log('forloopindex: ', forloopindex);

                    Nestedforloopindex.value = y

                    for (let index = 0; index < NestedSourcedataTokens.length; index++)
                    {

                      let el = NestedSourcedataTokens[index]

                      if (el.value == 'प्रिंट')

                      {

                        PrintEngine(NestedSourcedataTokens, CompleteTokenValueList, index, self, y, NestedOriginalIterator)

                      }
                      else if (el.value == '=' && el.isNestedLoop == true)
                      {

                        //assigning values to variables

                        AssignorUpdateValues(NestedSourcedataTokens, index, CompleteTokenValueList, y, NestedOriginalIterator, self)

                      }
                      else if (el.type == 'condition' && el.isNestedLoop == true)

                      {

                        ////console.log('SourcedataTokens[i]: ', SourcedataTokens[i],i);

                        let ConditionStartIndex = index
                        let condition = NestedSourcedataTokens[index].value
                        //HandleConditions evaluates condition and return the index of from where printing should resume
                        //value of i depends on the conditions

                        if (condition.includes('||') || condition.includes('&&'))

                        {

                          let value = GetConditionValue(condition, CompleteTokenValueList, index)
                          kalaam.LastConditionValue.push(value)

                          if (value == false)
                          {

                            let BlockLength = 0
                            let BlockStart = 0

                            while (NestedSourcedataTokens[index].value != '{')

                            {

                              if (NestedSourcedataTokens[index + 1].value == '{')

                              {

                                BlockLength = NestedSourcedataTokens[index + 1].EndIndex - NestedSourcedataTokens[index + 1].startIndex

                                index = BlockLength + index + 1

                                break;

                              }

                              index++
                            }

                          }
                          else
                          {

                            index = index

                          }

                        }
                        else
                        {

                          let x = HandleConditions(NestedSourcedataTokens, index, CompleteTokenValueList);

                          if (x != undefined)
                          {

                            index = x

                          }
                          else
                          {
                            index = ConditionStartIndex
                            ////console.log('i: ', i);
                          }

                        }

                      }

                      ////console.log('i: ', i);

                      // i = i + NestedSourcedataTokens.length
                      ////console.log('i: ', i);
                      else if (el.type == "SetArrayIndexValue" && el.isNestedLoop == true)

                      {
                        SetArrayIndexValue(NestedSourcedataTokens, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

                      }

                    }

                  }

                }

              }
              else if (SourcedataTokens[i].type == 'AcceptInput' && isNested == false)
              {
                AcceptInputandSetValue(SourcedataTokens, i, updated_tokens)

              }
              else if (SourcedataTokens[i].value == '=' && isNested == false)
              {

                //assigning values to variables

                AssignorUpdateValues(SourcedataTokens, i, CompleteTokenValueList, iterator, OriginalIterator, self)

              }

              //Handling print statements in for loop
              else if (SourcedataTokens[i].value == 'प्रिंट' && isNested == false)

              {

                //for operations like print(array[3])

                // //console.log('for looop prints: ', functionSourceData[i],i);

                PrintEngine(SourcedataTokens, CompleteTokenValueList, i, self, iterator, OriginalIterator)

                //

              }

              //Handling set array element statements in for loop
              else if (SourcedataTokens[i].type == "SetArrayIndexValue")

              {

                SetArrayIndexValue(SourcedataTokens, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

              }

              // Handling CONDITIONAL statements in for loop
              else if (SourcedataTokens[i].type == 'condition')

              {

                ////console.log('SourcedataTokens[i]: ', SourcedataTokens[i],i);

                let ConditionStartIndex = i
                let condition = SourcedataTokens[i].value
                //HandleConditions evaluates condition and return the index of from where printing should resume
                //value of i depends on the conditions

                if (condition.includes('||') || condition.includes('&&'))

                {

                  let value = GetConditionValue(condition, updated_tokens, i)
                  kalaam.LastConditionValue.push(value)

                  if (value == false)
                  {

                    let BlockLength = 0
                    let BlockStart = 0

                    while (SourcedataTokens[i].value != '{')

                    {

                      if (SourcedataTokens[i + 1].value == '{')

                      {

                        BlockLength = SourcedataTokens[i + 1].EndIndex - SourcedataTokens[i + 1].startIndex

                        i = BlockLength + i + 1

                        break;

                      }

                      i++
                    }

                  }
                  else
                  {

                    i = i

                  }

                }
                else
                {

                  i = HandleConditions(SourcedataTokens, i, CompleteTokenValueList);

                  if (i != undefined)
                  {

                    i = i

                  }
                  else
                  {
                    i = ConditionStartIndex
                    ////console.log('i: ', i);
                  }

                }

              }

            }

          }

          i = i + SourcedataTokens.length

          //END NESTED FOR LOOP

        }
        else if (functionSourceData[i].type == "SetArrayIndexValue")

        {

          SetArrayIndexValue(SourcedataTokens, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

        }

        //Handling While loop in function
        else if (functionSourceData[i].type == 'WhileLoopStart')
        {

          let TokensCurrentIndex = i + 3

          let ConditionValue = false

          let element = functionSourceData[i + 1].value

          let ExtratcedVariable = []

          let variable = ''
          let WhileLoopSourcedataIndexStart = 0
          let WhileLoopSourcedataTokens = []

          for (let i = 0; i < element.length; i++)
          {
            let x = element.charAt(i)

            if (isVariable(x))

            {

              variable = variable + x

            }
            if (!isVariable(element.charAt(i + 1)) && isVariable(x))
            {

              let token = CompleteTokenValueList.find(el => el.name == variable)

              ExtratcedVariable.push(
              {
                variable: variable,
                value: token.value

              })

              variable = ''

            }

          }

          function getWhileLoopSourcedata(startIndex, functionSourceData, check, StoreResult)
          {

            StoreResult = HandleBlocks(functionSourceData, startIndex, StoreResult)

            return StoreResult

          }

          WhileLoopSourcedataIndexStart = getLoopIndexStart(functionSourceData, i, '{', WhileLoopSourcedataIndexStart)
          //
          WhileLoopSourcedataTokens = getWhileLoopSourcedata(WhileLoopSourcedataIndexStart, functionSourceData, '}', WhileLoopSourcedataTokens).StoreResult

          //constantly evaluating the conditionvalue. for e.g count<25 in जबतक(count<25)

           // let message='जबतक' + 

      //AddtoExecutionStack(ExecutionStack,'=', 'जबतक में दिए हुए शर्त(Condition) के पूरा होने तक आगे के कोड को रन करे', WhileLoopSourcedataTokens, ''  , message)



          while (GetConditionValue(element, CompleteTokenValueList, j + 1))
          {

            for (let i = 0; i < WhileLoopSourcedataTokens.length; i++)
            {

              //SECTION while loop context

              if (WhileLoopSourcedataTokens[i].value == '=')
              {

                AssignorUpdateValues(WhileLoopSourcedataTokens, i, CompleteTokenValueList)

                //

                // 

              }
              else if (WhileLoopSourcedataTokens[i].type == 'AcceptInput')
              {

                AcceptInputandSetValue(WhileLoopSourcedataTokens, i, updated_tokens)

              }

              // Handling CONDITIONAL statements in for loop
              else if (WhileLoopSourcedataTokens[i].type == 'condition')

              {

                let index = HandleConditions(WhileLoopSourcedataTokens, i, CompleteTokenValueList)

                if (index != undefined)
                {
                  i = index

                }
                else
                {
                  i = i
                }

              }
              else if (WhileLoopSourcedataTokens[i].value == 'प्रिंट')

              {

                PrintEngine(WhileLoopSourcedataTokens, CompleteTokenValueList, i, self) //for operations like print(array[3])

              }
              else if (WhileLoopSourcedataTokens[i].type == "SetArrayIndexValue")

              {

                SetArrayIndexValue(WhileLoopSourcedataTokens, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack,LinebylineSourcedata)

              }

            }

          }

          i = i + 1 + WhileLoopSourcedataTokens.length + 1

        }

      }

      //skipping parsing index so that function context is run by single entity and global execution doesn't run self code too
      //  j = mutable_tokens[j + 1].EndIndex

      //If we pass function foo(arr) where arr is (suppose) fibonacci=[] declared in the global exe context(updated_tokens). But operation will be performed on
      //arr in functionContextupdated_tokens. so at the end of fucntion execution we set the value to it's right owner.
      let token = functionContextupdated_tokens.find(el => el.IntheEndSetValueto != '')
      let GivePowersTo = updated_tokens.find(el => el.name == token.IntheEndSetValueto)

      GivePowersTo.value = token.value

      //I have to empty it because function context has to remain empty other wise function arguments will keep on accepting new values with the same key
      //for e.g= PrintFullName(FirstName,LastName) and PrintFullName(FirstNam,LastNam) needs two different execution context hence first one needs to make space for later

      functionContextupdated_tokens = []

    }

  }



  //This is where error handling kicks in

  //To find undefined variables

  function onlyUnique(value, index, arr)
  {
    return arr.indexOf(value) === index;
  }

  var assigned_variables = assigned_variables.filter(onlyUnique)

  let difference = variables_array.filter(x => !assigned_variables.includes(x))

  if (difference.length > 0)

  {

    difference.forEach(el =>
    {

      kalaam.error.push('Variable ' + el + ' is undefined ')

    })

  }

  if (kalaam.error.length > 0)
  {

    kalaam.linebylineOutput = kalaam.error

  }
  else
  {

    kalaam.linebylineOutput = kalaam.output.split('\n')

  }

  //time taken to transpile the code is t1-t0
  var t1 = performance.now()

  if (kalaam.linebylineOutput != '' && kalaam.error.length == 0)
  {
    kalaam.TimeTaken = "अभिनंदन, आप का प्रोग्राम काम कर रहा है |( Speed =  " + ((t1 - t0)/10000).toPrecision(3) + " Seconds)"

  }
  else
  {

    kalaam.isError = true

    kalaam.TimeTaken = "Compilation Error: Check for assignement and declaration mistyping"

  }

  //kalaam.linebylineoutput is what you will finally see on output screen

  kalaam.linebylineOutput = kalaam.linebylineOutput.filter(function(item)
  

  
  {

    return item !== ""
  })

  //ExecutionStack=ExecutionStack.sort((a,b)=> a.Linenumber-b.Linenumber)
  console.log('ExecutionStack: ', ExecutionStack);
  

return ExecutionStack
}