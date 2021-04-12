<template>
  <div class="about">
     <Header/>

    <div>
<button  v-on:click="showStar0 = !showStar0"  type="button" class="collapsible">दिखाए()</button>

<transition name="slide-fade">
<div v-if="showStar0" class="content">

<div>

<h6>काम</h6>

<p> RESULTS को OUTPUT SCREEN पे दिखाने के लिए दिखाए() का उपयोग होता है। </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>1.एक घोषित (declared) वेरिएबल को दिखाए करने के लिए ।   </h6>
<p>Name &#61; "Hello World" </p>  
<p>दिखाए(Name) </p>  
<p>    </p>

<h6>२. Direct शब्दों दिखाए करने के लिए ।  </h6>
<p>दिखाए("Hello World")</p> 
<p>दिखाए(007)</p> 

<h6>३. Multi/Concatenated शब्दों को दिखाए करने के लिए ।    </h6>
<p>Name &#61; "Kalam" </p> 
<p>दिखाए("Hello World," + "My Name is" + Name + "!")</p> 


</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >


Name="Hello World"   
दिखाए(Name)   


दिखाए("Tic Tac Toe") 
दिखाए(007) 


Name="Kalam"  
दिखाए("Hello World," + "My Name is" + Name + "!") 


 

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

<h6>काम</h6>


<p> किसी नई VALUE को स्वीकार करना।  </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>१: <i> इनपुट() </i> को बताये आपको किस VARIABLE की  VALUE स्वीकार करनी है   </h6>
<p>इनपुट(<i> VARIABLE </i>)</p>  

<h6> उदाहरण</h6>

<p>इनपुट(Name)</p> 
<p>अगर आपने इनपुट के दौर पर <i>Kalam</i>  डाला होगा तो COMPUTER उसे इस तरह स्वीकार करेगा ।  <b> Name="Kalam".</b> </p> 
<p>एकबार VARIABLE की Value सेट होनेपर उसे Program में कभी भी use किया जा सकता है ।</p> 



</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >



इनपुट(Name)

 
दिखाए(Name)


 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar3 = !showStar3"  type="button" class="collapsible">अगर()</button>
<transition name="slide-fade">
<div v-if="showStar3" class="content">
<div>

<h6>काम</h6>


<p> एक Certain Conditionके तहत कोड Execution को Allow करता है। 
इसमें २ Conditions होती है |
1.True
2.False  </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>१ . Single Condition को मूल्यांकन (Evaluate) करना।   </h6>
<p> अगर (Language &#61;&#61; 'kalam') </p>  
<p> अगर (Age &gt; 18) </p>  
<p><b> स्वीकृत  Comparion operators नीचे दिए गए है : </b>  </p>
<p><b>&gt;</b> - Greater than</p>
<p><b>&lt;</b> -  Less than</p>
<p><b>&#61;&#61;</b> - is Equal to</p>
<p><b>&#33;&#61;</b> - is Not Equal to</p>



<h6>२: Multiple Conditions को मूल्यांकन (Evaluate) करना। 
 </h6>
<p>अगर (Age &gt; 16 &amp;&amp; Education &#61;&#61; 'ssc')</p> 
<p>अगर (Country&#61;&#61;'india' || Language &#61;&#61; 'hindi')</p> 


<p><b>  स्वीकृत comparison Operators नीचे दिए गए है: </b> </p>
<p><b>&amp;&amp;</b> - अगर दोनों Conditions सत्य हो तो उसे True समझा जाता है। </p>
<p><b>&#124;&#124;</b> - अगर एक Condition सत्य हो तो True समझा जाता है।</p>


</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >


इनपुट(language)


अगर(language=='kalam')

{

दिखाए('Alright, that's cool!')


}


उदाहरण 2


इनपुट(language)

इनपुट(country)


अगर(language=='kalam' || country=='india')
{



दिखाए('That works too.')


}



 

</pre>
</p>
</div>
</div>
</transition>

<!--
<button   v-on:click="showStar8 = !showStar8"  type="button" class="collapsible">अन्यथा</button>
<transition name="slide-fade">
<div v-if="showStar8" class="content">
<div>

<h6>काम</h6>


<p> अगर कोई भी कंडीशन satisfy ना हो तो एक Block of code  execute करना |</p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>1: Define  </h6>
<p>अन्यथा </p>  

<p> कृपया इस बात की दखल ले की अन्यथा ओपन ब्रैकेट्स होने पर भी कोई पर्याय नहीं लेता। </p>



</div>

<div style="border: solid 2px #31d8f3;">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >



language='kalaam'


अगर(language=='kalaam')

{


दिखाए('Alright, that's cool!')


}


अन्यथा
{

दिखाए('Sorry, that did not worked!')



}



 

</pre>
</p>
</div>
</div>
</transition>
-->

<button   v-on:click="showStar4 = !showStar4"  type="button" class="collapsible">दुहराओ x को y मे</button>
<transition name="slide-fade">
<div v-if="showStar4" class="content">
<div>

<h6>काम</h6>


<p> एक ही कोड को बार-बार दोहराना। </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>१ . लूप को डिफाइन करे।  </h6>
<p> <b> दुहराओ x को y मे </b></p>  

<p> यहाँ  y एक रेंज है और (०,१० ) , (५,१०० ) आदि की तरह Define की जा सकती है।   </p>
<p> x एक index या फिर iterator है। . For e.g  १ और १० के बीच में की Values ले सकता है (१ और १० भी )
(० , १०)  </p>

<p> <b> दुहराओ x को City मे </b></p>  
 <p>Here instead of a custom range we iterate it over the length of variable.</p>  
 <p>Basically, if City='Pusad', the range will be automatically set as (0,5) because length of 'Pusad' is 5. </p>
<p>    </p>




</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >

#उदाहरण 1  



दुहराओ x को (0,10) मे

{

value= x*5

दिखाए(value)

}


#उदाहरण 2  


Name="HALF COOKED RICE"

दुहराओ y को Name मे

{

value=Name[y]

दिखाए(value + y)

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

<h6>काम</h6>


<p>जबतक में दिए हुए शर्त(Condition) के पूरा होने तक आगे के कोड को रन करे |  </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>1: Define </h6>
<p>जबतक(<i>YourCondition</i> ) </p>  

<p><b> The accepted comparison operators are: </b>  </p>
<p><b>&gt;</b> - Greater than</p>
<p><b>&lt;</b> -  Less than</p>
<p><b>&#61;&#61;</b> - is Equal to</p>
<p><b>&#33;&#61;</b> - is Not Equal to</p>

<h6> उदाहरण</h6>

<p> <b>जबतक(count &lt; 25)</b> </p> 
<p>The code will run until the condition evaluates itself to true. </p> 
<p>When the value of count reaches 26, code execution will stop. </p> 




</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >



count=0


जबतक(count<25)
{

दिखाए(count)


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

<h6>काम</h6>


<p> Directly find out the length of a String or Array</p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>1: Define</h6>
<p> <i>YourVariable</i>.संख्या() </p>  

<h6> उदाहरण</h6>

<p> <b>City.संख्या()</b> </p> 
<p>If City &#61; 'Banglore' then City.संख्या() will output the value <b>8</b>  </p> 
<p>If City &#61; ['Pusad','Pune','Mumbai','Delhi'] then City.संख्या() will output the value <b>4</b> </p> 



</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >



City='Banglore'

Cities=['Pusad','Pune','Mumbai','Delhi']


Citylength= City.संख्या()

Citieslength=Cities.संख्या()


दिखाए('The length of the City is' + Citylength )

दिखाए('The length of the Cities is' + Citieslength )




 

</pre>
</p>
</div>
</div>
</transition>
<button   v-on:click="showStar7 = !showStar7"  type="button" class="collapsible">.पुश()</button>
<transition name="slide-fade">
<div v-if="showStar7" class="content">
<div>

<h6>काम</h6>


<p> Push values to array</p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>1: Push Value to an Array </h6>
<p> <i>ArrayName</i> = &nbsp;[ &nbsp; ] </p>  
<p>ArrayName.पुश(<i>YourValue</i>) </p>  




</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID1')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID1" >



#उदाहरण 1

Numbers=[]

दुहराओ x को (1,10)

{


Numbers.पुश(x)


}

दिखाए(Numbers)


#उदाहरण 2

Numbers=[]


Name='Angry Birds'
type='Game'


Numbers.पुश(Name)

Numbers.पुश(type)



दिखाए(Numbers)



 

</pre>
</p>
</div>
</div>
</transition>

<button   v-on:click="showStar1 = !showStar1"  type="button" class="collapsible">रचना</button>
<transition name="slide-fade">
<div v-if="showStar1" class="content">

<div>

<h6>काम</h6>


<p> कोड जो दोबारा इस्तेमाल किया जा सकता है उसे एक ब्लॉक में wrap किया जाता है, जिसे हम रचना कहते है। </p>

<h6>इसका उपयोग कैसे करे?</h6>

<h6>।. एक रचना को डिफाइन करने के लिए </h6>
<h3>रचना <i>रचना-का-नाम</i> (<i>पर्याय1</i> ,<i>पर्याय2</i> ) </h3>  
<p><b>रचना का नाम:</b></p>  
<p>रचना का नाम केस सेंसिटिव होता है और उसमे सिर्फ अक्षरोंका (अल्फाबेट्स का) इस्तेमाल करना चाहिए। </p>  
<p> <b>रचना पर्याय:</b>  </p>  
<p>रचना पर्याय का टेम्पररी वैल्यूज स्टोर  करनेमे इस्तेमाल किया जा सकता है। जब किसी रचना को कॉल किया जाता है तभी ये वैल्यूज पास किये जाते है।  </p>  
<p>पर्याय के नाम भी  केस सेंसिटिव होते है और ये आपकी चॉइस के हिसाब से चेंज किये जा सकते है।  मगर इनमे सिर्फ अक्षरोंका अर्थात अल्फाबेट्स का इस्तेमाल करे। </p> 




<h6>2: रचना को कॉल करना ।  </h6>
<h3><i>रचना-का-नाम</i> (<i>पर्याय1</i> ,<i>पर्याय2</i> ) </h3> 
<p><b>रचना का नाम - PrintFullName</b>  </p>  
<p>जब आप रचना को कॉल करते है तभी इस बात का ध्यान जरूर रखना चाहिए की रचना का नाम और जब आप रचना को कॉल करते हो तबका नाम same होना चाहिए।   <br> For e.g PrintFullName &ne; printfullname  </p>  

<h6> उदाहरण</h6>
<p><b> वेरिएबल्स (Variables) को डिफाइन करे। </b></p>
<p>FirstName &#61; 'Sachin' </p> 
<p>LastName 	&#61; 'Tendulkar' </p> 

<p><b> रचना declaration</b></p>
 <p>PrintFullName (x, y) </p> 

 <p><b> रचना Body</b></p>
 <p>{</p>
 <p>दिखाए( x 	&#43; y ) </p> 
 <p>}</p>

<p><b>रचना call</b>  </p>  
<p>PrintFullName(FirstName,LastName)</p>

<p># जब आप रचना को कॉल करते है तभी इस बात का ध्यान जरूर रखना चाहिए की रचना का नाम और जब आप रचना को कॉल करते हो तबका नाम same होना चाहिए।  <br> For e.g PrintFullName≠printfullname  </p>  

<p> <b>रचना पर्याय- ('Sachin','Tendulkar')</b>  </p>  
<p>इस प्रोग्रामिंग भाषा के  तहत निर्धारित ग्रामर के अनुसार, (x, y) ('Sachin','Tendulkar) बन जाएगा। </p>
<p>x will take a temporary value of 'Sachin'</p>
<p>y will take a temporary value of 'Tendulkar'</p>



</div>

<div id="doc">
 <button id="TryCodebtn" @click="CopyCode('CodeID2')">कोड के साथ खेलिए।</button>
<p id="CodePara" >


<pre id="CodeID2" >



FirstName='Sachin'

LastName='Tendulkar'



रचना PrintFullName(First,Last)

{

दिखाए(First + Last)



}


PrintFullName(FirstName,LastName)


Job='Doctor'
City='Pune'

रचना AboutMe(x,y)

{



दिखाए("I am a" + x + "in" + y)


}


AboutMe(Job,City)


NumberOne=20
NumberTwo=40

रचना Add(a,b)
{

c=a+b

दिखाए(c)


}


Add(NumberOne,NumberTwo)


 

 




 

 

</pre>
</p>
</div>



</div>
</transition>
</div>

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


  this.$router.push('/Practice')



}
      
  },
}

</script>
<style scoped>
#doc{
	border: solid 2px #31d8f3;
}


.collapsible {
     background-color: white;
    color: rgb(0, 0, 0);
    cursor: pointer;
    padding: 18px;
    width: 90%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 110%;
    font-weight: 500;
    border: solid 0.5px #cad638;;
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
    background-color: black;
    color: white;
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

h6{

      margin-top: 6%;
    margin-bottom: 6%;
    color: #144577;

}

#TryCodebtn
{

margin-top: 3%;

  width: 38%;
  height: 50px;
      cursor: pointer;
      border: none;

        background-image: radial-gradient( circle 534px at 7.8% 17.6%,  rgba(254,253,112,1) 1.7%, rgba(248,143,111,1) 91.8% );


}

#TryCodebtn:hover{

      background-image: radial-gradient( circle 534px at 7.8% 17.6%,  rgba(254,253,112,1) 1.7%, rgb(22, 21, 3) 91.8% );

}

#CodePara{

     
    width: 100%;
    text-align: left;
  
    font-size: 100%;
    color: white;
}

h6{

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
p{
 
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