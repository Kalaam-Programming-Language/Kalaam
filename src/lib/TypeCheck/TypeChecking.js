function RemoveBrackets(element){

    let a = element.replace('(', '')
    let b = a.replace(')', '')
    let c = b.replace('}', '')
    let d = c.replace('{', '')

    return d

}

function isArrayOperation(element){



    //To find Patterns like Array[2], Array[index] etc

    element=RemoveBrackets(element)

    if(element.charAt(element.length-1)==']' && element.includes('[')&& element.charAt(0)!='['){


        return true
    }

}


export function isVariable () {

    return function(element){
        if (/^[a-z]+$/i.test(element)) {
            return true;
        }

    }
    
};
export function isNumber() {

    return function(element){
    if (/^[0-9]*$/gm.test(element)) {
        return true;
    }
}
};


export function isOperator () {

    return function(element){
    if (/^(=|}|{)*$/gm.test(element)) {
        return true;
    }
}
};

export function isInput () {

    return function(element){
    if (element.includes('इनपुट')) {
        return true;
    }
}
};




export function isKeyword() {

    return function(element){
    if (/^(प्रिंट)*$/gm.test(element)) {
        return true;
    }
}
};

export function isConditionalKeyword() {

    return function(element){
    if (element=="अगर" || element=='जबतक' || element=='अन्यथा') {
        return true;
    }
}
};

export function isForLoop() {

    return function(element){
    if (element=="दुहराओ") {
        return true;
    }
}
};

export function isWhileLoop() {

    return function(element){
    if (element=="जबतक") {
        return true;
    }
}
};

export function isFunction() {

    return function(element){
    if (element=="रचना") {
        return true;
    }
}
};


//needs work
export function isExpression() {

    return function(element){

       
    if (/\(([^)]+)\)/.test(element) || element.includes('()') ) {
        return true;
    }
}
};

export function isArray() {

    return function(element){
    if (element.charAt(0)=='[') {
        return true;
    }
}
};

export function isSetArrayIndexValue() {

    return function(element,data,i){

        element=RemoveBrackets(element)
        

    if (isArrayOperation(element) && data[i+1]=='=' ) {

        
        return true;
    }

    else if (isArrayOperation(element) && (data[i+1]=='=' || data[i-1]=='=') ) {

        
        return false;
    }

}
};

export function isEmptyArrayInit() {

    return function(element,data,i){
    if (element=='=' && data[i+1]=='[]') {
        return true;
    }
}
};

export function isEmptyStringorChar(){


     
    return function(element){
if(element=='"'|| element=="'" || element=='*'||element=='$'||element=='/'||element=='@'||element=='|'||element=='/'||element=='?'||element=="#"||(element.charAt(0)=="'" &&element.charAt(element.length-1)=="'" )||(element.charAt(0)=='"'&&element.charAt(element.length-1)=='"'))


{

return true

}
    }


}


export function isString(){


     
    return function(element){
if(element.charAt(0) == "'" || element.charAt(0) == '"' && !(element.includes("प्रिंट")))


{

return true

}
    }


}


