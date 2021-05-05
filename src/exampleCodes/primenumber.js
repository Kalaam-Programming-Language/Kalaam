const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const primenumber = tW`
  
num=11

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

}
  `;
