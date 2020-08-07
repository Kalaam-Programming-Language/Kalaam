
import {RemoveQuotes, RemoveBrackets,} from "../Scripts/Helpers";

//ANCHOR - Functions to push token with type and value into tokens array for further parsing

function isNumber(element) {



    return (/^[0-9]*$/gm.test(element));

}



function PushVariable(value, tokens, Varvalue) {
    
    Varvalue=RemoveQuotes(Varvalue);

    let Datatype = (isNumber(Varvalue) && Varvalue!="") ? "Number" : "String";



    tokens.push({
        type: "variable",
        value: value,
        Datatype:Datatype,
    });

}

function PushString(value, tokens) {
    tokens.push({
        type: "string",
        value: value,
    });

}

function PushVariableValue(value, tokens) {



    tokens.push({
        type: "value",
        value: value,
    });

}

function PushNumber(value, tokens) {
    tokens.push({
        type: "value",
        value: value,

    }

    );
}

function PushOperator(value, tokens) {
    tokens.push({
        type: "operator",
        value: value,
    }

    );
}

function PushKeyword(value, tokens) {

    value = value.replace("+", " + ");

    tokens.push({
        type: "keyword",
        value: value,
    });

}
function PushConditionalKeyword(value, tokens) {
    tokens.push({
        type: "conditionalkeyword",
        value: value,
    });

}


function PushEmptyArrayInit(tokens, data, i) {
    tokens.push({
        type: "EmptyArrayInit",
        value: data[i - 1],
        //skipping =
    });

}


function PushForLoop(value, tokens) {
    tokens.push({
        type: "ForLoopStart",
        value: value,
    });

}

function PushInput(value, tokens, cleaned_sourcedata, i) {

    let lastchar = value.charAt(value.length - 1);


    value = (lastchar == ",") ? value = value + cleaned_sourcedata[i + 1] : value;

    value = RemoveBrackets(value);

    value = value.replace("इनपुट", "");


    tokens.push({
        type: "AcceptInput",
        value: " ",
        AcceptAs: value,
    });

}





function PushWhileLoop(value, tokens) {



    tokens.push({
        type: "WhileLoopStart",
        value: value,
    });

}

function PushWhileLoopCondition(value, tokens) {
    tokens.push({
        type: "WhileLoopCondition",
        value: value,
    });

}


function PushForLoopAruguments(element, cleaned_sourcedata, i, tokens) {

    //This values will be fixed even though for loop definations change
    let iterator = cleaned_sourcedata[i + 1];
    let value = cleaned_sourcedata[i + 3];

    if (value.includes("(") && value.includes(",")) {

        let Range = RemoveBrackets(value).split(",");
        let iterationStart = Range[0];
        let iterationEnd = Range[1];

        // let k = i + 5;

        PushArgs(iterator, value, iterationStart, iterationEnd);


        //run a function to collect arguments

    }

    else {



        let Range = RemoveBrackets(cleaned_sourcedata[i + 5]).split(",");

        let iterationStart = Range[0];
        let iterationEnd = Range[1];

        //let k = i + 6;



        PushArgs(iterator, value, iterationStart, iterationEnd);


    }


    //to get (2,9) into start=2 and end=9

    //run a function to store sourcedata




    function PushArgs(iterator, value, iterationStart, iterationEnd) {

        tokens.push({

            type: "ForLoopArguments",
            iterator: iterator,
            value: value,
            iterationStart: iterationStart,
            iterationEnd: iterationEnd,



        });

    }





}



function PushCondition(value, tokens) {


    tokens.push({
        type: "condition",
        value: value,
    });

}


function PushToArray(value, tokens) {




    tokens.push({
        type: "PushToArray",
        value: value,
    });




}


function PushExpression(value, tokens) {




    tokens.push({
        type: "expression",
        value: value,
    });




}

function PushNativeOperation(value, tokens) {




    tokens.push({
        type: "NativeOperation",
        value: value,
    });




}

function PushFunctionData(value, tokens, sourcedata, i) {

    let functionName = sourcedata[i + 1];
    let functionNameSplit = functionName.split("(");
    let functionArguments = RemoveBrackets(functionNameSplit[1]);
    //   
    functionArguments = functionArguments.split(",");



    tokens.push({
        type: "function",
        value: functionNameSplit[0],
        arguments: functionArguments,
        FunctionInvocationExists: false,
        FunctionStack: [],
    });


}

function PushFunctionExecution(value, tokens, sourcedata, i, passedValues) {

    let functionName = value;
    let functionNameSplit = functionName.split("(");
    let functionArguments = RemoveBrackets(functionNameSplit[1]);
    //   
    functionArguments = functionArguments.split(",");



    tokens.push({
        type: "functionExecution",
        value: functionNameSplit[0],
        arguments: functionArguments,
        FunctionInvocationExists: true,
        passedValues: passedValues,
    });


}

function PushArray(value, tokens) {


    if (value.includes("(") && value.includes(")")) {

        value = RemoveBrackets(value);

        value = value.replace("]", "");


        let Split = value.split("[");

        let IndexInput = Split[1];

        value = value + "]";

        tokens.push({
            type: "Array",
            value: value,
            IndexInput: IndexInput,
        });



    }

    else {

        tokens.push({

            type: "Array",
            value: value,


        });

    }



}

function PushCalculation(value, tokens, cleaned_sourcedata, i) {

    //not allowing values like Numbers[a]

    if (!(!(/\d+/.test(cleaned_sourcedata[i - 3])) && cleaned_sourcedata[i - 3].includes("["))) {
        //

        tokens.push({
            type: "Calculation",
            value: value,



        });
    }
}




function PushRealTimePrintOperation(value, tokens) {


    tokens.push({
        type: "value",
        value: value,
        mode: "RealTimePrint",

    });

}

function PushStringandValueOperation(value, tokens) {
    tokens.push({
        type: "value",
        value: value,
        mode: "StringandValue",

    });

}


export { PushVariableValue,PushNativeOperation, PushToArray, PushFunctionExecution, PushFunctionData, PushInput, PushArray, PushEmptyArrayInit, PushCalculation, PushConditionalKeyword, PushCondition, PushWhileLoop, PushWhileLoopCondition, PushForLoop, PushForLoopAruguments, PushExpression, PushKeyword, PushNumber, PushOperator, PushRealTimePrintOperation, PushString, PushStringandValueOperation, PushVariable, };