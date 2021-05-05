const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const fibonacci = tW`Fibonacci=[]
  दुहराओ a को (0,10) मे
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
  }
  
    
    `;
