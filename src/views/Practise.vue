<template>
  <div class="hello">
   
 <Header/>
<!--
   <div v-if="PractiseOn" style="border:solid 5px green" class="PractiseMode" id="compiler">


   <div id="textarea">


  <no-ssr placeholder="...">

  <codemirror id="codearea" style="text-align:left;" ref="myCm"
              :value="code" 
              placeholder="Welcome To Kalaam, This is your Code Editor."
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>
  </no-ssr>

    <button style="background: linear-gradient(to right, #11998e, #12ff6b);
    border: none;
    font-weight: 600;" id="subm" @click="RUN()">RUN</button>
        <button id="subm" @click="Add('प्रिंट()')"> प्रिंट</button>
<button id="subm" @click="Add('रचना')">रचना</button>
    <button id="subm" @click="Add('इनपुट()')">इनपुट</button>

    <button id="subm" @click="Add('अगर()')">अगर</button>

    <button id="subm" @click="Add('दुहराओ x को y मे')">दुहराओ </button>
    <button id="subm" @click="Add('जबतक()')">जबतक</button>
    <button id="subm" @click="Add('.संख्या()')">.संख्या</button>
    <button id="subm" @click="Add('.पुश()')">.पुश</button>
    <button id="subm" @click="Add('अन्यथा')">अन्यथा</button>
    

   
   </div>

    <div id="output">

<div id="bharatDIV">

<p id="version">Kalaam v1.0.0</p>
<p id="CodeStatus" v-if="this.isError==false">{{TimeTaken}}</p>
        
<p id="CodeStatus" v-if="this.isError==true" >{{TimeTaken}}</p>
        

<div id="printOutput">

<p style="white-space: pre; "  id="linebylineOutput" v-for="(output,index) in this.linebylineOutput" :key="index">


 {{output}} 



</p>
</div>
</div>




    </div>
</div>
  
-->
   <div v-if="LearningOn" class="LearningMode" id="compiler">


   <div id="textarea">


  <no-ssr placeholder="...">

  <codemirror id="codearea" style="text-align:left;" ref="myCm"
              :value="code" 
              placeholder="Welcome To Kalaam, This is your Code Editor."
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>
  </no-ssr>

    <button style="background: linear-gradient(to right, #11998e, #12ff6b);
    border: none;
    font-weight: 600;" id="subm" @click="RUN()">RUN</button>
        <button id="subm" @click="Add('प्रिंट()')">प्रिंट</button>
    <button id="subm" @click="Add('इनपुट()')">इनपुट</button>

    <button id="subm" @click="Add('अगर()')">अगर</button>
        <button id="subm" @click="Add('अन्यथा')">अन्यथा</button>


    <button id="subm" @click="Add('दुहराओ x को y मे')">दुहराओ </button>
    <button id="subm" @click="Add('जबतक()')">जबतक</button>
    <button id="subm" @click="Add('.संख्या()')">.संख्या</button>
    <button id="subm" @click="Add('.पुश()')">.पुश</button>
    <button id="subm" @click="Add('रचना')">रचना</button>

    

   
   </div>

    <div id="output">

<div id="bharatDIV">

<p id="version">Kalaam v1.0.0</p>
<p id="CodeStatus" v-if="this.isError==false">{{TimeTaken}}</p>
        
<p id="CodeStatus" v-if="this.isError==true" >{{TimeTaken}}</p>
        

<div id="printOutput">

<p style="white-space: pre; "  id="linebylineOutput" v-for="(output,index) in this.linebylineOutput" :key="index">


 {{output}} 



</p>
</div>
</div>




    </div>
</div>
  

    
      
  </div>
</template>

<script>
//This is our header file AKA Navigation bar located in components folder. 
import Header from '../components/Header'





//CodeMirror is an npm package whcih provides rich code editors
import
{
  codemirror
}
from 'vue-codemirror'

//Code editor styling
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/Kalaam/Kalaam.js'

  // theme css
  import 'codemirror/theme/yonce.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'


  // keyMap
  import'codemirror/addon/edit/matchbrackets.js'

  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/keymap/sublime.js'

  // foldGutter
  import'codemirror/addon/fold/foldgutter.css'
  import'codemirror/addon/fold/brace-fold.js'
  import'codemirror/addon/fold/comment-fold.js'
  import'codemirror/addon/fold/foldcode.js'
  import'codemirror/addon/fold/foldgutter.js'
  import'codemirror/addon/fold/indent-fold.js'
  import'codemirror/addon/fold/markdown-fold.js'
  import'codemirror/addon/fold/xml-fold.js'
// Importing our Compile Engine
//We need a name for our compiler, any suggestions?

import Compile from '../lib/Compiler/main'

//Central data storage of Kalaam
import
{
  mapState
}
from 'vuex'

export default
{
  name: "HelloWorld",
  props:
  {
    msg: String
  },

  //Retriveing CurrentCode present in the Central data storage of Kalaam.
  computed: {




  },


  //This is a local data restricted to Kalaam.io/practise component. 
  //Our Compiler takes data from here, does it's magic and save it back here
  data()
  {
    return {

      //Code written by user
      code: '',

      //Compiled Output
      output: '',
      cm: '',
      //Error handling array. Need a lot of improvements in this particular part
      error: [],
      OperationObjects: [],
      //Printing compiled output in a more readable line by line format 
      linebylineOutput: '',

      //Calculating the time taken to compile the code
      TimeTaken: '',
      inputIndexes: [],
      //input: '',
      isError: '',

      LastConditionValue: [],
      LineByLineCode: [],
      LearningOn:true,
      PractiseOn:true,

      //Configuration for codemirror text edior that we are using
      cmOptions:
      {
        // codemirror options
        tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          styleSelectedText: false,
          line: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
         mode: 'kalaam',
          hintOptions:{
            completeSingle: true
          },
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "yonce",
         scrollbarStyle:'null',

          
      }

    };
  },

  //Imported components
  components:
  {
    codemirror,
    Header
  },

  //Created() is Called synchronously after the instance is created or when kalaam.io/practise is visited

computed:{


Mode()
{

  return this.$store.state.PractiseOn
}


}
,
 watch: {
    Mode (ModePrev, ModeNow) {
this.PractiseOn=ModeNow
this.LearningOn=!ModeNow



}

 }
,

  created()
  {

   
    //Since html reads '>' and '<' as '&gt' and '&lt' respectively, we need to replace it back to the desired way.

    let m = this.$store.state.CurrentCode.replace('&lt;', '<')
    m = m.replace('&gt;', '>')

    //Setting the formatted code to this.code. this.code is how you can access the code written by user.
    this.code = m

  },

  //This is the start of our functions.
  methods:
  {

    // Below 3 are the fucntions provided by Codemirror code editor out of the box. We dynamically change it's height for different devices and make it responsive.
    onCmReady(cm)
    {

      this.cm = cm;

      if (screen.width < 420)
      {

        this.cm.setSize('100%', 300);

      }
      else
      {

        this.cm.setSize('100%', 500);
      }

    },
    
    onCmCodeChange(newCode)
    {
      this.code = newCode
    },

    //Add() is a function used to add clicked keywords on to the code editor. 
    //This keywords are in hindi, provided in the control panel at the bottom of our code editor.
    Add: function(insert)

    {

      //Getting a codemirror instance
      var doc = this.cm.getDoc();
      //Getting the current position of cursor on Code editor
      var cursor = doc.getCursor();

      //Adding the clikced element (insert)
      doc.replaceRange(insert, cursor);

    },

    //This is the start of Compiler. RUN() is the function executed when a user wants to run the code and see the output.
    //This is our main guy consisting of different functions to parse, generate token array, compile code and print output.

    RUN: function()
    {

//Compile is our #1 function located in /lib/compiler/main.js
//this.$data is the local data restricted to Kalaam.io/practise component which we have declared in 'data()' above
//try console.log(this.$data) to see what we are sending to our compiler
      
    Compile(this.$data)

    }

  }

};
</script>
<style scoped>


::-webkit-input-placeholder {
   text-align: center;
   vertical-align: middle;
   line-height: 500px;
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;  
      vertical-align: middle;
        line-height: 500px;


}


::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;  
      vertical-align: middle;
         line-height: 500px;


}

:-ms-input-placeholder {  
   text-align: center; 
      vertical-align: middle;
         line-height: 500px;


}

button:focus {outline:0;}

#bharatP{


text-align: left;
  display: table-cell;
    font-family: monospace
}
#versionNumber{


text-align: left;
  display: table-cell;
    font-family: monospace;
    padding-left: 6%
}


#version{

    margin: 0;
    float: left;
    color: #92924c;
    font-size: 90%;

}

#bharatDIV{

    padding-top: 2%;
    padding-left: 2%

}


#linebylineOutput
{



height: 10px;
    text-align: left;
    


}
#errorstack{

text-align: left;
padding-left: 2.5%;
padding-top: 6%;
font-weight: bold;
color:rgb(231, 83, 83);

}

#compiler{

  display: flex;
}

#textarea{

  width: 50%;
  margin-left: -1%

}
#output{

  height: 600px;
  width: 50%;
  background-color: black;
    color: white;
    overflow: auto
  
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  display: grid;
}


#codearea {
width: 93%;
    margin-left: 3.5%;
    height: 500px;
    background-color: whitesmoke;
    font-family: monospace;
    font-size: medium;
    border: none;
    outline: none;
    resize: none;
}

#row{

display: flex;
    width: 2%;
    margin-top: -12%;

}

#rowdiv{


  verflow: hidden;
    height: 500px;
    margin-left: 2%;
    margin-right: 1%;
    margin-top: 0%;
    font-size: small;

}

#subm {
  width: 18.5%;
  height: 50px;
      cursor: pointer;
      border: none

  
}

#subm:hover{


    background-image: radial-gradient( circle 534px at 7.8% 17.6%,  rgba(254,253,112,1) 1.7%, rgba(248,143,111,1) 91.8% );
}

p{

 
  margin-top: 4%
}

#CodeStatus{

    margin-top: 5%;  
      text-align: left;
    color: #2fff2f;
    font-family: monospace

}





/* Smartphones (portrait) ----------- */
@media only screen
and (max-width : 480px) {


::-webkit-input-placeholder {
   text-align: center;
   vertical-align: middle;
   line-height: 250px;
   font-size: 90%
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;  
      vertical-align: middle;
        line-height: 250px;

   font-size: 90%

}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;  
      vertical-align: middle;
         line-height: 250px;

   font-size: 90%

}

:-ms-input-placeholder {  
   text-align: center; 
      vertical-align: middle;
         line-height: 250px;
   font-size: 90%


}

#compiler{


    display: inline-block
}

#CodeStatus{

text-align: left;

}

#linebylineOutput{


}
.hello{


    text-align: center;
    margin-top: 2%
}
#textarea{

    width: 100%;
    margin: 0%
}
#codearea{

       height: 310px;
       width: 99%;
       margin-left: 0

}

#textarea button{

width: 20%;
    height: 30px;
    font-size: small;
}

#output{


    width: 100%;
   height: 330px;

    margin-top: 5%;
}
#printOutput{

    width: 100%;
    float: left
}

#headerlist{

    list-style-type: none;
    padding: 0;
    display: grid;
  
    width: 100%;
    background-color: #9cffff;
    line-height: 40px;
}

}



</style>