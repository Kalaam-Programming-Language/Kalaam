function SourceDataReplaceforEasyParsing(data)

    {


    
        data = data.replace(/प्रिंट/g, " प्रिंट ");
        data = data.replace(/\( /g, '('); 
       // data = data.replace(/\)/g, ' )');
      //  data = data.replace(/\+ /g, '+');
        data = data.replace(/\= "/g, '="');
        data = data.replace(/\= '/g, "='");

       

        
        data = data.replace(/\जबतक/g, 'जबतक ');
        data = data.replace(/\अन्यथा{/g, 'अन्यथा {');
        
         data = data.replace(/\[ /g, '[');
         data = data.replace(/\)}/g, ') }');
         data = data.replace(/\){/g, ') {');
         data = data.replace(/\}}/g, '} }');
         data = data.replace(/\को/g, 'को ');
       data = data.replace(/\मे{/g, 'मे {'); 
         data = data.replace(/\अगर/g, 'अगर ');
         data = data.replace(/(?:\r\n|\r|\n)/g, ' ');
        // data = data.replace(/\==/g, ' == ');

        //preparing data for easy parsing by handling new lines, enters etc.
        data = data.replace(/(;|\n|\r|' '| '| ")/gm, "").split(' ')

        return data
        
        
    }




    
     
export {SourceDataReplaceforEasyParsing}


