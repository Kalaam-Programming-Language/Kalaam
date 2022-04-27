
function RemoveBrackets(element){

    let a = element.replace('(', '');
    let b = a.replace(')', '');
    let c = b.replace('}', '');
    let d = c.replace('{', '');

    return d;

}


//This are all build operations. 
//They are used to unify a string, a condition or array.

//Cleaned_sourcedata stores data in tokens, i.e individual words .

//To peform operations we have to get them in one piece, here is where we do that


export function BuildString() {


    return function(element,i,cleaned_sourcedata){


        var foundString = '';

        //the flag is introduced to remove spaces introduced in strings. e.g " swanand kadam"
        var flag=0;

        let k = i;



        for ( k; k < cleaned_sourcedata.length; k++) {

            let item = cleaned_sourcedata[k - 1].charAt(cleaned_sourcedata[k - 1].length - 1);
         

            if (item == '"' || item == '\'')

            {
                break;
            } 
            if(flag==1){

                foundString = foundString + ' ' + cleaned_sourcedata[k];

            }
         
            if(flag==0){

                foundString = cleaned_sourcedata[k];
                flag=1;

            }
        


        }
        return foundString;
     


    };
}

export function BuildArray() {


    return function(element,i,cleaned_sourcedata){

        var foundArray = '';

        //the flag is introduced to remove spaces introduced in Arrays. e.g " swanand kadam"
        var flag=0;

        let k = i;



        for ( k; k < cleaned_sourcedata.length; k++) {

            let item = cleaned_sourcedata[k - 1].charAt(cleaned_sourcedata[k - 1].length - 1);
       


            if (item == ']')

            {
                break;
            } 
            if(flag==1){

                foundArray = foundArray + ' ' + cleaned_sourcedata[k];
        

            }
         
            if(flag==0){

                foundArray = cleaned_sourcedata[k];
                flag=1;
            

            }
        
         


        }
      

        return foundArray;
    
    };


}

export function BuildCondition() {


    return function(element,i,cleaned_sourcedata){

        var foundString = '';

        let k = i+1; // +1 to skip if, else etc and acquire condition
     


        for ( k; k < cleaned_sourcedata.length; k++) {

            // let item = cleaned_sourcedata[k - 1].charAt(cleaned_sourcedata[k - 1].length - 1);


            if (cleaned_sourcedata[k] == '{' || cleaned_sourcedata[k] == '){' || cleaned_sourcedata[k] == ') {' )

            {
                break;
            } else {

                foundString = foundString + ' ' + cleaned_sourcedata[k];

            }


        }

        foundString=RemoveBrackets(foundString);

        foundString=foundString.replace(' ', '');

        return foundString;
   


    };
}



 