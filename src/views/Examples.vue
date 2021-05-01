<template>
    <div>
           <Header/>

        <h4>Examples</h4>


 <carousel id="carousel-body"  :navigationClickTargetSize="1" :paginationPadding="5" :paginationSize="20" paginationActiveColor='green' :navigationEnabled="true" :perPage=this.perPage>



 <slide class="slide">
 <div id="slide">

 <q-btn id="TryCodebtn" color="secondary"  @click="CopyCode('CodeID1')">Run Code</q-btn>
  <p id="CodePara" >

 <h6>#1 दो संख्याओं को जोड़ना (Addition) </h6>

<pre id="CodeID1" >

a=10
b=5

c=a+b

दिखाए(c)


</pre>
 </p>

</div>

  </slide>

  <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID2')">Run Code</q-btn>

<p id="CodePara" >

<h6>
#2 आपके दिए गए किसी भी दो संख्याओ को जोड़े  </h6>

<pre id="CodeID2" >

इनपुट(a)
इनपुट(b)

c=a+b

दिखाए(c)


</pre>
</p>

</div>
  </slide>
    <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID3')">Run Code</q-btn>
<p id="CodePara" >

<h6>#3 आपकी जानकारी दिखाए  </h6>

<pre id="CodeID3" >

नाम="अग्रज"

उम्र="14"

शहर="मुंबई"

राज्य="महाराष्ट्र"

शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"


दिखाए(नाम)

दिखाए(उम्र)

दिखाए(शहर)

दिखाए(राज्य)

दिखाए(शौक)


</pre>
</p>

</div>
  </slide>

          <slide class="slide">

<div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID4')">Run Code</q-btn>
<p id="CodePara" >

<h6>#4 खुद के बारे में बताये </h6>

<pre id="CodeID4" >

नाम="अग्रज"

उम्र="14"

शहर="मुंबई"

राज्य="महाराष्ट्र"

शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"


दिखाए("मेरा नाम"+ नाम +"है")

दिखाए("मै"+ उम्र + "साल का हु")

दिखाए("मै "+ शहर +","+ राज्य + "मे रहता हु")

दिखाए(शौक)

दिखाए("Thank You!")

</pre>
</p>

</div>

  </slide>
    <slide class="slide">

    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID5')">Run Code</q-btn>
<p id="CodePara" >

<h6>#5 आपका नाम दुहराए  </h6>

<pre id="CodeID5" >

इनपुट(नाम)


दुहराओ x को (0,10) मे

{

  दिखाए(नाम)



}


</pre>
</p>

</div>
  </slide>


  <slide class="slide">

    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID6')">Run Code</q-btn>
<p id="CodePara" >

<h6>#5 नाम, अक्षर और उनकी पोजीशन   </h6>

<pre id="CodeID6" >

नाम="SWANAND"

दुहराओ x को नाम मे

{

 अक्षर=नाम[x]

 दिखाए(x + अक्षर)


}

</pre>
</p>

</div>
  </slide>


   <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID7')">Run Code</q-btn>
<p id="CodePara" >

<h6>#6 किसी भी नंबर का पहाड़ा (पाढ़ा ) बनाये </h6>


<pre id="CodeID7" >

इनपुट(नंबर)

गिनती=0

नतीजा=नंबर

जबतक(गिनती<10)

{


  दिखाए(नतीजा)

  नतीजा=नतीजा+नंबर

  गिनती=गिनती+1


}

</pre>


</p>

</div>
  </slide>

    <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID8')">Run Code</q-btn>
<p id="CodePara" >

<h6>#7 सीढ़ी </h6>

<pre id="CodeID8" >

सीधा="|"

आड़ा="------"


दुहराओ x को (0,10) मे

{


  x=सीधा+आड़ा+सीधा

  दिखाए(x)



}



</pre>
</p>

</div>
  </slide>


    <slide class="slide">

<div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID9')">Run Code</q-btn>
<p id="CodePara" >

<h6>#8 किसी भी शब्द की लंबाई जाने  </h6>

<pre id="CodeID9" >

इनपुट(शब्द)

लंबाई = शब्द.संख्या()

दिखाए(लंबाई)




</pre>
</p>

</div>


  </slide>

  
</carousel>











 <h4>Intermediate Examples</h4>
               <carousel id="carousel-body"  :navigationClickTargetSize="1" :paginationPadding="5" :paginationSize="20" paginationActiveColor='green' :navigationEnabled="true" :perPage=this.perPage>



 <slide class="slide">
<div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID10')">Run Code</q-btn>
<p id="CodePara" >

<h6>#1 कैलकुलेटर (Calculator) </h6>

<pre id="CodeID10" >


इनपुट(x)

इनपुट(y)

इनपुट(ऑपरेशन)

अगर(ऑपरेशन=='+')

{

नतीजा=x+y


}

अगर(ऑपरेशन=='-')

{

नतीजा=x-y


}

अगर(ऑपरेशन=='*')

{

नतीजा=x*y


}

अगर(ऑपरेशन=='/')

{

नतीजा=x/y


}


दिखाए( x + ऑपरेशन + y + '=' + नतीजा)


</pre>
</p>

</div>

  </slide>

  <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID11')">Run Code</q-btn>

<p id="CodePara" >

<h6>
#2 नाम की निर्मिति</h6>

<pre id="CodeID11" >

इनपुट(नाम)

नतीजा=""

दुहराओ x को नाम मे

{

 अक्षर=नाम[x]

 नतीजा=नतीजा+अक्षर

 दिखाए(नतीजा)


}
</pre>
</p>

</div>
  </slide>
    <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID12')">Run Code</q-btn>
<p id="CodePara" >

<h6>#3 किसी शब्द का उलटा रूप  </h6>

<pre id="CodeID12" >

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

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID14')">Run Code</q-btn>
<p id="CodePara" >

<h6>#4 रचना का उदाहरण  </h6>

<pre id="CodeID14" >


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


   <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID15')">Run Code</q-btn>
<p id="CodePara" >

<h6>#5 रचना का उदाहरण 2 </h6>


<pre id="CodeID15" >


रचना printname(count)
{

जबतक(count<20)

{

count=count+1

दिखाए(count)

}


}




printname(10)





</pre>


</p>

</div>
  </slide>

    <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID16')">Run Code</q-btn>
<p id="CodePara" >

<h6>#6 Factorial ऑफ़ अ नंबर  </h6>

<pre id="CodeID16" >

इनपुट(factorialOf)
f=1
count=1

अगर(factorialOf == 0 || factorialOf < 0){
  दिखाए("Invalid Input")
}

जबतक(count < factorialOf+1){
  f=f*count
  count=count+1
}

दिखाए("Factorial of" + factorialOf + " is " + f)



</pre>
</p>

</div>
  </slide>


</carousel>


 <h4>Advanced Examples</h4>



<carousel id="carousel-body"  :navigationClickTargetSize="1" :paginationPadding="5" :paginationSize="20" paginationActiveColor='green' :navigationEnabled="true" :perPage=this.perPage>





  <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID17')">Run Code</q-btn>

<p id="CodePara" >

<h6>
#1 The सफ़र </h6>

<pre id="CodeID17" >

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

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID18')">Run Code</q-btn>
<p id="CodePara" >

<h6>#2 Fibonacci अनुक्रम  </h6>

<pre id="CodeID18" >



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

   

          <slide class="slide">

<div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID20')">Run Code</q-btn>
<p id="CodePara" >

<h6>#3 क्या यह एक प्रमुख संख्या है? </h6>

<pre id="CodeID20" >





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











</pre>
</p>

</div>

  </slide>
   
    <slide class="slide">
    <div id="slide">

 <q-btn id="TryCodebtn" color="secondary" @click="CopyCode('CodeID23')">Run Code</q-btn>
<p id="CodePara" >

<h6>#4 बाइनरी से Decimal ( Binary to Decimal ) </h6>

<pre id="CodeID23" >



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
    box-shadow: 0 1px 13px rgba(0, 0, 0, 0.40), 0 1px 11px rgba(0, 0, 0, 0.54);
    overflow: auto;
}

h6{

  margin-bottom: 0
}

pre{

  margin-top: 0;
}

#TryCodebtn
{

margin-top: 8%;
 width: 36%;
  height: 56px;
  cursor: pointer;
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

.VueCarousel-navigation-q-btn{


  font-size: larger;
    margin-right: 3%;

}
#carousel-body{


    margin-bottom: 5%;

}

q-btn:focus {outline:0;}
#carousel{


  display: block;
}

  button[aria-label="Previous page"] { 
    margin-left : 44px;
    }
      button[aria-label="Next page"] { 
    margin-right : 44px;
    }


@media only screen
and (max-width : 480px) {

  #TryCodebtn {
    margin-top: 8%;
    width: 45%;
    height: 56px;
    cursor: pointer;
}

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
