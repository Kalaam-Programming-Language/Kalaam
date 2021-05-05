const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const function2 = tW` 
  रचना printname(count)
  {
  
  जबतक(count<20)
  
  {
  
  count=count+1
  
  दिखाए(count)
  
  }
  
  
  }
  
  
  
  
  printname(10)
  
  
    
    `;
