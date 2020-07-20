import
{
  Number
}
from "core-js"

import
{
  SourceDataReplaceforEasyParsing
}
from '../Scripts/DataCleaning'

//ANCHOR - Important functions to be used while parsing

//Checking if string is empty. The way we check string is empty or not boils down to how cleaned_sourcedata sees empty string s

//Needs improvement

function isEmptyStringorChar()
{

  return function(element)
  {
    if (element == '"' || element == "'" || element == '*' || element == '@' || element == "#" || element.charAt(0) == "'" || element.charAt(0) == '"')

    {

      return true

    }
  }

}

//Checking if element is a pure evaluation like 1+2, 20*34, 40+6-98 etc

function isPureEval(element)
{

  if (/^([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)*$/gm.test(element))
  {

    return true

  }
}

//Checking if an element is calculation to be performed

function isCalculation(element)
{

  if (!isNumber(element))
  {

    if ((element.includes("+") || element.includes("%") || element.includes("-") || element.includes("*") || element.includes("/")) && ((element.includes('(') && element.includes(')')) || (!element.includes('(') && !element.includes(')'))) && element.charAt(element.length - 1) != '+')
    {

      return true

    }
  }
}

//removing brackets from element

function RemoveBrackets(element)
{

  let a = element.replace('(', '')
  let b = a.replace(')', '')
  let c = b.replace('}', '')
  let d = c.replace('{', '')

  return d

}

//handy count function

function Count(item, element)
{

  let count = 0

  for (let i = 0; i < element.length; i++)
  {

    if (element.charAt(i) == item && element.charAt(i + 1) == item)
    {

      count += 1

    }

  }

  return count;

}

function isArrayOperation(element)
{

  //To find Patterns like Array[2], Array[index] etc

  element = RemoveBrackets(element)

  if (element.charAt(element.length - 1) == ']' && element.includes('[') && element.charAt(0) != '[')
  {

    return true
  }

}

//preparing sourcedata for easy parsing by handling new lines, enters etc.
//cleaning up the data to get a suitable version of sourcedata. it's better to get suitable version because users can type what they wish but we need to maintain 
//integrity of program in every possible condition. So, we clean and refactor raw code to remove unnecessary data.

function GetCleanSourcedata(sourcedata, cleaned_sourcedata, impurities)
{


  sourcedata = SourceDataReplaceforEasyParsing(sourcedata)

  sourcedata.forEach((element, i) =>
  {

    //finding the elements which has =" in it so that to seprate them into name,==,swanand if input is name="swanand". 

    //We define such elements as impurites. We process them, bring them into a suitable form and push to cleaned_spircedata

    //This is our cleaning factory

    if (!element.includes('==') && (element.indexOf('="') > -1 || element.indexOf('=') > 0 || element.charAt(0) == "=") && element != '==')

    {

      impurities.push(element) //push such element as impurity in impurities

      let elements = element.split("=")
      let index = cleaned_sourcedata.length

      cleaned_sourcedata[index] = (elements[0])
      cleaned_sourcedata[index + 1] = ("=")
      cleaned_sourcedata[index + 2] = (elements[1])

    }

    //as long as element is pure, push it to new and clean version of sourcedata
    if (!impurities.includes(element))
    {

      cleaned_sourcedata.push(element)

    }

    //

  })

  //removing empty "" values for final version of sourcedata
  //SECTION FInal sourcedata cleaning

  cleaned_sourcedata = cleaned_sourcedata.filter(function(item)
  {

    return item !== ""
  })

  return cleaned_sourcedata;

}

//To convert 'a+b-c*d' into ['a','+','-','c','*','d']

function SplitElementsArray(element, i)

{

  if (element.includes('>') || element.includes('<') || element.includes('==') || element.includes('!='))

  {

    element = element.replace(/' '/g, '')
    

  }
  //get index of operation from updated tokens, as a reference

  var StringVar = [] // here StrVar values will get pushed
  var StrVar = '' // its used to read var values of any type (anna,a,bad,x etc.) and push it to StringVar

  for (let j = 0; j < element.length; j++)
  {

    // find if element[j] is alphabet

    if (/^[A-Z]+$/i.test(element[j]) || (element[j] == '[' || element[j] == ']')  || (element[j] == '"' || element[j] == "'") || isNumber(element[j]))
    {

      StrVar = StrVar + element[j] //keep on pushing for long variable names as strings e.g hello, kalaam

    }

    if (element[j] == ')' || element[j] == '(')
    {

      StringVar.push(element[j])

    }

    //to solve ["Age "] into ["Age"], so that it can correctly find its value in updated_tokens

    if (element[j] == ' ' && element[j + 1] != '+')
    {
      StrVar = StrVar + element[j]

    }

    //for checking equivalency
    if ((element[j] == '=' && element[j + 1] == '='))
    {

      StringVar.push(StrVar)
      StringVar.push(element[j] + element[j + 1])
      StrVar = ''

    }

    //for checking !=
    if ((element[j] == '!' && element[j + 1] == '='))
    {

      StringVar.push(StrVar)

      StringVar.push(element[j] + element[j + 1])
      StrVar = ''

    }
    if (element[j] == "?" || element[j] == "|" || element[j] == ";" || element[j] == "&" || element[j] == "^" || element[j] == "%" || element[j] == "$" || element[j] == "#" || element[j] == "@" || element[j] == "!" || element[j] == ":" || element[j] == "+" || element[j] == "," || element[j] == "%" || element[j] == "-" || element[j + 1] == ')' || element[j] == "/" || element[j] == "*" || element[j] == '>' || element[j] == '<')
    {

      StringVar.push(StrVar) //push whatever string we have got because it's a string now, cant push operators with it

      //finding the calculations that required brackets and adding them

      if (element[j + 1] != ')')
      {

        StringVar.push(element[j]) // fixing the bias

      }

      StrVar = '' // emptyig the StrVar for next variable

    }
    if (element[j + 1] == null)
    {

      StringVar.push(StrVar) //fixing bias for last element

    }

  }

  return StringVar

}

//get the start of loop in tokens array

function getLoopIndexStart(mutable_tokens, j, check, setIndex)

{

  while (mutable_tokens[j].value != check)

  {

    if (mutable_tokens[j + 1].value == check)
    {

      setIndex = j + 1

    }

    j++;

  }
  return setIndex

}

//this is how we handle mulitiple conditions like अगर (ageone==10 && AverageAge<1000 && agetwo>100 || ageone==10) OR (ageone==10 )

function handlemultConditions(element)
{

  for (let i = 0; i < element.length; i++)
  {

    if ((element.charAt(i) == '&') || (element.charAt(i) == '|'))

    {

      let condition = element.substring(0, i + 2)

      let SweepedElement = element.replace(condition, "")
      let operator = ''

      if ((element.charAt(i) == '&'))
      {
        condition = condition.replace('&&', '')
        operator = '&&'

      }
      else if ((element.charAt(i) == '|'))
      {
        condition = condition.replace('||', '')
        operator = '||'

      }

      return {
        SweepedElement,
        condition,
        operator
      }

      break;

    }

  }

}

//For operarions like Numbers.पुश(23)

function AddElementToArray(Sourcedata, index, updated_tokens)
{

  let token = Sourcedata[index].value

  token = token.replace('पुश', '')
  let Split = token.split('.')
  let Array = Split[0]
  let ElementtoPush = RemoveBrackets(Split[1])

  if (ElementtoPush.charAt(0) == '"' || ElementtoPush.charAt(0) == "'")
  {

    ElementtoPush = ElementtoPush
  }
  else
  {
    ElementtoPush = updated_tokens.find(el => el.name == ElementtoPush).value
  }

  let ArrayEl = updated_tokens.find(el => el.name == Array)

  let ArrayValue = ArrayEl.value
  if (ArrayValue == '[]')
  {
    ArrayValue = ArrayValue.split(',')
  }
  ArrayValue.push(ElementtoPush)

  let indexofArray = updated_tokens.indexOf(ArrayEl)

  ArrayValue = ArrayValue.filter(el => el != '[]')

  updated_tokens[indexofArray].value = ArrayValue

}

function AcceptInputandSetValue(tokens, index, updated_tokens,ExecutionStack)
{

  let SetInputValueAs = tokens[index].AcceptAs

  var value = prompt('आप ' + '"' +  SetInputValueAs +  '"' + ' को क्या कहना चाहते हो ?' )

  updated_tokens.push(
  {
    name: SetInputValueAs,

    value: value,

  })

  let message= ' Computer ने आपकी दी गयी वैल्यू, ' + value + ' को, ' + SetInputValueAs +  ' के नाम से स्वीकार किया है | इसका मतलब ' + SetInputValueAs + '=' + value
 // console.log('message: ', message);

  AddtoExecutionStack(ExecutionStack,'इनपुट', 'किसी नई VALUE को स्वीकार करना ', SetInputValueAs, value, message)
  


}

//One of the most frequently needed function

//it is used to calculate variable values like x= y*100 (y*100 will be calculated here)

//or Array[i]= x+ageone. (x+ageone) is caluculated here

//If you are not getting the values right, this is where you should start debugging

function CalculateValues(calculation, j, updated_tokens, IterationStart, global)

{

  var flag = 0
  var error = ''
  var calculationArray = SplitElementsArray(calculation, j)

  var StringVar = SetValues(calculationArray, updated_tokens)

  let joinStringVar = StringVar.join('')

  let NewStringVar = ''
  if (isNumber(joinStringVar.charAt(0)) == true)
  {
    NewStringVar = eval(joinStringVar)

  }
  else if (isNumber(joinStringVar.charAt(0)) == undefined)
  {

    StringVar.forEach(el =>
    {

      if (el != '+')
      {
        el = el.toString()
        NewStringVar = NewStringVar + el
      }

    })

  }
  else
  {

    StringVar = StringVar

  }

  return (StringVar.length > 1 ? NewStringVar : StringVar)

}

//Have to move this two functions to Pushfunctions.js

function PushSetArrayIndexValue(value, tokens, data, i)
{

  tokens.push(
  {
    type: "SetArrayIndexValue",
    value: value,
    ValueToSet: data[i + 2] //skipping =
  });



}

function PushGetArrayIndexValue(value, tokens, data, i)
{

  tokens.push(
  {
    type: "GetArrayIndexValue",
    value: value,
  });

}

//Performs only Array Operations

//converts Array[a] into [Array, a]

//This helps us to find their respective values easily in updated_tokens

function CreateArrayElement(Value, iterator)
{

  let ArrayElement = RemoveBrackets(Value);

  //Seprating out index identifier. a from Array[a]
  let element = ArrayElement
  element = element.replace(']', '')

  let Split = element.split('[')

  Split[1] = iterator

  Split = Split.join('[')

  Split = Split + ']'
  ArrayElement = Split

  ArrayElement = ArrayElement.replace(/' '/g, '')

  return ArrayElement

}

//This function is used to get array or string elements. e.g Array[2], String[5] 

//Heavily used by compiler in loops

function SetArrayorStringElement(ArrayElement, updated_tokens, iterator, NewValue, tokens,ExecutionStack)
{

  let OriginalArrayElement=ArrayElement


  ArrayElement = ArrayElement.replace(']', '')


  let Split = ArrayElement.split('[')

  let indexCollected = Split[1]

  let Element = updated_tokens.find(el => el.name == NewValue)

  //If element is an assigned variable. Find the value and set it.

  if (Element)
  {
    if (isCalculation(NewValue))
    {

      // This is to set x= y*100, Array[i]= x+ageone. 

      let token = tokens.find(el => el.value == NewValue)
      let j = tokens.indexOf(token) - 1

      let value = CalculateValues(NewValue, j, updated_tokens)

      NewValue = value

    }

    NewValue = Element.value

  }

  if (iterator == true)
  {

    //for Array[a]=a

    if (isCalculation(NewValue))
    {

    }
    else
    {

      NewValue = indexCollected

    }
  }

  //if fresh newvalue is foumd. the one which doesnt yet exist in the program, then run this.
  else
  {

    NewValue = NewValue
  }

  let token = updated_tokens.find(el => el.name == Split[0])

  let index = updated_tokens.indexOf(token)

  //updated_tokens values will also get updated thrugh this reference
  let value = token.value

  value = value.toString()

  value = value.replace(']', '')
  value = value.replace('[', '')
  value = value.split(',')

  if (iterator == true)
  {

    //This is for Array[a]=a

    value[indexCollected] = indexCollected

  }
  else
  {

    //Run when iterator is not needed. iterator is present in ArrayEleMENT ALREADY. This is for Array[i]='Swanand'

    value[indexCollected] = NewValue
    

  }

  //converting array back into the string representation of it for better printabillity

  

  updated_tokens[index].value = '[' + value.toString() + ']'


  let message= ' Computer ने आपकी दी गयी वैल्यू, ' + OriginalArrayElement + ' को, ' + value[indexCollected]  +  ' के नाम से SET(दर्ज) किया है |'
 
  AddtoExecutionStack(ExecutionStack,'=', 'किसी VARIABLE को नई VALUE सेट करना   ', OriginalArrayElement, value[indexCollected]  , message)
  
  

}

//Printing a specific array element like Array[0], Array[3] etc.

//Printing a dynamic array element like Array[i], Array[i+1] etc.

function GetArrayorStringElement(element, updated_tokens, NewValue, flag)
{

  element = element.replace(']', '')

  let Split = element.split('[')

  let indexCollected = Split[1]

  if (isNumber(indexCollected))
  {

    let token = updated_tokens.find(el => el.name == Split[0])

    let index = updated_tokens.indexOf(token)

    let value = token.value.toString()

    if (token.type == 'Array')
    {

      value = value.replace(']', '')
      value = value.replace('[', '')
      value = value.split(',')

      if (NewValue != undefined)
      {

        if (!isNumber(NewValue))
        {

          NewValue = NewValue.replace(/"/g, '')
          NewValue = NewValue.replace(/“/g, '')
          NewValue = NewValue.replace(/'/g, '')
          NewValue = NewValue.replace(/‘/g, '')
        }
        else
        {

          NewValue = NewValue
        }

        value[indexCollected] = NewValue

        updated_tokens[index].value = value

      }
      else
      {

        value = value[indexCollected];
        //////
        //////

      }

    }

    else if (token.type == 'string' || token.type != 'Array')
    {

      value = value.charAt(indexCollected);

    }

    return value
  }

}

//Needs improvement

function ForLoopArrayorStringOutput(elementValue, iterator, updated_tokens, global)

{

  let CurrentElement = ''

  CurrentElement = elementValue.name + '[' + iterator + ']'
  //Foundvalue is decided in the function depending upon the type. 
  //if it's array run array[2], if its string run string.charAt(2)
  let FoundValue = GetArrayorStringElement(CurrentElement, updated_tokens)

  global.output = global.output + FoundValue + "\n";

}

//Move it to typechecking.js

function isNumber(element)
{

  if (/^[0-9]*$/gm.test(element))
  {
    return true;

  }
};

//one of the heavily used function

//converts ['a','+','b'] into [a+b] and then into [23,+,7] provided a=23 and b=7

function SetValues(StringVar, updated_tokens)


{
  StringVar.forEach((el, i) =>

    {

      el = el.replace(/\ /g, '');
      

      if (el.charAt(el.length - 1) == ']')
      {
        let ArrayElementValue = GetArrayorStringElement(el, updated_tokens)

        ArrayElementValue = ArrayElementValue.replace(/['"]+/g, '')

        StringVar[i] = ArrayElementValue

      }

      //finding variable value here 

      let token = updated_tokens.find(element => element.name == el);

      if (token != undefined)
      {

        // if exists set it's value 
        StringVar[i] = token.value

      }

    })

  return StringVar
  

}

//ANCHOR 
//Now we hae converted found "a+b-d" into [a,+,b,-,d]

//Now lets run a loops on it to convert into [5,+,6,-,7]

//Updated_tokens is updated by replacing "value:a+b-d" with "value:5+6-7". 
//after eval function it will be set as "value:2"

function UpdateUpdated_tokenswithValues(payload, i, updated_tokens)
{

  let StringVar = payload

  //run if it's arithmetic operation like ["5+6-7"]
  if (isNumber(StringVar[0]))
  {

    let value = eval(StringVar.join(''))

    return value

  }
  else if (StringVar[1] == '==')
  {

    let a = StringVar[0].toString()
    let b = StringVar[2].toString()

    a = a.replace('"', "")
    a = a.replace("'", "")
    b = b.replace('"', "")
    b = b.replace("'", "")

    

    let value = eval(a == b)

    return value

  }

  //run if it's String operation like ["reddit","+", "is goat"]
  else
  {

    if (StringVar.includes("+"))
    {

      StringVar[StringVar.indexOf("+")] = " "

    }

    let value = StringVar.join("")

    return value
  }

}

//Handle Blocks is a function which takes care of nested block by taking care of nested '{' and '}' brackets

//it uses the stack to push and pop brackets to accurately identify start and the end of the block

function HandleBlocks(mutable_tokens, j, StoreResult)
{

  //StoreResult is used to push data into it in case of forloop or while loop conetext

  //for a normal block like conditional block it might not need to be used yet

  let ArrayBrackets = []

  while (true)

  {

    if (mutable_tokens[j].value == '{')
    {

      ArrayBrackets.push(
      {
        type: '{',
        index: j
      })

      if (StoreResult != undefined)
      {

        StoreResult.push(mutable_tokens[j])
      }

    }
    else if (mutable_tokens[j].value == '}')
    {

      //As soon as open bracket is found, pop the last arraybracket stack value
      //that's the match

      let x = ArrayBrackets.pop()

      if (StoreResult != undefined)
      {

        StoreResult.push(mutable_tokens[j])

        mutable_tokens[x.index].startIndex = x.index
        mutable_tokens[x.index].EndIndex = j
      }

      //set start and end index value for that { } block
      mutable_tokens[x.index].startIndex = x.index
      mutable_tokens[x.index].EndIndex = j
      if (ArrayBrackets.length == 0)
      {

        //As soon as stack is empty we have finished our last lblock

        break;

      }

    }
    else
    {

      if (StoreResult != undefined)
      {

        StoreResult.push(mutable_tokens[j])
      }

    }

    j++;

  }

  return {
    StoreResult,
    j
  }

}

//Handles conditional statements

//It does not return true or false rather it tells us whether to skip the execution or continue execution depending upon truth value of condition

//If true 'i' is set to current index position, if false 'i' is skipped until the end of conditional block/ 

function HandleConditions(sourcedata, i, updated_tokens)
{

  let element = sourcedata[i].value

  //let token= updated_tokens.find(el=> el.originalvalue==sourcedata[i].value)

  let SplitArray = SplitElementsArray(element, i)

  let Values = SetValues(SplitArray, updated_tokens)

  let ForLoopConditionValue = UpdateUpdated_tokenswithValues(Values, updated_tokens, i)

  if (ForLoopConditionValue == false)
  {

    while (sourcedata[i + 1].value != '}')

    {

      //tokens.splice(i+1, 1);

      //No need to delete tokens, we are iust skipping over the values so that they won't be printed or run

      i++;

    }

    return i

  }

}

//Handly function to split and join Arrays

function SplitandJoin(array, output, element)
{

  array[1] = output

  let Joinarray = array.join('[') + ']'
  element = Joinarray

  return element

}

var AccumulateValue = ''

function ResetValue()
{

  AccumulateValue = ''

}

//One of the most important functions

//Takes care of all kind of assignments provided in raw sourcecode

//Message="Hello World", Numbers=[1,2,3,4,5], Numbers[2]=23 etc.

//If a certain value is not being assigned properly start debugiing here

function AssignorUpdateValues(sourcedata, i, updated_tokens, iterator, OriginalIterator, global,ExecutionStack)


{


  let variable = sourcedata[i - 1].value

  let variableType = sourcedata[i - 1].type

  let varvalue = sourcedata[i + 1].value

  var FinalValue=''

  if (varvalue == '"' || varvalue == "'")
  {

    varvalue = ' '
  }

  //if someone accidenlty types Name=इनपुट or any other primary keywords

  if (varvalue.includes('दुहराओ') || varvalue.includes('रचना') || varvalue.includes('अन्यथा') || varvalue.includes('इनपुट') || varvalue.includes('पुश') || varvalue.includes('प्रिंट') || varvalue.includes('अगर'))

  {

    let error = 'Assignment error in ' + '"' + variable + ' = ' + '"'

    global.error.push(error)

  }

  let varvalueType = sourcedata[i + 1].type

  let x = updated_tokens.find((el, i) => el.name == varvalue)

  //if a=b and user haven't defined b yet

  if (!isNumber(varvalue) && varvalueType == 'value' && x == undefined && varvalue != ' ' && !isEmptyStringorChar(varvalue))

  {

    global.error.push('Cannot set ' + variable + ' to undefined ' + ': ' + varvalue + ' is undefined ')

  }

  //to count the length, Numbers.संख्या()

  else if (varvalue.includes('संख्या'))

  {

    let Split = varvalue.split('.')

    let item = Split[0]

    let Itemvalue = updated_tokens.find(el => el.name == item).value

    if (Itemvalue.includes('['))
    {

      Itemvalue = Itemvalue.toString().split(',')

    }
    else if (Itemvalue.length == 1)
    {

      Itemvalue = Itemvalue

    }

    else
    {

      Itemvalue = Itemvalue.toString()

    }

    let ItemvalueLength = Itemvalue.length

    FinalValue=ItemvalueLength

    updated_tokens.push(
    {
      name: variable,

      value: ItemvalueLength,

      identifier: i,
      type: 'CalLength'
    })

  }

  //this runs only for operations like x=Numbers[a]

  else if (varvalueType == 'GetArrayIndexValue')

  {

    let n = updated_tokens.find((el, i) => el.name == variable)

    let index = updated_tokens.indexOf(n)

    //Iterator is used only when we are looping over provided index not for the index that needs to be calculated
    let element = varvalue.replace(']', '')

    if (element.includes('+'))
    {

      var Split = element.split('+')

    }

    else if (element.includes('-'))
    {

      var Split = element.split('-')

    }

    var flag = false

    //For operations like Name=Name+ Array[i]

    if (element.includes('+') || element.includes('-') && !Split[0].includes('['))
    {

      flag = true

      let token = updated_tokens.find(el => el.name == Split[0])
      let index = updated_tokens.indexOf(token)

      let ArrayItem = Split[1].split('[')

      let output = CalculateValues(ArrayItem[1], i, updated_tokens)

      let ArrayElement = SplitandJoin(ArrayItem, output, element)

      //Get Numbers[3] value and now set it to our variable x
      let value = GetArrayorStringElement(ArrayElement, updated_tokens)
      

      AccumulateValue += value

      updated_tokens[index].value = AccumulateValue
      FinalValue=AccumulateValue


    }
    else
    {

      var Split = element.split('[')

    }

    //for operations like x= Array[i+1] etc

    if ((Split[1].includes('-') || Split[1].includes('+')) && !Split[1].includes('['))
    {

      let output = CalculateValues(Split[1], i, updated_tokens)
      

      element = SplitandJoin(Split, output, element)

    }

    let token = updated_tokens.find(el => el.name == Split[1])

    //for operations like Array[Age]. Here index is an already defined variable
    if (token != undefined && OriginalIterator != Split[1] && token.name != '')

    {

      element = SplitandJoin(Split, token.value, element)

    }

    //for operations like Array[i]: Looping over original index value
    else if (OriginalIterator == Split[1])
    {

      element = SplitandJoin(Split, iterator, element)

    }

    let ArrayElement = element

    //Get Numbers[3] value and now set it to our variable x
    let value = GetArrayorStringElement(ArrayElement, updated_tokens)

    if (n != undefined && flag == false)
    {

      updated_tokens[index].value = value

      FinalValue=value


    }
    else if (flag == false)
    {

      updated_tokens.push(
      {
        name: variable,

        value: value,

        identifier: i,
        type: sourcedata[i + 1].type
      })

      FinalValue=value

    }

  }
  else
  {

    let m = updated_tokens.find((el, i) => el.name == varvalue)

    if (m != undefined)
    {

      varvalue = m.value

      FinalValue=varvalue


    }

    let n = updated_tokens.find((el, i) => el.name == variable)

    if (n == undefined)
    {

      //to check if the assigned value needs to be calculated. this is futher diveded in two types

      if (isCalculation(varvalue))

      {

        //type 1- Age= 2020-2000 
        if (isPureEval(varvalue))

        {

          let value = eval(varvalue)

          //write function for this, so repeatable
          updated_tokens.push(
          {
            name: variable,

            value: value,

            identifier: i,
            type: sourcedata[i + 1].type
          })

          FinalValue=value


        }

        //type 2- X= ageone+agetwo
        else
        {

          //performing the calculation

          let value = CalculateValues(varvalue, i, updated_tokens, global)
          

          updated_tokens.push(
          {
            name: variable,

            value: value,

            identifier: i,
            type: sourcedata[i + 1].type
          })

          FinalValue=value


        }

      }

      //if there is no need to calculate, push values as it is
      else if (!isCalculation(varvalue))
      {

        updated_tokens.push(
        {
          name: variable,

          value: varvalue,

          identifier: i,
          type: sourcedata[i + 1].type
        })

        FinalValue=varvalue

      }

    }

    //if it's already assgined, reassign it with updated value
    else
    {

      varvalue = varvalue.toString()

      if (varvalue.includes('-') || varvalue.includes('%') || varvalue.includes('+') || varvalue.includes('/') || varvalue.includes('*'))
      {

        // 

        let NewValue = CalculateValues(varvalue, i, updated_tokens, global)

        n.value = NewValue

        FinalValue=NewValue


      }
      else
      {

        let index = updated_tokens.indexOf(n)
        updated_tokens[index].value = varvalue

        FinalValue=varvalue


      }

    }

  }



let message= ' Computer ने आपकी दी गयी वैल्यू, ' + variable + ' को, ' + FinalValue +  ' के नाम से SET(दर्ज) किया है |'
 
AddtoExecutionStack(ExecutionStack,'=', 'किसी VARIABLE को नई VALUE सेट करना   ', variable, FinalValue , message)


}

//GetConditionValue is our goto function to evaluate a condition to true or false

function GetConditionValue(element, updated_tokens, j)
{

  var ConditionValue = false

  if (element.includes('&&') || element.includes('||'))
  {

    let MultConditionsCount = parseInt(Count('&', element)) + parseInt(Count('|', element))

    //this will be our final values
    //converted as true&&false&&true||true
    let BuiltMultConditonWithValues = ''
    let LastResult = {}

    //running for loop on original condition to calculates each individual condition and adding its value in BuiltMultConditonWithValues

    for (let i = 0; i <= MultConditionsCount; i++)

    {

      if (i == MultConditionsCount)
      {

        let condition = LastResult.SweepedElement
        condition = condition.replace(/ /g, '')

        let SplitArray = SplitElementsArray(condition, j)

        let Values = SetValues(SplitArray, updated_tokens)

        ConditionValue = UpdateUpdated_tokenswithValues(Values, updated_tokens, j)

        BuiltMultConditonWithValues = BuiltMultConditonWithValues + ConditionValue

      }
      else
      {

        let result = handlemultConditions(element)

        LastResult = result

        element = result.SweepedElement
        let condition = result.condition
        condition = condition.replace(/ /g, '')

        let SplitArray = SplitElementsArray(condition, j)

        let Values = SetValues(SplitArray, updated_tokens)

        ConditionValue = UpdateUpdated_tokenswithValues(Values, updated_tokens, j)

        BuiltMultConditonWithValues = BuiltMultConditonWithValues + ConditionValue + result.operator

      }

    }

    //setting the final condition value in cases like अगर (ageone==10 && AverageAge<1000 && agetwo>100 || ageone==10) 

    ConditionValue = eval(BuiltMultConditonWithValues);

  }
  else
  {

    //let token= updated_tokens.find(el=> el.originalvalue==mutable_tokens[j].value)

    let SplitArray = SplitElementsArray(element, j)
    

    let Values = SetValues(SplitArray, updated_tokens)
    Values = Values.filter(function(item)
    {

      return item !== ""
    })

    //Setting the final condition value in cases like अगर (ageone==10) 

    ConditionValue = UpdateUpdated_tokenswithValues(Values, updated_tokens, j)

  }

  return ConditionValue

}

//Getting every single information about our forloop 

function ForLoopSetMetadata(tokens, i, updated_tokens)
{

  var ForLoopMetaData = tokens[i + 1]

  //Splitting the ForLoopMetaData values individually
  var iterator = ForLoopMetaData.iterator

  var element = ForLoopMetaData.value
  var IterationStart = parseInt(ForLoopMetaData.iterationStart)

  var IterationEnd = parseInt(ForLoopMetaData.iterationEnd)

  //pushing index 

  //checking if iteration end is an predefined variable

  let token = updated_tokens.find(el => el.name == ForLoopMetaData.iterationEnd)

  if (token != undefined)
  {

    IterationEnd = parseInt(token.value)

  }

  // var ForLoopSourcedata = ForLoopMetaData.ForLoopSourcedata

  var elementValue = updated_tokens.find(el => el.name == element)

  var elementLength = 0

  var ForLoopSourcedataIndexStart = 0

  var OriginalIterator = ForLoopMetaData.iterator

  // Run if start and end parameters are not given e.g दुहराओ a को  Name मे 
  // This is ran just to get Start and End parameters as they are not provided
  if (ForLoopMetaData.iterationEnd == undefined)
  {

    //run if element is array
    if (elementValue.type == 'Array')

    {
      elementLength = elementValue.value.split(',').length

      IterationStart = 0
      IterationEnd = elementLength - 1

    }

    //run if element is String
    else
    {
      elementLength = elementValue.value.length
      IterationStart = 0
      IterationEnd = elementLength - 1

    }

  }

  var Cycle = IterationEnd

  return {
    ForLoopSourcedataIndexStart,
    Cycle,
    OriginalIterator,
    IterationStart,
    IterationEnd,
    iterator,
    element,
    elementValue
  }

}

//To resolve operations like Array[a]=a+2 in loops and in plain context

function SetArrayIndexValue(SourceData, i, j, CompleteTokenValueList, tokens, OriginalIterator, iterator,ExecutionStack)
{

  let Value = SourceData[i].value

  let ValueToSet = SourceData[i].ValueToSet

  let element = RemoveBrackets(Value);

  var ArrayElement = ''

  //Seprating out index identifier. xyz from Array[xyz]

  element = element.replace(']', '')

  let Split = element.split('[')

  // run if we need to set direct Array element value. like Array[2]= xyx                    
  if (isNumber(Split[1]))
  {

    Split = Split.join('[')
    //

    Split = Split + ']'

    ArrayElement = Split
    // 

    NewValueToSet = CalculateValues(ValueToSet, j, CompleteTokenValueList)
    

    SetArrayorStringElement(ArrayElement, CompleteTokenValueList, false, NewValueToSet, tokens,ExecutionStack)
    

  }

  // run if we need to dynamically set Array element value. like Array[i]= xyx
  //CreateArrayElement function will create dynamic Array values. like Array[0], Array[1] etc.                    
  else
  {

    let index = Split[1]

    // setting iterator as per user input 
    //for iterator like count=count + 1, Array[count]

    let newInterator = 0

    let token = CompleteTokenValueList.find(el => el.name == index)

    if (token != undefined)
    {

      newInterator = token.value

    }
    else
    {

      newInterator = iterator
    }

    ArrayElement = CreateArrayElement(Value, newInterator)

  }

  // this code is written to find operations like Array[a]= a*100+age*a. notice a
  //find a way to simplify this in long term

  let data = ValueToSet

  data = data.split('*').toString();
  data = data.split('+').toString();
  data = data.split('-').toString();
  data = data.split('/').toString();
  data = data.split(',')

  //building a new value to convert a*100+age*a into 5*100+age*a and then sending it to CalculateValues()
  let NewValueToSet = ''

  if (data.includes(Split[1]) && data.length > 1)

  {

    //we have operations like Array[a]= a*100+age*a. notice a

    for (let m = 0; m < ValueToSet.length; m++)

    {

      if (ValueToSet[m] == Split[1] && !(/^[a-z]+$/i.test(ValueToSet[m + 1])))

      {

        // value is been set . replacing index value a with iteartor value 0,1,2, etc.   
        NewValueToSet = NewValueToSet + iterator

      }
      else
      {

        NewValueToSet = NewValueToSet + ValueToSet[m]

      }

    }

    let iterat = false
    //gave it a different name so it would not fuck up with for loop iterator

    NewValueToSet = CalculateValues(NewValueToSet, j, CompleteTokenValueList, )
    

    SetArrayorStringElement(ArrayElement, CompleteTokenValueList, iterat, NewValueToSet, tokens,ExecutionStack)

 


  }

  // this condition enables program to only run  Array[a]= xyz when iterator is a. It disallows running Array[blablabla]=xyz
  if (OriginalIterator == Split[1])
  {

    if (Split[1] == ValueToSet)
    {

      let iterator = true

      SetArrayorStringElement(ArrayElement, CompleteTokenValueList, iterator, ValueToSet, tokens,ExecutionStack)

    }

    // for operations like Array[a]=ageone*100

    if (!data.includes(Split[1]) && OriginalIterator == Split[1])
    {

      let iterator = false

      ValueToSet = CalculateValues(ValueToSet, j, CompleteTokenValueList)

      SetArrayorStringElement(ArrayElement, CompleteTokenValueList, iterator, ValueToSet, tokens,ExecutionStack)

    }

  }

  //might have to add more conditions in the future
  else
  {

    let iterator = false

    ValueToSet = CalculateValues(ValueToSet, j, CompleteTokenValueList)

    SetArrayorStringElement(ArrayElement, CompleteTokenValueList, iterator, ValueToSet, tokens,ExecutionStack)

  }

}


function AddtoExecutionStack(stack,keyword, keywordUse, variable, value ,message)
{




stack.push(
  
  {
   keyword:keyword,
   keywordUse:keywordUse,
   variable:variable,
   value:value,
   message:message,
   


  }

  

)

//console.log('stack: ', stack);

}

export
{
  GetCleanSourcedata,
  Count,
  ForLoopSetMetadata,
  getLoopIndexStart,
  AddElementToArray,
  ResetValue,
  HandleBlocks,
  HandleConditions,
  AssignorUpdateValues,
  PushGetArrayIndexValue,
  PushSetArrayIndexValue,
  isArrayOperation,
  GetConditionValue,
  CalculateValues,
  handlemultConditions,
  CreateArrayElement,
  SetArrayorStringElement,
  RemoveBrackets,
  ForLoopArrayorStringOutput,
  GetArrayorStringElement,
  AcceptInputandSetValue,
  SplitElementsArray,
  SetValues,
  UpdateUpdated_tokenswithValues,
  SetArrayIndexValue,
  AddtoExecutionStack
}