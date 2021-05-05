const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const multical = tW`
  a=10
  b=10
  
  c=(a+b)/2 + (a+b)*2
  
  दिखाए(c)
  
      
      
      `;
