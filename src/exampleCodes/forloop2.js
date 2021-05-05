const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const forloop2 = tW`
  नाम="SWANAND"

दुहराओ x को नाम मे

{

 अक्षर=नाम[x]

 दिखाए(x + अक्षर)


}

  `;
