// Generated on 2026-10-03 by running every program once through the vendored
// interpreter (src/kalaam) BEFORE any fix. Each expectation is what Kalaam
// printed at that moment, quirks included. Rows marked "// quirk, plan item X"
// are expected to change when that item of INTERPRETER_PLAN.md lands; update
// them deliberately, together with the fix.
// The 19 programs on the Examples page and the 8 on the Documentation page,
// verbatim. Besides the output, each program's Learning-mode ExecutionStack is
// compared with executionStack.fixture.json, so no fix can silently change
// what the Learning mode replays.
import { run, stackOf, silenceConsole } from './helpers';
import stacks from './executionStack.fixture.json';

silenceConsole();

// [id, title, source, inputs (answers to इनपुट prompts, in order), expected]
const examples = [
  ["CodeID1", "दो संख्याओं को जोड़ना (addition)", `a=10
b=5
c=a+b
दिखाए(c)`, [], {"out":["15"],"isError":false}],
  ["CodeID2", "आपके दिए गए किसी भी दो संख्याओ को जोड़े", `इनपुट(a)
इनपुट(b)
c=a+b
दिखाए(c)`, ["4","6"], {"out":["10"],"isError":false}],
  ["CodeID3", "आपकी जानकारी दिखाए", `नाम="अग्रज"
उम्र="14"
शहर="मुंबई"
राज्य="महाराष्ट्र"
शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"
दिखाए(नाम)
दिखाए(उम्र)
दिखाए(शहर)
दिखाए(राज्य)
दिखाए(शौक)`, [], {"out":["अग्रज","14","मुंबई","महाराष्ट्र","मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"],"isError":false}],
  ["CodeID4", "खुद के बारे में बताये", `नाम="अग्रज"
उम्र="14"
शहर="मुंबई"
राज्य="महाराष्ट्र"
शौक="मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!"
दिखाए("मेरा नाम"+ नाम +"है")
दिखाए("मै"+ उम्र + "साल का हु")
दिखाए("मै "+ शहर +","+ राज्य + "मे रहता हु")
दिखाए(शौक)
दिखाए("Thank You!")`, [], {"out":["मेरा नाम अग्रज है","मै 14 साल का हु","मै मुंबई , महाराष्ट्र मे रहता हु","मुझे क्रिकेट, फुटबॉल और PUBG खेलना पसंद है!","Thank You!"],"isError":false}],
  ["CodeID5", "आपका नाम दुहराए", `इनपुट(नाम)
दुहराओ x को (0,10) मे
{
  दिखाए(नाम)
}`, ["Kalaam"], {"out":["Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam","Kalaam"],"isError":false}],
  ["CodeID6", "नाम, अक्षर और उनकी पोजीशन", `नाम="SWANAND"
दुहराओ x को नाम मे
{
 अक्षर=नाम[x]
 दिखाए(x + अक्षर)
}`, [], {"out":["0 S","1 W","2 A","3 N","4 A","5 N","6 D"],"isError":false}],
  ["CodeID7", "किसी भी नंबर का पहाड़ा (पाढ़ा) बनाये", `इनपुट(नंबर)
गिनती=0
नतीजा=नंबर
जबतक(गिनती<10)
{
  दिखाए(नतीजा)
  नतीजा=नतीजा+नंबर
  गिनती=गिनती+1
}`, ["5"], {"out":["5","10","15","20","25","30","35","40","45","50"],"isError":false}],
  ["CodeID8", "सीढ़ी", `सीधा="|"
आड़ा="------"
दुहराओ x को (0,10) मे
{
  x=सीधा+आड़ा+सीधा
  दिखाए(x)
}`, [], {"out":["|------|","|------|","|------|","|------|","|------|","|------|","|------|","|------|","|------|","|------|","|------|"],"isError":false}],
  ["CodeID9", "किसी भी शब्द की लंबाई जाने", `इनपुट(शब्द)
लंबाई = शब्द.संख्या()
दिखाए(लंबाई)`, ["kalaam"], {"out":["6"],"isError":false}],
  ["CodeID10", "कैलकुलेटर (calculator)", `इनपुट(x)
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
दिखाए( x + ऑपरेशन + y + '=' + नतीजा)`, ["8","2","+"], {"out":["8 + 2  =   10"],"isError":false}],
  ["CodeID11", "नाम की निर्मिति", `इनपुट(नाम)
नतीजा=""
दुहराओ x को नाम मे
{
 अक्षर=नाम[x]
 नतीजा=नतीजा+अक्षर
 दिखाए(नतीजा)
}`, ["abc"], {"out":["a","ab","abc"],"isError":false}],
  ["CodeID12", "किसी शब्द का उलटा रूप", `इनपुट(Name)
ReverseString=''
दिखाए ('Input String-'+ Name)
length=Name.संख्या()
दुहराओ b को Name मे
{
ReverseString=ReverseString+Name[length-1]
length=length-1
}
दिखाए ('Reversed String-'+ ReverseString)`, ["abc"], {"out":["Input String- abc","Reversed String- cba"],"isError":false}],
  ["CodeID14", "रचना का उदाहरण", `FirstName='Swanand'
LastName='Kadam'
रचना First(First,Last)
{
दिखाए(First)
दिखाए(Last)
}
First(FirstName,LastName)`, [], {"out":["Swanand","Kadam"],"isError":false}],
  ["CodeID15", "रचना का उदाहरण 2", `रचना printname(count)
{
जबतक(count<20)
{
count=count+1
दिखाए(count)
}
}
printname(10)`, [], {"out":["11","12","13","14","15","16","17","18","19","20"],"isError":false}],
  ["CodeID16", "Factorial ऑफ़ अ नंबर", `इनपुट(factorialOf)
f=1
count=1

अगर(factorialOf == 0 || factorialOf < 0){
  दिखाए("Invalid Input")
}

जबतक(count < factorialOf+1){
  f=f*count
  count=count+1
}

दिखाए("Factorial of" + factorialOf + " is " + f)`, ["5"], {"out":["Factorial of  5  is  120"],"isError":false}],
  ["CodeID17", "The सफ़र", `इनपुट(YourSign)
line="|"
space="  "
Extra="  "

दुहराओ x को (1,15) मे
{
Road=space+line+space+space+space+YourSign+space+space+space+line+space
space=space+Extra
दिखाए(Road)
}`, ["*"], {"out":[" |   *   | ","  |      *      |  ","   |         *         |   ","    |            *            |    ","     |               *               |     ","      |                  *                  |      ","       |                     *                     |       ","        |                        *                        |        ","         |                           *                           |         ","          |                              *                              |          ","           |                                 *                                 |           ","            |                                    *                                    |            ","             |                                       *                                       |             ","              |                                          *                                          |              ","               |                                             *                                             |               "],"isError":false}],
  ["CodeID18", "Fibonacci अनुक्रम", `Fibonacci=[]
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
}`, [], {"out":["[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025]"],"isError":false}],
  ["CodeID20", "क्या यह एक प्रमुख संख्या है?", `इनपुट(num)
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
}`, ["7"], {"out":["7 is a Prime Number"],"isError":false}],
  ["CodeID23", "बाइनरी से Decimal (binary to decimal)", `इनपुट(Binary)
DecimalValue=0
length=Binary.संख्या()

दुहराओ x को Binary मे
{
length=length-1
BinaryCharacter=Binary[x]
value=BinaryCharacter*2**length
DecimalValue=DecimalValue+value
}

दिखाए(DecimalValue)`, ["101"], {"out":["5"],"isError":false}],
];

// [id, source, inputs, expected]
const docs = [
  ["DocCode1", `Name="Hello World"
दिखाए(Name)

दिखाए("Tic Tac Toe")
दिखाए(007)

Name="Kalam"
दिखाए("Hello World," + "My Name is" + Name + "!")`, [], {"out":["Hello World","Tic Tac Toe","007","Hello World,  My Name is  Kalam !"],"isError":false}],
  ["DocCode2", `इनपुट(Name)
दिखाए(Name)`, ["Kalam"], {"out":["Kalam"],"isError":false}],
  ["DocCode3", `इनपुट(language)
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
}`, ["kalam","x","india"], {"out":["Alright, that is cool!","That works too."],"isError":false}],
  ["DocCode4", `# उदाहरण 1
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
}`, [], {"out":["0","5","10","15","20","25","30","35","40","45","50","H 0","A 1","L 2","F 3","  4","C 5","O 6","O 7","K 8","E 9","D 10","  11","R 12","I 13","C 14","E 15"],"isError":false}],
  ["DocCode5", `count=0
जबतक(count<25)
{
  दिखाए(count)
  count=count+1
}`, [], {"out":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],"isError":false}],
  ["DocCode6", `City='Banglore'
Cities=['Pusad','Pune','Mumbai','Delhi']

Citylength= City.संख्या()
Citieslength=Cities.संख्या()

दिखाए('The length of the City is' + Citylength )
दिखाए('The length of the Cities is' + Citieslength )`, [], {"out":["The length of the City is  8","The length of the Cities is  4"],"isError":false}],
  ["DocCode7", `# उदाहरण 1
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
दिखाए(Numbers)`, [], {"out":["[1,2,3,4,5,6,7,8,9,10]","Angry Birds,Game"],"isError":false}],
  ["DocCode8", `FirstName='Sachin'
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
Add(NumberOne,NumberTwo)`, [], {"out":["Sachin Tendulkar","I am a  Doctor in  Pune","60"],"isError":false}],
];

describe('Examples page', () => {
  test.each(examples)('%s %s output', (id, title, src, inputs, expected) => {
    expect(run(src, { inputs })).toEqual(expected);
  });
  test.each(examples)('%s %s ExecutionStack', (id, title, src, inputs) => {
    expect(stackOf(src, { inputs })).toEqual(stacks[id]);
  });
});

describe('Documentation page', () => {
  test.each(docs)('%s output', (id, src, inputs, expected) => {
    expect(run(src, { inputs })).toEqual(expected);
  });
  test.each(docs)('%s ExecutionStack', (id, src, inputs) => {
    expect(stackOf(src, { inputs })).toEqual(stacks[id]);
  });
});
