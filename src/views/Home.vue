<template>
<div>
  <div class="home">
 

  <div id="header">
<div id="LogoandTitle">
<!--<router-link  to="/" ><img id="KalamLogo" src="../src/assets/LogoBlack.png" alt=""></router-link> -->
<router-link id="Kalaam" to="/" >कलाम</router-link> 
</div>
  <button @click="toggleMenu()" id="stackMenuIcon" >☰</button> 

<ul id="headerlist">
   <li><router-link to="/Practice">Practice</router-link> </li>
 <li><router-link to="/Documentation">Documentation</router-link> </li>
  <li><router-link to="/Examples">Examples</router-link> </li>
 <!--  <li><router-link to="/Support">Support</router-link> </li>-->
    <li><router-link to="/About">About</router-link> </li>
   
   
</ul>
<transition name="slide-fade">

<ul v-if="showMenu==true" id="headerlistMobile">
 <div @click="toggleMenu()" ><li><router-link  to="/Practice">Practice</router-link> </li></div>  
 <div @click="toggleMenu()"><li><router-link to="/Documentation">Documentation</router-link> </li></div>  
 <div @click="toggleMenu()"> <li><router-link to="/Examples">Examples</router-link> </li></div>  
  <!--  <div @click="toggleMenu()"> <li><router-link to="/Support">Support</router-link> </li></div>  -->
   <div @click="toggleMenu()"> <li><router-link to="/About">About</router-link> </li></div>  
   
   
</ul>

</transition>

   </div>
   


    <router-view/>

  </div>

<div id="HomeSection">

  
<div id="LogoSection">
  <transition name="fade">
  
<img id="KalamLogo" class = "fadeIn" src="../assets/Logo.png" alt="">
  </transition>

</div>


<div id="IntroductionSection">


<h1>The Programming Language <br>in <span id="lang">हिन्दी</span> </h1>

  <div class="container">
      <span id="TypeWriter" class="typed-text">{{ typeValue }}</span>
            <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>

  </div>

<div id="buttons">


<router-link to="/Practice"><button>Start Coding</button></router-link> 
<router-link to="/Documentation"><button id="button2">Learn Kalaam</button></router-link> 


</div>

</div>




</div>

<div class="footer">
 <!-- <p style=" color: white">Released Under the MIT Licence</p>-->
  <p style=""><a id="credit"> © Swanand Kadam</a></p>
</div>


  </div>

</template>

<script>

import Header from '../components/Header'

import { setTimeout } from 'timers';
  export default {
    data: () => {
      return {
        typeValue: '',
        typeStatus: false,
        typeArray: ['अगर', 'दुहराओ','जबतक', 'दिखाए()', 'इनपुट()','रचना'],
        typingSpeed: 120,
        erasingSpeed: 280,
        newTextDelay: 600,
        typeArrayIndex: 0,
        charIndex: 0,
         showMenu:false
      }
    },

    components:{
Header


    },
    methods: {
      toggleMenu:function()
{

if(this.showMenu==false)

{
this.showMenu=true


}

else if(this.showMenu==true)
{
this.showMenu=false


}


},
      typeText() {
        if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
          this.charIndex += 1;
          setTimeout(this.typeText, this.typingSpeed);
        }
        else {
          this.typeStatus = false;
          setTimeout(this.eraseText, this.newTextDelay);
        }
      },
      eraseText() {
        if(this.charIndex > 0) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
          this.charIndex -= 1;
          setTimeout(this.eraseText, this.erasingSpeed);
        }
        else {
          this.typeStatus = false;
          this.typeArrayIndex += 1;
          if(this.typeArrayIndex >= this.typeArray.length)
            this.typeArrayIndex = 0;
          setTimeout(this.typeText, this.typingSpeed + 1000);
        }
      }
    },
    created() {
      setTimeout(this.typeText, this.newTextDelay + 200);
    }
  }
</script>


<style scoped >
#lang{
	color: rgb(52, 204, 218);
}
#credit{
	text-decoration:none;color: white
}
#KalamLogo
{

      width: 35%;
    float: initial;;
    margin-top: 15%;
     -webkit-animation-duration: 10s;
            animation-duration: 5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
}


.container {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: left;
  }
  #buttons{

    padding-top: 15%;
    
    text-align: left;
    width: 100%
  }



  #button2{


    margin-left: 3%
  }

  #buttons button{

   border-radius: 2em;
   border: solid 0.3px black;
   font-size: 100%;
   width: 30%;
   height: 43px;
   background-color: white;
     cursor: pointer;

  }

  button:focus {outline:0;}
a{

  border: none;
  text-decoration: none;
}

   #buttons button:hover{

   
   background: radial-gradient( circle 534px at 7.8% 17.6%,  rgba(254,253,112,1) 1.7%, rgba(248,143,111,1) 91.8% );
   border: none
  }


#HomeSection{


display: flex;

margin-top: -1%;
 background-image: url('../assets/wave.png');
background-size: cover;
 
}
  
  #TypeWriter{


    float: left;
    font-size: 300%;
    font-weight: 600;
    height: 37px;
    color: rgb(223, 219, 11)
  }
  #LogoSection{

width: 50%

}
#IntroductionSection{

width: 50%


}
a{

  text-decoration: none;
  color: black
}

#IntroductionSection h1{

text-align: left;
margin-top: 13%;
font-size: 320%;
font-weight: 800;


}

h1{



  margin-top: 0%
}

    span.cursor {

        text-align: left;
    width: 3px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 38px;
    margin-left: 1%;
     background-color: rgb(0, 0, 0);
      
      text-align: left;
margin-top: 3%;
      width: 3px;
      
display: flex;
      height: 37px;
     color: rgb(0, 0, 0);
      animation: cursorBlink 1s infinite;
    }
    span.cursor.typing {
      animation: none;
    }
  
  @-webkit-keyframes fadeIn {
            0% {opacity: 0;}
            100% {opacity: 1;}
         }
         
         @keyframes fadeIn {
            0% {opacity: 0;}
            100% {opacity: 1;}
         }
         
         .fadeIn {
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
         }


#Kalaam{

  float: left;
    text-decoration: none;
    margin-left: 2%;
    font-size: 163%;
    color: black;
}

#LogoandTitle{

position: absolute;
    display: block;
    width: 65%;


}



#header{

display: inline-block;
width: 100%;
background-color: #FFFC31;
    height: 48px;
    position: relative;
    z-index: 20;
    padding-top: 1%;


}

#headerlistMobile{

  display: none 
  }

#headerlist{

      list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 7%;
    
    line-height: 40px;

}

#headerlist li{

      display: inline-block;
    margin: 0 2em;
    font-size: 138%;

}
#headerlist a{

  text-decoration: none;
   cursor:pointer; 
   color: rgb(12, 12, 12)
}

#headerlist a:hover{

 
   color: rgb(52, 204, 218)
}

.footer{

    background-color: #0fb1ac;
    height: 40px;
    margin-top: 27%
}

.footer p{

position: relative;
    top: 21%;

}
#stackMenuIcon
{


  display: none
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

/* Smartphones (portrait) ----------- */
@media only screen
and (max-width : 480px) {



  #HomeSection{

    display: block;
    margin-top: -2%
    
  }
  .footer{

    background-color: #0fb1ac;
    height: 40px;
    margin-top: 15%
}

.footer p{

position: relative;
    top: 21%;

}

 #buttons{

    margin-top: 5%;
    
    text-align: left;
    width: 100%;
 
  }

#header{
 background-image: url('../assets/wave.png');
background-size: cover;

}

#LogoSection{

  width: 100%
}

#IntroductionSection{

  width: 95%;
  margin-left: 5%;
}

#IntroductionSection h1{

 margin-top: 0%
}
#headerlist{


  display: none
}
#stackMenuIcon
{


  display:block;
  float: right;
  font-size: 150%;
  border: none;
    background: #FFFC31;
    color: black;
}

#Kalaam{

  float: left;
    text-decoration: none;
    margin-left: 4%;
    font-size: 163%;
    margin-top: 1%;
    color: black;
}

#LogoandTitle{

position: absolute;
    display: block;
    width: 65%;


}
#KalamLogo{

  width: 60%;
  margin-top: 5%
   
}

#headerlistMobile{

       display: inline-grid;
    position: absolute;
    left: 0%;
    width: 100%;
    background-color: #FFFC31;
    line-height: 40px;
    top: 86%;
    padding: 0%;
    
}


#headerlistMobile li{

      display: inline-block;
    font-size: 120%;
    margin-top: 1%

}
#headerlistMobile a{

  text-decoration: none;
   cursor:pointer; 
   color: rgb(12, 12, 12)
}

#headerlistMobile a:hover{

 
   color: rgb(214, 200, 0)
}
::-webkit-input-placeholder {
text-align: center;
vertical-align: middle;

line-height: 500px;}

:-moz-placeholder { /* Firefox 18- */
text-align: center;
vertical-align: middle;

line-height: 500px;}

::-moz-placeholder {  /* Firefox 19+ */
text-align: center;
vertical-align: middle;

line-height: 500px;}

:-ms-input-placeholder {  
text-align: center;
vertical-align: middle;

line-height: 500px;}

#button2{


    margin-left: 3%
  }

  #buttons button{

   border-radius: 2em;
   border: solid 0.3px black;
   font-size: 100%;
   width: 40%;
   height: 43px;
   background-color: white;
   color: black
  }

  span.cursor {
      
     text-align: left;
    margin-top: 5%;
    width: 3px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 38px;
    margin-left: 1%;
     background-color: rgb(0, 0, 0);
      animation: cursorBlink 1s infinite;
    }

}
@media only screen
and (min-width : 768px)
and (max-width : 1024px) {



#headerlist li{

margin-left: 0%
}


 span.cursor {
      
     text-align: left;
    margin-top: 4%;
    width: 3px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 38px;
    margin-left: 1%;
     background-color: rgb(0, 0, 0);
      animation: cursorBlink 1s infinite;
    }

#LogoSection{


  width: 40%
}

#IntroductionSection{


  width: 60%
}

#KalamLogo{

  width: 50%
}

#buttons button{

  width: 35%;
  margin-top: 10%
}

}

  

</style>