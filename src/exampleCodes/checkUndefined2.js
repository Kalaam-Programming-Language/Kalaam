const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const undefined2 = tW`
  
  a=10
  
  
  c=b
  
  दिखाए(c)
  
  
  
    
    
    `;
