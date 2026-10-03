<template>
  <div class="k-page">
    <SiteHeader />

    <main class="k-main">
      <header class="k-page-head">
        <h1 class="k-title">Documentation</h1>
        <p>Every keyword, what it does, and a working example.</p>
      </header>

      <nav class="contents" aria-label="Topics">
        <a v-for="t in topics" :key="t.id" class="k-link" :href="'#' + t.id">{{ t.word }}</a>
      </nav>

      <!-- दिखाए() -->
      <section id="dikhae" class="k-band topic" :class="{ open: showStar0 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar0 ? 'true' : 'false'"
            @click="showStar0 = !showStar0"
          >
            <span class="k-code" lang="hi">दिखाए()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar0 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar0" class="band-body">
            <h3>Purpose</h3>
            <p>Shows a result on the output screen.</p>

            <h3>How to use it</h3>
            <p>
              1. Show a declared variable:
              <code class="k-code">Name = "Hello World"</code>, then
              <code class="k-code">दिखाए(Name)</code>.
            </p>
            <p>
              2. Show text or a number directly:
              <code class="k-code">दिखाए("Hello World")</code>,
              <code class="k-code">दिखाए(007)</code>.
            </p>
            <p>
              3. Show concatenated text: <code class="k-code">Name = "Kalam"</code>, then
              <code class="k-code">दिखाए("Hello World," + "My Name is" + Name + "!")</code>.
            </p>

            <div class="example-head">
              <h3>Example</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode1')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode1">Name="Hello World"
दिखाए(Name)

दिखाए("Tic Tac Toe")
दिखाए(007)

Name="Kalam"
दिखाए("Hello World," + "My Name is" + Name + "!")</pre>
          </div>
        </transition>
      </section>

      <!-- इनपुट() -->
      <section id="input" class="k-band topic" :class="{ open: showStar2 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar2 ? 'true' : 'false'"
            @click="showStar2 = !showStar2"
          >
            <span class="k-code" lang="hi">इनपुट()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar2 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar2" class="band-body">
            <h3>Purpose</h3>
            <p>Accepts a new value from the person running the program.</p>

            <h3>How to use it</h3>
            <p>
              Tell <code class="k-code">इनपुट()</code> which variable should receive the
              value: <code class="k-code">इनपुट(VARIABLE)</code>.
            </p>

            <h3>Example</h3>
            <p>
              <code class="k-code">इनपुट(Name)</code>. If you type
              <i>Kalam</i> at the prompt, the computer accepts it as
              <code class="k-code">Name="Kalam"</code>. Once a variable's value is set,
              it can be used anywhere in the program.
            </p>

            <div class="example-head">
              <h3>Try it</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode2')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode2">इनपुट(Name)
दिखाए(Name)</pre>
          </div>
        </transition>
      </section>

      <!-- अगर() -->
      <section id="agar" class="k-band topic" :class="{ open: showStar3 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar3 ? 'true' : 'false'"
            @click="showStar3 = !showStar3"
          >
            <span class="k-code" lang="hi">अगर()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar3 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar3" class="band-body">
            <h3>Purpose</h3>
            <p>
              Allows code execution under a certain condition. There are two outcomes:
              true and false.
            </p>

            <h3>How to use it</h3>
            <p>
              1. Evaluate a single condition: <code class="k-code">अगर (Language == 'kalam')</code>,
              <code class="k-code">अगर (Age &gt; 18)</code>.
            </p>
            <p>The accepted comparison operators are:</p>
            <ul>
              <li><code class="k-code">&gt;</code> &mdash; greater than</li>
              <li><code class="k-code">&lt;</code> &mdash; less than</li>
              <li><code class="k-code">==</code> &mdash; is equal to</li>
              <li><code class="k-code">!=</code> &mdash; is not equal to</li>
            </ul>

            <p>
              2. Evaluate multiple conditions:
              <code class="k-code">अगर (Age &gt; 16 &amp;&amp; Education == 'ssc')</code>,
              <code class="k-code">अगर (Country=='india' || Language == 'hindi')</code>.
            </p>
            <ul>
              <li><code class="k-code">&amp;&amp;</code> &mdash; true only if both conditions are true</li>
              <li><code class="k-code">||</code> &mdash; true if at least one condition is true</li>
            </ul>

            <div class="example-head">
              <h3>Example</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode3')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode3">इनपुट(language)
अगर(language=='kalam')
{
  दिखाए('Alright, that is cool!')
}

# उदाहरण 2
इनपुट(language)
इनपुट(country)
अगर(language=='kalam' || country=='india')
{
  दिखाए('That works too.')
}</pre>
          </div>
        </transition>
      </section>

      <!-- दुहराओ x को y मे -->
      <section id="duharao" class="k-band topic" :class="{ open: showStar4 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar4 ? 'true' : 'false'"
            @click="showStar4 = !showStar4"
          >
            <span class="k-code" lang="hi">दुहराओ x को y मे</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar4 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar4" class="band-body">
            <h3>Purpose</h3>
            <p>Repeats the same block of code.</p>

            <h3>How to use it</h3>
            <p>
              Define the loop as <code class="k-code">दुहराओ x को y मे</code>. Here
              <code class="k-code">y</code> is a range, defined like
              <code class="k-code">(0,10)</code> or <code class="k-code">(5,100)</code>.
              <code class="k-code">x</code> is the index, or iterator &mdash; for
              example it can take any value between 1 and 10, inclusive, for the range
              <code class="k-code">(0,10)</code>.
            </p>
            <p>
              <code class="k-code">दुहराओ x को City मे</code>: instead of a custom range,
              this iterates over the length of a variable. If
              <code class="k-code">City='Pusad'</code>, the range is set automatically
              to <code class="k-code">(0,5)</code>, because the length of
              <i>Pusad</i> is 5.
            </p>

            <div class="example-head">
              <h3>Example</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode4')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode4"># उदाहरण 1
दुहराओ x को (0,10) मे
{
  value= x*5
  दिखाए(value)
}

# उदाहरण 2
Name="HALF COOKED RICE"
दुहराओ y को Name मे
{
  value=Name[y]
  दिखाए(value + y)
}</pre>
          </div>
        </transition>
      </section>

      <!-- जबतक() -->
      <section id="jabtak" class="k-band topic" :class="{ open: showStar5 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar5 ? 'true' : 'false'"
            @click="showStar5 = !showStar5"
          >
            <span class="k-code" lang="hi">जबतक()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar5 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar5" class="band-body">
            <h3>Purpose</h3>
            <p>Runs the following code for as long as the given condition holds.</p>

            <h3>How to use it</h3>
            <p><code class="k-code">जबतक(YourCondition)</code>. The accepted comparison operators are:</p>
            <ul>
              <li><code class="k-code">&gt;</code> &mdash; greater than</li>
              <li><code class="k-code">&lt;</code> &mdash; less than</li>
              <li><code class="k-code">==</code> &mdash; is equal to</li>
              <li><code class="k-code">!=</code> &mdash; is not equal to</li>
            </ul>

            <h3>Example</h3>
            <p>
              <code class="k-code">जबतक(count &lt; 25)</code>: the code runs until the
              condition evaluates to false. When <code class="k-code">count</code>
              reaches 26, execution stops.
            </p>

            <div class="example-head">
              <h3>Try it</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode5')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode5">count=0
जबतक(count&lt;25)
{
  दिखाए(count)
  count=count+1
}</pre>
          </div>
        </transition>
      </section>

      <!-- .संख्या() -->
      <section id="sankhya" class="k-band topic" :class="{ open: showStar6 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar6 ? 'true' : 'false'"
            @click="showStar6 = !showStar6"
          >
            <span class="k-code" lang="hi">.संख्या()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar6 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar6" class="band-body">
            <h3>Purpose</h3>
            <p>Finds the length of a string or array directly.</p>

            <h3>How to use it</h3>
            <p><code class="k-code">YourVariable.संख्या()</code></p>

            <h3>Example</h3>
            <p>
              <code class="k-code">City.संख्या()</code>: if
              <code class="k-code">City = 'Banglore'</code> this outputs <b>8</b>. If
              <code class="k-code">City = ['Pusad','Pune','Mumbai','Delhi']</code> this
              outputs <b>4</b>.
            </p>

            <div class="example-head">
              <h3>Try it</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode6')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode6">City='Banglore'
Cities=['Pusad','Pune','Mumbai','Delhi']

Citylength= City.संख्या()
Citieslength=Cities.संख्या()

दिखाए('The length of the City is' + Citylength )
दिखाए('The length of the Cities is' + Citieslength )</pre>
          </div>
        </transition>
      </section>

      <!-- .पुश() -->
      <section id="push" class="k-band topic" :class="{ open: showStar7 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar7 ? 'true' : 'false'"
            @click="showStar7 = !showStar7"
          >
            <span class="k-code" lang="hi">.पुश()</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar7 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar7" class="band-body">
            <h3>Purpose</h3>
            <p>Pushes a value onto an array.</p>

            <h3>How to use it</h3>
            <p>
              Push a value onto an array: <code class="k-code">ArrayName = []</code>,
              then <code class="k-code">ArrayName.पुश(YourValue)</code>.
            </p>

            <div class="example-head">
              <h3>Example</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode7')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode7"># उदाहरण 1
Numbers=[]
दुहराओ x को (1,10)
{
  Numbers.पुश(x)
}
दिखाए(Numbers)

# उदाहरण 2
Numbers=[]
Name='Angry Birds'
type='Game'
Numbers.पुश(Name)
Numbers.पुश(type)
दिखाए(Numbers)</pre>
          </div>
        </transition>
      </section>

      <!-- रचना -->
      <section id="rachna" class="k-band topic" :class="{ open: showStar1 }">
        <h2 class="k-heading">
          <button
            type="button"
            class="topic-toggle"
            :aria-expanded="showStar1 ? 'true' : 'false'"
            @click="showStar1 = !showStar1"
          >
            <span class="k-code" lang="hi">रचना</span>
            <span class="topic-mark" aria-hidden="true">{{ showStar1 ? '−' : '+' }}</span>
          </button>
        </h2>

        <transition name="slide-fade">
          <div v-if="showStar1" class="band-body">
            <h3>Purpose</h3>
            <p>
              Code that will be reused is wrapped in a block, which we call
              <code class="k-code">रचना</code> (a function).
            </p>

            <h3>How to use it</h3>
            <p>1. Define a function:</p>
            <pre v-kalaam-code class="k-code">रचना रचना-का-नाम (पर्याय1, पर्याय2)</pre>
            <p>
              <b>Function name:</b> case sensitive, and should use only letters of the
              alphabet.
            </p>
            <p>
              <b>Function parameters:</b> used to hold temporary values, passed in when
              the function is called. Parameter names are also case sensitive and can be
              changed freely, but should use only letters of the alphabet.
            </p>

            <p>2. Call the function:</p>
            <pre v-kalaam-code class="k-code">रचना-का-नाम (पर्याय1, पर्याय2)</pre>
            <p>
              When calling a function, its name must match the declared name exactly
              &mdash; for example, <code class="k-code">PrintFullName</code> is not the
              same as <code class="k-code">printfullname</code>.
            </p>

            <h3>Example</h3>
            <p>Define the variables:</p>
            <p>
              <code class="k-code">FirstName = 'Sachin'</code>,
              <code class="k-code">LastName = 'Tendulkar'</code>
            </p>
            <p>Function declaration and body:</p>
            <pre v-kalaam-code class="k-code">PrintFullName (x, y)
{
  दिखाए( x + y )
}</pre>
            <p>Function call: <code class="k-code">PrintFullName(FirstName,LastName)</code></p>
            <p>
              With parameters <code class="k-code">('Sachin','Tendulkar')</code>,
              <code class="k-code">x</code> takes the temporary value
              <code class="k-code">'Sachin'</code> and <code class="k-code">y</code>
              takes <code class="k-code">'Tendulkar'</code>.
            </p>

            <div class="example-head">
              <h3>Try it</h3>
              <button class="k-button-quiet" @click="CopyCode('DocCode8')">Open in practice</button>
            </div>
            <pre v-kalaam-code class="k-code" id="DocCode8">FirstName='Sachin'
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
Add(NumberOne,NumberTwo)</pre>
          </div>
        </transition>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';

export default {
  name: 'Documentation',

  components: { SiteHeader, SiteFooter },

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
      topics: [
        { id: 'dikhae', word: 'दिखाए()' },
        { id: 'input', word: 'इनपुट()' },
        { id: 'agar', word: 'अगर()' },
        { id: 'duharao', word: 'दुहराओ x को y मे' },
        { id: 'jabtak', word: 'जबतक()' },
        { id: 'sankhya', word: '.संख्या()' },
        { id: 'push', word: '.पुश()' },
        { id: 'rachna', word: 'रचना' },
      ],
    };
  },

  computed: mapState(['CurrentCode']),

  methods: {
    CopyCode(el) {
      const copyText = document.getElementById(el);
      // textContent, not innerHTML: the block is highlighted markup now
      this.$store.state.CurrentCode = copyText.textContent;
      this.$router.push('/Practice');
    },
  },
};
</script>

<style scoped>
.contents {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding: 16px 0 32px;
  border-top: 1px solid var(--k-rule);
  border-bottom: 1px solid var(--k-rule);
}

.contents a {
  font-family: var(--k-serif);
  font-size: 16px;
}

.topic-toggle {
  display: flex;
  align-items: baseline;
  gap: 12px;
  width: 100%;
  font: inherit;
  text-align: left;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: inherit;
}

.topic-toggle:hover .k-code {
  color: var(--k-ink-hover);
}

.topic-mark {
  font-size: 20px;
  font-weight: 600;
  color: var(--k-ink);
}

.topic-toggle .k-code {
  font-size: 22px;
  font-weight: 400;
}

.topic {
  padding: 14px 0;
}

.topic.open {
  padding-bottom: 48px;
}

.band-body h3 {
  font-family: var(--k-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--k-muted);
  margin: 24px 0 8px;
}

.band-body h3:first-child {
  margin-top: 0;
}

.band-body p {
  max-width: 42em;
  margin: 0 0 12px;
}

.band-body ul {
  max-width: 42em;
  margin: 0 0 16px;
  padding-left: 20px;
}

.band-body li {
  margin-bottom: 4px;
}

.band-body pre.k-code {
  margin: 8px 0 16px;
}

.example-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: 20px;
}

.example-head h3 {
  margin: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.15s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
