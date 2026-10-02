<template>
  <div class="k-page">
    <SiteHeader />

    <main class="k-main">
      <header class="k-page-head">
        <h1 class="k-title">Examples</h1>
        <p>A working program for each one. Open any example in the practice editor and run it.</p>
      </header>

      <section v-for="group in groups" :key="group.heading" class="k-band">
        <h2 class="k-heading">{{ group.heading }}</h2>
        <div class="band-body examples">
          <article v-for="ex in group.items" :key="ex.id" class="k-sheet example">
            <h3 class="example-title" lang="hi">{{ ex.title }}</h3>
            <pre class="k-code" :id="ex.id">{{ ex.code }}</pre>
            <button class="k-button-quiet" @click="CopyCode(ex.id)">Open in practice</button>
          </article>
        </div>
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
  name: 'Examples',

  components: { SiteHeader, SiteFooter },

  data() {
    return {
      groups: [
        {
          heading: 'Basics',
          items: [
            {
              id: 'CodeID1',
              title: 'दो संख्याओं को जोड़ना (addition)',
              code: `a=10
b=5
c=a+b
दिखाए(c)`,
            },
            {
              id: 'CodeID2',
              title: 'आपके दिए गए किसी भी दो संख्याओ को जोड़े',
              code: `इनपुट(a)
इनपुट(b)
c=a+b
दिखाए(c)`,
            },
            {
              id: 'CodeID3',
              title: 'आपकी जानकारी दिखाए',
              code: `नाम="अग्रज"
उम्र="14"
शहर="मुंबई"
राज्य="महाराष्ट्र"
शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"
दिखाए(नाम)
दिखाए(उम्र)
दिखाए(शहर)
दिखाए(राज्य)
दिखाए(शौक)`,
            },
            {
              id: 'CodeID4',
              title: 'खुद के बारे में बताये',
              code: `नाम="अग्रज"
उम्र="14"
शहर="मुंबई"
राज्य="महाराष्ट्र"
शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"
दिखाए("मेरा नाम"+ नाम +"है")
दिखाए("मै"+ उम्र + "साल का हु")
दिखाए("मै "+ शहर +","+ राज्य + "मे रहता हु")
दिखाए(शौक)
दिखाए("Thank You!")`,
            },
            {
              id: 'CodeID5',
              title: 'आपका नाम दुहराए',
              code: `इनपुट(नाम)
दुहराओ x को (0,10) मे
{
  दिखाए(नाम)
}`,
            },
            {
              id: 'CodeID6',
              title: 'नाम, अक्षर और उनकी पोजीशन',
              code: `नाम="SWANAND"
दुहराओ x को नाम मे
{
 अक्षर=नाम[x]
 दिखाए(x + अक्षर)
}`,
            },
            {
              id: 'CodeID7',
              title: 'किसी भी नंबर का पहाड़ा (पाढ़ा) बनाये',
              code: `इनपुट(नंबर)
गिनती=0
नतीजा=नंबर
जबतक(गिनती<10)
{
  दिखाए(नतीजा)
  नतीजा=नतीजा+नंबर
  गिनती=गिनती+1
}`,
            },
            {
              id: 'CodeID8',
              title: 'सीढ़ी',
              code: `सीधा="|"
आड़ा="------"
दुहराओ x को (0,10) मे
{
  x=सीधा+आड़ा+सीधा
  दिखाए(x)
}`,
            },
            {
              id: 'CodeID9',
              title: 'किसी भी शब्द की लंबाई जाने',
              code: `इनपुट(शब्द)
लंबाई = शब्द.संख्या()
दिखाए(लंबाई)`,
            },
          ],
        },
        {
          heading: 'Intermediate',
          items: [
            {
              id: 'CodeID10',
              title: 'कैलकुलेटर (calculator)',
              code: `इनपुट(x)
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
दिखाए( x + ऑपरेशन + y + '=' + नतीजा)`,
            },
            {
              id: 'CodeID11',
              title: 'नाम की निर्मिति',
              code: `इनपुट(नाम)
नतीजा=""
दुहराओ x को नाम मे
{
 अक्षर=नाम[x]
 नतीजा=नतीजा+अक्षर
 दिखाए(नतीजा)
}`,
            },
            {
              id: 'CodeID12',
              title: 'किसी शब्द का उलटा रूप',
              code: `इनपुट(Name)
ReverseString=''
दिखाए ('Input String-'+ Name)
length=Name.संख्या()
दुहराओ b को Name मे
{
ReverseString=ReverseString+Name[length-1]
length=length-1
}
दिखाए ('Reversed String-'+ ReverseString)`,
            },
            {
              id: 'CodeID14',
              title: 'रचना का उदाहरण',
              code: `FirstName='Swanand'
LastName='Kadam'
रचना First(First,Last)
{
दिखाए(First)
दिखाए(Last)
}
First(FirstName,LastName)`,
            },
            {
              id: 'CodeID15',
              title: 'रचना का उदाहरण 2',
              code: `रचना printname(count)
{
जबतक(count<20)
{
count=count+1
दिखाए(count)
}
}
printname(10)`,
            },
            {
              id: 'CodeID16',
              title: 'Factorial ऑफ़ अ नंबर',
              code: `इनपुट(factorialOf)
f=1
count=1

अगर(factorialOf == 0 || factorialOf < 0){
  दिखाए("Invalid Input")
}

जबतक(count < factorialOf+1){
  f=f*count
  count=count+1
}

दिखाए("Factorial of" + factorialOf + " is " + f)`,
            },
          ],
        },
        {
          heading: 'Advanced',
          items: [
            {
              id: 'CodeID17',
              title: 'The सफ़र',
              code: `इनपुट(YourSign)
line="|"
space="  "
Extra="  "

दुहराओ x को (1,15) मे
{
Road=space+line+space+space+space+YourSign+space+space+space+line+space
space=space+Extra
दिखाए(Road)
}`,
            },
            {
              id: 'CodeID18',
              title: 'Fibonacci अनुक्रम',
              code: `Fibonacci=[]
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
}`,
            },
            {
              id: 'CodeID20',
              title: 'क्या यह एक प्रमुख संख्या है?',
              code: `इनपुट(num)
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
अगर(length==1 && num>1)
{
दिखाए(num + "is a Prime Number")
}`,
            },
            {
              id: 'CodeID23',
              title: 'बाइनरी से Decimal (binary to decimal)',
              code: `इनपुट(Binary)
DecimalValue=0
length=Binary.संख्या()

दुहराओ x को Binary मे
{
length=length-1
BinaryCharacter=Binary[x]
value=BinaryCharacter*2**length
DecimalValue=DecimalValue+value
}

दिखाए(DecimalValue)`,
            },
          ],
        },
      ],
    };
  },

  computed: mapState(['CurrentCode']),

  methods: {
    CopyCode(el) {
      const copyText = document.getElementById(el);
      this.$store.state.CurrentCode = copyText.innerHTML;
      this.$router.push('/Practice');
    },
  },
};
</script>

<style scoped>
.examples {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

.example {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.example-title {
  font-family: var(--k-serif);
  font-size: 19px;
  font-weight: 400;
  color: var(--k-ink);
  margin: 0;
}

.example pre.k-code {
  flex: 1;
}

.example .k-button-quiet {
  align-self: flex-start;
}

@media (min-width: 720px) {
  .examples {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}
</style>
