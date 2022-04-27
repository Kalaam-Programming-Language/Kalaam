const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const formname = tW`
  नाम='test'

  नतीजा=""
  
  दुहराओ x को नाम मे
  
  {
  
   अक्षर=नाम[x]
  
   नतीजा=नतीजा+अक्षर
  
   दिखाए(नतीजा)
  
  
  }
  
  
    `;
