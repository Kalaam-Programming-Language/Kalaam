<template>
  <div class="hello">
    <div>

      <div id="header">
        <div id="LogoandTitle">
          <!--<router-link  to="/" ><img id="KalamLogo" src="../src/assets/LogoBlack.png" alt=""></router-link> -->

          <router-link id="Kalaam" to="/">कलाम</router-link>
            

        </div>
          <q-form style="float:right;padding-right:2%" v-if="isMobile" id="Select-Language-form" @submit="onSubmit">
              <q-select dense="true" color="black" outlined v-model="ActiveLanguage" :options="options">
                <template v-slot:append>
                  <q-avatar>
                    <img
                      src="data:image/png;base64,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"
                    />
                  </q-avatar>
                </template>
              </q-select>
              <q-btn style="color:black" label="Submit" type="submit" color="secondary" />
            </q-form>

        <ul id="headerlist">
          <li>
            <router-link to="/Documentation">Documentation</router-link>
          </li>
          <li>
            <router-link to="/Examples">Examples</router-link>
          </li>
          <li>
            <q-form id="Select-Language-form" @submit="onSubmit">
              <q-select color="black" outlined v-model="ActiveLanguage" :options="options">
                <template v-slot:append>
                  <q-avatar>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAUVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAaFQL/0x3/0x0AAAAAAAAAAAAAAAAAAAAAAAAEAwAAAAAGBQD/0x3/0x3/0x3/0x3/0x0AAAD/0x1ANQe/nhYFMqa7AAAAF3RSTlMAgGDPQO8QwEC/IJ8w31CPr3CLYCzvUIcJr3cAAAssSURBVHja7d1rtqK4AoBRQKAaFZXq6s7pO/+B3h91qvrUQ+WRRO3sPQAXy3xCiBirCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAl/bHB1+8HcX5/PbBJ+9Haf58E4DxF4DxF0CJ/n4TQMm+/CUA4y8A4y8A4y+A0vSf3gRg/AVg/AVQoivjL4BCfH4TgPEXgPEXgPEXQGn+fBOA8ReA8RdAib68CaBofwhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABIAAEAACQAAIAAEgAASAABAAAuBB+rZt+5cNoG3bvTFcPuZNfR6GXfjRMAx1fWqfOoBj29T15ZdjHy51a1xnfWKmwxDu6IZzc3y2ANpTfblz5JemN8C3Pven8y7MNyz5TKUMoG/ry8wD7w6uB9dOnfWSwf8ewXR8bAD75rDwuM/OAr86Hcaw1ng+PiiAft1hdycD/uOH6Lx+9N8bmPbZA9hPu9XHezDo/2qGEMPllDOA48Zmdy4D7yfRuguxjDen2BED2E/j5oNVQFVV1f4QourqPn0AzSXKse4Mf+zhv51AnAD28c5YZyf/kEI3pQugjZps2QuDTZrhDyGEsU0TQDtEPs6Sl3t3IaVhHz+AJv4hN8We/c8hsa6OHECSYodSP/5jSG93jBhA7JP/N72Pf8KTwBQrgBR3K+VeA467kMvQRwmgTjddrU3+054E2u0BJL1elTcJOIS8po0B9Je056jSLv+7kNuh3xLAKfH5qrAAjl3I7/uXLssDSPzxLy6A0yPGP4TxuDKANv3xFhVAEx6kO64KIMfd6mD8sxTQLA9gn2W6UtBt4Dk8UrM0gDbP5aqcZwMPITy6gCUBTJkOqzf++QqYH0Cf63CLeTS0Do/XzA4g32pFKU+ENOEZnGcGcBxzHdFg/HP6Z14AGVerjmWMfxteKYCMq1WT9d/nCyDj2aqQGWA/hhcKwPhHN4QXCsD4/8cWABcGkHH8S1kDPoUXCiDfbHUsZQFg371SALkO9tYPGE0AHhfA/wz/f3EF+MkCuJT0IPgxCODjwm9x28RFuADshro+td809XnoXiaA3XCu6/cjP1YF2videneZfvuB6dt6ePIAxkttb9Cq3zKpHuubn5n+dOieNIDxcLL3y8ZnQLpZu74t3loqQwC7yQd/83eA4+zNVBf+ZjN1AGNt9LfPAMdFt0mLEkgbwGDvxwgngG7xEvl+eIoA7P/7s1VfAg9r3sbZT3CkC8Dw/zpDW/PxX/mEzNxf8KUKYDga7xgzgN36j9H0wADs+xxpBnDYcvc867GzJAHY+T3SCWDjAxJzHuVPEEDnP2B+PzVf/E5u/o5sRgHxAxh8/H/vnH3856w8Rg+gNtJXdA8Y//sFRA7A7C/aPWCkZyTuXQXiBtC5+btq4c460X4gc6eAqAHsjP/1cXjYA/K3n0GNGYC/+9i8LJPkrWwzBWD8o10BIl9K6ywBdNb+o10BYv9CdsgQgPlfvHuA6Fsk3JgGRAvA/d+2BZmP4p9Lp+QBWP+5bXzwWtqYOAD/9nbnHLxkBphiMt2mDcAEMOIUIM3JdEgawGSIo00BujR3023KAFwA7tk9+gRw9RCiBOABgHseegtw8yoUI4DBAG9ZjP3pl9LJDqJLFoATwPrb8IzrKYdUATgB3DX/YaAu3UEcUwXQGOC192A5rwBXrgHbA+iMb8R1wJSfpkOaAA7GN+JNQMoVtSZNAL4Fumv/DFOAK4exPQDjG/Eu8JL0OLoUAVyMb8QA0n6pOqQIwPfA99VPsApw7Tg2B2AVKGYAad/NJkUAngSNGUD+S9HWAKwCRF0ITHscxwQBWAeOuRA45l+PEMAzBTC8XgBnw1t2AO4CBYAAEAACwF0AmwLoXi8A6wAz/JeXggUQNYD+5QLwPEjUANJ+Gzj5NvDZA2iyH4fnATLwRJAAnuI+MMkzgWaB93kquHTzfxeQcqstvwt4mPm/DEq51YZfBj3/UmDSK6rfBj7Mgr8KSHdbffLr4IdZsD9Auncz2f4AdgiKeB+Y8N20Q8hL3AYkuw+wR9AjLdgl7JD3EOwSlsWSrYLTbBGQdJ/A0QivO/9mPAWk3SnUFwJrVmFzngIS7xUc/FlAtLXANFsu2C38hSYBCeZU159IiPV/AR4OXbMMd21OFXs5MMc/hlgPvGnZfwbF/jj5z6DHW/a/kXG/Ys30r2EKiHUjGPkfOHL9b2Dn+dBo14CYf8J4zPfPof44Jto1IN69YM7/DnYViHYNiLYg6N/Dn0b3iALujX/kAELnbvCqc8hfwN3xjx2AFaEbqzEhewH3xz9+AGEwFYwzDQwhDNvuBfYzHkOIH0DoPCi+4n78yo3VlklVO2fWkSCAEC5WBJauyCb4NM37SWqSAMwFo50CQjiv+zTtZ9aWJoAQBo+JxTkFhDCueSunuTedqQIwGYx2CgjhsvStbOeXli6AEA7OAlFOAUuvA/slT5+kDCCEwVzgR8e172R3mHsWOC56+ChxACF0Z6vDHx3Wv5WXGTcEfbNb+KqpAwghjBr4MELdlk/T4XR79JcvNeUIIITQHRpTwvfp+ca3cqjb380H9qfzbtXr5QkghBC6oT45FayfB/7wVh7qun13quvLhtfMF8D79WC41PX0fuxF9rDvwjPJHcCvQdSn3kWg3AC+zm+b3kWg5ACW3OaWfieQO4BP2Q72XM5ZoH2lAI7ZCijoOYL6hQJY/DTrlpNAMQVcXiiAnAUU8yRJv3uhAHIWsCulgGP3QgFUTb6jLWbf0eMrBZCz12J2m2leKYCcBRwVkFE3zQugOmabtZSz6+AzFND8MTOAjPPWVgH5xr+aHcCmh1mW3QtWCsg2/ksCyHa4vQKyjf+iAHJNBUv6adkDC/j6W/5FAVR9lm8yi9p3tHns+C8MIM/XGGXtPv6gNcFvPztdGkDVjgKIXMD4iPH/NtFaHEDVnwUQ+Zuh/I8I/bvivjyAqjqNAojrnHn8P/xga00AqU8CBf4DySnnRGD8uNq+KoCqancCiGqf7wGBHx+6WBnAgh+guw2cJ9NjYt1P/026OoCqT7Y0XOgeQ22Ou4Ffdm1YH8D8XUgsBc+8G6hzf/w3BrBoJwpfBs1ZEhgyXv1jBJAkgaJ3mWvSXQd2v/2efWsA8RMo/O+H+jrN7Hq8slnL9gAW7knjeZBHJNBdvbOKEUBV9XW0M5e9huMnME7X59VxAqiq6hTnxy7+h/hrAlO8ucDu5k5d0QKoqn7avpq1s8ls5E/Uvb36IgZQVdV+YwOD8f/4bm6+sO6mu29o3ACqqtpPF9f/eAsD53HD6M/ZcyF6AFVVVet2rBptLPrbBqY1m4xfppk7biQJoKqq/nQeFt6oOP1fX2uphyWDXy/4KKUK4OtxT4fB8Mc6EzTn4d7d4TjUp4V77SQN4OukoK3Pw80r2Z0NMPn4mWrr+jL89H7uhuFQT+t23UsfwPcO2ro+D8Ow+zHZ82T3yEfKFgACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAiBfC3t6joAP70DhUdgPEvO4DP3p+iAzD+ZQdg/MsOwA1g2QF8soF/0QEY/7IDMP5lB/DXF+9MyQEY/7IDMP6FB+ALoLID8AVA2QEY/7IDsABcdgDGv+wAjH/ZARj/4nz5/JEFYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfyfxlGbTo76KAGAAAAAElFTkSuQmCC"
                    />
                  </q-avatar>
                </template>
              </q-select>
              <q-btn style="color:black" label="Submit" type="submit" color="secondary" />
            </q-form>
          </li>
        </ul>
        <transition name="slide-fade">
          <ul v-if="showMenu==true" id="headerlistMobile">
            <div @click="toggleMenu()">
              <li>
                <router-link to="/Documentation">Documentation</router-link>
              </li>
            </div>
            <div @click="toggleMenu()">
              <li>
                <router-link to="/Examples">Examples</router-link>
              </li>
              
            </div>

          </ul>

              
        </transition>
      </div>
    

      <router-view />
    </div>

    <div id="Modes">
      <span v-if="!this.$store.state.PractiseOn">
        <li>Practice Mode</li>
      </span>
      <span v-if="this.$store.state.PractiseOn">
        <li style="color:green">Practice Mode</li>
      </span>

      <li style="margin:0px">
        <label class="switch">
          <input @click="SwitchMode()" v-if="this.$store.state.PractiseOn" type="checkbox" />
          <input @click="SwitchMode()" v-if="this.$store.state.LearningOn" type="checkbox" checked />

          <span class="slider round"></span>
        </label>
      </li>
      <span v-if="!this.$store.state.LearningOn">
        <li>Learning Mode</li>
      </span>
      <span v-if="this.$store.state.LearningOn">
        <li style="color:green">Learning Mode</li>
      </span>

      <div style="width: 33%;
    float: right;
    text-align: end;">
              <button  @click="toggleMenu()" id="stackMenuIcon">☰</button>

    </div>
    </div>

    

    <div v-if="this.$store.state.LearningOn" class="LearningMode" id="compiler">
      <div id="textarea">
        <no-ssr placeholder="...">
          <codemirror
            id="codearea"
            ref="myCm"
            :value="code"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          ></codemirror>
        </no-ssr>

     
     <q-btn flat @click="RunLinebyLine()" id="RunlinebylineBtn"  label="Run" />       
    <q-btn flat id="Clearbtn" @click="Clear()"  label="Clear"/>

          <q-btn flat id="subm" @click="Add(Keyword.Print+'()')">{{Keyword.Print}}</q-btn>
          <q-btn flat id="subm" @click="Add('इनपुट()')">इनपुट</q-btn>

          <q-btn flat id="subm" @click="Add(Keyword.If+'()')">{{Keyword.If}}</q-btn>

          <q-btn flat id="subm" @click="Add('दुहराओ x को y मे')">दुहराओ</q-btn>
          <q-btn flat id="subm" @click="Add(Keyword.While+'()')">{{Keyword.While}}</q-btn>
          <q-btn flat id="subm" @click="Add('.संख्या()')">.संख्या</q-btn>
          <q-btn flat id="subm" @click="Add('.पुश()')">.पुश</q-btn>
          <q-btn flat id="subm" @click="Add('रचना')">रचना</q-btn>
      </div>

      <div id="output">
        <div id="bharatDIV">
          <p id="version">Kalaam - Click On Run to Run Your Program Line by Line</p>
          <p id="CodeStatus" v-if="this.isError==false">{{TimeTaken}}</p>

          <p id="CodeStatus" v-if="this.isError==true">{{TimeTaken}}</p>

          <div id="printOutput">
            <p id="linebylineOutput">{{this.ExecutionStackLinebyLine}}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.PractiseOn" class="PractiseMode" id="compiler">
      <div id="textarea">
        <no-ssr placeholder="...">
          <codemirror
            id="codearea"
            style="text-align:left;"
            ref="myCm"
            :value="code"
            placeholder="Welcome To Kalaam, This is your Code Editor."
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          ></codemirror>
        </no-ssr>

        <div id="ControlPanel">
 <q-btn flat @click="Run()" id="Runbtn"  label="Run" />       
    <q-btn flat id="Clearbtn" @click="Clear()"  label="Clear"/>

          <q-btn flat id="subm" @click="Add(Keyword.Print+'()')">{{Keyword.Print}}</q-btn>
          <q-btn flat id="subm" @click="Add('इनपुट()')">इनपुट</q-btn>

          <q-btn flat id="subm" @click="Add(Keyword.If+'()')">{{Keyword.If}}</q-btn>

          <q-btn flat id="subm" @click="Add('दुहराओ x को y मे')">दुहराओ</q-btn>
          <q-btn flat id="subm" @click="Add(Keyword.While+'()')">{{Keyword.While}}</q-btn>
          <q-btn flat id="subm" @click="Add('.संख्या()')">.संख्या</q-btn>
          <q-btn flat id="subm" @click="Add('.पुश()')">.पुश</q-btn>
          <q-btn flat id="subm" @click="Add('रचना')">रचना</q-btn>
        </div>
      </div>

      <div id="output">
        <div id="bharatDIV">
          <p id="version">Kalaam   -   Your output will be shown here</p>
          <p id="CodeStatus" v-if="this.isError==false">{{TimeTaken}}</p>

          <p id="CodeStatus" v-if="this.isError==true">{{TimeTaken}}</p>

          <div id="printOutput">
            <p
              style="white-space: pre; "
              id="linebylineOutput"
              v-for="(output,index) in this.linebylineOutput"
              :key="index"
            >{{output}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//This is our header file AKA Navigation bar located in components folder.


import { KalaamKeywords } from "../lib/Compiler/constants";

//CodeMirror is an npm package whcih provides rich code editors
import { codemirror } from "vue-codemirror";

//Code editor styling
import "codemirror/lib/codemirror.css";
import "../components/Kalaam";

// theme css
//import 'codemirror/theme/yonce.css'
//import 'codemirror/theme/monokai.css'

import "../components/monokai.css";

// require active-line.js
import "codemirror/addon/selection/active-line.js";

// keyMap
import "codemirror/addon/edit/matchbrackets.js";

import "codemirror/addon/search/searchcursor.js";
import "codemirror/keymap/sublime.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
// Importing our Compile Engine
//We need a name for our compiler, any suggestions?

import Compile from "../lib/Compiler/main";

//Central data storage of Kalaam
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

  //Retriveing CurrentCode present in the Central data storage of Kalaam.
  computed: {},

  //This is a local data restricted to Kalaam.io/practise component.
  //Our Compiler takes data from here, does it's magic and save it back here
  data() {
    return {
      //Code written by user
      code: "",
      checked: "",
      //Compiled Output
      output: "",
      cm: "",
      //Error handling array. Need a lot of improvements in this particular part
      error: [],
      OperationObjects: [],
      //Printing compiled output in a more readable line by line format
      linebylineOutput: "",

      //Calculating the time taken to compile the code
      TimeTaken: "",
      flag: false,
      inputIndexes: [],
      //input: '',
      isError: "",
      ExecutionStack: [],
      ExecutionStackLinebyLine: "",

      LastConditionValue: [],
      LineByLineCode: [],
      CurrentLine: 0,
      Keyword: "",
      showMenu: false,

      isRoutePractise: false,

      ShowSupport: true,
      ShowAbout: true,
      isMobile:false,

      ActiveLanguage: "",

      //Configuration for codemirror text edior that we are using
      cmOptions: {
        // codemirror options
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: "kalaam",
        hintOptions: {
          completeSingle: true,
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        scrollbarStyle: "null",
      },

      model: null,

      options: ["Hindi", "Marathi"],
    };
  },

  //Imported components
  components: {
    codemirror,
  },

  //Created() is Called synchronously after the instance is created or when kalaam.io/practise is visited

  computed: {},
  watch: {
    ActiveLanguage: function (newval, oldval) {
      if (this.ActiveLanguage == "Hindi" ) {
        localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

        this.Keyword = KalaamKeywords.Hindi;
      } else if (this.ActiveLanguage == "Marathi") {
        localStorage.setItem("ActiveLangugae", this.ActiveLanguage);

        this.Keyword = KalaamKeywords.Marathi;
      }
    },
  },

  created() {
    this.ActiveLanguage = localStorage.getItem("ActiveLangugae");

    if(this.ActiveLanguage==null)
    {


      this.ActiveLanguage='Hindi'
    }

    this.checked = true;

    

    //Since html reads '>' and '<' as '&gt' and '&lt' respectively, we need to replace it back to the desired way.

    let m = this.$store.state.CurrentCode.replace(/&lt;/g, "<");

    m = m.replace(/&gt;/g, ">");

    m = m.replace(/&amp;/g, "&");

    //Setting the formatted code to this.code. this.code is how you can access the code written by user.

    this.code = m;

    if (this.code == "") {
      this.code = localStorage.getItem("Code");
    }
  },

  //This is the start of our functions.
  methods: {
    Reload: function () {
      console.log(this.ActiveLanguage);
    },
    Clear: function () {


     if(this.$store.state.PractiseOn)

{

  this.code=''
}
else  {


      this.ExecutionStack = [];
      this.ExecutionStackLinebyLine = [];
      this.output = "";
      this.linebylineOutput = "";

      this.LineByLineCode = [];

      this.flag = false;
      this.CurrentLine = 0;
      var doc = this.cm.getDoc();

      doc.setCursor({ line: this.CurrentLine });
      }
    },

    SwitchMode: function () {
      this.$store.commit("changeMode");
    },
    // Below 3 are the fucntions provided by Codemirror code editor out of the box. We dynamically change it's height for different devices and make it responsive.
    onCmReady(cm) {
      this.cm = cm;

      if (screen.width < 420) {
        this.cm.setSize("100%", 440);
        this.isMobile=true
      } else {
        this.cm.setSize("100%", 500);
                this.isMobile=false

      }
    },

    onCmFocus(cm) {},

    onCmCodeChange(newCode) {
      this.code = newCode;

      localStorage.setItem("Code", newCode);

      this.$store.state.CurrentCode = newCode;
    },
    toggleMenu: function () {
      if (this.showMenu == false) {
        this.showMenu = true;
      } else if (this.showMenu == true) {
        this.showMenu = false;
      }
    },
    //Add() is a function used to add clicked keywords on to the code editor.
    //This keywords are in hindi, provided in the control panel at the bottom of our code editor.
    Add: function (insert) {
      //Getting a codemirror instance
      var doc = this.cm.getDoc();
      //Getting the current position of cursor on Code editor
      var cursor = doc.getCursor();

      //Adding the clikced element (insert)
      doc.replaceRange(insert, cursor);

      //getting the active element

      //setting as active line
    },

    //This is the start of Compiler. RUN() is the function executed when a user wants to run the code and see the output.
    //This is our main guy consisting of different functions to parse, generate token array, compile code and print output.

    Run: function () {
      //Compile is our #1 function located in /lib/compiler/main.js
      //this.$data is the local data restricted to Kalaam.io/practise component which we have declared in 'data()' above
      //try  to see what we are sending to our compiler

      Compile(this.$data, this.ActiveLanguage);
    },

    RunLinebyLine: function () {
      //Compile is our #1 function located in /lib/compiler/main.js
      //this.$data is the local data restricted to Kalaam.io/practise component which we have declared in 'data()' above
      //try  to see what we are sending to our compiler

      if (this.flag == false) {
        this.ExecutionStack = Compile(this.$data, this.ActiveLanguage);
      }

      this.flag = true;

      this.ExecutionStackLinebyLine =
        this.ExecutionStackLinebyLine +
        this.ExecutionStack[this.CurrentLine].message +
        "\n" +
        "\n";

      let Line = this.ExecutionStack[this.CurrentLine].Linenumber;

      //this.cm.state.activeLines

      var doc = this.cm.getDoc();

      doc.setCursor({ line: Line - 1 });

      this.CurrentLine += 1;
    },
  },
};
</script>
<style scoped>
#Select-Language-form {
  display: inline-flex;
}
#header {
  height: 81px;
}

#headerlistMobile {
  display: none;
}

#headerlist {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 3%;

  line-height: 40px;
}

#headerlist li {
  display: inline-block;
  margin: 0 2em;
  font-size: 110%;
}
#headerlist a {
  text-decoration: none;
  cursor: pointer;
  color: #2c3e50;
}

#headerlist a:hover {
  color: rgb(52, 204, 218);
}

#footer {
  display: none;
  background-color: #fff;
  /* height: 40px; */
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #2f3c44;
  left: 0;
}
#stackMenuIcon {
  display: none;
}

#KalamLogo {
  width: 4.5%;
  float: left;
  margin-left: 2.4%;
  margin-top: -0.2%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(216, 215, 215);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgba(0, 0, 0, 0.733);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #e5f321;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.LearningMode {
  border: solid 4px green;
}

#RunlinebylineBtn {
  background: linear-gradient(to right, rgb(218 241 129), rgb(240 255 18));
  border: none;
  font-weight: 600;
  width: 18.5%;
  height: 50px;
  cursor: pointer;
  border: none;
}
#Runbtn {
  background: linear-gradient(
    to right,
    #99ec72,
    #4dffca
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: none;
  font-weight: 600;
  width: 18.5%;
  height: 50px;
  cursor: pointer;
  border: none;
}

#Clearbtn {
  background: linear-gradient(to right, #00d2ff, #a1e9f6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 border: none;
  font-weight: 600;
  width: 18.5%;
  height: 50px;
  cursor: pointer;
  border: none;
}
#other {
  background: linear-gradient(to right, rgb(218 241 129), rgb(240 255 18));
  border: none;
  font-weight: 600;
}
::-webkit-input-placeholder {
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
}

:-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
}

::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
}

:-ms-input-placeholder {
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
}

button:focus {
  outline: 0;
}

#Modes {
  float: left;
  display: flex;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 0.5%;
}

#bharatP {
  text-align: left;
  display: table-cell;
  font-family: monospace;
}
#versionNumber {
  text-align: left;
  display: table-cell;
  font-family: monospace;
  padding-left: 6%;
}

#version {
  margin: 0;
  float: left;
  color: #92924c;
  font-size: 90%;
}

#bharatDIV {
  padding-top: 2%;
  padding-left: 2%;
}

#linebylineOutput {
  white-space: pre;
  height: 10px;
  text-align: left;
}
#errorstack {
  text-align: left;
  padding-left: 2.5%;
  padding-top: 6%;
  font-weight: bold;
  color: rgb(231, 83, 83);
}

#compiler {
  display: flex;
  overflow-x: scroll;
}

#textarea {
  width: 50%;
  margin-left: -1%;
}
#output {
  height: 600px;
  width: 50%;
  background-color: black;
  color: white;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: scroll;
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
  text-align: left;
}

#row {
  display: flex;
  width: 2%;
  margin-top: -12%;
}

#rowdiv {
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
  border: none;
  background: white;
  border-radius: 0%;
}

#subm:hover {
  background-image: radial-gradient(
    circle 534px at 7.8% 17.6%,
    rgba(254, 253, 112, 1) 1.7%,
    rgba(248, 143, 111, 1) 91.8%
  );
}

p {
  margin-top: 4%;
}

#CodeStatus {
  margin-top: 5%;
  text-align: left;
  color: #2fff2f;
  font-family: monospace;
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width: 480px) {

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 2px;
  background-color: rgba(0, 0, 0, 0.733);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
#Modes {
  float: left;
  display: flex;
  padding-top: 1%;
  padding-bottom: 4%;
  padding-left: 0.5%;
  
}

#Modes li{


  font-size: 80%;
}

#header {
  height: 61px;
}


  #headerlistMobile {
    display: inline-grid;
    position: absolute;
    left: 0%;
    width: 100%;
    background-color: #f3e78b;
    line-height: 40px;
    top: 86%;
    padding: 0%;
  }

  #headerlistMobile li {
    display: inline-block;
    font-size: 120%;
    margin-top: 1%;
  }
  #headerlistMobile a {
    text-decoration: none;
    cursor: pointer;
    color: rgb(12, 12, 12);
  }

  #headerlistMobile a:hover {
    color: rgb(214, 200, 0);
  }
  ::-webkit-input-placeholder {
    text-align: center;
    vertical-align: middle;

    line-height: 500px;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
    vertical-align: middle;

    line-height: 500px;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
    vertical-align: middle;

    line-height: 500px;
  }

  :-ms-input-placeholder {
    text-align: center;
    vertical-align: middle;

    line-height: 500px;
  }

  #stackMenuIcon {
    display: block;
    float: right;
    font-size: 150%;
    border: none;
    background: white;
    color: black;
  }

  ::-webkit-input-placeholder {
    text-align: center;
    vertical-align: middle;
    line-height: 250px;
    font-size: 90%;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
    vertical-align: middle;
    line-height: 250px;

    font-size: 90%;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
    vertical-align: middle;
    line-height: 250px;

    font-size: 90%;
  }

  :-ms-input-placeholder {
    text-align: center;
    vertical-align: middle;
    line-height: 250px;
    font-size: 90%;
  }

  #compiler {
    display: inline-block;
    overflow-x: scroll;
  }

  #CodeStatus {
    text-align: left;
  }

  #linebylineOutput {
  }
  .hello {
    text-align: center;
    margin-top: 2%;
  }
  #textarea {
    width: 100%;
    margin: 0%;
  }
  #codearea {
    height: 440px;
    width: 100%;
    margin-left: 0;
  }

  #textarea button {
    width: 20%;
    height: 41px;
    font-size: small;
  }

  #output {
    width: 100%;
    height: 440px;

    margin-top: 5%;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  #printOutput {
    width: 100%;
    float: left;
  }

  #headerlist {
    display: none;
  }
}
</style>