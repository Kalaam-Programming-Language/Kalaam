const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const function1 = tW`FirstName='Sachin'

  LastName='Tendulkar'
  
  
  रचना PrintFullName(First,Last)
  
  {
  
  दिखाए(First + Last)
  
  
  
  }
  
  
  PrintFullName(FirstName,LastName)
  
  
  `;
