<template>
    <div>
            <Header/>

<div id="Section">

<div id="Section1">

<div id="KLogo">


<img src="../assets/Logo.png" alt="">
</div>

<div id="MyLogo">

<img src="" alt="">
<img src="../assets/swanand.png" alt="">


</div>



</div>


<div id="Section2">
  <p>

Kalaam is the first-ever programming language in Hindi and has all the basic functionalities of a modern programming language. From for loops to while loops and
from functions to conditional statements.
 </p>
 <p>
Programming needs to reach every part of India if we have to produce more number of quality startups and technically sound ecosystem. Language and unfamiliarity should not become barriers to these students to learn to code.
Familiarity can make anything more connected, and learning does not seem shallow. What could be more familiar than the language we used for communication. The language between friends and families is now a language between human and computer .
 </p>
 <p>
Anyone with a smartphone or a computer can start coding in Kalaam. <br>

 To stay updated with the project, share your ideas and suggestions, you can connect with me on the following platforms:


</p>

<div id="sociallinks">

<a href="https://www.linkedin.com/in/swanandkadam/"><img id="Linkedin" src="../assets/Linkedin.png" alt=""></a> 
<a href="https://www.youtube.com/c/swanandkadam"><img id="youtube" src="../assets/youtube.webp" alt=""></a>


<!--<a href="https://www.instagram.com/swanand_kdm/"><img id="instagram" src="../assets/instagram.png" alt=""></a> -->





</div>

  </div>
</div>


  <div id="faq">

                <h1>FAQ'S</h1>

                <button  v-on:click="showStar4 = !showStar4"  type="button" class="collapsible">Why Create Kalaam? </button>

<transition name="slide-fade">
<div v-if="showStar4" class="content">

<div>

<p >Technology is the next big thing for the growth of India, and programming is how we can make it happen. India has massive untapped talent in Tier-2 and Tier-3 cities. Most of the students and parents are aware of how technology is going to shape lives in the future, but they are not even aware of this concept called computer programming.

<br>
<br>

I have talked to directors of numerous coaching classes in Tier-2 and Tier-3 cities. All shared a similar concern over programming penetration in such parts of India. We are missing out on the talented ecosystem of these students just because they believe programming is an out of bound thing for them.


Even if they know about it, it sounds alien to them because of syntax, courses, and unfamiliarity with the learning process. Since it's completely new territory for them, they either get confused and lose interest or postpone learning it.

<br>
<br>

Programming needs to reach every part of India if we have to produce more number of quality startups and technically sound ecosystem. Language and unfamiliarity should not become barriers to these students to learn to code.


Familiarity can make anything more connected, and learning does not seem shallow. What could be more familiar than the language we used for communication. The language between friends and families is now a language between human and computer 

<br>
<br>
Kalam, a programming language in Hindi, dedicated to Dr. APJ Abdul Kalam, will solve this problem of improving coding literacy in remote parts of India.


 Kalaam is the first-ever online programming language in Hindi and has all the basic functionalities of a modern programming language. Anyone with a smartphone or a computer can start coding in Kalaam. The syntax and grammar of Kalaam are developed in such a way that students will find flexibility in adopting other languages too.

<br>
<br>
Kalaam coding environment can also be made offline and installable on the user device. Students can code for a lifetime on Kalaam without a need for the internet in the next version. 


     </p>




</div>

                

            </div>

</transition>

                <button  v-on:click="showStar0 = !showStar0"  type="button" class="collapsible">When will Kalaam become an open source project? </button>

<transition name="slide-fade">
<div v-if="showStar0" class="content">

<div>

<p>Before going open source, I need to make sure that the code is friendly to read and understand. Most of this work will include detailed comments for almost every line of code. 
    You can stay updated with the project on Discord server of the Kalaam or my social media handles.
     </p>




</div>

                

            </div>

</transition>



 <button  v-on:click="showStar1 = !showStar1"  type="button" class="collapsible">How can I add comments to my code in Kalaam? </button>

<transition name="slide-fade">
<div v-if="showStar1" class="content">

<div>

<p> Comments is an experimental feature for now and might introduce some issues. You can still go on and use <b> <i>"#This is a comment"</i></b>  like format with mandatory '#' at the 
    beginning of every comment. 
     </p>




</div>

                

            </div>

</transition>



 <button  v-on:click="showStar2 = !showStar2"  type="button" class="collapsible">Where can I learn more about how Kalaam was built?</button>

<transition name="slide-fade">
<div v-if="showStar2" class="content">

<div>

<p> I will be sharing my journey on my Youtube and if you want to get more access to underlying logic, you can do that when language will be made opens source.
    Alternatively, you can also join Kalaam discord server and my instagram handle for real time updates.
     </p>




</div>

                

            </div>

</transition>




 <button  v-on:click="showStar3 = !showStar3"  type="button" class="collapsible">What if I am having a issue with my code execution? </button>

<transition name="slide-fade">
<div v-if="showStar3" class="content">

<div>

<p>Kalaam is still in it's first stage and have been tested by handful of people. The issue that you might face will be very minor and can be fixed in a day or two. Please make sure to 
    share your feedback and faced issues on Kalaam discord server or my instagram handle so that Kalaam community can keep on improving the language. 
     </p>




</div>

                

            </div>

</transition>




 

            </div>


    </div>
</template>

<script>

import Header from '../components/Header'

export default {
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
    },

    components:{

        Header
    }
}
</script>


<style scoped>

#Section{

  display: flex;
  width: 100%;
  margin-top: 6%
}
#Section1{

  width: 40%;
  display: flex;
}

.content {
    overflow: hidden;
    background-color: #fdfbfb;
   
    display: flex;
    text-align: left;
        width: 90%;
    margin-left: 5%;
}

.content p{

font-size:large
  
}
#Section1 img{


  width: 50%;
  margin-top: 5%
}

#KLogo{

width: 50%;
float: initial

}

#MyLogo{

width: 50%

}

#Section2{

  width: 60%
}

#Section2 p{



  font-size: 110%;
  color: #2c3e50;;
  word-spacing: 2px;
  text-align: left;
  margin-right: 5%
}

#faq{


  display: inline-block;
  width: 100%;
   
      margin-top: 6%;
      margin-bottom: 5%
}


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


#sociallinks{

  float: left;
  display: flex;
  margin-top: 3%
}

#youtube{

width: 60%;
height: 50px;
cursor: pointer;
}
#instagram{

width: 57%;
height: 45px;
cursor: pointer;
margin-left: 19%
}
#Linkedin{

width: 60%;
height: 40px;
margin-top: 1%;
cursor: pointer;
float: left;
}

a{

  width: 10%;
  text-align: left;
}

@media only screen
and (max-width : 480px) {

#Section{

  display: grid
}

#Section1{

  width: 100%;
}

.collapsible{

    margin-top: 6%
}
.content{


  display: grid;
  padding: 0;
  width: 90%;
  padding-left: 3%;
  margin-top: 2%
}

#Section2{

width: 98%;
    font-size: 130%;
    /* padding-left: 4%; */
    margin-left: 3%;
}
#Section2 p{



 font-size: 16px;
    color: #2c3e50;;
    text-align: left;
    text-align: justify;
    text-justify: inter-word;
    margin-right: 5%;
    width: 95%;
    line-height: 1.6em;
    margin: 1.2em 0 -1.2em;
    padding-bottom: 1.2em;
    position: relative;
    z-index: 1;


}

#youtube{

width: 130%;
height: 50px;
cursor: pointer;
margin-left: 70%
}

#sociallinks{

  margin-top: 8%
}
#instagram{

width: 120%;
height: 45px;
cursor: pointer;
margin-left: 140%
}
#Linkedin{

width: 130%;
height: 40px;
margin-top: 1%;
cursor: pointer;
}

.content p{

      word-spacing: 2px;
    line-height: 24px;
text-align: justify;
}


}
  
</style>