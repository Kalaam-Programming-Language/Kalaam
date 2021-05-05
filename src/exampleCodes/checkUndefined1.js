const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const undefined1 = tW`
  a=10

  c=a+b
  
  दिखाए(c)
  
  
  
  `;
