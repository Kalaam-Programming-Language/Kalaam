<template>
  <div>
    <Header />

    <div id="Section">
      <div id="Section1">
        <div id="KLogo">
          <img src="../assets/Logo.png" alt="" />
        </div>
      </div>

      <div id="Section2">
        <p>
          Kalaam is the programming language in Hindi and has all the basic functionalities of a modern programming
          language. From for loops to while loops and from functions to conditional statements.
        </p>

        <p>
          Anyone with a smartphone or a computer can start coding in Kalaam. <br />

          To stay updated with the project, share your ideas and suggestions, you can connect with me on the following
          platforms:
        </p>

        <div id="sociallinks">
          <a href="https://www.linkedin.com/in/swanandkadam/"
            ><img id="Linkedin" src="../assets/Linkedin.png" alt=""
          /></a>
          <a href="https://github.com/Kalaam-Programming-Language/Kalaam"
            ><img id="github" src="../assets/git.png" alt=""
          /></a>

        </div>
      </div>
    </div>

    <div id="faq">
      <h3>FAQ'S</h3>

      <button v-on:click="showStar0 = !showStar0" type="button" class="collapsible">
        How can I contribute to Kalaam?
      </button>

      <transition name="slide-fade">
        <div v-if="showStar0" class="content">
          <div>
            <p>
              Kalaam is an open source project and anyone can start contrubuting to it. We have created a
              <a href="https://github.com/Kalaam-Programming-Language/Kalaam#readme"> Readme document</a>
              on Github repo of kalaam, you will find all the details about contributions there.
            </p>
          </div>
        </div>
      </transition>

      <button v-on:click="showStar1 = !showStar1" type="button" class="collapsible">
        How can I add comments to my code in Kalaam?
      </button>

      <transition name="slide-fade">
        <div v-if="showStar1" class="content">
          <div>
            <p>
              Comments is an experimental feature for now and might introduce some issues. You can still go on and use
              <b> <i>"#This is a comment"</i></b> like format with mandatory '#' at the beginning of every comment.
            </p>
          </div>
        </div>
      </transition>

      <button v-on:click="showStar2 = !showStar2" type="button" class="collapsible">
        Where can I learn more about how Kalaam was built?
      </button>

      <transition name="slide-fade">
        <div v-if="showStar2" class="content">
          <div>
            <p>
              Visit <a href="https://github.com/Kalaam-Programming-Language/Kalaam">Github repo</a> of Kalaam to explore
              the project. The project is well commented at each step and will help you to understand how it works
            </p>
          </div>
        </div>
      </transition>

      <button v-on:click="showStar3 = !showStar3" type="button" class="collapsible">
        What if I am having a issue with my code execution?
      </button>

      <transition name="slide-fade">
        <div v-if="showStar3" class="content">
          <div>
            <p>
              Kalaam is still in it's first stage and have been tested by handful of people. The issue that you might
              face will be very minor and can be fixed in a day or two. Please make sure to share your feedback and
              faced issues on Kalaam discord server or my instagram handle so that Kalaam community can keep on
              improving the language.
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

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
    };
  },

  components: {
    Header,
  },
};
</script>

<style scoped>
#Section {
  display: flex;
  width: 100%;
  margin-top: 6%;
}
#Section1 {
  width: 50%;
  display: flex;
}

.content {
  overflow: hidden;
  background-color: #fdfbfb;

  display: flex;
  text-align: left;
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
}

.content p {
  font-size: large;
}
#Section1 img {
  width: 50%;
  margin-top: 5%;
}

#KLogo {
  width: 100%;
  float: initial;
}

#KLogo img {
  width: 25%;
  float: initial;
}

#MyLogo {
  width: 50%;
}

#MyLogo img {
  width: 40%;
}

#Section2 {
  width: 60%;
}

#Section2 p {
  font-size: 110%;
  color: #2c3e50;
  word-spacing: 2px;
  text-align: left;
  margin-right: 5%;
}

#faq {
  display: inline-block;
  width: 100%;

  margin-top: 6%;
  margin-bottom: 5%;
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

#sociallinks {
  align-items: center;
  display: flex;
  margin-top: 3%;
}

#github {
  width: 80%;
  height: 70px;
  cursor: pointer;
}
#instagram {
  width: 57%;
  height: 45px;
  cursor: pointer;
  margin-left: 19%;
}
#Linkedin {
  width: 46%;
  height: 40px;
  margin-top: 1%;
  cursor: pointer;
  float: left;
}

a {
  width: 10%;
  text-align: left;
}

@media only screen and (max-width: 480px) {
  #Section {
    display: grid;
  }

  #Section1 {
    width: 100%;
  }

  .collapsible {
    margin-top: 6%;
  }
  .content {
    display: grid;
    padding: 0;
    width: 90%;
    padding-left: 3%;
    margin-top: 2%;
  }

  #Section2 {
    width: 98%;
    font-size: 130%;
    /* padding-left: 4%; */
    margin-left: 3%;
  }
  #Section2 p {
    font-size: 16px;
    color: #2c3e50;
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

  #github {
    width: 130%;
    height: 50px;
    cursor: pointer;
    margin-left: 70%;
  }

  #sociallinks {
    margin-top: 8%;
  }
  #instagram {
    width: 120%;
    height: 45px;
    cursor: pointer;
    margin-left: 140%;
  }
  #Linkedin {
    width: 130%;
    height: 40px;
    margin-top: 1%;
    cursor: pointer;
  }

  .content p {
    word-spacing: 2px;
    line-height: 24px;
    text-align: justify;
  }
}
</style>
