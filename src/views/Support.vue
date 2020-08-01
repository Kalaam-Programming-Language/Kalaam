<template>
    <div>
            <Header/>
<div id="section">
            <div id="sectionLogo">

<img id="KalamLogo" class = "fadeIn" src="../assets/Logo.png" alt="">

            </div>

            <div id="sectionSupport">

<h1>Support Kalaam Development</h1>

<p>I started the development of Kalaam in Jan 2020. The idea was too exciting to let go off and here it is now, Kalaam v1.0.0.
   With all of this excitement, comes a great responsibillity, to take this project to new possibilities.  </p>
   
  <p> Every good project needs a good idea but every great project needs a great team. I would like to welcome all the amazing developers to contribute to the further development of Kalaam.
   The language is just in it's first stage and needs improvements in various modules.  </p> 
   
 <p> With me going all alone, it would have took number of years and a lot of coffee.
   Even if you are not a developer but would like to support or sponser the development of Kalaam by any means, you are more than welcome.
   </p>

   <p>Also, if you want to share the programs written in Kalaam, please do. The top 5 projects of every month  will be displayed right here on Kalaam website along with your name.</p>

   <p>
   Cheers! 🎉
    </p>
    
    <p>
        -Swanand
    </p>
    

            </div>
            </div>


          <div id="bot">

<h3>Start contributing to the development of Kalaam <a href="https://github.com/Kalaam-Programming-Language/Kalaam">here</a></h3>
<h3>Join Kalaam Discord server for updates and anything cool → <a href="https://discord.gg/EMyA8TA"> here</a> </h3> 
 

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
#bot{
    margin-top:5%
}
#section{

    width: 100%;
    display: flex;
}

#sectionLogo{

    width: 40%;
    
}

#sectionSupport{

    width: 60%;
    
}

#sectionSupport h1{

    margin-top: 6%;
text-align: left
}
#sectionSupport p{

text-align: left;
font-size: 120%;
color: #2c3e50;;
padding-right: 5%;
    word-spacing: 2px;
}

#KalamLogo{


width: 50%;
margin-top: 16%;
float: initial;

}
.content {
    overflow: hidden;
    background-color: #fdfbfb;
   
    display: flex;
    text-align: left;
        width: 90%;
    margin-left: 5%;
}

#faq{


  display: inline-block;
  width: 100%;
      margin-bottom: 10%;
      margin-top: 15%;
      text-align: left;
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


@media only screen
and (max-width : 480px) {



#section{

    display: grid;
    width: 100%;
}


#sectionLogo{

    width: 100%
}

#sectionSupport{


    width: 100%
}

#sectionSupport h1{


    text-align: center;
    width: 100%;
    font-size: 150%;
    margin-bottom: 11%
}

#sectionSupport p{


font-size: 16px;
    color: #2c3e50;;
    text-align: left;
    text-align: justify;
    text-justify: inter-word;
    margin-right: 5%;
    width: 95%;
    line-height: 1.6em;
    margin: 1.2em 0 -1.2em;
    padding-left: 3%;
    padding-bottom: 1.2em;
    position: relative;
    z-index: 1;


}

.content{


  display: grid;
  padding: 0;
  width: 90%;
  padding-left: 3%;
  margin-top: 2%
}

.collapsible{

    margin-top: 6%
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