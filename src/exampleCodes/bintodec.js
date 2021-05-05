const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const bintodec = tW`
  Binary=1111

  DecimalValue=0
  
  length=Binary.संख्या()
  
  दुहराओ x को Binary मे
  
  {
  
  length=length-1
  
  BinaryCharacter=Binary[x]
  
  value=BinaryCharacter*2**length
  
  DecimalValue=DecimalValue+value
  
  }
  
  दिखाए(DecimalValue)
  
    
    
    
    `;
