const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const factorialOf = tW`
factorialOf=5
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
  
    
      
      `;
