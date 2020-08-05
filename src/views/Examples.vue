<template>
    <div>
           <Header/>

        <h1>Examples</h1>

               <carousel  :navigationClickTargetSize="1" :paginationPadding="5" :paginationSize="20" paginationActiveColor='green' :navigationEnabled="true" :perPage=this.perPage>



 <slide class="slide">
<div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID8')">Run Code</button>
<p id="CodePara" >

<h3>#1 कैलकुलेटर (Calculator) </h3>

<pre id="CodeID8" >



इनपुट(FirstValue)

इनपुट(SecondValue)

इनपुट(Operation)


दिखाए('FirstValue is '+FirstValue)
दिखाए('SecondValue is '+SecondValue)




अगर(Operation=='+')

{

output=FirstValue+SecondValue


}

अगर(Operation=='-')

{

output=FirstValue-SecondValue


}

अगर(Operation=='*')

{

output=FirstValue*SecondValue


}

अगर(Operation=='/')

{

output=FirstValue/SecondValue


}


दिखाए("Output is " + output)




</pre>
</p>

</div>

  </slide>

  <slide class="slide">
    <div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID2')">Run Code</button>

<p id="CodePara" >

<h3>
#2 The सफ़र </h3>

<pre id="CodeID2" >

इनपुट(YourSign)
line="|"
space="  "
Extra="  "


दुहराओ x को (1,15) मे
{

Road=space+line+space+space+space+YourSign+space+space+space+line+space

space=space+Extra

दिखाए(Road)

}


 

</pre>
</p>

</div>
  </slide>
    <slide class="slide">
    <div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID3')">Run Code</button>
<p id="CodePara" >

<h3>#3 किसी शब्द का उलटा रूप  </h3>

<pre id="CodeID3" >

इनपुट(Name)

ReverseString=''

दिखाए ('Input String-'+ Name)

length=Name.संख्या()

दुहराओ b को Name मे

{

ReverseString=ReverseString+Name[length-1]

length=length-1

}

दिखाए ('Reversed String-'+ ReverseString)
   

 

</pre>
</p>

</div>
  </slide>

          <slide class="slide">

<div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID7')">Run Code</button>
<p id="CodePara" >

<h3>#4 क्या यह एक प्रमुख संख्या है? </h3>

<pre id="CodeID7" >





इनपुट(num)

prime=[]

दुहराओ b को (2,num) मे

{

Remainder=num%b

अगर(Remainder==0)

{

prime.पुश(b)

}

}


length=prime.संख्या()

अगर(length==1 &amp;&amp; num>1)

{

दिखाए(num + "is a Prime Number")

}

अन्यथा

{

दिखाए(num + "is not a Prime Number")


}


 




 

</pre>
</p>

</div>

  </slide>
    <slide class="slide">

    <div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID4')">Run Code</button>
<p id="CodePara" >

<h3>#5 रचना का उदाहरण  </h3>

<pre id="CodeID4" >


FirstName='Swanand'

LastName='Kadam'

रचना First(First,Last)

{

दिखाए(First)

दिखाए(Last)

}

First(FirstName,LastName)





</pre>
</p>

</div>
  </slide>

<!--
   <slide class="slide">
    <div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID5')">Run Code</button>
<p id="CodePara" >

<h3>#4 Function Usecase II </h3>


<pre id="CodeID5" >


रचना printname(count)
{

जबतक(count<20)

{

count=count+1

दिखाए(count)

}


}




printname(0)





</pre>


</p>

</div>
  </slide>
  -->
    <slide class="slide">
    <div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID6')">Run Code</button>
<p id="CodePara" >

<h3>#6 बाइनरी से Decimal ( Binary to Decimal ) </h3>

<pre id="CodeID6" >



इनपुट(Binary)

DecimalValue=0

length=Binary.संख्या()

दुहराओ x को Binary मे

{

length=length-1

BinaryCharacter=Binary[x]

value=BinaryCharacter*2**length

DecimalValue=DecimalValue+value

}

दिखाए(DecimalValue)




</pre>
</p>

</div>
  </slide>


    <slide class="slide">

<div id="slide">

 <button id="TryCodebtn" @click="CopyCode('CodeID1')">Run Code</button>
<p id="CodePara" >

<h3>#7 Fibonacci अनुक्रम  </h3>

<pre id="CodeID1" >



Fibonacci=[]
दुहराओ a को (0,25) मे
{
अगर (a<3)
{
Fibonacci[a]=a
}
अगर (a>1)
{
x=Fibonacci[a-2]
y=Fibonacci[a-1]
Fibonacci[a]=x+y
}
}

दिखाए(Fibonacci)
}
 

</pre>
</p>

</div>


  </slide>

</carousel>

<p style="text-align:center" >Click on the dots above to scroll through more examples</p>
    </div>
</template>

<script>
import Header from '../components/Header'

import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex'

export default {


  data() {
    return {
      perPage:3
    }
  },

  components: {
    Carousel,
    Slide,
    Header
  },

  computed: mapState(['CurrentCode']),

  created() {

if(screen.width<420)
{

  this.perPage=1
}
},


  methods: {
      
CopyCode:function(el)

{


 var copyText = document.getElementById(el);


this.$store.state.CurrentCode= copyText.innerHTML


  this.$router.push('/Practice')



}
      
  },

};

</script>



<style scoped >
   #Mobilecarousel{


     display: none
   } 

.slide{


  max-width: 33%;
}

#slide{


      width: 69%;
    border: 0.5px solid;
    height: 416px;
    text-align: left;
    display: inline-block;
    padding-left: 4%;
    font-size: 105%;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    overflow: auto;
}

h3{

  margin-bottom: 0
}

pre{

  margin-top: 0;
}

#TryCodebtn
{

margin-top: 8%;


  width: 36%;
  height: 28px;
      cursor: pointer;
      border: 1px solid rgb(102, 100, 8);
    background-image: radial-gradient( circle 534px at 7.8% 17.6%,  rgba(254,253,112,1) 1.7%, rgba(248,143,111,1) 91.8% );
         border-radius: 2em;


  
}

#TryCodebtn:hover{


    border: none
}



#CodePara{

     
    width: 100%;
    text-align: left;
    padding-left: 4%;
    font-size: 100%;
}

.VueCarousel-navigation-button{


  font-size: larger;
    margin-right: 3%;
}

button:focus {outline:0;}
#carousel{


  display: block
}

@media only screen
and (max-width : 480px) {

#carousel{


  display: none
}
 #Mobilecarousel{


     display: block
   } 

   .slide{


     max-width: 100%;
   }
}

</style>
