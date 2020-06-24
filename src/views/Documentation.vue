<template>
  <div class="about">
     <Header/>

    <div>
<button  v-on:click="showStar0 = !showStar0"  type="button" class="collapsible">प्रिंट()</button>

<transition name="slide-fade">
<div v-if="showStar0" class="content">

<div>

<h2>Usage</h2>

<h5> Print characters on the output screen</h5>

<h2>Implementation</h2>

<h4>1: Print a Declared Variable </h4>
<p>Name="Hello World" </p>  
<p>प्रिंट(Name) </p>  
<p>    </p>

<h4>2: Print a Direct String </h4>
<p>प्रिंट("Hello World")</p> 
<p>प्रिंट(007)</p> 

<h4>3: Print a Multi/Concatenated String </h4>
<p>Name="Kalam" </p> 
<p>प्रिंट("Hello World," + "My Name is" + Name + "!")</p> 


</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >


#PRINT A DECLARED VARIABLE

Name="Hello World"   
प्रिंट(Name)   

#PRINT A DIRECT STRING

प्रिंट("Tic Tac Toe") 
प्रिंट(007) 

#PRINT A MULTI/CONCANATED STRING

Name="Kalam"  
प्रिंट("Hello World," + "My Name is" + Name + "!") 


 

</pre>
</p>
</div>


</div>

</transition>
<button   v-on:click="showStar1 = !showStar1"  type="button" class="collapsible">रचना</button>
<transition name="slide-fade">
<div v-if="showStar1" class="content">

<div>

<h2>Usage</h2>

<h5> Reusable code wrapped inside a block, also known as a function.</h5>

<h2>Implementation</h2>

<h4>1: Define a Function </h4>
<h3>रचना <i>FunctionName</i> (<i>argument1</i> ,<i>argument2</i> ) </h3>  
<h5><b>Function Name</b></h5>  
<p>Function names are case sensitive and should contain only alphabet letters </p>  
<h5> <b>Function Arguments</b>  </h5>  
<p>Function Arguments set themselves with temporary values that are passed inside a function when a function is called. </p>  
<p>Arguments names are also case sensitive Argument names are your choice but should contain only alphabet letters.</p> 




<h4>2: Calling a Function </h4>
<h3><i>FunctionName</i> (<i>argument1</i> ,<i>argument2</i> ) </h3> 
<h5><b>Function Name- PrintFullName</b>  </h5>  
<p>While calling function, make sure that the Function name declaration is same as a function call. <br> For e.g PrintFullName≠printfullname  </p>  

<h2> Example</h2>
<h5><b>Define Variables</b></h5>
<h5>FirstName- 'Sachin' </h5> 
<h5>LastName- 'Tendulkar' </h5> 

<h5><b> Function declaration</b></h5>
 <h5>PrintFullName (x, y) </h5> 

 <h5><b> Function Body</b></h5>
 <h5>{</h5>
 <h5>प्रिंट( x + y ) </h5> 
 <h5>}</h5>

<h5><b>Function call</b>  </h5>  
<h5>PrintFullName(FirstName,LastName)</h5>

<p>While calling function, make sure that the Function name declaration is same as a function call. <br> For e.g PrintFullName≠printfullname  </p>  

<h5> <b>Function Argument Values Passed- ('Sachin','Tendulkar')</b>  </h5>  
<p>As per the grammer set under the hood of this programming language, ( x , y ) will become ('Sachin','Tendulkar').  </p>
<p>x will take a temporary value of 'Sachin'</p>
<p>y will take a temporary value of 'Tendulkar'</p>



</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID2')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID2" >



#YOU CAN PRE DEFINE THE VARIABLES
#YOU CAN ALSO ACCEPT THEM AS INPUT  

FirstName='Sachin'

LastName='Tendulkar'

NewFirstName='Sunil'

NewLastName='Chetri'

#FUNCTION DECLARATION- NAME YOUR FUNCTION AND ARGUMENTS

रचना PrintFullName(First,Last)

{

प्रिंट(First + Last)



}

#FUNCTION EXECUTION EXAMPLES- PASS THE DIFFERENT DESIRED VALUES AS ARGUMENTS

PrintFullName(FirstName,LastName)

PrintFullName(NewFirstName,NewLastName)



#FUNCTION EXAMPLE 2

Job='Doctor'
City='Pune'

#FUNCTION DECLARATION- NAME YOUR FUNCTION AND ARGUMENTS

रचना AboutMe(x,y)

{



प्रिंट("I am a" + x + "in" + y)


}

#FUNCTION EXECUTION


AboutMe(Job,City)


 #Example 3


NumberOne=20
NumberTwo=40

रचना Add(a,b)
{

c=a+b

प्रिंट(c)


}


Add(NumberOne,NumberTwo)


 

 




 

 

</pre>
</p>
</div>



</div>
</transition>
</div>
<button   v-on:click="showStar2 = !showStar2"  type="button" class="collapsible">इनपुट()</button>

<transition name="slide-fade">
<div v-if="showStar2" class="content">
<div>

<h2>Usage</h2>

<h5> Accept an Input and set it to a Variable </h5>

<h2>Implementation</h2>

<h4>1: Pass a Variable inside <i> इनपुट() </i></h4>
<h5>इनपुट(<i> YourVariable </i>)</h5>  

<h2> Example</h2>

<h5>इनपुट(Name)</h5> 
<p>If you have entered <i>Kalam</i>  as input then complier will set <b> Name="Kalam".</b> </p> 
<p>Once the value is set, you can use that variable value throughout the program. </p> 



</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >


#PASS A VARIABLE TO GRAB THE VALUE

इनपुट(Name)

#CHECK THE ACCEPTED VARIABLE VALUE
 
प्रिंट(Name)


 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar3 = !showStar3"  type="button" class="collapsible">अगर()</button>
<transition name="slide-fade">
<div v-if="showStar3" class="content">
<div>

<h2>Usage</h2>

<h5> Allow code execution on a certain condition. Evaluates to TRUTH or False  </h5>

<h2>Implementation</h2>

<h4>1: Pass a Single Condition to Evaluate in अगर() </h4>
<h5> अगर (Language=='kalam') </h5>  
<h5> अगर (Age > 18) </h5>  
<p><b> The accepted comparison operators are: </b>  </p>
<p><b>></b> - Greater than</p>
<p><b><</b> -  Less than</p>
<p><b>==</b> - is Equal to</p>
<p><b>!=</b> - is Not Equal to</p>



<h4>2: Pass a Multi Condition to Evaluate in अगर() </h4>
<h5>अगर (Age>16 && Education =='ssc')</h5> 
<h5>अगर (Country=='india' || Language=='hindi')</h5> 


<p><b> The accepted comparison operators are: </b> </p>
<p><b>&&</b> - If BOTH of the conditions are true, evaluates to TRUE</p>
<p><b>||</b> - If ONE of the conditions is true, evaluates to TRUE</p>


</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >

#ACCEPT AN INPUT

इनपुट(language)

#EVALUATE THE CONDITION

अगर(language=='kalam')

{

#IF CONDITION IS TRUE, RUN THIS.

प्रिंट('Alright, that's cool!')


}


EXAMPLE 2

#ACCEPT INPUTS

इनपुट(language)

इनपुट(country)

#EVALUATE THE CONDITION

अगर(language=='kalam' || country=='india')
{

#IF ONE OF THE CONDITION IS TRUE, RUN THIS


प्रिंट('That works too.')


}



 

</pre>
</p>
</div>
</div>
</transition>

<button   v-on:click="showStar8 = !showStar8"  type="button" class="collapsible">अन्यथा</button>
<transition name="slide-fade">
<div v-if="showStar8" class="content">
<div>

<h2>Usage</h2>

<h5> Run a block of code if none of the conditions are satisfied</h5>

<h2>Implementation</h2>

<h4>1: Define  </h4>
<h5>अन्यथा </h5>  

<p> Please note that अन्यथा does not take any arguments even if it has open brackets.     </p>
<p>I just didn't want to snatch that superpower away fom her.</p>



</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >


#ACCEPT AN INPUT

language='kalam'

#EVALUATE THE CONDITION

अगर(language=='kalam')

{

#IF CONDITION IS TRUE, RUN THIS.

प्रिंट('Alright, that's cool!')


}

#IF NONE OF THE CONDITIONS ARE SATISFIED, RUN THIS.

अन्यथा
{

प्रिंट('Sorry, that did not worked!')



}



 

</pre>
</p>
</div>
</div>
</transition>


<button   v-on:click="showStar4 = !showStar4"  type="button" class="collapsible">दुहराओ x को y मे</button>
<transition name="slide-fade">
<div v-if="showStar4" class="content">
<div>

<h2>Usage</h2>

<h5> Run a particular code multiple times</h5>

<h2>Implementation</h2>

<h4>1: Define the loop </h4>
<h5> <b> दुहराओ x को y मे </b></h5>  

<p> Here y is a range and can be defined as (0,10), (5,100) etc.  </p>
<p> Here x is an index or iterator. For e.g x takes values from 1 and 10 (both inclusive) in (0,10)  </p>

<h5> <b> दुहराओ x को City मे </b></h5>  
 <p>Here instead of a custom range we iterate it over the length of variable.</p>  
 <p>Basically, if City='Pusad', the range will be automatically set as (0,5) because length of 'Pusad' is 5. </p>
<p>    </p>




</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >

#EXAMPLE 1  

#DEFINE A RANGE AND AN ITERATOR

दुहराओ x को (0,10) मे

{

value= x*5

प्रिंट(value)

}


#EXAMPLE 2  

#DEFINE A VARIABLE AND AN ITERATOR

Name="HALF COOKED RICE"

दुहराओ y को Name मे

{

value=Name[y]

प्रिंट(value + y)

}





 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar5 = !showStar5"  type="button" class="collapsible">जबतक()</button>
<transition name="slide-fade">
<div v-if="showStar5" class="content">
<div>

<h2>Usage</h2>

<h5>Run a particular code until a certain condition is met</h5>

<h2>Implementation</h2>

<h4>1: Define </h4>
<h5>जबतक(<i>YourCondition</i> ) </h5>  

<p><b> The accepted comparison operators are: </b>  </p>
<p><b>></b> - Greater than</p>
<p><b><</b> -  Less than</p>
<p><b>==</b> - is Equal to</p>
<p><b>!=</b> - is Not Equal to</p>

<h2> Example</h2>

<h5> <b>जबतक(count<25)</b> </h5> 
<p>The code will run until the condition evaluates itself to true. </p> 
<p>When the value of count reaches 26, code execution will stop. </p> 




</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >



count=0

#EVALUATE THE CONDITION. IF TRUE, KEEP ON RUNNING.

जबतक(count<25)
{

प्रिंट(count)

#UPDATE THE VALUE OF COUNT ON EACH ITERATION

count=count+1


}





 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar6 = !showStar6"  type="button" class="collapsible">.संख्या()</button>
<transition name="slide-fade">
<div v-if="showStar6" class="content">
<div>

<h2>Usage</h2>

<h5> Directly find out the length of a String or Array</h5>

<h2>Implementation</h2>

<h4>1: Define</h4>
<h5> <i>YourVariable</i>.संख्या() </h5>  

<h2> Example</h2>

<h5> <b>City.संख्या()</b> </h5> 
<p>If City='Banglore' then City.संख्या() will output the value <b>8</b>  </p> 
<p>If City=['Pusad','Pune','Mumbai','Delhi'] then City.संख्या() will output the value <b>4</b> </p> 



</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >


#DEFINE THE VARIABLES. EITHER STRING OR ARRAY

City='Banglore'

Cities=['Pusad','Pune','Mumbai','Delhi']

#FIND OUT THE LENGTH

Citylength= City.संख्या()

Citieslength=Cities.संख्या()

#PRINT THE LENGTH

#CAN YOU PRINT THE LENGTH WITHOUT USING ".संख्या()"" ?

प्रिंट('The length of the City is' + Citylength )

प्रिंट('The length of the Cities is' + Citieslength )




 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar7 = !showStar7"  type="button" class="collapsible">.पुश()</button>
<transition name="slide-fade">
<div v-if="showStar7" class="content">
<div>

<h2>Usage</h2>

<h5> Push values to array</h5>

<h2>Implementation</h2>

<h4>1: Push Value to an Array </h4>
<h5> <i>ArrayName</i> =[] </h5>  
<h5>ArrayName.पुश(<i>YourValue</i>) </h5>  




</div>

<div>
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Play with the Code</button>
<p id="CodePara" >


<pre id="CodeID1" >



#EXAMPLE 1

Numbers=[]

दुहराओ x को (1,10)

{

#PUSH CURRENT VALUE OF X INTO NUMBERS ARRAY

Numbers.पुश(x)


}

प्रिंट(Numbers)


#EXAMPLE 2

Numbers=[]



#PUSH DEFINED VALUES TO A DEFINED ARRAY. 


Name='Swanand'
Role='Developer'

#IN THIS CASE ARRAY IS NUMBERS

Numbers.पुश('hii')
Numbers.पुश(Name)

Numbers.पुश(Role)



प्रिंट(Numbers)



 

</pre>
</p>
</div>
</div>
</transition>

  </div>
</template>
<script>
import Header from '../components/Header'

import { mapState } from 'vuex'

export default

{
data() {
  return {
    showStar0: false,
    showStar1: false,
    showStar2: false,
    showStar3: false,
    showStar4: false,
    showStar5: false,
    showStar6: false,
    showStar7: false,
    showStar8: false,
      }

    }
,
   components:{
    Header


    },




  computed: mapState(['CurrentCode']),


  methods: {
      
CopyCode:function(el)

{


 var copyText = document.getElementById(el);


this.$store.state.CurrentCode= copyText.innerHTML


  this.$router.push('/Practise')



}
      
  },
}

</script>
<style scoped>

.collapsible {
     background-color: rgb(236, 236, 236);
    color: rgb(0, 0, 0);
    cursor: pointer;
    padding: 18px;
    width: 90%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 110%;
    font-weight: 500;
    border: solid 0.5px;
    margin-top: 2%;
}
.collapsible:hover {

       background-color: rgb(236, 214, 87);


}




.about{


  display: inline-block;
  width: 100%;
      margin-bottom: 10%;
}

.content {
    overflow: hidden;
    background-color: #fdfbfb;
   
    display: flex;
    text-align: left;
        width: 90%;
    margin-left: 5%;
}


.content div:nth-child(1){


  width: 55%;
  padding-right: 7%;
    font-size: large;
    margin-left: 2%
}

.content div:nth-child(2){


  width: 45%;
    margin-top: 4%;
    background-color: #f1f1f1;
    padding-left: 2%;
    height: fit-content;
}


h3{

  margin-bottom: 0
}

pre{

  margin-top: 0;
  font-size: 111%;
}

h2{

      margin-top: 6%;
    margin-bottom: 6%;
    color: #144577;

}

#TryCodebtn
{

margin-top: 3%;

}

#CodePara{

     
    width: 100%;
    text-align: left;
  
    font-size: 100%;
}

h4{

  color: #acb708;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease-out cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
h5{
 
    color: black;
    font-family: inherit;
    font-weight: 400;

}
p{

  font-size: 90%;
  margin-top: 6%
}

@media only screen
and (max-width : 480px) {

.content{


  display: grid;
  padding: 0;
  width: 90%;
  padding-left: 3%;
  margin-top: 2%
}

.content div:nth-child(1)
{


  width: 90%
}

.content div:nth-child(2)
{


  width: 95%;
  overflow: auto
}
.about{

  width: 100%;
  margin-top: 3%
}


}


</style>