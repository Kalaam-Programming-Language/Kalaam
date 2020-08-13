import { ActiveLangugaeKeywords } from "../Compiler/constants";

var Keywords = [ActiveLangugaeKeywords.If, "दुहराओ", ActiveLangugaeKeywords.While, ActiveLangugaeKeywords.Print, "इनपुट", "रचना", ];


//var PrintKeywordRegex = "^" + "(" + ActiveLangugaeKeywords.Print + ")*$"
//PrintKeywordRegex = new RegExp(PrintKeywordRegex)


var NativeOperations = ["संख्या", ];

function RemoveBrackets(element) {

    let a = element.replace("(", "");
    let b = a.replace(")", "");
    let c = b.replace("}", "");
    let d = c.replace("{", "");

    return d;

}

function isArrayOperation(element) {



    //To find Patterns like Array[2], Array[index] etc

    element = RemoveBrackets(element);

    if (element.charAt(element.length - 1) == "]" && element.includes("[") && element.charAt(0) != "[") {


        return true;
    }

}


export function isVariable() {

    return function(element) {

        var HindiRegex = /(?:^|\s)[\u0900-\u097F]+?(?:\s|$)/g


        return ((/^[a-z]+$/i.test(element)) || HindiRegex.test(element) && ((!Keywords.includes(element))))



    };

}
export function isNumber() {

    return function(element) {

        return (/^[0-9]*$/gm.test(element));

    };
}


export function isOperator() {

    return function(element) {

        return (/^(=|}|{)*$/gm.test(element));

    };
}

export function isInput() {

    return function(element) {

        return element.includes("इनपुट");

    };
}




export function isPrintOperation() {

    return function(element) {

        return (element.includes(ActiveLangugaeKeywords.Print));



    };
}

export function isConditionalKeyword() {

    return function(element) {

        return (element == ActiveLangugaeKeywords.If || element == ActiveLangugaeKeywords.While || element == "अन्यथा");

    };
}

export function isForLoop() {

    return function(element) {

        return element == "दुहराओ";

    };
}

export function isWhileLoop() {

    return function(element) {

        return element == ActiveLangugaeKeywords.While;

    };
}

export function isFunction() {

    return function(element) {

        return element == "रचना";

    };
}


//needs work
export function isExpression() {

    return function(element) {



        return (/\(([^)]+)\)/.test(element)) || element.includes("()");

    };
}

export function isArray() {

    return function(element) {

        return element.charAt(0) == "[";

    };
}

export function isSetArrayIndexValue() {

    return function(element, data, i) {

        element = RemoveBrackets(element);


        if (isArrayOperation(element) && data[i + 1] == "=") {


            return true;
        } else if (isArrayOperation(element) && (data[i + 1] == "=" || data[i - 1] == "=")) {


            return false;
        }

    };
}


export function isEmptyArrayInit() {

    return function(element, data, i) {

        return element == "=" && data[i + 1] == "[]";

    };
}

export function isEmptyStringorChar() {



    return function(element) {





        return element == "\"" || element == "'" || element == "*" || element == "$" || element == "/" || element == "@" || element == "|" || element == "/" || element == "?" || element == "#" || (element.charAt(0) == "'" && element.charAt(element.length - 1) == "'") || (element.charAt(0) == "\"" && element.charAt(element.length - 1) == "\"");


    };


}


export function isString() {



    return function(element) {


        return element.charAt(0) == "'" || element.charAt(0) == "\"" && !(element.includes(ActiveLangugaeKeywords.Print));


    };


}

export function isNativeOperation() {



    return function(element) {



        let flag = false;

        NativeOperations.forEach(el => {


            if (element.includes(el))

            {

                flag = true;
            }
        });

        return flag;


    };



}


export function isFunctionCall() {



    return function(element, tokens, cleaned_sourcedata, i) {



        if (!Keywords.includes(cleaned_sourcedata[i - 1]))

        {

            let CheckFunctionExpression = element.split("(");


            var token = tokens.find(el => (el.type == "function" && el.value == CheckFunctionExpression[0]));


            return token != undefined ? true : false;






        }

    };


}